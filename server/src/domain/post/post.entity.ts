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
import { Category } from './category';

@Entity()
export class Post extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: Category.QUESTION })
  category!: Category;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  code!: string;

  @Column()
  language!: string; // TODO enum 적용 고민하기

  @Column()
  lineCount: number;

  @OneToMany(() => Image, (image) => image.post, { cascade: ['insert'] })
  images: Image[];

  @OneToMany(() => PostToTag, (postToTag) => postToTag.post, {
    cascade: ['insert'],
  })
  postToTags: PostToTag[];
}
