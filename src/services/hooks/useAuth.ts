import { api } from '../api';
import { HandleError } from '~/error/HandlerError';
import {
  IAuthTwoFactors,
  SignInRequestData,
  signinResponseData,
} from '~/types/auth';
import { IOauthTokens, ITwoFactors } from '~/types/identityServer';

export async function signInRequest(signin: SignInRequestData) {
  try {
    const { data } = await api.post<signinResponseData>(
      '/identity_server/oauth/tokens',
      signin
    );
    return {
      access: data.access_token,
      refresh: data.refresh_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      email: data.email,
      code_verified: data.code_verified,
    };
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export async function AuthTwoFactors(code: IAuthTwoFactors) {
  try {
    const { data } = await api.post('/identity_server/users/two_factors', code);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetAuthTwoFactors() {
  try {
    const { data } = await api.get('/identity_server/users/two_factors');
    return data;
  } catch (error: any) {
    throw error;
  }
}
export async function GetUserAvatar() {
  try {
    const { data } = await api.get('/avatars');
    return data;
  } catch (error: any) {
    throw error;
  }
}
