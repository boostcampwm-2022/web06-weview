import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { AuthorDto, EachImageResponseDto } from './service-response.dto';
import { Image } from '../../image/image.entity';
import { User } from '../../user/user.entity';
import { SEND_POST_CNT } from '../post.controller';

const SORT_BY_ID = 0;

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

    this.lastId = posts.length == 0 ? -1 : this.getLastId(posts);
    this.isLast = isLast;
  }

  private getLastId(posts: SearchHit<PostSearchResult>[]) {
    return posts[SEND_POST_CNT - 1].sort[SORT_BY_ID];
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
    let tags;
    try {
      tags = JSON.parse(post._source.tags);
    } catch (e) {
      if (post._source.tags.length > 0) {
        tags = [post._source.tags];
      } else {
        tags = [];
      }
    }
    this.id = post._source.id;
    this.title = post._source.title;
    this.content = post._source.content;
    this.code = post._source.code;
    this.language = post._source.language;
    this.updatedAt = post._source.updatedat;
    this.tags = tags;
    this.isLiked = false;
    this.isBookmarked = false;
    this.likesCount = post._source.likecount;
    this.lineCount = post._source.linecount;
    this.author = new AuthorDto(author);
    this.images = images.map((image) => new EachImageResponseDto(image));
  }
}
