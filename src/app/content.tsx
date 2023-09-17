import BlurImage from '@/components/bulr-image';
import { StartAccount } from '@/components/start-account';
import { ModeToggle } from '@/components/mode-toggle';

export default function HomeContent() {
  return (
    <main className="flex min-h-screen items-center justify-between bg-background h-screen">
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
      <div className="flex-1 relative w-full h-full">
        <div className="absolute w-full h-screen bg-background z-10 opacity-30" />
        <BlurImage
          src="/static/images/login_panel_cover.png"
          alt="cover"
          layout="fill"
        />
        <div className="w-full h-full" />
      </div>
      <div className="flex-1 flex p-12 items-center justify-center">
        <div className="min-w-[500px]">
          <StartAccount />
        </div>
      </div>
    </main>
  );
}
