import CanvasList from './canvas-list';
import { Label } from '@/components/ui/label';
import FullScreenConfetti from '@/components/full-screen-confetti';
import FirstTimeDialog from './first-time-dialog';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/footer';
import SuccessSharedDialog from './success-shrared-dialog';
import UserPostsGrid from './user-posts-grid';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  searchParams: { isFirstTime: string; isConfetti?: string };
}

export const dynamic = 'force-dynamic';

export default async function PortalPage(props: Props) {
  const isFirstTime = props.searchParams.isFirstTime === 'true';
  const isConfetti = props.searchParams.isConfetti === 'true';

  return (
    <ScrollArea className="mx-auto w-full">
      <div className="w-full min-h-screen flex flex-col items-center">
        <div className="w-full flex flex-col justify-start lg:max-w-6xl max-xl:px-4 gap-4 m-10">
          <Label className="text text-xl">My Sketches</Label>
          <Separator className="mb-6" />
          <CanvasList />
          <Label className="text text-xl mt-8">My Posts</Label>
          <Separator />
        </div>
        <UserPostsGrid />
        <Footer hasPlaceholder />
      </div>
      <FullScreenConfetti show={isFirstTime || isConfetti} />
      <FirstTimeDialog open={isFirstTime} />
      <SuccessSharedDialog open={isConfetti} />
    </ScrollArea>
  );
}
