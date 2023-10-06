import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import COOKIES_CONFIG from '@/config/cookie-config';
import fetchService from '@/services/fetch-service';
import ProfileProvider from '@/components/profile-provider';
import Sidebar from '@/components/sidebar';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIES_CONFIG.ACCESS_TOKEN_KEY)?.value;

  if (!accessToken) {
    redirect('/');
  }

  const profile = await fetchService.POST('/auth/access-token/verify', {
    body: { token: accessToken },
  });

  if (!!profile.error) {
    redirect('/');
  }

  return (
    <ProfileProvider {...profile.data}>
      <div className="flex w-full">{children}</div>
    </ProfileProvider>
  );
}
