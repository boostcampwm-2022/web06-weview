import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';

@Entity()
export class SearchHistory extends BaseTimeEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userId: number;

  @Column()
  tags: string[];

  @Column()
  reviewCount: number;

  @Column()
  likeCount: number;

  @Column()
  details: string[];

  constructor(
    userId: number,
    tags: string[],
    reviewCount: number,
    likeCount: number,
    details: string[],
  ) {
    super();
    this.userId = userId;
    this.tags = tags;
    this.reviewCount = reviewCount;
    this.likeCount = likeCount;
    this.details = details;
  }
}
