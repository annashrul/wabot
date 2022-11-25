import { HttpModule, Module } from '@nestjs/common';
import { DeviceModule } from 'src/device/device.module';
import { WaController } from './wa.controller';
import { WaService } from './wa.service';
import { WaGateway } from './wa.gateway';
import { ConversationModule } from 'src/conversation/conversation.module';
import { MessageModule } from 'src/message/message.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { CallbackModule } from 'src/callback/callback.module';
import { BullModule } from '@nestjs/bull';
import { WaProcessor } from './queue/wa.processor';
import { WaMdService } from 'src/wa-md/wa-md.service';
import { WaMdModule } from 'src/wa-md/wa-md.module';

@Module({
  imports: [
    DeviceModule,
    HttpModule,
    ConversationModule,
    MessageModule,
    ContactsModule,
    CallbackModule,
    WaMdModule,
    BullModule.registerQueue({
      name: 'wa',
    }),
  ],
  controllers: [WaController],
  providers: [WaService, WaGateway, WaProcessor],
})
export class WaModule {}
