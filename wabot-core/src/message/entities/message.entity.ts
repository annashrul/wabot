import { Conversation } from 'src/conversation/entities/conversation.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  timestamp: string;

  @Column()
  message_id: string;

  @Column()
  remote_id: string;

  @Column()
  quoted_message_id: string;

  @Column()
  message: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;

  @Column()
  sender_id: string;

  @Column()
  from_me: number;

  @Column()
  status: number;

  @Column()
  user_id: string;

  @Column()
  type: string;

  @Column()
  thumbnail: string;

  @Column()
  url: string;

  @Column()
  ack: number;

  @Column()
  mime_type: string;

  @Column()
  device_id: string;

  @OneToOne(() => Conversation, (conversation) => conversation.message)
  @JoinColumn([{ name: 'remote_id', referencedColumnName: 'jid' }])
  conversation: Conversation;

  @BeforeInsert()
  updateDates() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
