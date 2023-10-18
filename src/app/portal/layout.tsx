import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import COOKIES_CONFIG from '@/config/cookie-config';
import fetchService from '@/services/fetch-service';
import ProfileProvider from '@/components/profile-provider';
import Header from '@/components/header';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIES_CONFIG.ACCESS_TOKEN_KEY)?.value;

  if (!accessToken) {
    redirect('/start');
  }

  const profile = await fetchService.POST('/auth/access-token/verify', {
    body: { token: accessToken },
  });

  if (!!profile.error) {
    redirect('/start');
  }

  return (
    <ProfileProvider {...profile.data}>
      <Header profile={profile.data} />
      <div className="flex w-full">{children}</div>
    </ProfileProvider>
  );
}
