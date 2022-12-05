import { DataSource, Repository } from 'typeorm';
import { Post } from './post.entity';
import { LATEST_DATA_CONDITION, SEND_POST_CNT } from './post.controller';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findByIdUsingCondition(
    lastId: number,
    postIdsFiltered: number[],
    users: string[],
    category: string,
  ): Promise<Post[]> {
    const queryBuilder = this.createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.postToTags', 'postToTag')
      .leftJoinAndSelect('postToTag.tag', 'tag')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.isDeleted = 0');

    if (postIdsFiltered) {
      if (!this.havePostSatisfiedFiltering(postIdsFiltered.length)) {
        return [];
      }
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

    if (!this.wantLatestPosts(lastId)) {
      queryBuilder.andWhere('post.id < :lastId', { lastId: lastId });
    }

    // 카테고리 필터링 (인덱스)
    if (category) {
      queryBuilder.andWhere('post.category = :category', {
        category: category,
      });
    }

    // 3: 서버에서 지정한 한번에 전해주는 Data의 크기
    return await queryBuilder
      .take(SEND_POST_CNT + 1)
      .orderBy('post.id', 'DESC')
      .getMany();
  }

  async findByIdLikesCntGreaterThanOrEqual(likesCnt: number): Promise<any> {
    if (likesCnt === undefined || likesCnt <= 0) {
      return null; //해당 조건은 사용하지 않습니다
    }
    return this.createQueryBuilder('post')
      .innerJoin('likes', 'likes', 'post.id = likes.postId')
      .select('post.id', 'postId')
      .addSelect('COUNT(*) AS likesCnt')
      .groupBy('post.id')
      .having('likesCnt >= :likesCnt', { likesCnt: likesCnt })
      .getRawMany();
  }

  async findByReviewCntGreaterThanOrEqual(reviewCnt: number) {
    if (reviewCnt === undefined || reviewCnt <= 0) {
      return null; //해당 조건은 사용하지 않습니다
    }
    return this.createQueryBuilder('post')
      .innerJoin('review', 'review', 'post.id = review.postId')
      .select('post.id', 'postId')
      .addSelect('COUNT(*) AS reviewCnt')
      .groupBy('post.id')
      .having('reviewCnt >= :reviewCnt', { reviewCnt: reviewCnt })
      .getRawMany();
  }

  private wantLatestPosts(lastId) {
    return lastId == LATEST_DATA_CONDITION;
  }

  private havePostSatisfiedFiltering(filteringCnt: number) {
    return filteringCnt !== 0;
  }

  findBySearchWord(detail: string): Promise<any[]> {
    if (detail === undefined || detail.length < 0) {
      return null; //해당 조건은 사용하지 않습니다
    }
    return this.createQueryBuilder('post')
      .select('post.id', 'postId')
      .where('post.title like :detail OR post.content like :detail', {
        detail: `%${detail}%`,
      })
      .getRawMany();
  }

  async deleteUsingPost(post: Post) {
    await this.createQueryBuilder()
      .update(Post)
      .set(post)
      .where('id=:id', { id: post.id })
      .execute();
  }

  findByUserId(lastId: number, userId: number) {
    return this.createQueryBuilder('post')
      .where('post.userId = :userId', { userId: userId })
      .take(SEND_POST_CNT + 1)
      .orderBy('post.id', 'DESC')
      .getMany();
  }
}
