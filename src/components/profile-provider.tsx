'use client';

import { createContext, useContext } from 'react';

interface Props {
  username: string;
  email?: string | null;
  imageUrl?: string | null;
  children: React.ReactNode;
}

const ProfileContext = createContext<Omit<Props, 'children'>>({
  username: '',
});

export function useProfileContext() {
  return useContext(ProfileContext);
}

export default function ProfileProvider(props: Props) {
  const { children, ...others } = props;
  return (
    <ProfileContext.Provider value={others}>{children}</ProfileContext.Provider>
  );
}
