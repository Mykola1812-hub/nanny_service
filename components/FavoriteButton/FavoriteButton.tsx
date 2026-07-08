'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './FavoriteButton.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useModalStore } from '@/lib/store/modalStore';
import { addFavorite, removeFavorite } from '@/lib/api/favoritesApi';

interface FavoriteButtonProps {
  nannyId: string;
}

export default function FavoriteButton({ nannyId }: FavoriteButtonProps) {
  const [pending, setPending] = useState(false);
  const { user, isAuthenticated, favorites } = useAuthStore();
  const toggleFavorite = useAuthStore(state => state.toggleFavorite);
  const openLogin = useModalStore(state => state.openLogin);

  const isFavorite = favorites.includes(nannyId);

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      toast('Please log in to add nannies to favorites');
      openLogin();
      return;
    }

    setPending(true);
    toggleFavorite(nannyId);

    try {
      if (isFavorite) {
        await removeFavorite(user.uid, nannyId);
      } else {
        await addFavorite(user.uid, nannyId);
      }
    } catch {
      toggleFavorite(nannyId);
      toast.error('Could not update favorites');
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      className={`${css.button} ${isFavorite ? css.active : ''}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      onClick={handleClick}
      disabled={pending}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21s-7.5-4.6-9.6-9.2C1 8.4 2.6 5.5 5.6 5.1c1.9-.3 3.6.7 4.4 2.1.8-1.4 2.5-2.4 4.4-2.1 3 .4 4.6 3.3 3.2 6.7C19.5 16.4 12 21 12 21z"
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </button>
  );
}
