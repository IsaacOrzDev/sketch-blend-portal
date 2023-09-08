import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import HomeContent from './content';

export default async function Home() {
  return <HomeContent />;
}
