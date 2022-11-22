import { PostToTag } from './post-to-tag.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostToTagRepository extends Repository<PostToTag> {
  constructor(private dataSource: DataSource) {
    super(PostToTag, dataSource.createEntityManager());
  }

  async findByContainingTags(tags: string[]): Promise<any> {
    if (tags === undefined || tags.length == 0) {
      return null; //해당 조건은 사용하지 않습니다
    }
    console.log('here~~~~');
    return this.createQueryBuilder('pt')
      .leftJoin('tag', 'tag', 'pt.tagId = tag.id')
      .select('postId')
      .where('tag.name in (:tags)', { tags: tags })
      .groupBy('postId')
      .having('COUNT(tag.id) >= :tagCnt', { tagCnt: tags.length })
      .getRawMany();
  }
}
