'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function Header() {
  const router = useRouter();

  const start = () => {
    router.push('/start');
  };

  return (
    <>
      <div className="w-full h-20 fixed z-30 flex justify-center items-center bg-background border-b border-black max-xl:px-4">
        <div className="w-full flex justify-between lg:max-w-6xl">
          <h1 className="text text-3xl text-outline font-bold uppercase m-0">
            Sketch Blend
          </h1>
          <Button onClick={start}>LOGIN</Button>
        </div>
      </div>
      <div className="w-full h-20 mb-4" />
    </>
  );
}
