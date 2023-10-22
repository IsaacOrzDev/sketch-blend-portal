'use client';

import CanvasCard from '@/components/canvas-card';
import Loader from '@/components/loader';
import NewCanvasCard from '@/components/new-canvas-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import fetchService from '@/services/fetch-service';
import { loadingAtom } from '@/state/ui';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const getKey = (pageIndex: number, previousPageData: Array<any>) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/documents?page=${pageIndex}&limit=10`; // SWR key
};

export default function CanvasList() {
  const router = useRouter();

  const [, setShowLoader] = useAtom(loadingAtom);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const { data, error, isLoading } = useSWR('/documents', (url) =>
    fetchService
      .GET('/documents', {
        params: {
          query: {
            limit: 5,
            offset: 0,
          },
        },
      })
      .then((res) => res.data)
  );

  useEffect(() => {
    if (!isLoading && data) {
      setAllRecords(data.records);
    }
  }, [data, isLoading]);

  const deleteRecord = async (id: string) => {
    if (!id) {
      return;
    }

    setShowLoader(true);
    try {
      await fetchService.DELETE('/documents/{id}', {
        params: {
          path: { id: id },
        },
      });
      toast({
        title: 'Deleted',
      });
      // await mutate();
      setAllRecords(allRecords.filter((record) => record.id !== id));
      setShowLoader(false);
    } catch (err) {
      alert(err);
      setShowLoader(false);
    }
  };

  const loadMore = async () => {
    setShowLoader(true);
    const data = await fetchService
      .GET('/documents', {
        params: {
          query: {
            limit: 5,
            offset: allRecords.length,
          },
        },
      })
      .then((res) => res.data);
    if (data?.records.length === 0) {
      setShowLoadMore(false);
    } else {
      setAllRecords([...allRecords, ...(data?.records ?? [])]);
    }
    setShowLoader(false);
  };

  return (
    <>
      <div className="grid text-center lg:w-full lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
        <NewCanvasCard title="New Sketch" description="testing" />
        {allRecords.map((record, i) => (
          <CanvasCard
            key={i}
            imageUrl={record.svg ?? ''}
            title={record.title}
            description={record.description}
            onClick={() => router.push(`/portal/canvas/${record.id}`)}
            onDelete={() => deleteRecord(record.id)}
          />
        ))}
        {isLoading && (
          <>
            <Skeleton className="flex-1 h-[320px] rounded" />
            <Skeleton className="flex-1 h-[320px] rounded" />
          </>
        )}
      </div>
      {showLoadMore && (
        <Button variant="outline" onClick={loadMore}>
          Load More
        </Button>
      )}
    </>
  );
}
