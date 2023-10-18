import COOKIES_CONFIG from '@/config/cookie-config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const response = NextResponse.redirect(redirectUrl);
  // response.cookies.delete(COOKIES_CONFIG.ACCESS_TOKEN_KEY);
  response.cookies.set(COOKIES_CONFIG.ACCESS_TOKEN_KEY, '');

  return response;
}
