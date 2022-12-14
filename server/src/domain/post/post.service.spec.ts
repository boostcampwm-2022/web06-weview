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
            delete: () => jest.fn(),
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

  // TODO PostService?????? ??? ?????????, ????????? ?????? ???????????? ?????? ????????????
  describe('??? ??????', () => {
    const writeDto: WriteDto = {
      title: '??????',
      content: '??????',
      code: 'console.log("test")',
      language: 'javascript',
      lineCount: 30,
      images: [
        'http://localhost:8080/test.png',
        'http://localhost:8080/abc.jpg',
      ],
      tags: ['????????????', '??????'],
    };

    beforeEach(async () => {
      userRepository.findOneBy = jest.fn();
      postRepository.save = jest.fn();
      tagRepository.findOneBy = jest.fn();
      postToTagRepository.save = jest.fn();
    });

    it('??? ?????? ??????', async () => {
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

    it('????????? ?????? ????????? ??? ?????? ??????', async () => {
      userRepository.findOneBy = jest.fn(() => null);

      try {
        await service.write(1, writeDto);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('??? ??????', () => {
    let user;
    let post;

    beforeEach(async () => {
      user = new User();
      post = new Post();

      postRepository.findOne = jest.fn();
      postRepository.deleteUsingPost = jest.fn();
    });

    it('(??????)', async () => {
      user.id = 1;
      user.isDeleted = false;
      post.user = user;
      post.isDeleted = false;

      postRepository.findOne = jest.fn(() => post);

      await service.delete(1, 1);
    });

    it('(??????) user.isDeleted??? true??? ??????', async () => {
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

    it('(??????) user??? undefined??? ??????', async () => {
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

    it('(??????) user??? null??? ??????', async () => {
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

    it('(??????) ????????? ???????????? ?????? ??????', async () => {
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

    it('(??????) post.isDeleted??? true??? ??????', async () => {
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

    it('(??????) post??? undefined??? ??????', async () => {
      try {
        postRepository.findOne = jest.fn(() => undefined);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('(??????) post??? null??? ??????', async () => {
      try {
        postRepository.findOne = jest.fn(() => null);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });
  });

  describe('????????? ??? ??? ??????', () => {
    let post;
    beforeEach(() => {
      post = new Post();
      post.id = 1;
      post.title = '??????';
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
    it('(??????) ???????????? ?????? ??????', async () => {
      post.isDeleted = false;
      postRepository.findById = jest.fn(() => post);

      await service.inquiryPost(1);
    });

    it('(??????) ???????????? ?????? ??????', async () => {
      try {
        postRepository.findById = jest.fn(() => null);

        await service.inquiryPost(1);

        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('(??????) ???????????? ????????? ??????', async () => {
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
