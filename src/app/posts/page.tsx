import Header from '@/components/header';
import ImageGridItem from '@/components/image-grid-item';
import fetchService from '@/services/fetch-service';
import BannerCard from './banner-card';
import Footer from '@/components/footer';

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

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="w-full flex flex-col items-center overflow-y-auto">
        <div className="lg:max-w-6xl w-full max-lg:px-4">
          <BannerCard />
        </div>
        <div className="w-full lg:max-w-6xl gridContainer mt-4 pb-4 max-lg:px-4">
          <div className="grid subGrid">
            <ImageGridItem height={400} />
            <ImageGridItem height={400} />
            <ImageGridItem height={200} />
            <ImageGridItem height={800} />
          </div>
          <div className="grid subGrid">
            <ImageGridItem height={500} />
            <ImageGridItem height={800} />
            <ImageGridItem height={200} />
            <ImageGridItem height={100} />
            <ImageGridItem height={100} />
          </div>
          <div className="grid subGrid">
            <ImageGridItem height={400} />
            <ImageGridItem height={800} />
            <ImageGridItem height={600} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
