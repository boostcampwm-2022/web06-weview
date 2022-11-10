import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Post } from '../post/post.entity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username!: string;

  @Column()
  profileUrl!: string;

  @Column()
  email!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
