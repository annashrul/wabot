import { proto } from '@adiwajshing/baileys-md';
import { InjectQueue } from '@nestjs/bull';
import {
  HttpException,
  HttpService,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { map } from 'rxjs/operators';
import { CallbackService } from 'src/callback/callback.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { ConversationService } from 'src/conversation/conversation.service';
import { Device } from 'src/device/entities/device.entity';
import { CreateConversationDto } from 'src/wa/dto/create-conversation.dto';
import { dtoSendmediaDto } from 'src/wa/dto/sendmedia.dto';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { WaMdDevice } from './wa-md.device';

@Injectable()
export class WaMdService implements OnModuleInit {
  private devices = [];

  constructor(
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
    private conversationService: ConversationService,
    public contactService: ContactsService,
    private callbackService: CallbackService,
    private httpService: HttpService,
    @InjectQueue('wa-md') public waQueue: Queue,
    @Inject('winston')
    public readonly loggerF: Logger,
  ) {}

  onModuleInit() {
    this.loggerF.info(`The module WaMdService has been initialized.`);
    this.iniDevice();
  }
  async addConversation(conversationDto: CreateConversationDto) {
    return await this.conversationService.addMessage(conversationDto);
  }
  async addContact(contact: CreateContactDto) {
    return await this.contactService.create(contact);
  }
  async iniDevice() {
    const devices = await this.deviceRepository.find({
      status: 'Connected',
      type: 'multidevice',
    });

    // const device = new WaMdDevice();
    // device.connectToWhatsApp();
    devices.forEach(async (device) => {
      console.log(device.id);
      device.status = 'Disconnected';
      this.deviceRepository.save(device);
      await this.connect(null, device.id);
    });
  }
  async connect(socket, id) {
    if (!id) {
      if (socket) socket.to(id).emit('failed', { message: 'invalid id' });
      return;
    }
    const idx = this.devices.findIndex((el) => el.id === id);
    let device: WaMdDevice = null;

    if (idx < 0) {
      device = new WaMdDevice(socket, id, this.deviceRepository, this);
      device.newConnection().catch((err) => {
        console.log('unexpected error: ' + err);

        if (socket) socket.to(id).emit('failed', { message: err });
        this.disconnect(id);
      });
      this.devices.push({ id: id, device });
    } else {
      device = await this.getDevice(id);
      if (socket) {
        device.socket = socket;
      }
      device.newConnection().catch((err) => {
        console.log('unexpected error: ' + err);

        if (socket) socket.to(id).emit('failed', { message: err });
        this.disconnect(id);
      });
    }

    // device.onMesssage = this.sendCallback;
    // this.devices[id] = device;
  }
  async sendMessageQueue(id, toContact, message, type) {
    if (this.devices.length == 0) {
      throw new HttpException('Device not connected', HttpStatus.BAD_REQUEST);
    }
    const job = await this.waQueue.add('send-message', {
      id: id,
      to: toContact,
      message,
      type: type,
    });
  }
  async sendMessageCustomQueue(id, toContact, message, type) {
    if (this.devices.length == 0) {
      throw new HttpException('Device not connected', HttpStatus.BAD_REQUEST);
    }
    const job = await this.waQueue.add('send-message-custom', {
      id: id,
      to: toContact,
      message,
      type: type,
    });
  }
  async disconnect(id) {
    const idx = this.devices.findIndex((el) => el.id === id);
    if (idx !== -1) {
      let device = new WaMdDevice(null, null, null, this);
      device = this.devices[idx].device;
      await device.logout();
      await device.close();
      this.devices.splice(idx, 1);
    }
  }
  async sendMediaQueue(id, mediaDto: dtoSendmediaDto) {
    if (this.devices.length == 0) {
      throw new HttpException('Device not connected', HttpStatus.BAD_REQUEST);
    }

    const job = await this.waQueue.add('send-media', {
      id,
      mediaDto,
    });
    return { message: 'sukses', mediaUrl: mediaDto.fileUrl };
    // return await device.sendMedia(mediaDto);
  }
  async sendMessage(id, toContact, message, type) {
    const device = await this.getDevice(id);
    return await device.sendMessage(toContact, message, type);
  }
  async sendMessageCustom(id, toContact, message, type) {
    const device = await this.getDevice(id);
    return await device.sendMessageCustom(toContact, message, type);
  }
  async sendMedia(id, mediaDto: dtoSendmediaDto) {
    const device = await this.getDevice(id);
    console.log(mediaDto.to);
    return await device.sendMedia(mediaDto);
  }

  async addContactQueue(id, contacts) {
    if (this.devices.length == 0) {
      throw new HttpException('Device not connected', HttpStatus.BAD_REQUEST);
    }
    const job = await this.waQueue.add('add-contact', {
      id,
      contacts,
    });
  }
  async getGroupMeta(id, groupId) {
    const device = await this.getDevice(id);
    const meta = await device.getGroupMeta(groupId);
    return meta;
  }
  async getGroup(id) {
    const device = await this.getDevice(id);
    const group = await device.getGroups();
    return group;
  }
  async getDevice(id) {
    if (this.devices.length == 0) {
      throw new HttpException('Device not connected', HttpStatus.BAD_REQUEST);
    }
    const idx = this.devices.findIndex((el) => el.id === id);
    let device: WaMdDevice = null;
    if (idx >= 0) device = this.devices[idx].device;
    return device;
  }

  async sendCallback(id, message: proto.WebMessageInfo) {
    const callback = await this.callbackService.findByDeviceId(id);
    if (callback) {
      const data = {
        device_id: id,
        meta: message.key,
        timestamp: message.messageTimestamp.toString(),
        message: message.message,
      };
      try {
        const response = await this.httpService
          .post(callback.url, data)
          .pipe(
            map((res) => {
              return res.data;
            }),
          )
          .toPromise();
        console.log(response);
      } catch (error) {
        console.log(error.response); // this is the main part. Use the response property from the error object
        console.log(error.response.data.error);
      }
    } else {
      console.log('No Callback found');
    }
    console.log(callback);
  }
}
