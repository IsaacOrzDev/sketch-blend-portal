import COOKIES_CONFIG from '@/config/cookie-config';
import { setAccessTokenCookieAndRedirect } from '@/lib/auth-utils';
import fetchService from '@/services/fetch-service';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
import * as z from 'zod';

const paramsSchema = z.object({
  token: z.string(),
});

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { search } = request.nextUrl;

    const params = paramsSchema.parse(qs.parse(search.replace(/^\?/, '')));

    const apiResult = await fetchService.POST(
      '/auth/password-less/authenticate',
      {
        body: { token: params.token },
      }
    );

    if (apiResult.error) {
      throw apiResult.error;
    }

    const { accessToken, expiresAtUtc, isFirstTime } = apiResult.data;

    return setAccessTokenCookieAndRedirect({
      accessToken,
      expiresAt: expiresAtUtc,
      isFirstTime,
    });
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
}
