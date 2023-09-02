'use client';

import { useSession } from 'next-auth/react';

export default function ClientComponent() {
  const { data: session, status } = useSession();
  console.log({ session, status });
  return (
    <div>
      {status} {status === 'authenticated' && session.user?.name}
    </div>
  );
}
