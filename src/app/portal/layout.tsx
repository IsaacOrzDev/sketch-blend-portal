import { getSessionFromServer } from '@/utils/auth';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();
  console.log('server session', session);

  if (!session) {
    redirect('/', RedirectType.replace);
  }

  return <>{children}</>;
}
