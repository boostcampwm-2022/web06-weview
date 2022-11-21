export class PostNotWrittenException extends Error {
  constructor() {
    super('글 작성에 실패했습니다.');
  }
}
