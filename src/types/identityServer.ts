export interface IOauthTokens {
  grant_type?: string;
  client_id?: string;
  client_secret?: string;
  username: string;
  password: string;
}

export interface ITwoFactors{
  code: string
}