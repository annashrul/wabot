import { MessageType, WAConnection } from '@adiwajshing/baileys';
import makeWASocket, {
  DisconnectReason,
  AnyMessageContent,
  fetchLatestBaileysVersion,
  delay,
  makeInMemoryStore,
  MessageRetryMap,
  useMultiFileAuthState,
  WAMessage,
  Contact,
} from '@adiwajshing/baileys-md';
import { Boom } from '@hapi/boom';
import { HttpException, HttpStatus } from '@nestjs/common';
import P from 'pino';
import { Socket } from 'socket.io';
import { Device } from 'src/device/entities/device.entity';
import { dtoSendmediaDto } from 'src/wa/dto/sendmedia.dto';
import { Repository } from 'typeorm';
import { WaMdService } from './wa-md.service';
import * as fs from 'fs';

export class WaMdDevice {
  private client;
  public socket: Socket;
  private countRetryQR = 0;
  private device: Device;
  private id: string;
  private deviceRepo: Repository<Device>;
  private readonly service: WaMdService;
  public onMesssage;
  private lastQr: string;
  sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));
  private store;
  private msgRetryCounterMap: MessageRetryMap = {};

  constructor(
    socket: Socket,
    id: string,
    deviceRepo: Repository<Device>,
    service: WaMdService,
  ) {
    this.socket = socket;
    this.id = id;
    this.deviceRepo = deviceRepo;
    this.service = service;
  }

  async newConnection() {
    if (this.client != null) {
      // await this.client.close();
    }
    const fileStore = `tokens/store_multi_${this.id}.json`;
    this.store = makeInMemoryStore({
      logger: P().child({ level: 'debug', stream: 'store' }),
    });
    this.store?.readFromFile(fileStore);
    // save every 10s
    setInterval(() => {
      this.store?.writeToFile(fileStore);
    }, 10_000);

    this.device = await this.deviceRepo.findOne(this.id);
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`);

    const fileName = `tokens/auth_info_multi_${this.id}.json`;
    const { state, saveCreds } = await useMultiFileAuthState(fileName);
    this.client = makeWASocket({
      version,
      logger: P({ level: 'trace' }),
      printQRInTerminal: true,
      auth: state,
      browser: ['Pesanku', 'Chrome', '3.0'],
      msgRetryCounterMap: this.msgRetryCounterMap,
      // implement to handle retries
      getMessage: async (key) => {
        return {
          conversation: 'hello',
        };
      },
    });

    this.store.bind(this.client.ev);

    if (this.client.state == 'open') {
      console.log(`Device id ${this.id} already open`);
      if (this.socket) this.socket.to(this.id).emit('connected');
      return;
    } else if (this.client.state == 'connecting') {
      console.log(`Device id ${this.id} is connecting`);
      if (this.socket) this.socket.to(this.id).emit('connecting');
      if (this.socket)
        this.socket.to(this.id).emit('qrReload', { qr: this.lastQr });
      return;
    }

    this.client.ev.on('connection.update', async (update) => {
      console.log('connection.update');
      const { connection, lastDisconnect } = update;
      if (update.qr) {
        // if the 'qr' property is available on 'conn'
        console.log('New QR : ', update.qr);
        this.lastQr = update.qr;
        this.countRetryQR++;
        if (this.socket)
          this.socket.to(this.id).emit('qrReload', { qr: update.qr });
      }
      if (connection === 'close') {
        const shouldReconnect =
          (lastDisconnect.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;
        console.log(
          'connection closed due to ',
          lastDisconnect.error,
          ', reconnecting ',
          shouldReconnect,
        );
        // reconnect if not logged out
        if (shouldReconnect && this.countRetryQR < 7) {
          console.log('Reconnecting...');
          await this.sleep(5000);

          this.newConnection();
          this.countRetryQR++;
        }
        if (
          (lastDisconnect.error as Boom)?.output?.statusCode ===
          DisconnectReason.loggedOut
        ) {
          try {
            // fs.unlinkSync(fileName);
            fs.rmSync(fileName, { recursive: true, force: true });
          } catch (err) {
            console.error(err);
          }
          this.device.status = 'Disconnected';
          this.deviceRepo.save(this.device);
          delete this.client;
          this.client == null;
          if (this.socket) this.socket.to(this.id).emit('disconnected');
        }
      } else if (connection === 'open') {
        console.log('opened connection');
        if (this.socket) this.socket.to(this.id).emit('connected');
        this.device.status = 'Connected';
        this.deviceRepo.save(this.device);
      } else if (connection === 'connecting') {
        console.log('connecting');
        if (this.socket) this.socket.to(this.id).emit('connecting');
      }
    });
    this.client.ev.on('messages.update', (m) => {
      console.log('messages.update');
      // console.log(m);
      this.service.loggerF.info('messages.update');
      this.service.loggerF.info(m);
    });
    this.client.ev.on('presence.update', (m) => {
      console.log('presence.update');
      // console.log(m);
      this.service.loggerF.info('presence.update');
      this.service.loggerF.info(m);
    });
    this.client.ev.on('chats.update', (m) => {
      console.log('chats.update');
      // console.log(m);
      this.service.loggerF.info('chats.update');
      this.service.loggerF.info(m);
    });
    this.client.ev.on('contacts.set', (contacts: Contact[]) => {
      console.log('contacts.set');
      console.log(
        'you have ' + Object.keys(contacts['contacts']).length + ' contacts',
      );
      this.service.addContactQueue(this.id, contacts['contacts']);
      this.service.loggerF.info('contacts.upsert');
      this.service.loggerF.info(contacts);
    });
    this.client.ev.on(
      'messages.set',
      (messages: WAMessage[], isLatest: boolean) => {
        this.service.loggerF.info('messages.set');
        console.log('you have ' + Object.keys(messages).length + ' messages');
        // this.service.loggerF.info(messages);
      },
    );
    this.client.ev.on('contacts.upsert', (m) => {
      console.log('contacts.upsert');
      console.log('you have ' + Object.keys(m).length + ' contacts');
      this.service.addContactQueue(this.id, m);
      this.service.loggerF.info('contacts.upsert');
      this.service.loggerF.info(m);
    });
    this.client.ev.on('contacts.update', (m) => {
      console.log('contacts.update');
      console.log('you have ' + Object.keys(m).length + ' contacts');
      this.service.addContactQueue(this.id, m);
      this.service.loggerF.info('contacts.update');
      this.service.loggerF.info(m);
    });
    this.client.ev.on('creds.update', saveCreds);

    this.client.ev.on('messages.upsert', async (m) => {
      console.log('messages.upsert');
      console.log(JSON.stringify(m, undefined, 2));
      this.service.loggerF.info('messages.upsert');
      this.service.loggerF.info(m);
      const msg = m.messages[0];
      if (!msg.key.fromMe && m.type === 'notify') {
        this.service.sendCallback(this.id, msg);
      }
      // console.log('replying to', m.messages[0].key.remoteJid);
      // await this.client.sendMessage(m.messages[0].key.remoteJid!, {
      //   text: 'Hello there!',
      // });
    });
  }

  async sendMessage(toContact, message, type) {
    let valid = true;
    if (type == 'message') {
      const exists = await this.client.onWhatsApp(toContact);
      if (exists) valid = true;
      console.log(`${toContact} exists on WhatsApp, as jid: ${exists.jid}`);
    } else {
      valid = true;
    }
    if (valid) {
      if (this.client.state == 'close') {
        throw new HttpException(
          'Device is not connect',
          HttpStatus.BAD_REQUEST,
        );
        return;
      }

      return await this.client.sendMessage(toContact, { text: message });
    }
  }

  async sendMessageCustom(toContact, message, type) {
    let valid = true;
    if (type == 'message') {
      const exists = await this.client.onWhatsApp(toContact);
      if (exists) valid = true;
      console.log(`${toContact} exists on WhatsApp, as jid: ${exists.jid}`);
    } else {
      valid = true;
    }
    if (valid) {
      if (this.client.state == 'close') {
        throw new HttpException(
          'Device is not connect',
          HttpStatus.BAD_REQUEST,
        );
        return;
      }
      // const buttons = [
      //   { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
      //   { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 },
      //   { buttonId: 'id3', buttonText: { displayText: 'Button 3' }, type: 1 },
      // ];

      // const buttonMessage = {
      //   text: "Hi it's button message",
      //   footer: 'Hello World',
      //   buttons: buttons,
      //   headerType: 1,
      // };

      // return await this.client.sendMessage(toContact, { text: message });
      return await this.client.sendMessage(toContact, message);
    }
  }

  async sendMedia(mediaDto: dtoSendmediaDto) {
    let valid = true;
    if (mediaDto.type == 'message') {
      const exists = await this.client.onWhatsApp(mediaDto.to);
      if (exists) valid = true;
      console.log(`${mediaDto.to} exists on WhatsApp, as jid: ${exists.jid}`);
    } else {
      valid = true;
    }
    if (valid) {
      if (this.client.state == 'close') {
        throw new HttpException(
          'Device is not connect',
          HttpStatus.BAD_REQUEST,
        );
        return;
      }
      return await this.client.sendMessage(
        mediaDto.to,
        {
          image: { url: mediaDto.fileUrl },
          mimetype: mediaDto.mimeType,
          caption: mediaDto.caption,
          filename: mediaDto.fileName,
        },
        { url: mediaDto.fileUrl },
      );
    }
  }
  async getGroups() {
    const getGroups = await this.client.groupFetchAllParticipating();
    const groups = Object.entries(getGroups)
      .slice(0)
      .map((entry) => entry[1]);
    console.log(groups);
    return groups;
  }
  async getGroupMeta(id) {
    const metadata = await this.client.groupMetadata(id);
    console.log(
      metadata.id +
        ', title: ' +
        metadata.subject +
        ', description: ' +
        metadata.desc,
    );
    return metadata;
  }
  async logout() {
    try {
      console.log('logout');
      const fileName = `tokens/auth_info_multi_${this.id}.json`;
      const fileStore = `tokens/store_multi_${this.id}.json`;

      try {
        // fs.unlinkSync(fileName);
        fs.rmSync(fileName, { recursive: true, force: true });

        fs.unlinkSync(fileStore);
      } catch (err) {
        console.error(err);
      }
      this.device.status = 'Disconnected';
      this.deviceRepo.save(this.device);
      console.log('Close the connection');
      await this.client.logout();
      delete this.client;
      this.client == null;
      if (this.socket) this.socket.to(this.id).emit('disconnected');
    } catch (error) {
      console.error(error);
    }
  }

  async close() {
    console.log('close');
  }
}
