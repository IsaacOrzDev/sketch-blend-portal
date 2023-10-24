import BlurImage from '@/components/blur-image';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import fetchService from '@/services/fetch-service';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  const post = await fetchService.GET('/posts/{id}', {
    params: {
      path: {
        id,
      },
    },
  });

  return {
    title: post.data?.record.prompt ?? '',
    description:
      'Sketch Blend is a demo website offers users the ability to draw sketches, generate new images based on their sketches using Stable Diffusion and ControlNet, and post these images with others.',
    openGraph: {
      title: post.data?.record.prompt ?? '',
      description:
        'Sketch Blend is a demo website offers users the ability to draw sketches, generate new images based on their sketches using Stable Diffusion and ControlNet, and post these images with others.',
      images: [post.data?.record.imageUrl ?? ''],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const id = params.id;
  const post = await fetchService.GET('/posts/{id}', {
    params: {
      path: {
        id,
      },
    },
  });

  return (
    <ScrollArea>
      <div className="flex flex-col items-center w-full">
        <Header onlyLogo />
        <div className="lg:max-w-6xl max-xl:px-4 h-full flex-1 flex flex-col items-center justify-center">
          <BlurImage
            className="rounded-sm mx-auto max-h-[300px]"
            src={post.data?.record.imageUrl ?? ''}
            height={post.data?.record.imageInfo.height ?? 0}
            width={post.data?.record.imageInfo.width ?? 0}
            alt={post.data?.record.prompt ?? ''}
          />

          <BlurImage
            className="mt-10 rounded-sm border-2 border-primary mx-auto max-h-[300px]"
            src={post.data?.record.sourceImageUrl ?? ''}
            height={post.data?.record.sourceImageInfo.height ?? 0}
            width={post.data?.record.sourceImageInfo.width ?? 0}
            alt={post.data?.record.sourceImageUrl ?? ''}
          />
          <p className="text-2xl font-bold text-outline mt-4">
            {post.data?.record.prompt ?? ''}
          </p>
        </div>
        <Footer hasPlaceholder />
      </div>
    </ScrollArea>
  );
}
