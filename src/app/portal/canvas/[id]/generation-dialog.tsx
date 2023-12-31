import { AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Loader from '@/components/loader';
import fetchService from '@/services/fetch-service';
import BlurImage from '@/components/blur-image';

interface Props {
  open?: boolean;
  sourceImage?: string;
  documentId: string;
  onClose?: () => void;
}

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: 'Prompt must be at least 2 characters.',
  }),
});

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export default function GenerationDialog(props: Props) {
  const [stage, setStage] = useState<'prompt' | 'loading' | 'generated'>(
    'prompt'
  );
  const [taskId, setTaskId] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (props.open) {
      setStage('prompt');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const generate = async (data: z.infer<typeof FormSchema>) => {
    setStage('loading');
    try {
      const response = await fetchService
        .POST('/generator/predict/{documentId}/scribble-background', {
          params: {
            path: { documentId: props.documentId },
          },
          body: {
            prompt: data.prompt,
          },
        })
        .then((res) => res.data);

      setTaskId(response?.id ?? '');
      // setGeneratedImage(url);
      // setStage('generated');
      // router.push(url);
    } catch (err) {
      alert(err);
      setStage('prompt');
    }
  };

  const checkStatus = useCallback(async () => {
    try {
      const response = await fetchService.POST(
        '/generator/predict/status/{taskId}',
        {
          params: {
            path: { taskId },
          },
        }
      );
      if (response.data?.status === 'succeeded') {
        setGeneratedImage(response.data.url ?? '');
        setTaskId('');
        setStage('generated');
        return true;
      } else if (response.data?.status === 'failed') {
        toast({
          title: 'Something went wrong. Please try again.',
          type: 'foreground',
        });
        setTaskId('');
        setStage('prompt');
        return true;
      }
    } catch (err) {
      alert(err);
      setTaskId('');
      setStage('prompt');
      return true;
    }
    return false;
  }, [taskId]);

  const keepCheckingStatus = useCallback(async () => {
    let stop = false;
    while (!stop) {
      stop = await checkStatus();
      await wait(3000);
    }
  }, [checkStatus]);

  const retry = () => {
    setStage('prompt');
  };

  const share = async () => {
    setStage('loading');
    try {
      let url = '';
      const response = await fetchService.POST('/posts/create', {
        body: {
          documentId: props.documentId,
          imageUrl: generatedImage,
          prompt: form.getValues().prompt,
        },
      });
      if (response.error) {
        alert(response.error);
        setStage('prompt');
      }

      router.push('/portal?isConfetti=true');
    } catch (err) {
      alert(err);
      setStage('prompt');
    }
  };

  useEffect(() => {
    if (taskId && stage === 'loading') {
      keepCheckingStatus();
    }
  }, [keepCheckingStatus, stage, taskId]);

  return (
    <AlertDialog open={props.open}>
      {stage === 'prompt' && (
        <AlertDialogContent className="max-sm:h-full">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Generate new image base on your sketch
            </AlertDialogTitle>
            <AlertDescription>
              You can generate a new image based on your drawing and a prompt.
            </AlertDescription>
          </AlertDialogHeader>
          <BlurImage
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              props.sourceImage ?? ''
            )}`}
            className="rounded-sm border-2 border-primary mx-auto max-sm:max-h-[300px]"
            alt="source"
            useNativeElement
          />
          <Form {...form}>
            <form className="w-full space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Please input any text</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={props.onClose}
              onTouchEnd={props.onClose}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={form.handleSubmit(generate)}
              onTouchEnd={form.handleSubmit(generate)}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
      {stage === 'loading' && (
        <AlertDialogContent className="max-sm:h-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Loading</AlertDialogTitle>
            <AlertDescription>It may take a few minutes.</AlertDescription>
          </AlertDialogHeader>
          <div className="mx-auto">
            <Loader />
          </div>
        </AlertDialogContent>
      )}
      {stage === 'generated' && (
        <AlertDialogContent className="max-sm:h-full overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Completed!</AlertDialogTitle>
            <AlertDialogDescription>
              You have generate a new image based on your sketch.
            </AlertDialogDescription>
            <BlurImage
              src={generatedImage}
              alt="generated"
              className="rounded-sm  mx-auto max-h-[250px]"
              useNativeElement
            />
            <BlurImage
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                props.sourceImage ?? ''
              )}`}
              className="mt-4 rounded-sm border-2 border-primary mx-auto max-h-[250px]"
              alt="source"
              useNativeElement
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={props.onClose}
              onTouchEnd={props.onClose}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogCancel onClick={retry} onTouchEnd={retry}>
              Retry
            </AlertDialogCancel>
            <AlertDialogAction onClick={share} onTouchEnd={share}>
              Post it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
