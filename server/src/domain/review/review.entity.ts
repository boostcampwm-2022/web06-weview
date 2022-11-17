import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity()
export class Review extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @ManyToOne(() => Post, (post) => post.reviews)
  post: Post;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
