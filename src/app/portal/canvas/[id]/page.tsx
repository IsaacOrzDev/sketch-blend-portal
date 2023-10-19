'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import { toast } from '@/components/ui/use-toast';
import fetchService from '@/services/fetch-service';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useRef, useState } from 'react';
import GenerationDialog from './generation-dialog';
import Loader from '@/components/loader';

interface Props {
  params?: { id: string };
}

export default function CanvasContent(props: Props) {
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [showGenerateDialog, setShowGenerateDialog] = useState<boolean>(false);
  const [sourceImage, setSourceImage] = useState<string>('');

  const router = useRouter();

  const random = useRef(Date.now());
  const { data, isLoading, mutate } = useSWR(
    props.params?.id ? ['/documents/{id}', random] : null,
    (url) =>
      fetchService
        .GET('/documents/{id}', {
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
            title: '',
            description: null,
            paths: data.paths,
            svg: data.svg,
            image: data.image,
          },
        },
      });
      mutate();
      toast({
        title: 'Saved',
      });
    } catch (err) {
      alert(err);
    }
  };

  const processGenerate = async (data: {
    paths: any;
    svg: string;
    image: string;
  }) => {
    await save(data);
    setSourceImage(data.svg);
    setShowGenerateDialog(true);
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
      setGeneratedImage(url);
      // router.push(url);
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
      toast({
        title: 'Deleted',
      });
    } catch (err) {
      alert(err);
    }
  };

  if (isLoading) {
    return (
      <div
        className="w-full flex justify-center items-center"
        style={{ height: 'calc(100vh - 100px)' }}
      >
        <Loader />
      </div>
    );
  }

  if (!data?.record) {
    return <div>Not Found</div>;
  }

  return (
    <div className="w-full">
      {data.record && (
        <SketchCanvasPanel
          record={data.record}
          onSave={save}
          onDelete={deleteRecord}
          onGenerate={processGenerate}
        />
      )}
      <GenerationDialog
        open={showGenerateDialog}
        sourceImage={sourceImage}
        documentId={props.params?.id ?? ''}
        onClose={() => {
          setShowGenerateDialog(false);
        }}
      />
    </div>
  );
}
