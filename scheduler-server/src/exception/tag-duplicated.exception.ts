export class TagDuplicatedException extends Error {
  constructor() {
    super('중복되는 태그로 검색할 수 없습니다');
  }
}
