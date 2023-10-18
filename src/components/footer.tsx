import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <div className="w-full h-20 fixed bottom-0 left-0 z-30 flex justify-center items-center max-xl:px-4 bg-background border-b border-black">
        <div className="w-full flex justify-between lg:max-w-6xl">
          <p className="text text-sm text-outline">
            This is a open-source demo application, the backend is built with
            microservices architecture and host in Kubnernetes with AWS.
          </p>
          <a href={process.env.NEXT_PUBLIC_GITHUB_PROJECT_URL}>
            <Github />
          </a>
        </div>
      </div>
      <div className="w-full h-20 mb-4" />
    </>
  );
}
