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
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import { useGoogleLogin } from '@react-oauth/google';
import fetchService from '@/services/fetch-service';
import { useState } from 'react';
import { toast } from './ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface Props {
  isLogin?: boolean;
}

export function StartAccount(props: Props) {
  const router = useRouter();
  // const search = useSearchParams();

  // const isLogin = search.get('type') === 'login';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [type, setType] = useState(props.isLogin ? 'login' : 'register');

  const onProcessPasswordLessLogin = async () => {
    if (!username || !email) {
      toast({
        variant: 'destructive',
        title: 'Please enter your username and email.',
      });
      return;
    }

    // const tokenResult = await fetchService.POST(
    //   '/auth/password-less/generate',
    //   {
    //     body: { email, username },
    //   }
    // );

    // if (tokenResult.error) {
    //   alert(tokenResult.error.message);
    //   return;
    // }

    // router.push(
    //   '/api/auth/password-less?token=' + (tokenResult.data as any).token
    // );

    const result = await fetchService.POST('/auth/password-less/send-email', {
      body: {
        email,
        username,
      },
    });
    if (!result.error) {
      setSent(true);
      toast({
        title: 'Email sent',
      });
    }
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
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/github`,
    });
    router.push(`https://github.com/login/oauth/authorize?${params}`);
  };

  const isLogin = type === 'login';

  return (
    <>
      <Tabs
        defaultValue={type}
        onValueChange={(value) => {
          setType(value);
        }}
        className="w-full mb-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="mb-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {isLogin ? 'Login' : 'Register'}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? 'Enter your email below to login to your account'
              : 'Enter your email below to register your account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {!isLogin && (
              <>
                <Label htmlFor="email">Username</Label>
                <Input
                  id="name"
                  className="mb-4"
                  type="text"
                  placeholder="Your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="mb-4"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={onProcessPasswordLessLogin}>
            {props.isLogin ? 'Continue' : 'Register Account'}
          </Button>
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
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <Button variant="outline" onClick={signInWithGithub}>
              <Icons.gitHub className="mr-2 h-4" />
              Github
            </Button>
            <Button variant="outline" onClick={() => googleLogin()}>
              <Icons.google className="mr-2 h-4" />
              Google
            </Button>
          </div>
        </CardFooter>
      </Card>
      {/* {isLogin ? (
        <Label>
          Do not yout a account yet?{' '}
          <a href="/?type=register">Please Register</a>
        </Label>
      ) : (
        <Label>
          Already have a account ?<a href="/?type=login">Please login</a>
        </Label>
      )} */}
    </>
  );
}
