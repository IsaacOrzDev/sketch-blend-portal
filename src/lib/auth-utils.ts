import COOKIES_CONFIG from '@/config/cookie-config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const setAccessTokenCookieAndRedirect = (params: {
  accessToken: string;
  expiresAt: string;
  isFirstTime: boolean;
}) => {
  let redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portal`;
  if (params.isFirstTime) {
    // redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portal/onboarding`;
    redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portal?isFirstTime=${params.isFirstTime}`;
  }
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

export const getAuthHeaders = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIES_CONFIG.ACCESS_TOKEN_KEY)?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
