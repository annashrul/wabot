import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Connection, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContact: CreateContactDto) {
    let contact = await this.contactRepository.findOne({
      jid: createContact.jid,
      device_id: createContact.device_id,
    });

    if (contact == null) {
      contact = new Contact();
    }
    contact.jid = createContact.jid;
    contact.name = createContact.name;
    contact.notify_name = createContact.notify_name;
    contact.short_name = createContact.short_name;
    contact.device_id = createContact.device_id;
    return await this.contactRepository.save(contact);
  }

  async paginate(
    options: IPaginationOptions,
    device_id: string,
  ): Promise<Pagination<Contact>> {
    const queryBuilder = this.contactRepository.createQueryBuilder('c');
    queryBuilder.andWhere('c.device_id = :id').setParameters({ id: device_id });
    queryBuilder.andWhere('c.jid like :name', {
      name: `%@s.whatsapp.net%`,
    });

    return paginate<Contact>(queryBuilder, options);
  }
  async paginateGroup(
    options: IPaginationOptions,
    device_id: string,
  ): Promise<Pagination<Contact>> {
    const queryBuilder = this.contactRepository.createQueryBuilder('c');
    queryBuilder.andWhere('c.device_id = :id').setParameters({ id: device_id });
    queryBuilder.andWhere('c.jid like :name', {
      name: `%@g.us%`,
    });

    return paginate<Contact>(queryBuilder, options);
  }
  async paginateBroadCast(
    options: IPaginationOptions,
    device_id: string,
  ): Promise<Pagination<Contact>> {
    const queryBuilder = this.contactRepository.createQueryBuilder('c');
    queryBuilder.andWhere('c.device_id = :id').setParameters({ id: device_id });
    queryBuilder.andWhere('c.jid like :name', {
      name: `%@broadcast%`,
    });

    return paginate<Contact>(queryBuilder, options);
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async findByJid(jid: string) {
    return await this.contactRepository.findOne({
      jid,
    });
  }
  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
