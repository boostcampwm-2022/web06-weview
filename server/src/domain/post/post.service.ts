import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import { PostTag } from '../post-tag.entity';

@Injectable()
export class PostService {
  private WANT_NEW_DATA = -1;
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostTag)
    private readonly postTagRepository: Repository<PostTag>,
  ) {}

  // TODO 코드 분리하기
  async loadPostList(
    size: number,
    lastId: number,
    tags: string[],
    users: string[],
    category: Category,
    likesCnt: number,
  ): Promise<LoadPostListResponseDto> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .innerJoin('user', 'user', 'post.userId = user.id')
      .where('post.isDeleted = 0');

    // 이름으로 필터링
    if (users.length !== 0) {
      queryBuilder.andWhere('user.nickname in (:users)', {
        users: users,
      });
    }

    // 좋아요 개수로 필터링
    if (likesCnt !== undefined && likesCnt >= 1) {
      const postIdsFilteringLikesCnt = await this.findPostIdsFilteringLikesCnt(
        likesCnt,
      );
      if (postIdsFilteringLikesCnt.length == 0) {
        return new LoadPostListResponseDto([], true); // 결과가 없음. 이후 로직 실행할 필요 x
      }
      queryBuilder.andWhere('post.id in (:postIdsFilteringLikesCnt)', {
        postIdsFilteringLikesCnt: postIdsFilteringLikesCnt,
      });
    }

    // TODO 리뷰 개수로 필터링

    // 태그를 보고 필터링
    if (tags.length !== 0) {
      const postIdsFilteringTags = await this.findPostIdsFilteringTags(tags);
      if (postIdsFilteringTags.length == 0) {
        return new LoadPostListResponseDto([], true); // 결과가 없음. 이후 로직 실행할 필요 x
      }
      queryBuilder.andWhere('post.id in (:postIdsFilteringTags)', {
        postIdsFilteringTags: postIdsFilteringTags,
      });
    }

    // lastId로 필터링
    if (lastId != this.WANT_NEW_DATA) {
      queryBuilder.andWhere('post.id < :lastId', { lastId: lastId });
    }

    // 카테고리 필터링 (인덱스)
    category = Category.QUESTION; //example
    queryBuilder.andWhere('post.category = :category', {
      category: category,
    });

    const result = await queryBuilder
      .take(size)
      .orderBy('post.id', 'DESC')
      .getMany();
    return new LoadPostListResponseDto(result, size != result.length);
  }

  private async findPostIdsFilteringLikesCnt(likesCnt: number) {
    const postsFilteringLikesCnt = await this.postRepository
      .createQueryBuilder('post')
      .innerJoin('likes', 'likes', 'post.id = likes.postId')
      .where('likes.isDeleted = false')
      .andWhere('post.isDeleted= false')
      .select('post.id')
      .addSelect('COUNT(*) AS likesCnt')
      .groupBy('post.id')
      .having('likesCnt > :likesCnt', { likesCnt: likesCnt })
      .getRawMany();
    return postsFilteringLikesCnt.map((obj) => obj['post_id']);
  }

  private async findPostIdsFilteringTags(tags: string[]) {
    const postsFilteringTags = await this.postTagRepository
      .createQueryBuilder('pt')
      .select('postId')
      .leftJoin('tag', 'tag', 'pt.tagId = tag.id')
      .where('tag.name in (:tags)', { tags: tags })
      .groupBy('postId')
      .having('COUNT(tag.id) >= :tagCnt', { tagCnt: tags.length })
      .getRawMany();
    return postsFilteringTags.map((obj) => obj['postId']);
  }
}
