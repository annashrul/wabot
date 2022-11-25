import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TypeEnum {
  MULTIDEVICE = 'multidevice',
  ONDEVICE = 'onedevice',
}
export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeEnum)
  @ApiProperty({ enum: TypeEnum })
  type: TypeEnum;
}
