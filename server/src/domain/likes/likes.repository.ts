import { DataSource, Repository } from 'typeorm';
import { Likes } from './likes.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesRepository extends Repository<Likes> {
  constructor(private dataSource: DataSource) {
    super(Likes, dataSource.createEntityManager());
  }
}
