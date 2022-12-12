import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { AuthorDto, EachImageResponseDto } from './service-response.dto';
import { Image } from '../../image/image.entity';
import { User } from '../../user/user.entity';

export class SearchResponseDto {
  posts: EachSearchResponseDto[];
  lastId: number;
  isLast: boolean;

  constructor(
    posts: SearchHit<PostSearchResult>[],
    authors: User[],
    imagesList: Image[][],
    isLast: boolean,
  ) {
    this.posts = [];
    for (let i = 0; i < posts.length; i++) {
      this.posts.push(
        new EachSearchResponseDto(posts[i], authors[i], imagesList[i]),
      );
    }

    this.lastId = posts.length == 0 ? -1 : Number(posts.slice(-1)[0]._id);
    this.isLast = isLast;
  }
}

export class EachSearchResponseDto {
  id: number;
  title: string;
  content: string;
  code: string;
  language: string;
  images: EachImageResponseDto[];
  updatedAt: Date;
  author: AuthorDto;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
  likesCount: number;
  lineCount: number;

  constructor(post: any, author, images) {
    this.id = Number(post._id);
    this.title = post._source.title;
    this.content = post._source.content;
    this.code = post._source.code;
    this.language = post._source.language;
    this.updatedAt = post._source.updatedat;
    this.tags = JSON.parse(post._source.tags);
    this.isLiked = false;
    this.isBookmarked = false;
    this.likesCount = post._source.likecount;
    this.lineCount = post._source.linecount;
    this.author = new AuthorDto(author);
    this.images = images.map((image) => new EachImageResponseDto(image));
  }
}
