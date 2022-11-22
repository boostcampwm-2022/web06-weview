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
  language!: string; //enum??

  @OneToMany(() => Image, (image) => image.post, { cascade: true })
  images: Image[];

  // TODO 구조 바꾼 뒤 삭제
  @OneToMany(() => PostToTag, (postToTag) => postToTag.post)
  postToTags: PostToTag[];

  // TODO 구조 바꾼 뒤 삭제
  // tag들의 이름을 저장하기 위해 사용하는 변수
  tagsNames: string[];
}
