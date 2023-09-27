'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import fetchService from '@/services/fetch-service';

interface Props {}

export default function NewCanvasPage(props: Props) {
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
    <div className="w-full h-screen">
      <SketchCanvasPanel onSave={save} />
    </div>
  );
}
