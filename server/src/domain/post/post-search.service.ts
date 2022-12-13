import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Post } from './post.entity';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { SEND_POST_CNT } from './post.controller';
import { ConfigService } from '@nestjs/config';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { PostInputInvalidException } from '../../exception/post-input-invalid.exception';
import { SearchParamInvalidException } from '../../exception/search-param-invalid.exception';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { SearchResponseInvalidException } from '../../exception/search-response-invalid.exception';
import { TagInvalidException } from '../../exception/tag-invalid.exception';

const MAX_TAG_COUNT = 5; // TODO 상수 클래스 지정

const MIN_LIKES_FILTERING_COUNT = 0;
const MIN_REVIEW_FILTERING_COUNT = 0;
const MAX_LIKES_FILTERING_COUNT = 20;
const MAX_REVIEW_FILTERING_COUNT = 20;

const MAX_TAG_LENGTH = 30;

@Injectable()
export class PostSearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  indexPost(post: Post, tags: string[]) {
    if (!post) {
      throw new PostNotFoundException();
    }

    if (tags.length > MAX_TAG_COUNT) {
      throw new PostInputInvalidException('태그의 개수가 적절하지 않습니다');
    }
    tags.map((tag) => tag.trim()).forEach((tag) => this.validateTag(tag));

    let tagValue = '';
    if (tags) {
      tagValue = Array.from(new Set(tags)).join(' ');
    }

    this.esService.index<PostSearchBody>({
      index: this.configService.get<string>('ELASTICSEARCH_INDEX'),
      id: String(post.id),
      body: {
        id: post.id,
        title: post.title,
        content: post.content,
        code: post.code,
        language: post.language,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        authorId: post.user.id,
        authorNickname: post.user.nickname,
        tags: tagValue,
        lineCount: post.lineCount,
        reviewCount: post.reviewCount,
        likeCount: post.likeCount,
      },
    });
  }

  async search(loadPostListRequestDto: LoadPostListRequestDto) {
    const { lastId, tags, reviewCount, likeCount, details } =
      loadPostListRequestDto;
    this.validateParam(loadPostListRequestDto);

    const searchFilter: any = {
      sort: [
        {
          id: {
            order: 'DESC',
          },
        },
      ],
      size: SEND_POST_CNT + 1,
      index: this.configService.get<string>('ELASTICSEARCH_INDEX'),
      body: {
        query: {
          bool: {
            filter: {
              bool: {
                must: [],
              },
            },
          },
        },
      },
    };
    if (!(lastId === null || lastId === undefined || lastId === -1)) {
      searchFilter.search_after = [lastId];
    }

    if (details.length === 1) {
      searchFilter.body.query.bool.filter.bool.must.push({
        multi_match: {
          query: details[0],
          fields: ['title', 'content', 'code', 'language', 'authorNickname'],
        },
      });
    }

    if (tags && tags.length > 0) {
      const q =
        typeof tags === 'string'
          ? `${tags}`
          : tags.map((tag) => `${tag}`).join(' ');

      searchFilter.body.query.bool.filter.bool.must.push({
        match: {
          tags: {
            query: q,

            operator: 'AND',
          },
        },
      });
    }
    if (reviewCount && reviewCount >= 1) {
      searchFilter.body.query.bool.filter.bool.must.push({
        range: {
          reviewCount: {
            gte: reviewCount,
          },
        },
      });
    }
    if (likeCount && likeCount >= 1) {
      searchFilter.body.query.bool.filter.bool.must.push({
        range: {
          likeCount: {
            gte: likeCount,
          },
        },
      });
    }

    const body = await this.esService.search<PostSearchResult>(searchFilter);
    this.validateReturnValue(body.hits.hits);
    return body.hits.hits;
  }

  private validateReturnValue(hits: SearchHit<PostSearchResult>[]) {
    if (hits.length > SEND_POST_CNT + 1) {
      throw new SearchResponseInvalidException(
        '너무 많은 검색 결과가 반환되었습니다',
      );
    }
    const ids = hits.map((each) => each._source['id']);
    if (new Set(ids).size !== ids.length) {
      throw new SearchResponseInvalidException(
        '중복되는 결과가 반환되었습니다',
      );
    }
    let min = 21000000;
    for (const id of ids) {
      if (min < id) {
        throw new SearchResponseInvalidException(
          '결과가 내림차순 정렬되지 않았습니다',
        );
      }
      min = id;
    }
  }

  private validateParam(loadPostListRequestDto: LoadPostListRequestDto) {
    const { tags, reviewCount, likeCount, details } = loadPostListRequestDto;

    if (tags.length > MAX_TAG_COUNT) {
      throw new SearchParamInvalidException('태그의 개수가 적절하지 않습니다');
    }

    tags.forEach((tag) => this.validateTag(tag));
    if (
      reviewCount < MIN_REVIEW_FILTERING_COUNT ||
      MAX_REVIEW_FILTERING_COUNT < reviewCount
    ) {
      throw new SearchParamInvalidException(
        '선택한 리뷰 개수는 적절하지 않습니다',
      );
    }
    if (
      likeCount < MIN_LIKES_FILTERING_COUNT ||
      MAX_LIKES_FILTERING_COUNT < likeCount
    ) {
      throw new SearchParamInvalidException(
        '선택한 리뷰 개수는 적절하지 않습니다',
      );
    }
    if (details.length > 1) {
      throw new SearchParamInvalidException(
        '검색어의 개수가 적절하지 않습니다',
      );
    }
  }

  private validateTag(tag: string) {
    if (tag.includes(' ')) {
      throw new TagInvalidException('태그 이름은 공백이 올 수 없습니다');
    }

    if (tag.length === 0) {
      throw new TagInvalidException('태그는 공백이 올 수 없습니다');
    }
    if (tag.length > MAX_TAG_LENGTH) {
      throw new TagInvalidException('태그의 길이가 너무 깁니다');
    }
  }
}
