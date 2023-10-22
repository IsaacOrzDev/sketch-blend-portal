import Header from '@/components/header';
import fetchService from '@/services/fetch-service';
import BannerCard from '@/components/banner-card';
import Footer from '@/components/footer';
import { cookies } from 'next/headers';
import COOKIES_CONFIG from '@/config/cookie-config';
import PublicPostsGrid from './public-posts-grid';
import { ScrollArea } from '@/components/ui/scroll-area';

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
          </div>
          <PublicPostsGrid />
        </div>
      </ScrollArea>
      <Footer hasPlaceholder />
    </div>
  );
}
