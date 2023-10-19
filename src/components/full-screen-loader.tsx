'use client';

import Loader from './loader';
import { useAtom } from 'jotai';
import { loadingAtom } from '@/state/ui';

interface Props {
  show?: boolean;
}

export default function FullScreenLoader(props: Props) {
  const [showLoader, setShowLoader] = useAtom(loadingAtom);

  if (showLoader) {
    return (
      <div className="fixed bg-background opacity-80 inset-0 w-screen h-screen z-40 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return null;
}
