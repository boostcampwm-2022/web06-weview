export class RefreshTokensDto {
  accessToken: string;
  expiresIn: number;
}

export class AuthorizeWithGithubDto {
  accessToken: string;
  expiresIn: number;
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
}
