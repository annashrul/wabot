import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CallbackService } from './callback.service';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { UpdateCallbackDto } from './dto/update-callback.dto';

@ApiTags('callback')
@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Post()
  async create(@Body() createCallbackDto: CreateCallbackDto) {
    return this.callbackService.create(createCallbackDto);
  }

  @Get()
  async findAll() {
    return this.callbackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.callbackService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCallbackDto: UpdateCallbackDto,
  ) {
    return this.callbackService.update(+id, updateCallbackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.callbackService.remove(+id);
  }
}
