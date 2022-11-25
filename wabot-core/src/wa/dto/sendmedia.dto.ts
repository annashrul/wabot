import { MessageType } from '@adiwajshing/baileys';
import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TypeEnum {
  GROUP = 'group',
  BROADCAST = 'broadcast',
  MESSAGE = 'message',
}

export class dtoSendmediaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  to: string;

  @IsNotEmpty()
  @ApiProperty()
  caption: string;

  fileUrl: string;
  mimeType: string;
  fileName: string;

  @IsNotEmpty()
  @IsEnum(TypeEnum)
  @ApiProperty({ enum: TypeEnum })
  type: string;

  @IsNotEmpty()
  @IsEnum(MessageType)
  @ApiProperty({ enum: MessageType })
  mesageType: MessageType;
}
