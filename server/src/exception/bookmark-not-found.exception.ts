export class BookmarkNotFoundException extends Error {
  constructor() {
    super('북마크하지 않은 게시물입니다.');
  }
}
