import { DataSource, LessThan, MoreThan, Repository } from 'typeorm';
import { Post } from './post.entity';
import { LATEST_DATA_CONDITION, SEND_POST_CNT } from './post.controller';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findByIdWithFilterResult(
    lastId: number,
    postIdsFiltered: number[],
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

    if (!this.wantLatestPosts(lastId)) {
      queryBuilder.andWhere('post.id < :lastId', { lastId: lastId });
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

  async deleteUsingPost(post: Post) {
    await this.createQueryBuilder()
      .update(Post)
      .set(post)
      .where('id=:id', { id: post.id })
      .execute();
  }

  findByUserId(lastId: number, userId: number) {
    return this.find({
      relations: ['user', 'images', 'postToTags', 'postToTags.tag'],
      where: {
        id: lastId === -1 ? MoreThan(lastId) : LessThan(lastId),
        isDeleted: false,
        user: {
          id: userId,
        },
      },
      take: SEND_POST_CNT + 1,
      order: {
        id: 'DESC',
      },
    });
  }

  async filterUsingDetail(detail: string) {
    const queryBuilder = this.createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'u')
      .select('p.id', 'postId')
      .where(
        'u.nickname=:nickname OR p.title like :detail OR p.content like :detail',
        { nickname: detail, detail: `%${detail}%` },
      );
    return queryBuilder.getRawMany();
  }

  async findById(postId: number) {
    return this.createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.postToTags', 'postToTag')
      .leftJoinAndSelect('postToTag.tag', 'tag')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.id = :postId', { postId: postId })
      .getOne();
  }

  increaseLikeCount(post: Post) {
    this.createQueryBuilder()
      .update(Post)
      .set({ likecount: () => 'likeCount + 1' })
      .where('id=:id', { id: post.id })
      .execute();
  }

  decreaseLikeCount(post: Post) {
    if (post.likecount <= 0) {
      return;
    }
    this.createQueryBuilder()
      .update(Post)
      .set({ likecount: () => 'likeCount - 1' })
      .where('id=:id', { id: post.id })
      .execute();
  }

  increaseReviewCount(post: Post) {
    this.createQueryBuilder()
      .update(Post)
      .set({ reviewcount: () => 'reviewCount + 1' })
      .where('id=:id', { id: post.id })
      .execute();
  }
}
