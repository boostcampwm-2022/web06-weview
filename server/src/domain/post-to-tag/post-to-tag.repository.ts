import { CustomRepository } from '../../typeorm/typeorm-ex.decorator';
import { PostToTag } from './post-to-tag.entity';
import { Repository } from 'typeorm';

@CustomRepository(PostToTag)
export class PostToTagRepository extends Repository<PostToTag> {
  async findByContainingTags(tags: string[]): Promise<any> {
    if (tags.length == 0) {
      return null; //해당 조건은 사용하지 않습니다
    }
    return this.createQueryBuilder('pt')
      .leftJoin('tag', 'tag', 'pt.tagId = tag.id')
      .select('postId')
      .where('tag.name in (:tags)', { tags: tags })
      .groupBy('postId')
      .having('COUNT(tag.id) >= :tagCnt', { tagCnt: tags.length })
      .getRawMany();
  }
}
