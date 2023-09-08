'use client';

import { useRouter } from 'next/navigation';

export default function ClientComponent() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button onClick={() => {}}>Sign out</button>
    </main>
  );
}
