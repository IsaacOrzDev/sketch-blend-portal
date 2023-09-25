'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { paths } from './object';
import dynamic from 'next/dynamic';

const SketchCanvas = dynamic(() => import('./sketch-canvas'), {
  ssr: false,
});

export default function SketchCanvasPanel() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isEraseMode, setIsEraseMode] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // setTheme('light');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full dark:bg-[#1e1d1d]">
      <SketchCanvas
        canvasRef={canvasRef}
        className="select-none border-none cursor-crosshair"
        style={{ border: 'none' }}
        canvasColor="transparent"
        width="100%"
        height="100%"
        strokeWidth={strokeWidth}
        strokeColor={theme === 'light' ? 'black' : 'white'}
      />
      <div className="paperOverlay" />
      <div className="absolute top-0 left-0 w-full py-2 px-4 flex justify-between items-center">
        <div className="flex gap-x-2">
          <Button
            onClick={() => {
              console.log('canvasRef}', canvasRef);
              canvasRef.current?.undo();
            }}
          >
            Undo
          </Button>
          <Button
            onClick={() => {
              canvasRef.current?.redo();
            }}
          >
            Redo
          </Button>
          <Button
            onClick={() => {
              canvasRef.current?.clearCanvas();
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              setIsEraseMode(!isEraseMode);
              canvasRef.current?.eraseMode(!isEraseMode);
            }}
          >
            {isEraseMode ? 'Erase' : 'Pen'}
          </Button>
          <Button
            onClick={async () => {
              const data = await canvasRef.current?.exportPaths();
              // const data = await canvasRef.current?.exportSvg();
              console.log(data);
            }}
          >
            Export Paths
          </Button>
          <Button
            onClick={async () => {
              const data = await canvasRef.current?.exportSvg();
              console.log(data);
            }}
          >
            Export Svg
          </Button>
          <Button
            onClick={async () => {
              const data = await canvasRef.current?.exportImage('png');
              console.log(data);
            }}
          >
            Export Image
          </Button>
          <Button
            onClick={() => {
              canvasRef.current?.clearCanvas();
              canvasRef.current?.loadPaths(paths);
            }}
          >
            Load
          </Button>
        </div>
        <ModeToggle />
      </div>
      <div className="absolute left-2 bottom-[50%] h-[300px] transform translate-y-[50%]">
        <Slider
          defaultValue={[strokeWidth]}
          max={50}
          step={1}
          orientation="vertical"
          className="flex-col h-full w-[20px]"
          onValueChange={(value) => {
            setStrokeWidth(value[0]);
          }}
        />
      </div>
    </div>
  );
}
