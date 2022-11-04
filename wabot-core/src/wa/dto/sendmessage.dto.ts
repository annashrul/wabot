import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsString,
} from 'class-validator';

export enum TypeEnum {
  GROUP = 'group',
  BROADCAST = 'broadcast',
  MESSAGE = 'message',
}
export class dtoSendmessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  to: string;

  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @IsEnum(TypeEnum)
  @ApiProperty({ enum: TypeEnum })
  type: string;
}
