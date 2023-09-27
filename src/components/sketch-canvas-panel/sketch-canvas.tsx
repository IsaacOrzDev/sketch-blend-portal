'use client';

import React, { Ref } from 'react';
import {
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from 'react-sketch-canvas';

export default function SketchCanvas(
  props: ReactSketchCanvasProps & { canvasRef?: Ref<ReactSketchCanvasRef> }
) {
  return <ReactSketchCanvas {...props} ref={props.canvasRef} />;
}
