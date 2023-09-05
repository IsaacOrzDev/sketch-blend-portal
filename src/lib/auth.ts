import { DefaultService } from '@/services/openapi';
import { AuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        if (!credentials) return null;
        return { id: '', name: '', email: '' };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/portal`;
    },

    async signIn({ user, account, profile, email, credentials }) {
      console.log('account', account);
      switch (account?.provider) {
        case 'google':
          const result = await DefaultService.authControllerVerifyGoogleIdToken(
            {
              token: account.id_token!,
            }
          );
          if (!result) {
            return false;
          }
          return true;
        case 'github':
          return true;
        default:
          return false;
      }
    },
    async jwt({ token, user, account, profile }) {
      // const apiAccessToken =
      //   await DefaultService.authControllerGenerateAccessToken();
      // token.apiAccessToken = apiAccessToken;
      token.apiAccessToken = 'token';
      return token;
    },

    async session({ session, token, user }) {
      // session.user.id = token.id;
      (session as any).apiAccessToken = token.apiAccessToken;
      return session;
    },
  },
};

export const getSessionFromServer = () => {
  return getServerSession(authOptions);
};
