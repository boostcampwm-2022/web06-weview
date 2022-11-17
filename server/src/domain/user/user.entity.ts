import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';
import {Likes} from "../likes/likes.entity";
import {Report} from "../report/report.entity";
import {Review} from "../review/review.entity";

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
