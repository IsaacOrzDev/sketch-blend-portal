'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { PostRecord } from '@/types';
import Image from 'next/image';
import BlurImage from '../blur-image';
import { toast } from '../ui/use-toast';

interface Props {
  record?: PostRecord | null;
  open?: boolean;
  isOwner?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
}

export default function SourceDialog(props: Props) {
  const copy = () => {
    if (!navigator.share) {
      window.navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${props.record?.id}`
      );
      toast({
        title: 'Copied',
        content: 'Copied',
      });
    } else {
      navigator.share({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${props.record?.id}`,
      });
    }
  };

  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent className="max-sm:h-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-outline text-2xl">
            {props.record?.prompt}
          </AlertDialogTitle>
          <div className="flex flex-col items-center gap-7">
            <BlurImage
              src={props.record?.imageUrl ?? ''}
              width={props.record?.imageInfo?.width ?? 0}
              height={props.record?.imageInfo?.height ?? 0}
              alt="generated image"
              className="rounded-sm mx-auto max-h-[250px]"
            />
            <BlurImage
              src={props.record?.sourceImageUrl ?? ''}
              width={props.record?.sourceImageInfo?.width ?? 0}
              height={props.record?.sourceImageInfo?.height ?? 0}
              alt="source image"
              className="rounded-sm border-2 border-primary mx-auto max-h-[250px]"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onClose} onTouchEnd={props.onClose}>
            Close
          </AlertDialogCancel>
          {props.isOwner && (
            <AlertDialogCancel
              className="max-sm:mb-2"
              onClick={props.onDelete}
              onTouchEnd={props.onDelete}
            >
              Delete
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={copy} onTouchEnd={copy}>
            Copy link
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
