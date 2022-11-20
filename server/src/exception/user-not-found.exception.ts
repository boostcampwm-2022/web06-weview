export class UserNotFoundException extends Error {
  constructor() {
    super('이미 탈퇴했거나 존재하지 않는 사용자입니다.');
  }
}
