import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateConversationDto } from 'src/wa/dto/create-conversation.dto';
import { Connection, Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    private connection: Connection,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async addMessage(
    conversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    let conversation = await this.conversationRepository.findOne({
      jid: conversationDto.jid,
      device_id: conversationDto.device_id,
    });

    if (conversation == null) {
      conversation = new Conversation();
    }
    conversation.last_message_time = conversationDto.last_message_time;
    conversation.device_id = conversationDto.device_id;
    conversation.jid = conversationDto.jid;
    conversation.name = conversationDto.name;
    conversation.unread = conversationDto.unread;
    conversation.last_message_id = conversationDto.last_message_id;
    conversation.is_muted = conversationDto.is_muted;
    conversation.is_marked_spam = conversationDto.is_muted;
    conversation.is_group = conversationDto.is_group;
    conversation.is_broadcast = conversationDto.is_broadcast;
    return await this.conversationRepository.save(conversation);
  }

  async paginateGroup(
    options: IPaginationOptions,
    device_id: string,
  ): Promise<Pagination<Conversation>> {
    const queryBuilder = this.conversationRepository.createQueryBuilder('c');
    queryBuilder.where('c.is_group = 1');
    queryBuilder.andWhere('c.device_id = :id').setParameters({ id: device_id });
    queryBuilder.orderBy('c.created_at', 'DESC'); // Or whatever you need to do

    return paginate<Conversation>(queryBuilder, options);
  }
  async paginateBroadcast(
    options: IPaginationOptions,
    device_id: string,
  ): Promise<Pagination<Conversation>> {
    const queryBuilder = this.conversationRepository.createQueryBuilder('c');
    queryBuilder.where('c.is_broadcast = 1');
    queryBuilder.andWhere('c.device_id = :id').setParameters({ id: device_id });
    queryBuilder.orderBy('c.created_at', 'DESC'); // Or whatever you need to do

    return paginate<Conversation>(queryBuilder, options);
  }
  async findbyId(id) {
    const order = { last_message_time: 'DESC' };

    const data = await this.conversationRepository.find({
      relations: ['message'],
      order: { last_message_time: 'DESC', message: 'DESC' },
      where: (qb) => {
        qb.where({
          device_id: id,
        });
      },
    });
    return data;
  }
}
