import { getSessionFromServer } from '@/utils/auth';
import { RedirectType } from 'next/dist/client/components/redirect';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import HomeContent from './content';

export default async function Home() {
  const session = await getSessionFromServer();
  console.log(session);

  if (session) {
    redirect('/portal', RedirectType.replace);
  }

  return <HomeContent />;
}
