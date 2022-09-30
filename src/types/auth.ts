export type SignInRequestData = {
  grant_type?: string;
  client_id?: string;
  client_secret?: string;
  username?: string;
  password?: string;
};

export type signinResponseData = {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in: number | string;
  email: string;
  code_verified: boolean;
};

export interface IAuthTwoFactors {
  code: string;
}
