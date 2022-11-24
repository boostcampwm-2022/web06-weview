export interface AccessTokenInfo {
  accessToken: string;
  expiresIn: number;
}

export interface UserInfo {
  id: string;
  nickname: string;
  profileUrl: string;
  email: string;
}

export interface MyInfo extends AccessTokenInfo, UserInfo {}
