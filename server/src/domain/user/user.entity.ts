import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  profileUrl!: string;
}
