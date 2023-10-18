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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import fetchService from '@/services/fetch-service';

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

export default function GenerationDialog(props: Props) {
  const [stage, setStage] = useState<'prompt' | 'loading' | 'generated'>(
    'prompt'
  );
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
      let url = '';
      const response = await fetchService
        .POST('/generator/predict/{documentId}/scribble', {
          params: {
            path: { documentId: props.documentId },
          },
          body: {
            prompt: data.prompt,
          },
        })
        .then((res) => res.data);

      url = (response as any).url;
      setGeneratedImage(url);
      setStage('generated');
      // router.push(url);
    } catch (err) {
      alert(err);
      setStage('prompt');
    }
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
      console.log('response', response);
    } catch (err) {
      alert(err);
      setStage('prompt');
    }
  };

  // const confirm = () => {
  //   props.onClose && props.onClose();
  //   router.replace('/portal');
  // };

  return (
    <AlertDialog open={props.open}>
      {stage === 'prompt' && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Generate Image base on your sketch
            </AlertDialogTitle>
            <AlertDescription>
              You can generate a new image based on your drawing and a prompt.
            </AlertDescription>
          </AlertDialogHeader>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              props.sourceImage ?? ''
            )}`}
          />
          <Form {...form}>
            <form className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Please input any text</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={props.onClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={form.handleSubmit(generate)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
      {stage === 'loading' && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Loading</AlertDialogTitle>
            <AlertDescription>It may take a few minutes.</AlertDescription>
          </AlertDialogHeader>
          <Loader />
        </AlertDialogContent>
      )}
      {stage === 'generated' && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Completed</AlertDialogTitle>
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                props.sourceImage ?? ''
              )}`}
              className="mb-4"
            />
            <img src={generatedImage} />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={props.onClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={share}>Share it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}