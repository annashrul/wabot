import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    private connection: Connection,
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    const device = new Device();
    device.name = createDeviceDto.name;
    device.phone_number = createDeviceDto.phone;
    device.phone_number = createDeviceDto.phone;
    device.type = createDeviceDto.type;

    return this.deviceRepository.save(device);
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepository.find({ order: { created_at: 'DESC' } });
  }

  findOne(id: string): Promise<Device> {
    return this.deviceRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.deviceRepository.delete(id);
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceRepository.findOne(id);
    if (!device)
      throw new HttpException('Device is not found', HttpStatus.BAD_REQUEST);
    else {
      device.name = updateDeviceDto.name;
      device.phone_number = updateDeviceDto.phone;
      device.type = updateDeviceDto.type;

      return this.deviceRepository.save(device);
    }
  }
}
