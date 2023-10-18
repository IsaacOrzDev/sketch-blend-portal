import Header from '@/components/header';
import fetchService from '@/services/fetch-service';
import BannerCard from '@/components/banner-card';
import Footer from '@/components/footer';
import PostsGrid from '@/components/posts-grid';
import { cookies } from 'next/headers';
import COOKIES_CONFIG from '@/config/cookie-config';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  // const posts = await fetchService.GET('/posts', {
  //   params: {
  //     query: {
  //       // offset: 0,
  //       // limit: 10,
  //     },
  //   },
  // });

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
      <div className="w-full flex flex-col items-center overflow-y-auto">
        <div className="lg:max-w-6xl w-full max-xl:px-4">
          <BannerCard />
        </div>
        <PostsGrid className="pt-4 pb-4" />
      </div>
      <Footer hasPlaceholder />
    </div>
  );
}
