import { AuthService, DefaultService } from '@/services/openapi';
import { Account, AuthOptions, User, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import apiService from '@/services/api-service';

type CustomUser = User & {
  apiAccessToken?: string;
};

const verifyOAuthToken = async (
  account: Account
): Promise<
  | {
      error?: string;
      success?: boolean;
    }
  | undefined
> => {
  try {
    switch (account.provider) {
      case 'google':
        const googleResult =
          await apiService.auth.authControllerVerifyGoogleIdToken({
            token: account.id_token!,
          });
        return googleResult;
      case 'github':
        const githubResult =
          await AuthService.authControllerVerifyGithubAccessToken({
            token: account.access_token!,
          });
        return githubResult;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signInWithOAuthToken = async (
  account: Account
): Promise<
  | {
      error?: string;
      token?: string;
      expiredAt?: string;
    }
  | undefined
> => {
  try {
    switch (account.provider) {
      case 'google':
        const googleResult =
          await apiService.auth.authControllerSignInWithGoogleIdToken({
            token: account.id_token!,
          });
        return googleResult;
      case 'github':
        const githubResult =
          await AuthService.authControllerSignInWithGithubAccessToken({
            token: account.access_token!,
          });
        return githubResult;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'email-password-less',
      credentials: {
        oneTimeToken: {
          label: 'Token',
          type: 'password',
        },
      },
      async authorize(credentials) {
        console.log('credentials', credentials);
        if (!credentials?.oneTimeToken) return null;
        const result =
          await apiService.auth.authControllerSignInWithPasswordLessToken({
            token: credentials.oneTimeToken,
          });

        return {
          id: 'id',
          name: 'name',
          email: 'email',
          token: 'token',
          ...result,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/portal`;
    },

    async signIn({ user, account, profile, email, credentials }) {
      const result = await verifyOAuthToken(account!);
      if (result && !result.error) {
        return true;
      } else if (result?.error) {
        console.log(result.error);
        return false;
      }
      return true;
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger !== 'signIn') {
        return token;
      }

      const userInfo = user as CustomUser;

      if (!!userInfo.apiAccessToken) {
        token.apiAccessToken = userInfo.apiAccessToken;
        return token;
      }

      if (!!account) {
        const result = await signInWithOAuthToken(account);
        console.log('result', result);
        if (result && !!result.token) {
          token.apiAccessToken = result.token;
          token.expires = result.expiredAt;
          return token;
        }
        if (result && result.error) {
          throw new Error(result.error);
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      (session as any).apiAccessToken = token.apiAccessToken;
      session.expires = token.expires as string;
      console.log('session', session);
      return session;
    },
  },
};

export const getSessionFromServer = () => {
  return getServerSession(authOptions);
};
