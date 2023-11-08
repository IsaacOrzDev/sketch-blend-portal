import { Github, Book, Figma } from 'lucide-react';
import { Alert } from './ui/alert';
import { getDocUrl, isClusterExist } from '@/lib/server-utils';

interface Props {
  hasPlaceholder?: boolean;
}

export default function Footer(props: Props) {
  return (
    <>
      <div className="w-full fixed bottom-0 left-0 z-30 flex justify-center items-center max-xl:px-4 bg-background border-b border-black">
        <div className="max-h-40 py-4 w-full lg:max-w-6xl">
          {!isClusterExist() && (
            <Alert className="mb-4 bg-yellow-300">
              The developer has shut down the{' '}
              <a href="https://kubernetes.io/" className="underline">
                Kubnernetes
              </a>{' '}
              cluster to save money 💵, the website can only be used for viewing
              at the moment.
            </Alert>
          )}
          <div className="w-full flex justify-between items-center">
            <p className="text text-sm">
              This is a demo application, the backend is built with{' '}
              <a
                href="https://aws.amazon.com/microservices"
                className="underline"
              >
                micro-services architecture
              </a>{' '}
              and host in{' '}
              <a href="https://kubernetes.io/" className="underline">
                Kubnernetes
              </a>{' '}
              with{' '}
              <a href="https://aws.amazon.com/" className="underline">
                AWS
              </a>
              .
            </p>
            <div className="flex items-center gap-4 max-sm:gap-2">
              <a href={process.env.NEXT_PUBLIC_FIGMA_URL} target="_blank">
                <Figma />
              </a>
              <a href={getDocUrl()} target="_blank">
                <Book />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_GITHUB_PROJECT_URL}
                target="_blank"
              >
                <Github />
              </a>
            </div>
          </div>
        </div>
      </div>
      {props.hasPlaceholder && (
        <div className={`w-full mb-4 ${isClusterExist() ? 'h-20' : 'h-24'}`} />
      )}
    </>
  );
}
