import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Image } from '../image/image.entity';
import { Tag } from '../tag/tag.entity';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import { PostToTag } from '../post-to-tag/post-to-tag.entity';
import { PostRepository } from './post.repository';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { SEND_POST_CNT } from './post.controller';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { TagRepository } from '../tag/tag.repository';
import { UserNotFoundException } from 'src/exception/user-not-found.exception';
import { PostNotWrittenException } from 'src/exception/post-not-written.exception';
import { UserRepository } from '../user/user.repository';
import { UserNotSameException } from '../../exception/user-not-same.exception';
import { PostNotFoundException } from '../../exception/post-not-found.exception';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postToTagRepository: PostToTagRepository,
    private readonly tagRepository: TagRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async write(
    userId: number,
    { title, content, category, code, language, lineCount, images, tags },
  ) {
    try {
      const userEntity = await this.userRepository.findOneBy({
        id: userId,
      });

      if (userEntity === null) {
        throw new UserNotFoundException();
      }

      const imageEntities = images.map((src) => {
        const imageEntity = new Image();
        imageEntity.src = src;
        return imageEntity;
      });

      const postToTagEntities = await this.toPostToTagEntities(tags);
      const postEntity = new Post();
      postEntity.title = title;
      postEntity.content = content;
      postEntity.category = category;
      postEntity.code = code;
      postEntity.language = language;
      postEntity.user = userEntity;
      postEntity.lineCount = lineCount;
      postEntity.images = imageEntities;
      postEntity.postToTags = postToTagEntities;
      await this.postRepository.save(postEntity);

      return postEntity.id;
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw err;
      }

      throw new PostNotWrittenException();
    }
  }

  private toPostToTagEntities(tags: string[]): Promise<PostToTag[]> {
    if (!tags) {
      return undefined;
    }

    const postToTagEntities = Promise.all(
      tags.map(async (name) => {
        let tagEntity = await this.tagRepository.findOneBy({ name });
        if (!tagEntity) {
          tagEntity = new Tag();
          tagEntity.name = name;
        }

        const postToTagEntity = new PostToTag();
        postToTagEntity.tag = tagEntity;
        return postToTagEntity;
      }),
    );

    return postToTagEntities;
  }

  async loadPostList(
    loadPostListRequestDto: LoadPostListRequestDto,
  ): Promise<LoadPostListResponseDto> {
    const { lastId, tags, authors, category, reviews, likesCnt, detail } =
      loadPostListRequestDto; // TODO reviews (개수) 로 필터링하기
    let isLast = true;
    const postInfosAfterFiltering = await Promise.all([
      this.postRepository.findByIdLikesCntGreaterThanOrEqual(likesCnt),
      this.postToTagRepository.findByContainingTags(tags),
      this.postRepository.findBySearchWord(detail),
      this.postRepository.findByReviewCntGreaterThanOrEqual(reviews),
    ]);

    const postIdsFiltered = this.returnPostIdByAllConditionPass(
      postInfosAfterFiltering,
    );

    const result = await this.postRepository.findByIdUsingCondition(
      lastId,
      postIdsFiltered,
      authors,
      category,
    );
    if (this.canGetNextPost(result.length)) {
      result.pop();
      isLast = false;
    }
    return new LoadPostListResponseDto(result, isLast);
  }

  private canGetNextPost(resultCnt: number) {
    return resultCnt === SEND_POST_CNT + 1;
  }

  /**
   * 사용된 검색 조건이 한개도 없으면 -> null을 반환
   * 조건을 만족시키는 사용자가 한 명도 없으면 -> 비어있는 배열 []을 반환
   * 배열 안에 값이 있다면 -> 조건을 만족하는 사용자들의 id 리스트를 반환
   */
  public returnPostIdByAllConditionPass(postInfos: any[]) {
    let result;
    for (const postInfo of postInfos) {
      if (postInfo === null) {
        continue;
      }
      if (result === undefined) {
        result = postInfo.map((obj) => obj.postId);
      } else {
        result = postInfo
          .map((obj) => obj.postId)
          .filter((each) => result.includes(each));
      }
    }
    if (!result) {
      return null;
    }
    return result;
  }

  async delete(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['user'],
    });
    if (!post || post.isDeleted) {
      throw new PostNotFoundException();
    }
    if (!post.user || post.user.isDeleted) {
      throw new UserNotFoundException();
    }
    if (post.user.id !== userId) {
      throw new UserNotSameException();
    }
    post.isDeleted = true;
    await this.postRepository.deleteUsingPost(post);
  }
}
