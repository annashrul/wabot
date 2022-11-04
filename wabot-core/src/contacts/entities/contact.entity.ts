import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  device_id: string;

  @Column()
  name: string;

  @Column()
  notify_name: string;

  @Column()
  jid: string;

  @Column()
  short_name: string;

  @Column()
  profile_url: string;

  @Column()
  updated_at: Date;

  @Column()
  created_at: Date;

  @BeforeInsert()
  updateDates() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
