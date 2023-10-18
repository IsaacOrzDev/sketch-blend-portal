import CanvasList from './canvas-list';
import { Label } from '@/components/ui/label';
import FullScreenConfetti from '@/components/full-screen-confetti';
import FirstTimeDialog from './first-time-dialog';
import { Separator } from '@/components/ui/separator';
import PostsGrid from '@/components/posts-grid';
import Footer from '@/components/footer';
import SuccessSharedDialog from './success-shrared-dialog';
import fetchService from '@/services/fetch-service';

interface Props {
  searchParams: { isFirstTime: string; isConfetti?: string };
}

export const dynamic = 'force-dynamic';

export default async function PortalPage(props: Props) {
  const isFirstTime = props.searchParams.isFirstTime === 'true';
  const isConfetti = props.searchParams.isConfetti === 'true';

  const posts = await fetchService.GET('/posts', {
    params: {
      query: {
        // offset: 0,
        // limit: 10,
      },
    },
  });

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center overflow-y-auto">
        <div className="w-full flex flex-col justify-start lg:max-w-6xl max-xl:px-4 gap-4 m-10">
          <Label className="text text-xl">My Sketches</Label>
          <Separator className="mb-6" />
          <CanvasList />
          <Label className="text text-xl mt-8">My Posts</Label>
          <Separator />
        </div>
        <PostsGrid
          items={
            posts.data?.records.map((item) => ({
              record: item,
              height: 200,
            })) ?? []
          }
        />
        <Footer hasPlaceholder />
      </div>
      <FullScreenConfetti show={isFirstTime || isConfetti} />
      <FirstTimeDialog open={isFirstTime} />
      <SuccessSharedDialog open={isConfetti} />
    </>
  );
}
