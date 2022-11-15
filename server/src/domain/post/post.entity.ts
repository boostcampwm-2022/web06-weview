import { BaseTimeEntity } from '../base-time.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Image } from '../image/image.entity';
import { PostToTag } from '../tag/post-to-tag.entity';

@Entity()
export class Post extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ default: '리뷰요청' })
  category: string;

  @Column()
  content: string;

  @Column()
  title: string;

  @Column()
  code: string;

  @Column()
  language: string;

  @OneToMany(() => Image, (image) => image.post, { cascade: true })
  images: Image[];

  @OneToMany(() => PostToTag, (postToTag) => postToTag.post)
  postToTags: PostToTag[];
}
