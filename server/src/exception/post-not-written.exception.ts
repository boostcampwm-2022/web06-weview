export class PostNotWrittenException extends Error {
  constructor() {
    super('게시물 작성에 실패했습니다.');
  }
}
