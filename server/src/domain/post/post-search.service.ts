import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Post } from './post.entity';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { SEND_POST_CNT } from './post.controller';

@Injectable()
export class PostSearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async indexPost(post: Post, tags: any) {
    // 태그를 정렬해 넣는다.
    let tagValue = '';
    if (tags) {
      tags.sort();
      tagValue = tags.join(' ');
    }

    this.esService.index<PostSearchBody>({
      index: 'test', //TODO 이름 임시
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
        likeCount: post.likeCount,
      },
    });
  }

  async search(loadPostListRequestDto: LoadPostListRequestDto) {
    const { lastId, tags, reviewCount, likeCount, details } =
      loadPostListRequestDto;
    const searchFilter: any = {
      sort: [
        {
          id: {
            order: 'desc',
          },
        },
      ],
      size: SEND_POST_CNT + 1,
      index: 'test', // TODO 최신순 3개
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
    if (lastId !== -1) {
      searchFilter.from = lastId;
    }

    if (details && details.length > 0) {
      for (const detail of details) {
        searchFilter.body.query.bool.filter.bool.must.push({
          multi_match: {
            query: detail,
            fields: [
              'title',
              'content',
              'code',
              'language',
              'authorNickname',
              'tags',
            ],
          },
        });
      }
    }
    if (tags && tags.length > 0) {
      const q = tags.length == 1 ? tags : tags.join(' ');
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
    return body.hits.hits;
  }
}
