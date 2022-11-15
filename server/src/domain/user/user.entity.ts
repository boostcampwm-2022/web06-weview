import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';
import { Likes } from '../likes.entity';
import { Report } from '../report.entity';
import { Review } from '../review.entity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname!: string;

  @Column()
  profileUrl!: string;

  @Column()
  email!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likesList: Likes[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
