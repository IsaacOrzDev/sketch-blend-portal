import COOKIES_CONFIG from '@/config/cookie-config';
import { NextResponse } from 'next/server';

export const setAccessTokenCookieAndRedirect = (params: {
  accessToken: string;
  expiresAt: string;
  isFirstTime: boolean;
}) => {
  const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portal`;
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set(COOKIES_CONFIG.ACCESS_TOKEN_KEY, params.accessToken, {
    expires: new Date(params.expiresAt),
    httpOnly: true,
    sameSite: 'lax',
    domain:
      process.env.NODE_ENV === 'production'
        ? (process.env.NEXT_PUBLIC_API_BASE_URL ?? '')
            .split('.')
            .slice(1)
            .join('.')
        : undefined,
    path: '/',
    secure: redirectUrl.startsWith('https://'),
  });
  return response;
};
