import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity()
export class Report extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => User)
  user: User;
}
