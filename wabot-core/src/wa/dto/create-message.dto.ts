export class CreateMessageDto {
  message_id: string;
  remote_id: string;
  quoted_message_id: string;
  jid: string;
  timestamp: string;
  message: string;
  from_me: number;
  status: number;
  mime_type: string;
  url: string;
  type: string;
  ack: string;
  device_id: string;
}
