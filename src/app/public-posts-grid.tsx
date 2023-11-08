'use client';

import PostsGrid from '@/components/posts-grid';
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

  if (error) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          The developer has shut down the{' '}
          <a href="https://kubernetes.io/" className="underline">
            Kubnernetes
          </a>{' '}
          cluster to save money 💵, the website can only be used for viewing at
          the moment.
        </h2>
      </div>
    );
  }

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
      loading={isLoading}
      className="pt-4 pb-4"
    />
  );
}
