import { get, ref } from 'firebase/database';
import { db } from '../firebase/clientApp';
import type { Nanny } from '@/types/nanny';

export const fetchNannies = async (): Promise<Nanny[]> => {
  const snapshot = await get(ref(db, 'nannies'));

  if (!snapshot.exists()) {
    return [];
  }

  const value = snapshot.val();

  return Object.entries(value).map(([id, data]) => ({
    id,
    ...(data as Omit<Nanny, 'id'>),
  }));
};
