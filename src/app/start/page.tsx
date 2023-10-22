import BlurImage from '@/components/blur-image';
import { StartAccount } from '@/components/start-account';
import { ModeToggle } from '@/components/mode-toggle';
import Footer from '@/components/footer';

export default async function StartPage() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-between bg-background h-screen">
        {/* <div className="absolute top-6 right-6">
        <ModeToggle />
      </div> */}

        <div className="flex-1 relative w-full h-full max-lg:hidden">
          <div className="absolute w-full h-screen bg-background z-0 opacity-90" />
          <div className="">
            <BlurImage
              src="/static/images/login.png"
              alt="cover"
              layout="fill"
              className=""
            />
          </div>
          <div className="w-full h-full"></div>
        </div>
        <div className="xl:flex-1 flex p-12 lg:p-8 max-sm:p-4 items-center justify-center  max-lg:w-full">
          <div className="max-w-[600px]">
            <h1 className="text text-7xl max-sm:text-5xl text-outline font-bold uppercase mb-4 text-center">
              SKETCH BLEND
            </h1>
            <StartAccount isLogin />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
