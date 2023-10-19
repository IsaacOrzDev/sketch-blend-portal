'use client';

import CanvasCard from '@/components/canvas-card';
import NewCanvasCard from '@/components/new-canvas-card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import fetchService from '@/services/fetch-service';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export default function CanvasList() {
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR('/documents', (url) =>
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

  const deleteRecord = async (id: string) => {
    if (!id) {
      return;
    }

    try {
      await fetchService.DELETE('/documents/{id}', {
        params: {
          path: { id: id },
        },
      });
      toast({
        title: 'Deleted',
      });
      mutate();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="grid text-center lg:w-full lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
      <NewCanvasCard title="New Sketch" description="testing" />
      {data?.records.map((record, i) => (
        <CanvasCard
          key={i}
          imageUrl={record.image ?? ''}
          title={record.title}
          description={record.description}
          onClick={() => router.push(`/portal/canvas/${record.id}`)}
          onDelete={() => deleteRecord(record.id)}
        />
      ))}
    </div>
  );
}
