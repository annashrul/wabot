import { HttpModule, Module } from '@nestjs/common';
import { DeviceModule } from 'src/device/device.module';
import { WaMdGateway } from './wa-md.gateway';
import { WaMdController } from './wa-md.controller';
import { WaMdService } from './wa-md.service';
import { BullModule } from '@nestjs/bull';
import { CallbackModule } from 'src/callback/callback.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { MessageModule } from 'src/message/message.module';
import { ConversationModule } from 'src/conversation/conversation.module';
import { WaMdProcessor } from './queue/wa-md.processor';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    DeviceModule,
    HttpModule,
    ConversationModule,
    MessageModule,
    ContactsModule,
    CallbackModule,
    BullModule.registerQueue({
      name: 'wa-md',
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    }),
  ],
  providers: [WaMdGateway, WaMdService, WaMdProcessor],
  controllers: [WaMdController],
  exports: [WaMdService],
})
export class WaMdModule {}
