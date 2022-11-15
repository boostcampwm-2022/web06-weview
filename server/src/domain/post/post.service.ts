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

  async loadPostList(lastId: number, size: number): Promise<Post[]> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .orderBy('id', 'DESC');
    if (lastId != this.WANT_NEW_DATA) {
      queryBuilder.where('post.id < :lastId', { lastId: lastId });
    }
    const result = await queryBuilder.take(size).getMany();
    return result;
  }

}
