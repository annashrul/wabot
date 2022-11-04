import { PartialType } from '@nestjs/swagger';
import { CreateCallbackDto } from './create-callback.dto';

export class UpdateCallbackDto extends PartialType(CreateCallbackDto) {}
