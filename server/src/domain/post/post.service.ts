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
import { UserRepository } from '../user/user.repository';
import { UserNotSameException } from '../../exception/user-not-same.exception';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { PostSearchService } from './post-search.service';
import { SearchResponseDto } from './dto/controller-response.dto';
import { ImageRepository } from '../image/image.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postToTagRepository: PostToTagRepository,
    private readonly tagRepository: TagRepository,
    private readonly userRepository: UserRepository,
    private readonly postSearchService: PostSearchService,
    private readonly imageRepository: ImageRepository,
  ) {}

  async write(
    userId: number,
    { title, content, code, language, lineCount, images, tags },
  ) {
    tags.sort();

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
    let postEntity: Post = new Post();
    postEntity.title = title;
    postEntity.content = content;
    postEntity.code = code;
    postEntity.language = language;
    postEntity.lineCount = lineCount;
    postEntity.user = userEntity;
    postEntity.images = imageEntities;
    postEntity.postToTags = postToTagEntities;
    postEntity.tags = JSON.stringify(tags);
    postEntity.userNickname = userEntity.nickname;

    postEntity = await this.postRepository.save(postEntity);
    this.postSearchService.indexPost(postEntity, tags);

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

  async inquiryPost(postId: number) {
    const post = await this.postRepository.findById(postId);

    if (!post || post.isDeleted) {
      throw new PostNotFoundException();
    }
    return new LoadPostListResponseDto([post], true);
  }

  async loadPostList(
    loadPostListRequestDto: LoadPostListRequestDto,
  ): Promise<SearchResponseDto> {
    let isLast = true;
    const results = await this.postSearchService.search(loadPostListRequestDto);
    if (this.canGetNextPost(results.length)) {
      results.pop();
      isLast = false;
    }

    const authors = [];
    const images = [];

    for (const result of results) {
      authors.push(
        this.userRepository.findOneBy({
          id: result._source['authorId'],
        }),
      );
      images.push(
        this.imageRepository.findBy({
          postId: Number(result._source['id']),
        }),
      );
    }
    return new SearchResponseDto(
      results,
      await Promise.all(authors),
      await Promise.all(images),
      isLast,
    );
  }

  private canGetNextPost(resultCnt: number) {
    return resultCnt === SEND_POST_CNT + 1;
  }
}
