import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../firebase/clientApp';
import type { AppUser } from '@/types/user';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterPayload): Promise<AppUser> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  await set(ref(db, `users/${user.uid}/profile`), { name, email });
  return { uid: user.uid, name, email };
};

export const login = async ({
  email,
  password,
}: LoginPayload): Promise<AppUser> => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return {
    uid: user.uid,
    name: user.displayName ?? email,
    email: user.email ?? email,
  };
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};
