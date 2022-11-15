import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from './base-time.entity';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';

@Entity()
export class Likes extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likesList)
  user: User;

  @ManyToOne(() => Post, (post) => post.likesList)
  post: Post;
}
