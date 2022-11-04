import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/wa/dto/create-message.dto';
import { Connection, Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    private connection: Connection,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async addMessage(messageDto: CreateMessageDto): Promise<Message> {
    let message = await this.messageRepository.findOne({
      message_id: messageDto.message_id,
    });

    if (message == null) {
      message = new Message();
    }
    message.timestamp = messageDto.timestamp;
    message.message_id = messageDto.message_id;
    message.remote_id = messageDto.remote_id;
    message.device_id = messageDto.device_id;
    message.message = messageDto.message;
    message.from_me = messageDto.from_me;
    message.url = messageDto.url;
    message.mime_type = messageDto.mime_type;
    message.status = messageDto.status;
    message.type = messageDto.type;
    return await this.messageRepository.save(message);
  }
  async updateById(messageDto: CreateMessageDto, id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({ id });
    message.timestamp = messageDto.timestamp;
    message.message_id = messageDto.message_id;
    message.remote_id = messageDto.remote_id;
    message.device_id = messageDto.device_id;
    message.message = messageDto.message;
    message.from_me = messageDto.from_me;
    message.status = messageDto.status;
    return await this.messageRepository.save(message);
  }
  async updateStatus(messageDto: CreateMessageDto): Promise<Message> {
    const message = await this.messageRepository.findOne({
      message_id: messageDto.message_id,
    });
    message.status = messageDto.status;
    return await this.messageRepository.save(message);
  }
  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
