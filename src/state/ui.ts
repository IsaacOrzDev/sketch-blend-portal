import { atom, useAtom } from 'jotai';

export const themeAtom = atom<'light' | 'dark' | 'system'>('system');

export const loadingAtom = atom(false);
