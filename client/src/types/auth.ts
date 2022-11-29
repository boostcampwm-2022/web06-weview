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

export interface PreSignedData {
  url: string;
  fields: {
    Key: string;
    ACL: string;
    bucket: string;
    "X-Amz-Algorithm": string;
    "X-Amz-Credential": string;
    "X-Amz-Date": string;
    "X-Amz-Signature": string;
    Policy: string;
  };
}
