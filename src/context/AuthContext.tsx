import React, { createContext, ReactNode, useContext, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { signInRequest } from '~/services/hooks/useAuth';
import { api } from '../services/api';
import { SignInRequestData } from '~/types/auth';
import { clearLocalStorage } from '~/utils/localStorageFormat';
import { IOauthTokens } from '~/types/identityServer';

type Component = {
  children: ReactNode;
};

type AuthContextType = {
  authTwoFactor: string;
  isAuthenticated: boolean;
  signIn: (data: SignInRequestData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Component) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authTwoFactor, setAuthTwoFactor] = useState('');

  function signOut() {
    destroyCookie(null, '@iHoldBankAccess_token', { path: '/' });
    destroyCookie(null, '@iHoldBankRefresh_token', { path: '/' });
    destroyCookie(null, '@two-factor', { path: '/' });
    clearLocalStorage();
    Router.push('/');
  }

  async function signIn(credentials: SignInRequestData) {
    try {
      const { access, refresh, email } = await signInRequest(credentials);

      setCookie(undefined, '@iHoldBankAccess_token', access, {
        maxAge: 60 * 60 * 1, // 1 hour
        path: '/',
      });

      setCookie(undefined, '@iHoldBankRefresh_token', refresh, {
        maxAge: 60 * 60 * 2, // 2 hour
        path: '/',
      });

      api.defaults.headers.common.Authorization = `Bearer ${access}`;

      setAuthTwoFactor(email);
      setIsAuthenticated(true);

      Router.push('/auth/two-factor');
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, authTwoFactor }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
