import { AuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/portal`;
    },

    async signIn({ user, account, profile, email, credentials }) {
      console.log('account', account);
      return true;
    },
    async jwt({ token, user, account, profile }) {
      token.apiAccessToken = 'testing';
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
