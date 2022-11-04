export class CreateConversationDto {
  device_id: string;
  jid: string;
  name: string;
  unread: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  last_message_time: string;
  is_muted: string;
  is_marked_spam: string;
  last_message_id: string;
  is_group: number;
  is_broadcast: number;
}
