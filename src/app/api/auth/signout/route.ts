import COOKIES_CONFIG from '@/config/cookie-config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const response = NextResponse.redirect(redirectUrl);

  if (process.env.NODE_ENV === 'production') {
    const domain = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '')
      .split('.')
      .slice(1)
      .join('.');
    response.cookies.delete({
      domain,
      name: COOKIES_CONFIG.ACCESS_TOKEN_KEY,
    });
  } else {
    response.cookies.delete(COOKIES_CONFIG.ACCESS_TOKEN_KEY);
  }

  return response;
}
