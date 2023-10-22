import { toast } from '@/components/ui/use-toast';
import fetchService from '@/services/fetch-service';
import { loadingAtom } from '@/state/ui';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export default function useAddingNewSketch() {
  const router = useRouter();
  const [, setLoading] = useAtom(loadingAtom);

  const onCreate = async () => {
    setLoading(true);
    const response = await fetchService.POST('/documents/create/empty', {});

    if (response.error) {
      setLoading(false);
      alert(response.error);

      return;
    }
    router.push(`/portal/canvas/${response.data?.id}`);
    setLoading(false);
    toast({
      title: 'Please draw anything on the canvas to generate new image.',
    });
  };

  return onCreate;
}
