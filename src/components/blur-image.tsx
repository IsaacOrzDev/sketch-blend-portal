'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: string;
  placeholder?: 'blur';
  blurDataURL?: string;
}

export default function BlurImage(props: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={cn(
        `object-cover duration-800 ease-in-out ${props.className}`,
        isLoading ? 'blur-2xl' : 'blur-0'
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
