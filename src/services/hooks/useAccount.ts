import { api } from '../api';
import { HandleError } from '~/error/HandlerError';
import {
  IAuthTwoFactors,
  SignInRequestData,
  signinResponseData,
} from '~/types/auth';
import { AccountUser } from '~/types/accounts.types';

export async function GetAuthenticatedUserData() {
  try {
    const { data } = await api.get<AccountUser>('/accounts');
    return data;
  } catch (error: any) {
    throw error;
  }
}
export async function GetUserAccountBalanceData() {
  try {
    const { data } = await api.get('/account_balances');
    return data;
  } catch (error: any) {
    throw error;
  }
}
