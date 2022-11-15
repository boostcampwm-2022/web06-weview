import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Image extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.images)
  post: Post;

  @Column()
  url: string;
}
