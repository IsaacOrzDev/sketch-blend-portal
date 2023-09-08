'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/registry/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/registry/card';
import { Input } from '@/components/registry/input';
import { Label } from '@/components/registry/label';
import { signIn } from 'next-auth/react';
import { OpenAPI } from '@/services/openapi';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useGoogleLogin } from '@react-oauth/google';

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function CreateAccount() {
  const router = useRouter();

  const onSubmit = () => {
    signIn('credentials');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      router.push('/api/auth/google?code=' + tokenResponse.code);
    },
    flow: 'auth-code',
  });

  const signInWithGithub = async () => {
    const params = qs.stringify({
      scope: 'user',
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_BASE_URL,
    });
    router.push(`https://github.com/login/oauth/authorize?${params}`);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={signInWithGithub}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" onClick={() => googleLogin()}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSubmit}>
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
}
