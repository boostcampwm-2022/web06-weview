import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

export const MINUTES_PER_HOUR = 60;
export const QUEUE_CYCLE_EXPRESSED_SECOND = 15;
export const RANKING_COUNT = 10;
export const TAG_NAME_INDEX = 0;
export const TAG_COUNT_INDEX = 1;

@Injectable()
export class RankingService {
  private readonly tagsCountsCircularQueue: any[];
  private tagCountBuffer;
  private ranking: any[];

  constructor() {
    this.tagsCountsCircularQueue = new Array(
      (MINUTES_PER_HOUR / QUEUE_CYCLE_EXPRESSED_SECOND) * MINUTES_PER_HOUR * 24,
    );
    this.tagCountBuffer = {};
    this.ranking = [];
    // TODO DB를 연동해 초기데이터 넣어주기
  }

  getRanking() {
    return this.ranking;
  }

  async saveSearchedTags(tags: string[]) {
    tags.map((tag) => {
      if (this.tagCountBuffer[tag]) {
        this.tagCountBuffer[tag] += 1;
      } else {
        this.tagCountBuffer[tag] = 1;
      }
    });
  }

  @Cron('0/' + QUEUE_CYCLE_EXPRESSED_SECOND + ' * * * * *')
  async updateRanking() {
    this.putValueInQueue(this.tagCountBuffer);
    this.tagCountBuffer = {};
    const curRanking = this.getTopRankTagNames();
    this.ranking = this.addUpAndDownInfo(curRanking);
  }

  /**
   * 일정 시간마다 tagCountBuffer를 tagsCountsCircularQueue에 넣는다
   * 이후 tagCountBuffer를 초기화한다
   */
  private putValueInQueue(tagCountBuffer) {
    const index = this.makeIndexUsingTimeStamp(new Date());
    this.tagsCountsCircularQueue[index] = Object.assign({}, tagCountBuffer);
  }

  /**
   * 시간을 사용해 Queue의 인덱스를 만든다
   * 일정 시간이 지나면 덮어쓸 큐의 index를 구하기 위해 사용한다
   */
  private makeIndexUsingTimeStamp(date: Date) {
    return (
      date.getMinutes() * (MINUTES_PER_HOUR / QUEUE_CYCLE_EXPRESSED_SECOND) +
      Math.floor(date.getSeconds() / QUEUE_CYCLE_EXPRESSED_SECOND)
    );
  }

  /**
   * 가장 검색이 자주 된 최상위 10개 태그의 이름을 반환한다
   * 만약 데이터가 10개가 되지 않으면, 존재하는 만큼만 반환한다
   */
  private getTopRankTagNames() {
    const tagsCount = this.countForEachTags();

    const result = [];
    for (const tagName of Object.keys(tagsCount)) {
      result.push([tagName, tagsCount[tagName]]);
    }
    result.sort((prev, next) => next[TAG_COUNT_INDEX] - prev[TAG_COUNT_INDEX]);

    return result
      .slice(0, Math.min(RANKING_COUNT, result.length))
      .map((each) => each[TAG_NAME_INDEX]);
  }

  private countForEachTags() {
    const tagsCount = {};
    for (const tagsCountsSearchedAtTime of this.tagsCountsCircularQueue) {
      if (!tagsCountsSearchedAtTime) {
        continue;
      }
      for (const tagName of Object.keys(tagsCountsSearchedAtTime)) {
        if (tagsCount[tagName]) {
          tagsCount[tagName] += tagsCountsSearchedAtTime[tagName];
          continue;
        }
        tagsCount[tagName] = tagsCountsSearchedAtTime[tagName];
      }
    }
    return tagsCount;
  }

  private addUpAndDownInfo(curRanking: any[]) {
    const rankingInfo = [];
    for (let i = 0; i < curRanking.length; i++) {
      const tagName = curRanking[i];
      if (!this.ranking) {
        rankingInfo.push({ name: tagName, prev: 0 });
        continue;
      }
      const prevIndex =
        this.ranking.map((obj) => obj.name).indexOf(tagName) + 1;
      rankingInfo.push({ name: tagName, prev: prevIndex });
    }
    return rankingInfo;
  }
}
