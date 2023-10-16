import CanvasList from './canvas-list';
import { Label } from '@/components/ui/label';
import ProfileInfo from './profile-info';
import FullScreenConfetti from '@/components/full-screen-confetti';
import FirstTimeDialog from './first-time-dialog';

interface Props {
  searchParams: { isFirstTime: string };
}

export const dynamic = 'force-dynamic';

export default async function PortalPage(props: Props) {
  const isFirstTime = props.searchParams.isFirstTime === 'true';

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto">
        <div className="w-full flex flex-col justify-start lg:max-w-5xl gap-4 m-10">
          <ProfileInfo />
          <Label>Recent</Label>
          <CanvasList />
        </div>
      </div>
      <FullScreenConfetti show={isFirstTime} />
      <FirstTimeDialog open={isFirstTime} />
    </>
  );
}
