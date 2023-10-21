'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import useProgressiveImg from '@/hooks/use-progressive-img';

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
  const { src, blur } = useProgressiveImg(props.src, props.src);

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={cn(
        `object-cover duration-800 ease-in-out ${props.className}`,
        blur ? 'blur-[20px]' : 'blur-0'
      )}
    />
  );
}
