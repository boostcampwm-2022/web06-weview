export class TokenNotPermittedException extends Error {
  constructor() {
    super('해당 토큰은 권한이 존재하지 않습니다');
  }
}
