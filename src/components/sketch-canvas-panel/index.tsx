'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import dynamic from 'next/dynamic';
import { Undo, Redo, Eraser, Pen, Save } from 'lucide-react';
import GenerateSheet from './generate-sheet';
import SaveSheet from './save-sheet';

const SketchCanvas = dynamic(() => import('./sketch-canvas'), {
  ssr: false,
});

interface Props {
  isNew?: boolean;
  onSave?: (data: {
    svg: string;
    image: string;
    paths: any;
    title?: string;
    description?: string;
  }) => void;
  onDelete?: (id: string) => void;
  onGenerate?: (data: { svg: string; image: string; paths: any }) => void;
  record?: {
    id: string;
    paths: any;
  };
}

export default function SketchCanvasPanel(props: Props) {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isEraseMode, setIsEraseMode] = useState(false);

  const { theme, setTheme } = useTheme();

  const loadCanvas = async () => {
    if (!props.record) {
      return;
    }

    const paths = props.record.paths;
    if (paths) {
      await canvasRef.current?.clearCanvas();
      await canvasRef.current?.loadPaths(Object.values(paths));
    }
  };

  const saveCanvas = async () => {
    if (!props.onSave) {
      return;
    }

    const paths = (await canvasRef.current?.exportPaths()) ?? {};
    const svg = (await canvasRef.current?.exportSvg()) ?? '';
    const image = (await canvasRef.current?.exportImage('png')) ?? '';
    props.onSave({ paths, svg, image });
  };

  const generateImage = async () => {
    if (!props.onGenerate) {
      return;
    }

    const paths = (await canvasRef.current?.exportPaths()) ?? {};
    const svg = (await canvasRef.current?.exportSvg()) ?? '';
    const image = (await canvasRef.current?.exportImage('png')) ?? '';
    props.onGenerate({ paths, svg, image });
  };

  const saveNewCanvas = async (title: string, description?: string) => {
    if (!props.onSave) {
      return;
    }

    const paths = (await canvasRef.current?.exportPaths()) ?? {};
    const svg = (await canvasRef.current?.exportSvg()) ?? '';
    const image = (await canvasRef.current?.exportImage('png')) ?? '';
    props.onSave({ paths, svg, image, title, description });
  };

  const deleteCanvas = async () => {
    if (props.onDelete && props.record?.id) {
      props.onDelete(props.record.id);
    }
  };

  const exportImage = async () => {
    const data = await canvasRef.current?.exportImage('png');
    console.log(data);
    const a = document.createElement('a'); //Create <a>
    a.href = data ?? '';
    a.download = 'Image.png'; //File name Here
    a.click(); //Downloaded file
  };

  const exportSvg = async () => {
    const data = await canvasRef.current?.exportSvg();
    console.log(data);
  };

  const exportPaths = async () => {
    const data = await canvasRef.current?.exportPaths();
    // const data = await canvasRef.current?.exportSvg();
    console.log(data);
  };

  const clearCanvas = async () => {
    canvasRef.current?.clearCanvas();
  };

  useEffect(() => {
    if (props.record?.id) {
      setTimeout(() => {
        loadCanvas();
      }, 600);
    }
  }, [props.record?.id]);

  return (
    <div className="relative w-full h-full dark:bg-[#1e1d1d]">
      <SketchCanvas
        canvasRef={canvasRef}
        className="select-none border-none cursor-crosshair outline-none"
        style={{ border: 'none' }}
        canvasColor="transparent"
        width="100%"
        height="100%"
        strokeWidth={strokeWidth}
        strokeColor={theme === 'light' ? 'black' : 'white'}
      />
      <div className="absolute top-0 left-0 w-full py-2 px-4 flex justify-between items-center">
        <div className="flex gap-x-2">
          <Button
            variant="outline"
            onClick={() => {
              console.log('canvasRef}', canvasRef);
              canvasRef.current?.undo();
            }}
          >
            <Undo />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              canvasRef.current?.redo();
            }}
          >
            <Redo />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsEraseMode(!isEraseMode);
              canvasRef.current?.eraseMode(!isEraseMode);
            }}
          >
            {isEraseMode ? <Pen /> : <Eraser />}
          </Button>
          {props.isNew && <SaveSheet onSave={saveNewCanvas} />}
          {!props.isNew && (
            <Button variant="outline" onClick={saveCanvas}>
              <Save />
            </Button>
          )}
          {/* {props.onGenerate && <GenerateSheet onSubmit={props.onGenerate} />} */}
          {props.onGenerate && (
            <Button className="select-none" onClick={generateImage}>
              GENERATE
            </Button>
          )}
        </div>
        {/* <ModeToggle /> */}
      </div>
      <div className="absolute left-2 bottom-[50%] h-[300px] transform translate-y-[50%]">
        <Slider
          defaultValue={[strokeWidth]}
          max={50}
          step={1}
          orientation="vertical"
          className="flex-col h-full w-[20px] mb-2"
          onValueChange={(value) => {
            setStrokeWidth(value[0]);
          }}
        />
        {!isEraseMode ? <Pen /> : <Eraser />}
      </div>
    </div>
  );
}
