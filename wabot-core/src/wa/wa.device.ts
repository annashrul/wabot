import {
  MessageType,
  Mimetype,
  ReconnectMode,
  WAConnection,
  WALocationMessage,
  WA_MESSAGE_STUB_TYPES,
} from '@adiwajshing/baileys';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Device } from 'src/device/entities/device.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { WaService } from './wa.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { dtoSendmediaDto } from './dto/sendmedia.dto';

export class WaDevice {
  private client: WAConnection = new WAConnection();
  public socket: Socket;
  private countRetryQR = 0;
  private device: Device;
  private id: string;
  private deviceRepo: Repository<Device>;
  private readonly service: WaService;
  public onMesssage;
  private lastQr: string;

  constructor(
    socket: Socket,
    id: string,
    deviceRepo: Repository<Device>,
    service: WaService,
  ) {
    this.socket = socket;
    this.id = id;
    this.deviceRepo = deviceRepo;
    this.service = service;
  }

  async newConnection() {
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
    // this.client = new WAConnection();
    this.client.autoReconnect = ReconnectMode.onConnectionLost;
    this.device = await this.deviceRepo.findOne(this.id);
    // attempt to reconnect at most 10 times in a row
    this.client.connectOptions.maxRetries = 10;

    this.client.browserDescription = ['Pesanku', 'Chrome', '3.0'];
    this.client.on('qr', (qr) => {
      // Now, use the 'qr' string to display in QR UI or send somewhere
      console.log('New QR : ', qr);
      this.lastQr = qr;
      // if (this.countRetryQR > 2) {
      //   this.close();
      //   // return;
      // }
      this.countRetryQR++;
      if (this.socket) this.socket.to(this.id).emit('qrReload', { qr: qr });
    });
    this.client.on('connecting', () => {
      if (this.socket) this.socket.to(this.id).emit('connecting');
    });

    this.client.on('initial-data-received', async () => {
      console.log('received all initial messages');
      const allchat = this.client.chats.all();
      for (let a = 0; a < this.client.chats.length; a++) {
        try {
          const element = allchat[a];
          const lastMessage = element.messages.last;
          const jid = element.jid;
          const create = new CreateConversationDto();
          create.device_id = this.id;
          if (element.mute) create.is_muted = element.mute;
          create.name = element.name;
          create.jid = element.jid;
          if (lastMessage) {
            create.last_message_time = lastMessage.messageTimestamp.toString();
            create.last_message_id = lastMessage.key.id;
          }
          create.unread = element.count;
          create.is_marked_spam = element.spam;
          if (jid.includes('@g.us')) {
            create.is_group = 1;
          } else if (jid.includes('@broadcast')) {
            create.is_broadcast = 1;
          }

          await this.service.addConversation(create);
        } catch (error) {
          console.log(error);
        }
      }
    });
    // called when WA sends chats
    // this can take up to a few minutes if you have thousands of chats!
    this.client.on('chats-received', async ({ hasNewChats }) => {
      console.log(
        `you have ${this.client.chats.length} chats, new chats available: ${hasNewChats}`,
      );

      const unread = await this.client.loadAllUnreadMessages();
      console.log('you have ' + unread.length + ' unread messages');
    });
    // called when WA sends chats
    // this can take up to a few minutes if you have thousands of contacts!
    this.client.on('contacts-received', () => {
      console.log(
        'you have ' + Object.keys(this.client.contacts).length + ' contacts',
      );
      // Object.keys(this.client.contacts).forEach(async (jid) => {
      //   const contact = this.client.contacts[jid];
      //   const create = new CreateContactDto();
      //   create.jid = contact.jid;
      //   create.device_id = this.id;
      //   create.notify_name = contact.notify;
      //   create.name = contact.name ?? contact.verify ?? '';
      //   create.short_name = contact.short;

      //   await this.service.addContact(create);
      // });
      this.service.addContactQueue(this.id, this.client.contacts);
      console.log('update contact success');
    });
    const fileName = `tokens/auth_info_${this.id}.json`;

    // this will be called as soon as the credentials are updated
    this.client.on('open', () => {
      if (this.socket) this.socket.to(this.id).emit('connected');
      // save credentials whenever updated
      console.log(`credentials updated!`);
      this.device.status = 'Connected';
      this.deviceRepo.save(this.device);
      const authInfo = this.client.base64EncodedAuthInfo(); // get all the auth info we need to restore this session
      fs.writeFileSync(fileName, JSON.stringify(authInfo, null, '\t')); // save this info to a file
    });

    fs.existsSync(fileName) && this.client.loadAuthInfo(fileName);

    await this.client.connect();

    const authInfo = this.client.base64EncodedAuthInfo(); // get all the auth info we need to restore this session
    fs.writeFileSync(fileName, JSON.stringify(authInfo, null, '\t')); // save this info to a file

    console.log('Connected');
    this.device.status = 'Connected';
    this.deviceRepo.save(this.device);
    this.client.on('chat-update', async (chatUpdate) => {
      if (chatUpdate.presences) {
        if (this.socket)
          this.socket.to(this.id).emit('presences', chatUpdate.presences);
        // receive presence updates -- composing, available, etc.
        Object.values(chatUpdate.presences).forEach((presence) =>
          console.log(
            `${presence.name}'s presence is ${presence.lastKnownPresence} in ${chatUpdate.jid}`,
          ),
        );
      }
      if (!chatUpdate.hasNewMessage) {
        if (chatUpdate.messages) {
        }
        return;
      }
      // `chatUpdate` is a partial object, containing the updated properties of the chat
      // received a new message
      // if (chatUpdate.messages && chatUpdate.count) {
      //   const message = chatUpdate.messages.all()[0];
      //   console.log(message);
      //   this.onMessageNew(message);
      //   this.service.sendCallback(this.id, message);
      // } else console.log(chatUpdate); // see updates (can be archived, pinned etc.)
      const m = chatUpdate.messages.all()[0]; // pull the new message from the update
      const messageStubType =
        WA_MESSAGE_STUB_TYPES[m.messageStubType] || 'MESSAGE';
      console.log('got notification of type: ' + messageStubType);

      const messageContent = m.message;
      // if it is not a regular text or media message
      if (!messageContent) return;

      if (m.key.fromMe) {
        console.log('relayed my own message');
        return;
      }
      const sender = m.key.remoteJid;
      const messageType = Object.keys(messageContent)[0]; // message will always contain one key signifying what kind of message
      if (messageType === MessageType.text) {
        const text = m.message.conversation;
        console.log(sender + ' sent: ' + text);

        this.onMessageNew(m);
      } else if (messageType === MessageType.extendedText) {
        const text = m.message.extendedTextMessage.text;
        console.log(
          sender +
            ' sent: ' +
            text +
            ' and quoted message: ' +
            JSON.stringify(m.message),
        );
      } else if (messageType === MessageType.contact) {
        const contact = m.message.contactMessage;
        console.log(
          sender +
            ' sent contact (' +
            contact.displayName +
            '): ' +
            contact.vcard,
        );
      } else if (
        messageType === MessageType.location ||
        messageType === MessageType.liveLocation
      ) {
        const locMessage = m.message[messageType] as WALocationMessage;
        console.log(
          `${sender} sent location (lat: ${locMessage.degreesLatitude}, long: ${locMessage.degreesLongitude})`,
        );
        try {
          const savedFile = await this.client.downloadAndSaveMediaMessage(
            m,
            'public/media/media_loc_thumb_in_' + m.key.id,
          ); // save location thumbnail

          if (messageType === MessageType.liveLocation) {
            console.log(
              `${sender} sent live location for duration: ${m.duration / 60}`,
            );
          }

          this.service.waQueue.add('receive-media', {
            message: m,
            url: savedFile,
            deviceId: this.id,
          });
        } catch (err) {
          console.log('error in decoding message: ' + err);
        }
      } else {
        // if it is a media (audio, image, video, sticker) message
        // decode, decrypt & save the media.
        // The extension to the is applied automatically based on the media type
        try {
          const savedFile = await this.client.downloadAndSaveMediaMessage(
            m,
            'public/media/media_in_' + m.key.id,
          );
          console.log(sender + ' sent media, saved at: ' + savedFile);

          this.service.waQueue.add('receive-media', {
            message: m,
            url: savedFile,
            deviceId: this.id,
          });

          // const resDo = await this.service.imageUploadService.upload(savedFile);
          // console.log(
          //   '🚀 ~ file: wa.device.ts ~ line 269 ~ WaDevice ~ this.client.on ~ resDo',
          //   resDo,
          // );
        } catch (err) {
          console.log('error in decoding message: ' + err);
        }
      }

      // `chatUpdate` is a partial object, containing the updated properties of the chat
      // received a new message
      if (chatUpdate.messages && chatUpdate.count) {
        const message = chatUpdate.messages.all()[0];
        console.log(message);
      } // see updates (can be archived, pinned etc.)
      else
        console.log(
          '🚀 ~ file: wa.device.ts ~ line 186 ~ WaDevice ~ this.client.on ~ chatUpdate',
          chatUpdate,
        );
    });
    this.client.on('chat-new', async (message) => {
      console.log(message);
    });
    this.client.on('close', ({ reason, isReconnecting }) => {
      console.log(
        'oh no got disconnected: ' +
          reason +
          ', reconnecting: ' +
          isReconnecting,
      );
      this.device.status = 'Disconnected';
      this.deviceRepo.save(this.device);
      if (reason == 'invalid_session') {
        const fileName = `tokens/auth_info_${this.id}.json`;
        try {
          fs.unlinkSync(fileName);
        } catch (err) {
          console.error(err);
        }
      }
      // this.socket.to(this.id).emit('disconnected', { reason: reason });
    });
    this.client.on('ws-close', ({ reason }) =>
      console.log('oh no got disconnected: ' + reason),
    );
    /* example of custom functionality for tracking battery */
    this.client.on('CB:action,,battery', (json) => {
      const batteryLevelStr = json[2][0][1].value;
      const batterylevel = parseInt(batteryLevelStr);
      console.log('battery level: ' + batterylevel);
    });
  }

  async onMessageNew(message) {
    if (message.key.fromMe) return;
    const senderID = message.key.remoteJid;
    const messageText =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text;
    if (!message.message) {
      console.log(
        'recieved notification from ' +
          senderID +
          ' of type ' +
          message.toJSON().messageStubType +
          '; cannot be responded to',
      );
      return;
    }
    if (!messageText) {
      console.log(
        'recieved message from ' +
          senderID +
          ' with no text: ' +
          JSON.stringify(message).slice(0, 100),
      );
      return;
    }
    this.service.sendCallback(this.id, message);
    // await this.sendMessage(senderID, 'Halo', message);
  }

  async sendMessage(toContact, message, type) {
    let valid = true;
    if (type == 'message') {
      const exists = await this.client.isOnWhatsApp(toContact);
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
      return await this.client.sendMessage(
        toContact,
        message,
        MessageType.text,
        {},
      );
    }
  }

  async sendMedia(mediaDto: dtoSendmediaDto) {
    let valid = true;
    if (mediaDto.type == 'message') {
      const exists = await this.client.isOnWhatsApp(mediaDto.to);
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
        { url: mediaDto.fileUrl },
        mediaDto.mesageType,
        {
          mimetype: mediaDto.mimeType,
          caption: mediaDto.caption,
          filename: mediaDto.fileName,
        },
      );
    }
  }

  async loadChat(lastId) {
    const { chats, cursor } = await this.client.loadChats(25, lastId);
    return chats;
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
    if (this.client.state == 'open') {
      console.log('logout');
      this.client.logout();
    }
  }

  async close() {
    const fileName = `tokens/auth_info_${this.id}.json`;
    try {
      fs.unlinkSync(fileName);
    } catch (err) {
      console.error(err);
    }
    this.device.status = 'Disconnected';
    this.deviceRepo.save(this.device);
    console.log('Close the connection');
    this.client.removeAllListeners('qr');
    this.client.removeAllListeners();
    this.client.close();
    delete this.client;
    this.client == null;
    if (this.socket) this.socket.to(this.id).emit('disconnected');
  }
}
