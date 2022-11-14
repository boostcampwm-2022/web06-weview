export class RefreshTokensDto {
  accessToken: string;
  expiresIn: number;
}

export class AuthorizeWithGithubDto {
  accessToken: string;
  expiresIn: number;
  id: number;
  nickname: string;
  email: string;
  profileUrl: string;
}
