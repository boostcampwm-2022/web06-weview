import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostToTag } from './post-to-tag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PostToTag, (postToTag) => postToTag.tag)
  postToTags: PostToTag[];
}