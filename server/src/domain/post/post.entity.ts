import { BaseTimeEntity } from '../base-time.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Review } from '../review.entity';
import { Image } from '../image.entity';
import { Likes } from '../likes.entity';
import { PostTag } from '../post-tag.entity';
import { Report } from '../report.entity';
import { PostToTag } from '../tag/post-to-tag.entity';

@Entity()
export class Post extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
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

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likesList: Likes[];

  // TODO postTag 삭제. postToTag로 대체할거
  @OneToMany(() => PostTag, (postTag) => postTag.post)
  postTags: PostTag[];

  @OneToMany(() => PostToTag, (postToTag) => postToTag.post)
  postToTags: PostToTag[];

  @OneToMany(() => Report, (report) => report.post)
  reports: Report[];

  @OneToMany(() => Review, (review) => review.post)
  reviews: Review[];
}
