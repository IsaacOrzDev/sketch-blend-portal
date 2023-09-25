'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  username: string;
  email?: string | null;
  imageUrl?: string | null;
}

export default function Sidebar(props: Props) {
  const router = useRouter();

  return (
    <div className="h-screen bg-background w-[400px] p-8 flex flex-col">
      <div className="flex items-center">
        <Avatar className="w-14 h-14 mr-4">
          {props.imageUrl && <AvatarImage src={props.imageUrl} />}
          <AvatarFallback>
            {props.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Label className="font-bold text-lg">{props.username}</Label>
          <Label>{props.email}</Label>
        </div>
      </div>
      <div className="flex-1 my-6" />
      <div>
        <Button
          className="w-full"
          onClick={() => router.replace('api/auth/signout')}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
