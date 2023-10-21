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
import BlurImage from '../blur-image';

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
          <div className="flex flex-col items-center gap-7">
            <BlurImage
              src={props.record?.imageUrl ?? ''}
              width={props.record?.imageInfo?.width ?? 0}
              height={props.record?.imageInfo?.height ?? 0}
              alt="generated image"
              className="rounded-sm"
            />
            <BlurImage
              src={props.record?.sourceImageUrl ?? ''}
              width={props.record?.sourceImageInfo?.width ?? 0}
              height={props.record?.sourceImageInfo?.height ?? 0}
              alt="source image"
              className="rounded-sm border-2 border-primary"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={props.onClose}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
