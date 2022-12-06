export class PostAlreadyBookmarkedException extends Error {
  constructor() {
    super('이미 북마크한 게시물입니다.');
  }
}
