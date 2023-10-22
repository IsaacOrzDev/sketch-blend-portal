'use client';

import PostsGrid from '@/components/posts-grid';
import { Skeleton } from '@/components/ui/skeleton';
import fetchService from '@/services/fetch-service';
import { loadingAtom } from '@/state/ui';
import { useAtom } from 'jotai';
import useSWR from 'swr';

export default function UserPostsGrid() {
  const [, setShowLoader] = useAtom(loadingAtom);

  const { data, error, isLoading, mutate } = useSWR('/posts/user', (url) =>
    fetchService
      .GET('/posts/user', {
        params: {
          query: {
            // limit: 10,
            // offset: 0,
          },
        },
      })
      .then((res) => res.data)
  );

  if (isLoading)
    return (
      <div className="mt-10 mb-10 flex gap-4 w-full lg:max-w-6xl">
        <Skeleton className="flex-1 h-[550px] rounded" />
        <Skeleton className="flex-1 h-[550px] rounded" />
        <Skeleton className="flex-1 h-[550px] rounded" />
      </div>
    );

  const deleteRecord = async (id: string) => {
    setShowLoader(true);
    await fetchService.DELETE('/posts/{id}', {
      params: {
        path: { id: id },
      },
    });
    await mutate();
    setShowLoader(false);
  };

  if (data?.records.length === 0) {
    return (
      <div className="w-full p-4 flex justify-center">
        <p className="text-xl">You do not have post yet</p>
      </div>
    );
  }

  return (
    <>
      <PostsGrid
        isOwner
        items={
          data?.records.map((item) => ({
            record: item,
            height: 200,
          })) ?? []
        }
        onDelete={deleteRecord}
      />
    </>
  );
}
