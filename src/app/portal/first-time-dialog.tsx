'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useAddingNewSketch from '@/hooks/use-adding-new-sketch';
import { useEffect, useState } from 'react';

interface Props {
  open?: boolean;
}

export default function FirstTimeDialog(props: Props) {
  const [open, setOpen] = useState(false);

  const onCreate = useAddingNewSketch();

  useEffect(() => {
    if (props.open) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirm = () => {
    setOpen(false);
    onCreate();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome!</AlertDialogTitle>
          <AlertDialogDescription>
            Sketch Blend is a demo website offers users the ability to draw
            sketches, generate new images based on their sketches using Stable
            Diffusion, and post these images with others.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={confirm} onTouchEnd={confirm}>
            Continue to draw
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
