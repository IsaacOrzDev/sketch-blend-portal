'use client';

import Loader from '@/components/loader';
import PostsGrid from '@/components/posts-grid';
import { Skeleton } from '@/components/ui/skeleton';
import fetchService from '@/services/fetch-service';
import useSWR from 'swr';

export default function PublicPostsGrid() {
  const { data, error, isLoading, mutate } = useSWR('/posts', (url) =>
    fetchService
      .GET('/posts', {
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
      <>
        <div className="mt-10 mb-10 flex gap-4 w-full lg:max-w-6xl">
          <Skeleton className="flex-1 h-[250px] rounded" />
          <Skeleton className="flex-1 h-[250px] rounded" />
          <Skeleton className="flex-1 h-[250px] rounded" />
        </div>
        <div className="flex gap-4 w-full lg:max-w-6xl">
          <Skeleton className="flex-1 h-[550px] rounded" />
          <Skeleton className="flex-1 h-[550px] rounded" />
          <Skeleton className="flex-1 h-[550px] rounded" />
        </div>
      </>
    );

  return (
    <PostsGrid
      items={
        data?.records.map((item) => ({
          record: item,
          height: 200,
        })) ?? []
      }
      // items={[
      //   400, 400, 200, 800, 500, 800, 200, 100, 100, 400, 800, 600,
      // ].map((item) => ({
      //   height: item,
      // }))}
      className="pt-4 pb-4"
    />
  );
}
