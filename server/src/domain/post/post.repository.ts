import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CustomRepository } from '../../typeorm/typeorm-ex.decorator';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {
  async findByIdUsingCondition(
    lastId: number,
    postIdsFiltered: number[],
    users: string[],
    category: string,
  ): Promise<Post[]> {
    const queryBuilder = this.createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.postToTags', 'postToTag')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.isDeleted = 0');

    if (postIdsFiltered) {
      queryBuilder.andWhere('post.id in (:postIdsFiltered)', {
        postIdsFiltered: postIdsFiltered,
      });
    }

    // 이름으로 필터링
    if (users.length !== 0) {
      queryBuilder.andWhere('user.nickname in (:users)', {
        users: users,
      });
    }

    // lastId로 필터링 (-1의미 : 가장 최신의 데이터들을 받겠다)
    if (lastId != -1) {
      queryBuilder.andWhere('post.id < :lastId', { lastId: lastId });
    }

    // 카테고리 필터링 (인덱스)
    queryBuilder.andWhere('post.category = :category', {
      category: category,
    });

    // 3: 서버에서 지정한 한번에 전해주는 Data의 크기
    return await queryBuilder
      .take(3 + 1)
      .orderBy('post.id', 'DESC')
      .getMany();
  }

  async findByIdLikesCntGreaterThan(likesCnt: number): Promise<any> {
    if (likesCnt === undefined || likesCnt <= 0) {
      return null; //해당 조건은 사용하지 않습니다
    }
    return this.createQueryBuilder('post')
      .innerJoin('likes', 'likes', 'post.id = likes.postId')
      .select('post.id', 'postId')
      .where('likes.isDeleted = false')
      .addSelect('COUNT(*) AS likesCnt')
      .groupBy('post.id')
      .having('likesCnt >= :likesCnt', { likesCnt: likesCnt })
      .getRawMany();
  }
}
