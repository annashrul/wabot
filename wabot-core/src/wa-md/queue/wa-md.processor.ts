import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { ConversationService } from 'src/conversation/conversation.service';
import { MessageService } from 'src/message/message.service';
import { WaMdService } from '../wa-md.service';

@Processor('wa-md')
export class WaMdProcessor {
  private readonly logger = new Logger(WaMdProcessor.name);

  constructor(
    private readonly service: WaMdService,
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
  async handleSendMessage(job: Job) {
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
  }
  @Process('send-message-custom')
  async handleSendMessageCustom(job: Job) {
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

      const result = await this.service.sendMessageCustom(
        job.data.id,
        noHp,
        job.data.message,
        job.data.type,
      );
      console.log(result);
    });
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
    for (const contact of contacts) {
      if (contact.id) {
        const create = new CreateContactDto();
        create.jid = contact.jid ?? contact.id;
        create.device_id = job.data.id ?? '';
        create.notify_name = contact.notify ?? '';
        create.name = contact.name ?? contact.notify ?? '';
        create.short_name = contact.short ?? '';

        await this.service.addContact(create);
      }
    }
    // Object.keys(contacts).forEach(async (jid) => {
    //   const contact = contacts[jid];
    //   if (contact.id) {
    //     const create = new CreateContactDto();
    //     create.jid = contact.jid ?? contact.id;
    //     create.device_id = job.data.id ?? '';
    //     create.notify_name = contact.notify ?? '';
    //     create.name = contact.name ?? contact.verify ?? '';
    //     create.short_name = contact.short ?? '';

    //     await this.service.addContact(create);
    //   }
    // });
    this.logger.debug('Sync Contact sukses');
    return 'Sukses';
  }
}
