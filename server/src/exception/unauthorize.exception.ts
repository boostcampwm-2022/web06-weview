export class UnauthorizeException extends Error {
  constructor() {
    super('권한이 존재하지 않습니다.');
  }
}
