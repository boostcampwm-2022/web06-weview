export class UserNotSameException extends Error {
  constructor() {
    super('해당 유저는 접근 권한이 존재하지 않습니다');
  }
}
