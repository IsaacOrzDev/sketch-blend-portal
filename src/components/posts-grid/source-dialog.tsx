'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { PostRecord } from '@/types';
import Image from 'next/image';

interface Props {
  record?: PostRecord | null;
  open?: boolean;
  onClose?: () => void;
}

export default function SourceDialog(props: Props) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.record?.prompt}</AlertDialogTitle>
          <AlertDialogDescription>{props.record?.id}</AlertDialogDescription>
          <img src={props.record?.sourceImageUrl} />
          <img src={props.record?.imageUrl} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={props.onClose}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
