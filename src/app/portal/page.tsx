'use client';

import SketchCanvasPanel from '@/components/sketch-canvas-panel';
import { ThemeProvider } from '@/components/theme-provider';
import { useRouter } from 'next/navigation';

export default function ClientComponent() {
  const router = useRouter();
  return (
    <div className="flex flex-1 min-h-screen flex-col items-center">
      <SketchCanvasPanel />
    </div>
  );
}
