'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import fetchService from '@/services/fetch-service';
import { useRouter } from 'next/navigation';

interface Props {}

export default function NewCanvasPage(props: Props) {
  const router = useRouter();

  const save = async (data: { paths: any; svg: string; image: string }) => {
    try {
      const record = await fetchService.POST('/documents', {
        body: {
          title: 'test',
          description: 'test',
          paths: data.paths,
          svg: data.svg,
          image: data.image,
        },
      });
      router.replace(`/portal/canvas/${record.data?.id}`);
      alert('success');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="w-full h-screen">
      <SketchCanvasPanel onSave={save} />
    </div>
  );
}
