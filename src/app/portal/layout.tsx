import { getSessionFromServer } from '@/utils/auth';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();

  console.log('server session', session);

  return <>{children}</>;
}
