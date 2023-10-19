'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import { toast } from '@/components/ui/use-toast';
import fetchService from '@/services/fetch-service';
import { useRouter } from 'next/navigation';

interface Props {}

export default function NewCanvasPage(props: Props) {
  const router = useRouter();

  const save = async (data: {
    paths: any;
    svg: string;
    image: string;
    title?: string;
    description?: string;
  }) => {
    try {
      const record = await fetchService.POST('/documents/create', {
        body: {
          title: data.title ?? '',
          description: data.description ?? '',
          paths: data.paths,
          svg: data.svg,
          image: data.image,
        },
      });
      router.replace(`/portal/canvas/${record.data?.id}`);
      toast({
        title: 'Saved',
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="w-full">
      <SketchCanvasPanel onSave={save} isNew />
    </div>
  );
}
