import { Module } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CallbackController } from './callback.controller';
import { Callback } from './entities/callback.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [TypeOrmModule.forFeature([Callback]), DeviceModule],
  controllers: [CallbackController],
  providers: [CallbackService],
  exports: [TypeOrmModule, CallbackService],
})
export class CallbackModule {}
