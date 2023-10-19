'use client';

import Loader from '@/components/loader';
import PostsGrid from '@/components/posts-grid';
import fetchService from '@/services/fetch-service';
import useSWR from 'swr';

export default function UserPostsGrid() {
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

  if (isLoading) return <Loader />;

  const deleteRecord = async (id: string) => {
    await fetchService.DELETE('/posts/{id}', {
      params: {
        path: { id: id },
      },
    });
    mutate();
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
