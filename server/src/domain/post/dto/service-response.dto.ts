import { Post } from '../post.entity';
import { Image } from '../../image/image.entity';
import { User } from '../../user/user.entity';

export class LoadPostListResponseDto {
  posts: EachPostResponseDto[];
  lastId: number;
  isLast: boolean;

  constructor(posts: Post[], isLast: boolean) {
    this.posts = posts.map((post) => new EachPostResponseDto(post));
    this.lastId = posts.length == 0 ? -1 : posts.slice(-1)[0].id;
    this.isLast = isLast;
  }
}

export class EachPostResponseDto {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  images: EachImageResponseDto[];
  updatedAt: Date;
  author: AuthorDto;
  tags: string[];
  reviews: number[];
  isLiked: boolean;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.code = post.code;
    this.language = post.language;
    if (post.images === undefined) {
      post.images = [];
    }
    this.images = post.images.map((image) => new EachImageResponseDto(image));
    this.updatedAt = post.updatedAt;
    this.author = new AuthorDto(post.user);
    this.tags = post.tagsNames;
    this.reviews = []; // TODO api에서 삭제될 예정
    this.isLiked = true; // TODO
  }
}

export class EachImageResponseDto {
  src: string;
  name: string;

  constructor(image: Image) {
    this.src = image.src;
    this.name = image.src.split('/').slice(-1)[0].split('.').slice(0)[0];
  }
}

export class AuthorDto {
  id: number;
  nickname: string;
  profileUrl: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.profileUrl = user.profileUrl;
    this.email = user.email;
  }
}
