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
import { PostToTag } from '../post-to-tag/post-to-tag.entity';

@Entity()
export class Post extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ length: 180 })
  title!: string;

  @Column({ length: 900 })
  content!: string;

  @Column({ length: 6000 })
  code!: string;

  @Column({ length: 20 })
  language!: string; // TODO enum 적용 고민하기

  @Column()
  lineCount: number;

  @OneToMany(() => Image, (image) => image.post, { cascade: ['insert'] })
  images: Image[];

  @OneToMany(() => PostToTag, (postToTag) => postToTag.post, {
    cascade: ['insert'],
  })
  postToTags: PostToTag[];

  @Column({ default: 0 })
  likecount: number;

  @Column({ default: 0 })
  reviewcount: number;

  @Column({ length: 255, default: '[]' })
  tags: string;

  @Column({ length: 24, default: '' })
  userNickname: string;

  @Column()
  userId!: number;
}
