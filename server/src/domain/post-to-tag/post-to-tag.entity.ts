import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class PostToTag extends BaseTimeEntity {
  @PrimaryColumn()
  postId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => Post, (post) => post.postToTags)
  post!: Post;

  @ManyToOne(() => Tag, (tag) => tag.postToTags, { cascade: ['insert'] })
  tag!: Tag;
}
