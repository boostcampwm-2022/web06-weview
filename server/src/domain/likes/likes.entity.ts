import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Likes {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.likesList)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Post, (post) => post.likesList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post!: Post;
}
