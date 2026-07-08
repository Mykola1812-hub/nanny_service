import { get, ref, remove, set } from 'firebase/database';
import { db } from '../firebase/clientApp';

export const fetchFavorites = async (uid: string): Promise<string[]> => {
  const snapshot = await get(ref(db, `users/${uid}/favorites`));

  if (!snapshot.exists()) {
    return [];
  }

  return Object.keys(snapshot.val());
};

export const addFavorite = async (
  uid: string,
  nannyId: string,
): Promise<void> => {
  await set(ref(db, `users/${uid}/favorites/${nannyId}`), true);
};

export const removeFavorite = async (
  uid: string,
  nannyId: string,
): Promise<void> => {
  await remove(ref(db, `users/${uid}/favorites/${nannyId}`));
};
