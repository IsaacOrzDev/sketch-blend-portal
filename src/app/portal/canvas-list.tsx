'use client';

import CanvasCard from '@/components/canvas-card';
import { Label } from '@/components/ui/label';
import fetchService from '@/services/fetch-service';
import useSWR from 'swr';

export default function CanvasList() {
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
    <div className="grid text-center lg:w-full lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
      {data?.records.map((record, i) => (
        <>
          <CanvasCard
            key={i}
            imageUrl={record.image ?? ''}
            title={record.title}
            description={record.description}
          />
        </>
      ))}
    </div>
  );
}
