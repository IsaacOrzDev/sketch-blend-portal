'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import fetchService from '@/services/fetch-service';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

interface Props {
  params?: { id: string };
}

export default function CanvasContent(props: Props) {
  const router = useRouter();

  const { data, isLoading, mutate } = useSWR(
    props.params?.id ? '/documents/{id}' : null,
    (url) =>
      fetchService
        .GET(url, {
          params: {
            path: { id: props.params?.id! },
          },
        })
        .then((res) => res.data)
  );

  const save = async (data: { paths: any; svg: string; image: string }) => {
    if (!props.params?.id) {
      return;
    }

    try {
      await fetchService.PATCH('/documents/{id}', {
        body: {
          id: props.params.id,
          data: {
            title: 'test',
            description: null,
            paths: data.paths,
            svg: data.svg,
            image: data.image,
          },
        },
      });
      mutate();
      alert('success');
    } catch (err) {
      alert(err);
    }
  };

  const generate = async (data: { prompt: string }) => {
    if (!props.params?.id) {
      return;
    }

    try {
      let url = '';
      const response = await fetchService
        .POST('/generator/predict/{documentId}/scribble', {
          params: {
            path: { documentId: props.params.id },
          },
          body: {
            prompt: data.prompt,
          },
        })
        .then((res) => res.data);

      url = (response as any).url;

      router.push(url);
    } catch (err) {
      alert(err);
    }
  };

  const deleteRecord = async (id?: string) => {
    if (!id) {
      return;
    }

    try {
      await fetchService.DELETE('/documents/{id}', {
        params: {
          path: { id: id },
        },
      });
      router.replace('/portal');
      alert('success');
    } catch (err) {
      alert(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.record) {
    return <div>404</div>;
  }

  return (
    <div className="w-full h-screen">
      <SketchCanvasPanel
        record={data.record}
        onSave={save}
        onDelete={deleteRecord}
        onGenerate={generate}
      />
    </div>
  );
}
