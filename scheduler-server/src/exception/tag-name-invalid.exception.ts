export class TagNameInvalidException extends Error {
  constructor() {
    super('태그의 이름이 적절하지 않습니다');
  }
}
