'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function HomeContent() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background">
      <Card className="p-8">
        <ModeToggle />
        <Button onClick={() => router.push('/api/auth/signin')}>Signin</Button>
      </Card>
    </main>
  );
}
