import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Post } from './post.entity';
import { Image } from '../image/image.entity';
import { PostToTag } from '../tag/post-to-tag.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  private WANT_NEW_DATA = -1;
  constructor(
      @InjectRepository(Post)
      private readonly postRepository: Repository<Post>,
      private readonly dataSource: DataSource) {}

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
        imageEntity.url = image;
        return imageEntity;
      });

      postEntity.images = imageEntities;
      await queryRunner.manager.save(postEntity);

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
