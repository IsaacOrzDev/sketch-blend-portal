'use client';

import { useProfileContext } from '@/components/profile-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfileInfo() {
  const profile = useProfileContext();
  const router = useRouter();

  const signOut = () => {
    router.push('/api/auth/signout');
  };

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
      {/* <Button>
        <Menu />
      </Button> */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Signout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
