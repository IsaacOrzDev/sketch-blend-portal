import { Github } from 'lucide-react';

interface Props {
  hasPlaceholder?: boolean;
}

export default function Footer(props: Props) {
  return (
    <>
      <div className="w-full h-20 fixed bottom-0 left-0 z-30 flex justify-center items-center max-xl:px-4 bg-background border-b border-black">
        <div className="w-full flex justify-between items-center lg:max-w-6xl">
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
          <a href={process.env.NEXT_PUBLIC_GITHUB_PROJECT_URL}>
            <Github />
          </a>
        </div>
      </div>
      {props.hasPlaceholder && <div className="w-full h-20 mb-4" />}
    </>
  );
}
