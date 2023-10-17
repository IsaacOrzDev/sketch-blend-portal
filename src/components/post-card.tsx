'use client';

import BlurImage from './blur-image';
import { CardContent, CardTitle } from './registry/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardDescription } from './ui/card';

interface Props {
  userInfo: {
    name: string;
    imageUrl?: string | null;
  };
  imageUrl: string;
  sourceImageUrl: string;
  prompt: string;
}

export default function PostCard(props: Props) {
  return (
    <Card className="max-w-[200px]">
      <CardTitle>{props.userInfo.name}</CardTitle>
      <Avatar className="w-14 h-14 mr-4">
        {props.userInfo.imageUrl && (
          <AvatarImage src={props.userInfo.imageUrl} />
        )}
        <AvatarFallback>
          {props.userInfo.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <CardContent>
        <CardDescription>{props.prompt}</CardDescription>
        <BlurImage
          src={props.imageUrl}
          width={200}
          height={300}
          alt="generated"
        />
        <BlurImage
          src={props.sourceImageUrl}
          width={200}
          height={300}
          alt="source"
        />
      </CardContent>
    </Card>
  );
}
