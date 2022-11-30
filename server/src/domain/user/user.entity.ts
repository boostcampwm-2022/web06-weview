import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email!: string;

  @Column({ length: 24 })
  nickname!: string;

  @Column({ length: 2000 })
  profileUrl!: string;
}
