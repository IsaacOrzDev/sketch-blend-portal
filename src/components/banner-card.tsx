'use client';

import BlurImage from '@/components/blur-image';
import { Card, CardContent } from '@/components/ui/card';

export default function BannerCard() {
  return (
    <Card className="w-full p-4 relative h-[250px] overflow-hidden">
      <CardContent>
        <div className="absolute top-0 left-0 w-full h-full bg-secondary-foreground  z-10 opacity-30" />
        <h1 className="text text-outline text-4xl font-bold absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          Draw, Generate and Share
        </h1>
        <BlurImage
          src={'/static/images/banner.png'}
          className="object-center"
          layout="fill"
          alt="banner"
        />
      </CardContent>
    </Card>
  );
}
