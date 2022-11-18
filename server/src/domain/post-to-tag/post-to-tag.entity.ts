import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
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
  @JoinColumn({ name: 'postId' })
  post!: Post;

  @ManyToOne(() => Tag, (tag) => tag.postToTags)
  @JoinColumn({ name: 'tagId' })
  tag!: Tag;
}
