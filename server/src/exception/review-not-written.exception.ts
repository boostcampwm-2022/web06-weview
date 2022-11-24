export class ReviewNotWrittenException extends Error {
  constructor() {
    super('리뷰 작성에 실패했습니다.');
  }
}
