import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

export const QUEUE_CYCLE = 15;
export const ROTATION_PER_MINUTE = 60 / QUEUE_CYCLE; // 15초마다 1번
export const ARRAY_SIZE = ROTATION_PER_MINUTE * 60 * 24; // 1분에 4번 * 60(분) * 24(시간)

export const RANKING_COUNT = 10;
export const TAG_NAME_INDEX = 0;
export const TAG_COUNT_INDEX = 1;

@Injectable()
export class RankingService {
  private readonly tagCountsCircularQueue: any[];
  private index: number;
  private ranking: any[];

  constructor() {
    this.tagCountsCircularQueue = new Array(ARRAY_SIZE);
    this.index = 0;
    this.ranking = [];
    // TODO DB를 연동해 초기데이터 넣어주기
  }

  getRanking() {
    return this.ranking;
  }

  async saveSearchedTags(tags: string[]) {
    const tagCounts = this.tagCountsCircularQueue[this.index];

    tags.map((tag) => {
      if (tagCounts[tag]) {
        tagCounts[tag] += 1;
      } else {
        tagCounts[tag] = 1;
      }
    });
  }

  @Interval(15000)
  updateRanking() {
    const tagCounts = this.countAllTags();
    const newRanking = this.getTopRankTagNames(tagCounts);
    this.ranking = this.addPrevInfo(newRanking);

    this.index = (this.index + 1) % this.tagCountsCircularQueue.length;
    this.tagCountsCircularQueue[this.index] = {};
  }

  /**
   * 가장 검색이 자주 된 최상위 10개 태그의 이름을 반환한다
   * 만약 데이터가 10개가 되지 않으면, 존재하는 만큼만 반환한다
   */
  private getTopRankTagNames(tagCounts) {
    const result = Object.keys(tagCounts).reduce((arr, tag) => {
      arr.push([tag, tagCounts[tag]]);
      return arr;
    }, []);

    result.sort((prev, next) => next[TAG_COUNT_INDEX] - prev[TAG_COUNT_INDEX]);

    return result
      .slice(0, Math.min(RANKING_COUNT, result.length))
      .map((each) => each[TAG_NAME_INDEX]);
  }

  /**
   * 시간 가중치를 적용한 태그 개수들을 반환한다
   */
  private countAllTags() {
    const totalTagCounts = {};
    this.tagCountsCircularQueue.forEach((tagCounts, idx) => {
      if (!tagCounts) {
        return;
      }

      const timeWaste = this.calcTimeWaste(idx);
      for (const tag in tagCounts) {
        if (totalTagCounts[tag]) {
          totalTagCounts[tag] += tagCounts[tag] * timeWaste;
          continue;
        }

        totalTagCounts[tag] = tagCounts[tag] * timeWaste;
      }
    });

    return totalTagCounts;
  }

  /**
   * 시간 가중치는 현재 큐의 인덱스와 배열의 크기에 따라 정해진다
   */
  private calcTimeWaste(idx: number): number {
    const offset = idx - this.index + ARRAY_SIZE - 1;
    const timeWaste = ((offset % ARRAY_SIZE) + 1) / ARRAY_SIZE;

    return timeWaste;
  }

  private addPrevInfo(newRanking: any[]) {
    const rankingInfo = newRanking.reduce((arr, tag) => {
      const prevIndex =
        this.ranking.findIndex((tagInfo) => tagInfo.name === tag) + 1;

      arr.push({ name: tag, prev: prevIndex });
      return arr;
    }, []);

    return rankingInfo;
  }
}
