import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostTag } from './post-tag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @OneToMany(() => PostTag, (postTag) => postTag.tag)
  postTags: PostTag[];
}
