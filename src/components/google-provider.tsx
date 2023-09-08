'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleProvider = (props: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {props.children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
