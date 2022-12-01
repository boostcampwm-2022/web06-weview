export class TokenNotFoundException extends Error {
  constructor() {
    super('토큰을 받아오지 못했습니다');
  }
}
