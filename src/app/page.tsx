import Header from '@/components/header';
import fetchService from '@/services/fetch-service';
import BannerCard from '@/components/banner-card';
import Footer from '@/components/footer';
import { cookies } from 'next/headers';
import COOKIES_CONFIG from '@/config/cookie-config';
import PublicPostsGrid from './public-posts-grid';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { isClusterExist } from '@/lib/server-utils';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIES_CONFIG.ACCESS_TOKEN_KEY)?.value;

  let profile = null;

  if (!!accessToken) {
    profile = await fetchService.POST('/auth/access-token/verify', {
      body: { token: accessToken },
    });
  }

  return (
    <div className="flex flex-col w-full">
      <Header profile={profile?.data} />

      <ScrollArea>
        <div className="w-full flex flex-col items-center">
          <div className="lg:max-w-6xl w-full max-xl:px-4">
            <BannerCard />
            <p className="w-full max-xl:px-4 my-4">
              Sketch Blend is a demo website offers users the ability to draw
              sketches, generate new images based on their sketches using{' '}
              <a
                href="https://github.com/Stability-AI/stablediffusion"
                className="underline"
                target="_blank"
              >
                Stable Diffusion
              </a>{' '}
              and{' '}
              <a
                href="https://github.com/lllyasviel/ControlNet"
                className="underline"
                target="_blank"
              >
                ControlNet
              </a>
              , and post these images with others.
              <br />
            </p>
            {!profile && isClusterExist() && (
              <p className="w-full max-xl:px-4 my-4">
                You need to{' '}
                <Link href="/start" className="underline">
                  login
                </Link>{' '}
                first to draw, generate and post your images.
              </p>
            )}
            <Separator />
          </div>
          <PublicPostsGrid />
        </div>
      </ScrollArea>
      <Footer hasPlaceholder />
    </div>
  );
}
