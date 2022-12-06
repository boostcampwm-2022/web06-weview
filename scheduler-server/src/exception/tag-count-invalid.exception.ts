export class TagCountInvalidException extends Error {
  constructor() {
    super('태그의 개수는 1개 이상 10개 이하여야 합니다');
  }
}
