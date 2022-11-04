import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
