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

export default function SuccessSharedDialog(props: Props) {
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
          <AlertDialogTitle>Congratulations!</AlertDialogTitle>
          <AlertDialogDescription>
            You has share a new post with the generated image.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={confirm} onTouchEnd={confirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
