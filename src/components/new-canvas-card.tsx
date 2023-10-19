'use client';

import React from 'react';
import { Card } from './ui/card';
import { CardTitle } from './registry/card';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import fetchService from '@/services/fetch-service';
import { useAtom } from 'jotai';
import { loadingAtom } from '@/state/ui';
import { toast } from './ui/use-toast';

interface Props {
  title?: string | null;
  description?: string | null;
  onClick?: () => void;
}

export default function NewCanvasCard(props: Props) {
  const router = useRouter();
  const [, setLoading] = useAtom(loadingAtom);

  const onCreate = async () => {
    setLoading(true);
    const response = await fetchService.POST('/documents/create/empty', {});

    if (response.error) {
      setLoading(false);
      alert(response.error);

      return;
    }
    toast({
      title: 'Please draw anything on the canvas to generate new image.',
    });
    router.push(`/portal/canvas/${response.data?.id}`);
    setLoading(false);
  };

  return (
    <Card
      className="cursor-pointer hover:border-gray-300 hover:bg-gray-100 min-h-[200px]  max-h-[800px] p-4 flex flex-col"
      onClick={onCreate}
    >
      <div className="flex-1 flex justify-center items-center">
        <Plus width="100px" height="100px" />
      </div>
      <CardTitle className="text-start">{props.title}</CardTitle>
    </Card>
  );
}
