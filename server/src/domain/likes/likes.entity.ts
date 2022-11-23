import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Likes {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Post, {
    onDelete: 'CASCADE',
  })
  post!: Post;
}
