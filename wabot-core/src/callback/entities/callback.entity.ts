import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import uniqid = require('uniqid');

@Entity('callback')
export class Callback {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  url: string;

  @Column()
  device_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  updateDates() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
