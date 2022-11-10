export interface AccessTokenInfo {
  accessToken: string;
  expiresIn: string;
}

export interface UserInfo extends AccessTokenInfo {
  id: number;
  username: string;
  email: string;
  avatar_url: string;
}
