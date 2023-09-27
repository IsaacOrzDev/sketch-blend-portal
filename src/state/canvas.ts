import { atom } from 'jotai';

export const canvasRecordAtom = atom<{
  id?: string;
  title?: string;
  description?: string;
  paths?: any;
}>({});
