import CanvasList from './canvas-list';
import { Label } from '@/components/ui/label';
import FullScreenConfetti from '@/components/full-screen-confetti';
import FirstTimeDialog from './first-time-dialog';
import { Separator } from '@/components/ui/separator';
import PostsGrid from '@/components/posts-grid';
import Footer from '@/components/footer';

interface Props {
  searchParams: { isFirstTime: string };
}

export const dynamic = 'force-dynamic';

export default async function PortalPage(props: Props) {
  const isFirstTime = props.searchParams.isFirstTime === 'true';

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center overflow-y-auto">
        <div className="w-full flex flex-col justify-start lg:max-w-6xl gap-4 m-10">
          <Label className="text text-xl">Your Canvas</Label>
          <Separator className="mb-6" />
          <CanvasList />
          <Label className="text text-xl mt-8">Your Posts</Label>
          <Separator />
        </div>
        <PostsGrid />
        <Footer />
      </div>
      <FullScreenConfetti show={isFirstTime} />
      <FirstTimeDialog open={isFirstTime} />
    </>
  );
}
