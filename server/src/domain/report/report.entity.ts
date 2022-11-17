import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/post.entity';
import { BaseTimeEntity } from '../base-time.entity';
import { User } from '../user/user.entity';

@Entity()
export class Report extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @ManyToOne(() => Post, (post) => post.reports)
  post: Post;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
