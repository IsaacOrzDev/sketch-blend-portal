'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';

interface Props {
  show?: boolean;
}

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export default function FullScreenConfetti(props: Props) {
  const [showConfetti, setShowConfetti] = useState(props.show);
  const { width, height } = useWindowSize();

  if (showConfetti) {
    return (
      <div className="fixed inset-0">
        <Confetti
          width={width}
          height={height}
          recycle={false}
          gravity={0.3}
          numberOfPieces={1000}
          onConfettiComplete={() => {
            setShowConfetti(false);
          }}
        />
      </div>
    );
  }

  return null;
}
