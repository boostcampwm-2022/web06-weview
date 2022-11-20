import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Post } from './post.entity';
import { Image } from '../image/image.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import { PostToTag } from '../post-to-tag/post-to-tag.entity';
import { PostRepository } from './post.repository';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { SEND_POST_CNT } from './post.controller';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { TagRepository } from '../tag/tag.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly postRepository: PostRepository,
    private readonly postToTagRepository: PostToTagRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async write(
    userId: number,
    { title, content, category, code, language, images, tags },
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const postEntity = queryRunner.manager.create(Post);
      postEntity.title = title;
      postEntity.content = content;
      postEntity.category = category;
      postEntity.code = code;
      postEntity.language = language;

      const userEntity = await queryRunner.manager.findOneBy(User, {
        id: userId,
      });
      postEntity.user = userEntity;

      const imageEntities = images.map((image) => {
        const imageEntity = queryRunner.manager.create(Image);
        imageEntity.src = image;
        return imageEntity;
      });

      postEntity.images = imageEntities;
      await queryRunner.manager.save(postEntity);

      if (tags) {
        await Promise.all(
          tags.map(async (tag) => {
            let tagEntity = await queryRunner.manager.findOneBy(Tag, {
              name: tag,
            });

            if (tagEntity === null) {
              tagEntity = queryRunner.manager.create(Tag);
              tagEntity.name = tag;
              tagEntity = await queryRunner.manager.save(tagEntity);
            }

            const postToTagEntity = queryRunner.manager.create(PostToTag);
            postToTagEntity.post = postEntity;
            postToTagEntity.tag = tagEntity;
            return queryRunner.manager.save(postToTagEntity);
          }),
        );
      }

      await queryRunner.commitTransaction();
      return postEntity.id;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error('글 작성에 실패했습니다.');
    } finally {
      await queryRunner.release();
    }
  }

  async loadPostList(
    loadPostListRequestDto: LoadPostListRequestDto,
  ): Promise<LoadPostListResponseDto> {
    const { lastId, tags, authors, category, writtenAnswer, likesCnt } =
      loadPostListRequestDto;
    let isLast = true;
    const postInfosAfterFiltering = await Promise.all([
      this.postRepository.findByIdLikesCntGreaterThan(likesCnt),
      this.postToTagRepository.findByContainingTags(tags),
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
    await this.addTagNamesEachPost(result);
    return new LoadPostListResponseDto(result, isLast);
  }

  private async addTagNamesEachPost(result: Post[]) {
    for (const each of result) {
      const temp = [];
      for (const tag of each.postToTags) {
        temp.push(this.tagRepository.findById(tag.tagId));
      }
      const tags = await Promise.all(temp);
      each.tagsNames = tags.map((obj) => obj.name);
    }
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
}
