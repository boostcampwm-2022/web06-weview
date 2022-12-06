import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity()
@Unique(['user', 'post'])
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Post, {
    onDelete: 'CASCADE',
  })
  post!: Post;

  constructor(user: User, post: Post) {
    this.user = user;
    this.post = post;
  }
}
