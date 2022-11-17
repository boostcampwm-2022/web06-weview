import { BaseTimeEntity } from '../base-time.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PostToTag } from '../tag/post-to-tag.entity';
import { Likes } from '../likes/likes.entity';
import { Report } from '../report/report.entity';
import { Review } from '../review/review.entity';
import { Image } from '../image/image.entity';

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

  @OneToMany(() => Image, (image) => image.post, { cascade: true })
  images: Image[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likesList: Likes[];

  @OneToMany(() => PostToTag, (postToTag) => postToTag.post)
  postToTags: PostToTag[];

  @OneToMany(() => Report, (report) => report.post)
  reports: Report[];

  @OneToMany(() => Review, (review) => review.post)
  reviews: Review[];
}
