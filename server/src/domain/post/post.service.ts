import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Image } from '../image/image.entity';
import { Tag } from '../tag/tag.entity';
import {
  EachPostResponseDto,
  LoadPostListResponseDto,
} from './dto/service-response.dto';
import { PostToTag } from '../post-to-tag/post-to-tag.entity';
import { PostRepository } from './post.repository';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { SEND_POST_CNT } from './post.controller';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { TagRepository } from '../tag/tag.repository';
import { UserNotFoundException } from 'src/exception/user-not-found.exception';
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
    { title, content, code, language, lineCount, images, tags },
  ) {
    const userEntity = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!userEntity) {
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
    postEntity.code = code;
    postEntity.language = language;
    postEntity.lineCount = lineCount;
    postEntity.user = userEntity;
    postEntity.images = imageEntities;
    postEntity.postToTags = postToTagEntities;
    await this.postRepository.save(postEntity);

    return postEntity.id;
  }

  private toPostToTagEntities(tags: string[]): Promise<PostToTag[]> {
    if (!tags) {
      return null;
    }

    const postToTagEntityPromises = tags.map((name) =>
      this.tagRepository.findOneBy({ name }).then((tagEntity) => {
        if (!tagEntity) {
          tagEntity = new Tag();
          tagEntity.name = name;
        }

        const postToTagEntity = new PostToTag();
        postToTagEntity.tag = tagEntity;
        return postToTagEntity;
      }),
    );

    return Promise.all(postToTagEntityPromises);
  }

  /**
   * 게시물을 조회한다
   */
  async loadPostList(
    loadPostListRequestDto: LoadPostListRequestDto,
  ): Promise<LoadPostListResponseDto> {
    const { lastId, tags, reviewCount, likeCount, details } =
      loadPostListRequestDto;
    let isLast = true;

    const postIdsFiltered = await this.filter(
      tags,
      reviewCount,
      likeCount,
      details,
    );
    const result = await this.postRepository.findByIdWithFilterResult(
      lastId,
      postIdsFiltered,
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

  private async filter(
    tags: string[],
    reviewCount: number,
    likeCount: number,
    details: string[],
  ) {
    const postsThatPassEachFilter = await Promise.all([
      this.postRepository.findByIdLikesCntGreaterThanOrEqual(likeCount),
      this.postToTagRepository.findByContainingTags(tags),
      this.postRepository.findByReviewCntGreaterThanOrEqual(reviewCount),
      this.filterUsingDetails(details),
    ]);
    return this.mergeFilterResult(postsThatPassEachFilter);
  }

  /**
   * 사용된 검색 조건이 한개도 없으면 -> null을 반환
   * 조건을 만족시키는 사용자가 한 명도 없으면 -> 비어있는 배열 []을 반환
   * 배열 안에 값이 있다면 -> 조건을 만족하는 사용자들의 id 리스트를 반환
   */
  public mergeFilterResult(postInfos: any[]) {
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

  async inqueryPost(postId: number) {
    const post = await this.postRepository.findById(postId);

    if (!post || post.isDeleted) {
      throw new PostNotFoundException();
    }
    return new EachPostResponseDto(post);

  private async filterUsingDetails(details: string[]) {
    if (!details || details.length < 1) {
      return null;
    }
    const postsFilteringEachDetail = await Promise.all(
      details.map((detail) => this.postRepository.filterUsingDetail(detail)),
    );

    const temp = [];
    for (const posts of postsFilteringEachDetail) {
      temp.push(posts.map((post) => post.postId));
    }
    return this.findIntersection(temp);
  }

  private findIntersection(bundles: any[][]) {
    const result = [];
    let smallestBundle = bundles[0];
    for (const post of bundles) {
      if (smallestBundle.length > post.length) {
        smallestBundle = post;
      }
    }

    for (const postId of smallestBundle) {
      let isIntersect = true;
      for (const bundle of bundles) {
        if (!bundle.includes(postId)) {
          isIntersect = false;
          break;
        }
      }
      if (isIntersect) {
        result.push({ postId: postId });
      }
    }
    return result;
  }
}
