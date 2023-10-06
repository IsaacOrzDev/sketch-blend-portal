'use client';

import { useProfileContext } from '@/components/profile-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProfileInfo() {
  const profile = useProfileContext();

  return (
    <div className="w-full flex justify-between">
      <div className="flex items-center">
        <Avatar className="w-14 h-14 mr-4">
          {profile.imageUrl && <AvatarImage src={profile.imageUrl} />}
          <AvatarFallback>
            {profile.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Label className="font-bold text-lg">{profile.username}</Label>
          <Label>{profile.email}</Label>
        </div>
      </div>
      <Button>Hello</Button>
    </div>
  );
}
