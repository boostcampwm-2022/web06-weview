export class PostNotReportedException extends Error {
  constructor() {
    super('게시물 신고에 실패했습니다.');
  }
}
