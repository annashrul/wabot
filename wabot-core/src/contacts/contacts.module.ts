import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [],
  providers: [ContactsService],
  exports: [TypeOrmModule, ContactsService],
})
export class ContactsModule {}
