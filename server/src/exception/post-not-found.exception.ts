export class PostNotFoundException extends Error {
  constructor() {
    super('이미 삭제되었거나 존재하지 않는 게시물입니다.');
  }
}
