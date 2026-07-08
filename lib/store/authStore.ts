import { create } from 'zustand';
import type { AppUser } from '@/types/user';

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AppUser | null;
  favorites: string[];
  setUser: (user: AppUser) => void;
  clearAuth: () => void;
  setLoading: (value: boolean) => void;
  setFavorites: (ids: string[]) => void;
  toggleFavorite: (id: string) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  favorites: [],
  setUser: user => set({ user, isAuthenticated: true, isLoading: false }),
  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      favorites: [],
    }),
  setLoading: value => set({ isLoading: value }),
  setFavorites: ids => set({ favorites: ids }),
  toggleFavorite: id =>
    set(state => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter(favId => favId !== id)
        : [...state.favorites, id],
    })),
}));
