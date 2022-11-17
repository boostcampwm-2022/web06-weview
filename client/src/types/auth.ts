export interface AccessTokenInfo {
  accessToken: string;
  expiresIn: string;
}

export interface UserInfo extends AccessTokenInfo {
  id: string;
  nickname: string;
  profileUrl: string;
  email: string;
}
