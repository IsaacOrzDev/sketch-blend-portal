'use client';

import React from 'react';
import { Card } from './ui/card';
import { CardTitle } from './registry/card';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  title?: string | null;
  description?: string | null;
  onClick?: () => void;
}

export default function NewCanvasCard(props: Props) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:border-gray-300 hover:bg-gray-100 min-h-[200px]  max-h-[800px] p-4 flex flex-col"
      onClick={() => router.push(`/portal/canvas/new`)}
    >
      <div className="flex-1 flex justify-center items-center">
        <Plus width="100px" height="100px" />
      </div>
      <CardTitle className="text-start">{props.title}</CardTitle>
    </Card>
  );
}
