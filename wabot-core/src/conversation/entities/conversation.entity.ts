import { Message } from 'src/message/entities/message.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import uniqid from 'uniqid';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  device_id: string;

  @Column()
  jid: string;

  @Column()
  name: string;

  @Column()
  unread: number;

  @Column()
  last_message_time: string;

  @Column()
  is_muted: string;
  @Column()
  last_message_id: string;

  @Column()
  is_marked_spam: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  user_id: string;

  @Column()
  is_group: number;

  @Column()
  is_broadcast: number;

  @Column()
  deleted_at: Date;

  @OneToOne(() => Message, (message) => message.conversation)
  @JoinColumn([{ name: 'last_message_id', referencedColumnName: 'message_id' }])
  message: Message;

  @BeforeInsert()
  updateDates() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
