import { Post } from '../post.entity';
import { Image } from '../../image.entity';

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
  authorId: number;
  tags: string[];
  reviews: number[];

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
    this.authorId = post.id;
    this.tags = []; // TODO
    this.reviews = []; // TODO
  }
}

export class EachImageResponseDto {
  url: string;
  name: string;

  constructor(image: Image) {
    this.url = image.url;
    this.name = image.url.split('/').slice(-1)[0].split('.').slice(0)[0];
  }
}
