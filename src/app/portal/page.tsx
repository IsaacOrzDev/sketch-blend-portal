'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import fetchService from '@/services/fetch-service';
import { useRouter } from 'next/navigation';

export default function ClientComponent() {
  const router = useRouter();

  const save = async (data: { paths: any; svg: string; image: string }) => {
    await fetchService.POST('/documents', {
      body: {
        title: 'test',
        description: 'test',
        paths: data.paths,
        svg: data.svg,
        image: data.image,
      },
    });
    alert('success');
  };

  return (
    <div className="flex flex-1 min-h-screen flex-col items-center">
      <SketchCanvasPanel onSave={save} />
    </div>
  );
}
