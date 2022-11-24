import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity()
export class Report extends BaseTimeEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @Column()
  reason: string;
}
