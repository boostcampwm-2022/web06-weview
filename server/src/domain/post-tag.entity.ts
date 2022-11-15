import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from './base-time.entity';
import { Post } from './post/post.entity';
import { Tag } from './tag.entity';

@Entity()
export class PostTag extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.postTags)
  post: Post;

  @ManyToOne(() => Tag, (tag) => tag.postTags)
  tag: Tag;
}
