import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/device/entities/device.entity';
import { Connection, Repository } from 'typeorm';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { UpdateCallbackDto } from './dto/update-callback.dto';
import { Callback } from './entities/callback.entity';

@Injectable()
export class CallbackService {
  constructor(
    private connection: Connection,
    @InjectRepository(Callback)
    private callbackRepository: Repository<Callback>,
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async create(createCallbackDto: CreateCallbackDto) {
    let callback = await this.callbackRepository.findOne({
      device_id: createCallbackDto.device_id,
    });

    if (callback == null) {
      callback = new Callback();
    }
    callback.device_id = createCallbackDto.device_id;
    callback.url = createCallbackDto.url;
    const device = await this.deviceRepository.findOne(callback.device_id);
    if (!device)
      throw new HttpException('Device not found', HttpStatus.BAD_REQUEST);
    return this.callbackRepository.save(callback);
  }

  async findAll() {
    return this.callbackRepository.find({ order: { created_at: 'DESC' } });
  }

  async findByDeviceId(device_id) {
    return this.callbackRepository.findOne({ device_id: device_id });
  }

  async findOne(id: number) {
    return this.callbackRepository.findOne(id);
  }

  async update(id: number, updateCallbackDto: UpdateCallbackDto) {
    const callback = await this.callbackRepository.findOne(id);
    if (!callback)
      throw new HttpException('Callback is not found', HttpStatus.BAD_REQUEST);
    else {
      callback.url = updateCallbackDto.url;
      return this.callbackRepository.save(callback);
    }
  }

  async remove(id: number) {
    await this.callbackRepository.delete(id);
  }
}
