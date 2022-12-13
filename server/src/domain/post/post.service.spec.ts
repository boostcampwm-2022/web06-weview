import { Test, TestingModule } from '@nestjs/testing';
import { WriteDto } from '../post/dto/controller-request.dto';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { TagRepository } from '../tag/tag.repository';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { UserRepository } from '../user/user.repository';
import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { UserNotSameException } from '../../exception/user-not-same.exception';
import { Post } from './post.entity';
import { Tag } from '../tag/tag.entity';
import { PostToTag } from '../post-to-tag/post-to-tag.entity';
import { ImageRepository } from '../image/image.repository';
import { PostSearchService } from './post-search.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

describe('PostService', () => {
  let service: PostService;
  let postRepository: PostRepository;
  let postToTagRepository: PostToTagRepository;
  let tagRepository: TagRepository;
  let userRepository: UserRepository;
  let imageRepository: ImageRepository;
  let searchService: PostSearchService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        PostRepository,
        PostToTagRepository,
        UserRepository,
        TagRepository,
        ImageRepository,
        {
          provide: PostSearchService,
          useValue: {
            indexPost: () => jest.fn(),
            search: () =>
              jest.fn().mockResolvedValue({
                hits: {
                  hits: [
                    { _source: { id: 1 } },
                    { _source: { id: 2 } },
                    { _source: { id: 3 } },
                  ],
                },
              }),
          },
        },
        {
          provide: DataSource,
          useValue: {
            createEntityManager: () => jest.fn(),
          },
        },
        {
          provide: ElasticsearchService,
          useValue: {
            index: () => jest.fn(),
            search: () => jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: () => jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<PostRepository>(PostRepository);
    postToTagRepository = module.get<PostToTagRepository>(PostToTagRepository);
    tagRepository = module.get<TagRepository>(TagRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    imageRepository = module.get<ImageRepository>(ImageRepository);
    searchService = module.get<PostSearchService>(PostSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO PostService에서 글 작성시, 중복된 태그 입력하면 예외 처리하기
  describe('글 작성', () => {
    const writeDto: WriteDto = {
      title: '제목',
      content: '내용',
      code: 'console.log("test")',
      language: 'javascript',
      lineCount: 30,
      images: [
        'http://localhost:8080/test.png',
        'http://localhost:8080/abc.jpg',
      ],
      tags: ['알고리즘', '정렬'],
    };

    beforeEach(async () => {
      userRepository.findOneBy = jest.fn();
      postRepository.save = jest.fn();
      tagRepository.findOneBy = jest.fn();
      postToTagRepository.save = jest.fn();
    });

    it('글 작성 성공', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(() => new User());
      tagRepository.findOneBy = jest.fn(
        () => new Promise((resolve) => resolve(new Tag())),
      );
      const post = new Post();
      post.id = 1;
      postRepository.save = jest.fn().mockResolvedValue(post);
      await service.write(1, writeDto);

      expect(postRepository.save).toBeCalledTimes(1);
    });

    it('유저를 찾지 못해서 글 작성 실패', async () => {
      userRepository.findOneBy = jest.fn(() => null);

      try {
        await service.write(1, writeDto);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('글 삭제', () => {
    let user;
    let post;

    beforeEach(async () => {
      user = new User();
      post = new Post();

      postRepository.findOne = jest.fn();
      postRepository.deleteUsingPost = jest.fn();
    });

    it('(성공)', async () => {
      user.id = 1;
      user.isDeleted = false;
      post.user = user;
      post.isDeleted = false;

      postRepository.findOne = jest.fn(() => post);

      await service.delete(1, 1);
    });

    it('(실패) user.isDeleted가 true인 경우', async () => {
      try {
        user.id = 1;
        user.isDeleted = true;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('(실패) user가 undefined인 경우', async () => {
      try {
        user = undefined;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('(실패) user가 null인 경우', async () => {
      try {
        user = null;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('(실패) 권한이 존재하지 않는 경우', async () => {
      try {
        user.id = 1;
        user.isDeleted = false;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);

        const differentUserId = 2;
        await service.delete(differentUserId, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotSameException);
      }
    });

    it('(실패) post.isDeleted가 true인 경우', async () => {
      try {
        user.id = 1;
        user.isDeleted = false;

        post.user = user;
        post.isDeleted = true;
        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('(실패) post가 undefined인 경우', async () => {
      try {
        postRepository.findOne = jest.fn(() => undefined);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('(실패) post가 null인 경우', async () => {
      try {
        postRepository.findOne = jest.fn(() => null);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });
  });

  describe('게시물 한 건 조회', () => {
    let post;
    beforeEach(() => {
      post = new Post();
      post.id = 1;
      post.title = '제목';
      post.content = 'content';
      post.code = 'System.out.println("zz")';
      post.language = 'java';
      post.updatedAt = new Date();
      post.user = new User();
      post.lineCount = 1;
      const pt = new PostToTag();
      const tag = new Tag();
      tag.name = 'dd';
      pt.tag = tag;
      post.postToTags = [pt];
    });
    it('(성공) 게시물이 있는 경우', async () => {
      post.isDeleted = false;
      postRepository.findById = jest.fn(() => post);

      await service.inquiryPost(1);
    });

    it('(실패) 게시물이 없는 경우', async () => {
      try {
        postRepository.findById = jest.fn(() => null);

        await service.inquiryPost(1);

        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('(실패) 게시물이 삭제된 경우', async () => {
      try {
        post.isDeleted = true;
        postRepository.findById = jest.fn(() => post);

        await service.inquiryPost(1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });
  });
});
