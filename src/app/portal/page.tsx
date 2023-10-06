import CanvasList from './canvas-list';
import { Label } from '@/components/ui/label';
import ProfileInfo from './profile-info';

export default function ClientComponent() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center overflow-y-auto">
        <div className="w-full flex flex-col justify-start lg:max-w-5xl gap-4 m-10">
          <ProfileInfo />
          <Label>Recent</Label>
          <CanvasList />
        </div>
      </div>
    </>
  );
}
