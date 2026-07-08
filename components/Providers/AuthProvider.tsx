'use client';

import { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientApp';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchFavorites } from '@/lib/api/favoritesApi';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const setFavorites = useAuthStore(state => state.setFavorites);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        clearAuth();
        return;
      }

      setUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName ?? firebaseUser.email ?? '',
        email: firebaseUser.email ?? '',
      });

      try {
        const favorites = await fetchFavorites(firebaseUser.uid);
        setFavorites(favorites);
      } catch {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [setUser, clearAuth, setFavorites]);

  return children;
}
