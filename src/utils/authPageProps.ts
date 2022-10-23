import { parseCookies, setCookie } from 'nookies';
import { signinResponseData } from '~/types/auth';
import { getAPIClient } from '~/services/axios';
import { redirectTo } from './redirectTo';

export async function authPageProps({ Component, ctx }: any) {
  let pageProps = {};
  const api = getAPIClient();
  const FREE_ROUTES = ['/login', '/auth/two-factor', '/onboarding'];

  const {
    '@iHoldBankAccess_token': token,
    '@iHoldBankRefresh_token': refresh,
    '@two-factor': twoFactor,
  } = parseCookies(ctx);

  const userAuth = {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
    refresh_token: refresh,
  };
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (FREE_ROUTES.includes(ctx.pathname)) return { pageProps };

  if (!token && !twoFactor) {
    redirectTo('/login', { res: ctx.res, status: 301 });
    return {};
  }
  if (token && twoFactor) {
    return { pageProps };
  }

  if (refresh) {
    try {
      // when refresh token is valid
      const response = await api.post<signinResponseData>(
        `identity_server/oauth/tokens/${process.env.NEXT_PUBLIC_CLIENT_ID}'`,
        userAuth,
        {
          headers: {
            authorization: `Bearer ${refresh}`,
          },
        }
      );
      const { access_token, refresh_token } = response.data;
      setCookie(ctx, '@iHoldBankAccess_token', access_token);
      setCookie(ctx, '@iHoldBankRefresh_token', refresh_token);
      return { pageProps };
    } catch (error) {
      redirectTo('/login', { res: ctx.res, status: 301 });
      return {};
    }
  }

  redirectTo('/login', { res: ctx.res, status: 301 });
  return {};
}
