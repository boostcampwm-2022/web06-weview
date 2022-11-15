import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  private WANT_NEW_DATA = -1;
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async loadPostList(
    lastId: number,
    size: number,
    users?: string[],
    category?: Category,
    likesCnt?: number,
  ): Promise<Post[]> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    // 이름으로 필터링
    queryBuilder.innerJoin('user', 'user', 'post.userId = user.id'); // TODO 작성자 정보 select
    queryBuilder.andWhere('user.nickname in (:users)', {
      users: users,
    });

    // 좋아요 개수로 필터링
    if (likesCnt > 1) {
      // likesCnt 가 유효하다면
      const postIdsFilteringLikesCnt = await this.findPostIdsFilteringLikesCnt(
        likesCnt,
      );
      if (postIdsFilteringLikesCnt.length == 0) {
        return []; // 결과가 없음. 이후 로직 실행할 필요 x
      }
      queryBuilder.where('post.id in (:postIdsFilteringLikesCnt)', {
        postIdsFilteringLikesCnt: postIdsFilteringLikesCnt,
      });
    }

    // TODO 리뷰 개수로 필터링
    // TODO 태그를 보고 필터링

    if (lastId != this.WANT_NEW_DATA) {
      queryBuilder.andWhere('post.id < :lastId', { lastId: lastId });
    }

    // 카테고리 필터링 (인덱스)
    category = Category.QUESTION;
    queryBuilder.andWhere('post.category = :category', {
      category: category,
    });

    const result = await queryBuilder
      .take(size)
      .orderBy('post.id', 'DESC')
      .getMany();
    return result;
  }

  private async findPostIdsFilteringLikesCnt(likesCnt: number) {
    const postsFilteringLikesCnt = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('likes', 'likes', 'post.id = likes.postId')
      .select('post.id')
      .addSelect('COUNT(*) AS likesCnt')
      .groupBy('post.id')
      .having('likesCnt > :likesCnt', { likesCnt: likesCnt })
      .getRawMany();
    return postsFilteringLikesCnt.map((obj) => obj['post_id']);
  }
}
