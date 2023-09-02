'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ClientComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log({ session, status });
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {status} {status === 'authenticated' && session.user?.name}
      <button onClick={() => router.push('/api/auth/signout')}>Sign out</button>
    </main>
  );
}
