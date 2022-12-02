import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

export const MINUTES_PER_HOUR = 60;
export const QUEUE_CYCLE_EXPRESSED_SECOND = 15;
export const RANKING_COUNT = 10;

@Injectable()
export class RankingService {
  private readonly tagsCountsCircularQueue: any[];
  private tagCountBuffer;
  private ranking: any[];

  constructor() {
    this.tagsCountsCircularQueue = new Array(
      (MINUTES_PER_HOUR / QUEUE_CYCLE_EXPRESSED_SECOND) * MINUTES_PER_HOUR,
    );
    this.tagCountBuffer = {};
    // TODO 어떻게 초기 데이터 넣어줘야할지 고민하기
  }

  // 사용자가 요청했을때
  getRanking() {
    return this.ranking;
  }

  // 검색한 태그들을 저장한다
  async saveSearchedTags(tags: string[]) {
    tags.map((tag) => {
      //tag가 있으면 +1, 없으면 1로 만들어준다
      if (this.tagCountBuffer[tag]) {
        this.tagCountBuffer[tag] += 1;
      } else {
        this.tagCountBuffer[tag] = 1;
      }
    });
  }

  @Cron('0/' + QUEUE_CYCLE_EXPRESSED_SECOND + ' * * * * *')
  async putValueInQueue() {
    const index = this.makeQueueIndexUsingTimeStamp(new Date());
    this.tagsCountsCircularQueue[index] = Object.assign(
      {},
      this.tagCountBuffer,
    );
    this.tagCountBuffer = {};

    const curRanking = this.calculateRanking();
    // 이전 등수 정보를 넣는다
    this.ranking = this.enterPreviousRankingData(curRanking);
  }

  private makeQueueIndexUsingTimeStamp(date: Date) {
    return (
      date.getMinutes() * (MINUTES_PER_HOUR / QUEUE_CYCLE_EXPRESSED_SECOND) +
      Math.floor(date.getSeconds() / QUEUE_CYCLE_EXPRESSED_SECOND)
    );
  }

  private calculateRanking() {
    const tagsCount = this.countForEachTags();

    // 내림차순 정렬, heap으로 바꾸는 거 고려 but, sort 내부적으로 최적화 되어있을듯
    const result = [];
    for (const tagName of Object.keys(tagsCount)) {
      result.push([tagName, tagsCount[tagName]]);
    }
    result.sort(function (a, b) {
      return b[1] - a[1];
    });

    //10개만 골라온다
    if (result.length <= RANKING_COUNT) {
      return result.map((x) => x[0]);
    }
    return result.slice(RANKING_COUNT).map((x) => x[0]);
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

  private enterPreviousRankingData(curRanking: any[]) {
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
