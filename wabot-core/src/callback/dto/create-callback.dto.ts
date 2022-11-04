import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateCallbackDto {
  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  device_id: number;
}
