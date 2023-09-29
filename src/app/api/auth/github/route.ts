import COOKIES_CONFIG from '@/config/cookie-config';
import fetchService from '@/services/fetch-service';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
import * as z from 'zod';

const paramsSchema = z.object({
  code: z.string(),
});

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    const { search } = request.nextUrl;

    const params = paramsSchema.parse(qs.parse(search.replace(/^\?/, '')));

    const apiResult = await fetchService.POST('/auth/github/authenticate', {
      body: { code: params.code },
    });

    if (apiResult.error) {
      throw apiResult.error;
    }

    const { accessToken, expiresAtUtc, isFirstTime } = apiResult.data;

    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portal`;
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set(COOKIES_CONFIG.ACCESS_TOKEN_KEY, accessToken, {
      expires: new Date(expiresAtUtc),
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
  } catch (err: any) {
    console.log(err);
    if (err instanceof z.ZodError) {
      const message = err.issues
        .map((issue) => `${issue.path}: ${issue.code}`)
        .join(', ');
      return NextResponse.json({ success: false, message });
    } else {
      return NextResponse.json({ success: false, message: err.message });
    }
  }
};
