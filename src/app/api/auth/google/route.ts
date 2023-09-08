import COOKIES_CONFIG from '@/config/cookie-config';
import fetchService from '@/services/fetch-service';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
import * as z from 'zod';

const paramsSchema = z.object({
  code: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const { search } = request.nextUrl;

    const params = paramsSchema.parse(qs.parse(search.replace(/^\?/, '')));

    const apiResult = await fetchService.POST('/auth/google/authenticate', {
      body: { code: params.code },
    });

    const error = apiResult.error as any;
    const data = apiResult.data as any;

    if (error) {
      throw new Error(error);
    }

    if (!data.success) {
      throw new Error(data.error);
    }

    const { token: accessToken, expiredAt } = data;

    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portal`;
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(COOKIES_CONFIG.ACCESS_TOKEN_KEY, accessToken, {
      expires: new Date(expiredAt),
      httpOnly: true,
      sameSite: 'lax',
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
}
