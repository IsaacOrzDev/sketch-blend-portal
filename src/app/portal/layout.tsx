import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import COOKIES_CONFIG from '@/config/cookie-config';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIES_CONFIG.ACCESS_TOKEN_KEY)?.value;

  if (!accessToken) {
    redirect('/', RedirectType.replace);
  }

  return <>{children}</>;
}
