import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContactsService } from 'src/contacts/contacts.service';
import { ConversationService } from 'src/conversation/conversation.service';
import { DeviceService } from 'src/device/device.service';
import { dtoSendmessageDto } from 'src/wa/dto/sendmessage.dto';
import { WaMdService } from './wa-md.service';
import { Response } from 'express';
import { dtoSendmediaDto, TypeEnum } from 'src/wa/dto/sendmedia.dto';
import { MessageType } from '@adiwajshing/baileys';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFilename';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Contact } from 'src/contacts/entities/contact.entity';

@Controller('wa-md')
@ApiTags('whatsapp-multidevice')
export class WaMdController {
  constructor(
    private readonly service: WaMdService,
    private readonly contactService: ContactsService,
    private readonly conversationService: ConversationService,
    private readonly contactServive: ContactsService,
    private readonly deviceService: DeviceService,
  ) {}

  @Post(':id/send-message')
  async sendMessage(
    @Param('id') id: string,
    @Body() message: dtoSendmessageDto,
    @Res() res: Response,
  ) {
    const noHp = message.to;
    const tujuan = message.to;
    if (message.type == 'group') {
    } else if (message.type == 'broadcast') {
    } else if (message.type == 'message') {
    } else {
      throw new HttpException('Invalid Message Type', HttpStatus.BAD_REQUEST);
    }

    const device = await this.deviceService.findOne(id);

    if (!device) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ status: 'error', message: 'device not found' });
      return;
    } else {
      await this.service.sendMessageQueue(
        id,
        message.to,
        message.message,
        message.type,
      );
      // res
      //   .status(HttpStatus.OK)
      //   .send({ status: 'sucess', message: { id: mess.key.id } });
      res
        .status(HttpStatus.OK)
        .send({ status: 'sucess', message: 'the message will be process' });
    }
  }

  @Post(':id/send-message-custom')
  async sendMessageCustom(
    @Param('id') id: string,
    @Body() message: dtoSendmessageDto,
    @Res() res: Response,
  ) {
    const noHp = message.to;
    const tujuan = message.to;
    if (message.type == 'group') {
    } else if (message.type == 'broadcast') {
    } else if (message.type == 'message') {
    } else {
      throw new HttpException('Invalid Message Type', HttpStatus.BAD_REQUEST);
    }

    const device = await this.deviceService.findOne(id);

    if (!device) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ status: 'error', message: 'device not found' });
      return;
    } else {
      await this.service.sendMessageCustomQueue(
        id,
        message.to,
        message.message,
        message.type,
      );

      res
        .status(HttpStatus.OK)
        .send({ status: 'sucess', message: 'the message will be process' });
    }
  }

  @Post(':id/send-media')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string' },
        caption: { type: 'string' },
        type: { enum: Object.keys(TypeEnum) },
        mesageType: { enum: Object.keys(MessageType) },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './medias',
        filename: editFileName,
      }),
    }),
  )
  async sendMedia(
    @Param('id') id: string,
    @Body() message: dtoSendmediaDto,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    const noHp = message.to;
    const tujuan = message.to;
    if (message.type == 'group') {
    } else if (message.type == 'broadcast') {
    } else if (message.type == 'message') {
      // const prefix = noHp.substring(0, 2);
      // if (prefix == '08') {
      //   noHp = '62' + noHp.substr(1);
      // }
      // tujuan = `${noHp}@s.whatsapp.net`;
    } else {
      throw new HttpException('Invalid Message Type', HttpStatus.BAD_REQUEST);
    }
    console.log(file);

    const device = await this.deviceService.findOne(id);

    message.to = tujuan;
    message.fileUrl = file.path;
    message.mimeType = file.mimetype;
    message.fileName = file.originalname;
    if (!device) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ status: 'error', message: 'device not found' });
      return;
    } else {
      const mess = await this.service.sendMediaQueue(id, message);
      res
        .status(HttpStatus.OK)
        .send({ status: 'sucess', message: { url: mess.mediaUrl } });
      // res
      //   .status(HttpStatus.OK)
      //   .send({ status: 'sucess', message: 'the message will be process' });
    }
  }
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @Get(':id/get-contact')
  async getContact(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Contact>> {
    const param = {
      page,
      limit,
      route: '/get-contact',
    };
    return this.contactService.paginate(param, id);
  }

  @Get(':id/get-group')
  async getGroup(@Param('id') id: string): Promise<any> {
    const param = {
      route: '/get-group',
    };
    return this.service.getGroup(id);
    // return this.conversationService.paginateGroup(param, id);
  }
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @Get(':id/get-broadcast')
  async getBroadcast(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Conversation>> {
    const param = {
      page,
      limit,
      route: '/get-broadcast',
    };
    return this.conversationService.paginateBroadcast(param, id);
  }
  @ApiQuery({ name: 'group-id' })
  @Get(':id/get-group-meta')
  async getGroupMeta(@Param('id') id: string, @Query('group-id') groupId) {
    const meta = this.service.getGroupMeta(id, groupId);
    return meta;
  }
}
