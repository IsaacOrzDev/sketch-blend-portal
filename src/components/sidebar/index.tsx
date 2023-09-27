'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import fetchService from '@/services/fetch-service';

interface Props {
  username: string;
  email?: string | null;
  imageUrl?: string | null;
}

export default function Sidebar(props: Props) {
  const router = useRouter();

  const { data, error, isLoading } = useSWR('/documents', (url) =>
    fetchService
      .GET('/documents', {
        params: {
          query: {
            limit: 10,
            offset: 0,
          },
        },
      })
      .then((res) => res.data)
  );

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
      <div className="flex-1 my-6">
        <Button onClick={() => router.push('/portal/canvas/new')}>
          New Canvas
        </Button>
        {data?.records.map((record) => (
          <div
            key={record.id}
            onClick={() => router.push(`/portal/canvas/${record.id}`)}
          >
            <Label>{record.title}</Label>
            <img src={record.image ?? ''} alt={record.title} />
          </div>
        ))}
      </div>
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
