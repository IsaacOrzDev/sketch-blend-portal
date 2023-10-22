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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  open?: boolean;
}

export default function FirstTimeDialog(props: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (props.open) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirm = () => {
    setOpen(false);
    router.replace('/portal');
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome</AlertDialogTitle>
          <AlertDialogDescription>
            You can draw on the canvas and generate new image with AI.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={confirm} onTouchEnd={confirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
