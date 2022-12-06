export class SearchHistoryNotFoundException extends Error {
  constructor() {
    super('이미 삭제되었거나 존재하지 않는 검색 기록입니다');
  }
}
