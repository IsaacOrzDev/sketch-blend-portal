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
  generatedImage?: string;
}

export default function GenerationResultDialog(props: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (props.open) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const confirm = () => {
    setOpen(false);
    router.replace('/portal');
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>The generated image</AlertDialogTitle>
          <img src={props.generatedImage} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={confirm}>Share it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
