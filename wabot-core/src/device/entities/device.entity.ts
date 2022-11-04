import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import uniqid = require('uniqid');

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  created_at: Date;

  @Column()
  phone_number: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  jid: string;

  @Column()
  user_id: number;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  updateDates() {
    console.log(uniqid());
    this.id = uniqid();
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
