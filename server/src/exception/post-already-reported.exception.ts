export class PostAlreadyReportedException extends Error {
  constructor() {
    super('이미 신고한 게시물입니다.');
  }
}
