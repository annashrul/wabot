import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { ConversationService } from 'src/conversation/conversation.service';
import { MessageService } from 'src/message/message.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { WaService } from '../wa.service';

@Processor('wa')
export class WaProcessor {
  private readonly logger = new Logger(WaProcessor.name);

  constructor(
    private readonly service: WaService,
    private messageService: MessageService,
    private conversationService: ConversationService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}.`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('send-message')
  async handleTranscode(job: Job) {
    this.logger.debug('Start sending message...');
    this.logger.debug(job.data);
    const res = job.data.to.split(',');
    res.forEach(async (element) => {
      console.log(element);
      let noHp = element;
      if (job.data.type == 'message') {
        const prefix = noHp.substring(0, 2);
        if (prefix == '08') {
          noHp = '62' + noHp.substr(1);
        }
        noHp = `${noHp}@s.whatsapp.net`;
      }

      const result = await this.service.sendMessage(
        job.data.id,
        noHp,
        job.data.message,
        job.data.type,
      );
      console.log(result);
    });
    // const result = await this.service.sendMessageNot(
    //   job.data.to,
    //   job.data.message,
    // );
    // this.logger.debug('sending completed');
    return 'Sukses';
  }
  @Process('send-media')
  async sendMedia(job: Job) {
    this.logger.debug('Start sending media...');
    this.logger.debug(job.data);
    const res = job.data.mediaDto.to.split(',');
    const mediaDto = job.data.mediaDto;

    res.forEach(async (element) => {
      const sendOjb = Object.assign({}, mediaDto);
      console.log(element);
      let noHp = element;
      if (mediaDto.type == 'message') {
        const prefix = noHp.substring(0, 2);
        if (prefix == '08') {
          noHp = '62' + noHp.substr(1);
        }
        noHp = `${noHp}@s.whatsapp.net`;
      }
      sendOjb.to = noHp;
      const result = await this.service.sendMedia(job.data.id, sendOjb);
      console.log(result);
    });
    // const result = await this.service.sendMessageNot(
    //   job.data.to,
    //   job.data.message,
    // );
    // this.logger.debug('sending completed');
    return 'Sukses';
  }
  @Process('add-contact')
  async deviceAddContact(job: Job) {
    this.logger.debug('Sync Begin ...');

    const contacts = job.data.contacts;
    Object.keys(contacts).forEach(async (jid) => {
      const contact = contacts[jid];
      if (contact.name) {
        const create = new CreateContactDto();
        create.jid = contact.jid;
        create.device_id = job.data.id;
        create.notify_name = contact.notify;
        create.name = contact.name ?? contact.verify ?? '';
        create.short_name = contact.short;

        await this.service.addContact(create);
      }
    });
    this.logger.debug('Sync Contact sukses');
    return 'Sukses';
  }

  @Process('receive-media')
  async receiveMedia(job: Job) {
    this.logger.debug('Receiving media...');

    const message = job.data.message;

    const url = job.data.url;
    const deviceId = job.data.deviceId;
    const imageMessage = message.message.imageMessage;

    const create = new CreateConversationDto();
    const contact = await this.service.contactService.findByJid(
      message.key.remoteJid,
    );
    if (contact) create.name = contact.name;
    create.device_id = deviceId;
    create.jid = message.key.remoteJid;
    create.last_message_time = message.messageTimestamp.toString();
    create.last_message_id = message.key.id;
    const jid = message.key.remoteJid;

    if (jid.includes('@g.us')) {
      create.is_group = 1;
    } else if (jid.includes('@broadcast')) {
      create.is_broadcast = 1;
    }
    await this.conversationService.addMessage(create);

    if (imageMessage) {
      // const resDo = await this.service.imageUploadService.upload(url);
      // console.log(
      //   '🚀 ~ file: wa.processor.ts ~ line 137 ~ WaProcessor ~ receiveMedia ~ resDo',
      //   resDo,
      // );
      const messageDto = new CreateMessageDto();
      messageDto.device_id = create.device_id;
      messageDto.remote_id = message.key.remoteJid;
      messageDto.message_id = message.key.id;
      messageDto.message = imageMessage.caption;
      messageDto.mime_type = imageMessage.mimetype;
      messageDto.url = url;
      messageDto.type = 'image';
      messageDto.from_me = message.key.fromMe ? 1 : 0;
      messageDto.timestamp = message.messageTimestamp.toString();
      const device = this.service.getDevice(create.device_id);

      const newMessage = await this.messageService.addMessage(messageDto);
    }
    message.message.url = url;
    this.service.sendCallback(deviceId, message);
  }
}
