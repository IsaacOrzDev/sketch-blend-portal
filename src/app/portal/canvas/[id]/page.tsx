'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import fetchService from '@/services/fetch-service';
import useSWR from 'swr';

interface Props {
  params?: { id: string };
}

export default function CanvasContent(props: Props) {
  const { data, isLoading } = useSWR(
    props.params?.id ? '/documents/{id}' : null,
    (url) =>
      fetchService
        .GET(url, {
          params: {
            path: { id: props.params?.id },
          },
        })
        .then((res) => res.data)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.record) {
    return <div>404</div>;
  }

  return (
    <div className="w-full h-screen">
      <SketchCanvasPanel record={data.record} />
    </div>
  );
}
