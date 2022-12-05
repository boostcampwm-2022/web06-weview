import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PostRepository } from '../post/post.repository';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { Post } from '../post/post.entity';
import { LoadPostListResponseDto } from '../post/dto/service-response.dto';
import { PostToTag } from '../post-to-tag/post-to-tag.entity';
import { Tag } from '../tag/tag.entity';
import { UserNotFoundException } from '../../exception/user-not-found.exception';

describe('UserService', () => {
  let service: UserService;
  let userRepository;
  let postRepository;
  let post;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        PostRepository,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: () => jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    postRepository = module.get<PostRepository>(PostRepository);

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

  describe('특정 사용자의 게시물 조회', () => {
    it('4개를 반환하면 isLast는 false가 된다', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(new User());
      postRepository.findByUserId = jest
        .fn()
        .mockResolvedValue([post, post, post, post]);

      expect((await service.inqueryPosts(1, 1)).isLast).toBeFalsy();
    });

    it('4개보다 작은 값을 반환하면 isLast는 true가 된다', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(new User());
      postRepository.findByUserId = jest
        .fn()
        .mockResolvedValue([post, post, post]);
      expect((await service.inqueryPosts(1, 1)).isLast).toBeTruthy();
    });

    it('존재하지 않는 사용자가 입력되면 UserNotFound 예외를 반환한다', async () => {
      try {
        userRepository.findOneBy = jest.fn().mockResolvedValue(null);
        expect(await service.inqueryPosts(1, 1));
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });
  });
});
