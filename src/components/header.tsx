'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Plus } from 'lucide-react';
import Link from 'next/link';
import useAddingNewSketch from '@/hooks/use-adding-new-sketch';

interface Props {
  profile?: {
    username: string;
    email?: string | null;
    imageUrl?: string | null;
  };
}

export default function Header(props: Props) {
  const isLogin = !!props.profile;

  const router = useRouter();

  const start = () => {
    router.push('/start');
  };

  const goToHome = () => {
    router.push('/');
  };

  const goToProfile = () => {
    router.push('/portal');
  };

  const signOut = () => {
    router.push('/api/auth/signout');
  };

  const onCreate = useAddingNewSketch();

  return (
    <>
      <div className="w-full h-20 fixed z-30 flex justify-center items-center bg-background border-b border-black max-xl:px-4">
        <div className="w-full flex justify-between items-center lg:max-w-6xl">
          <Link href="/">
            <h1 className="text text-3xl max-sm:text-xl text-outline font-bold uppercase m-0">
              Sketch Blend
            </h1>
          </Link>
          {!isLogin && (
            <Button variant="outline" onClick={start}>
              LOGIN
            </Button>
          )}
          {isLogin && props.profile && (
            <>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onCreate}>
                  <Plus />
                </Button>
                <DropdownMenu>
                  <Button asChild variant="outline">
                    <DropdownMenuTrigger>
                      <Menu />
                    </DropdownMenuTrigger>
                  </Button>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <Avatar className="w-8 h-8 mr-4">
                        {props.profile.imageUrl && (
                          <AvatarImage src={props.profile.imageUrl} />
                        )}
                        <AvatarFallback>
                          {props.profile.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuLabel>
                    {props.profile.username && (
                      <DropdownMenuLabel>
                        {props.profile.username}
                      </DropdownMenuLabel>
                    )}
                    {props.profile.email && (
                      <DropdownMenuLabel>
                        {props.profile.email}
                      </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem onClick={goToHome}>
                      Home Page
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={goToProfile}
                      onTouchEnd={goToProfile}
                    >
                      My Sketches
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} onTouchEnd={signOut}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full h-20 mb-4" />
    </>
  );
}
