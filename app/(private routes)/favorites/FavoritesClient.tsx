'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import css from './FavoritesPage.module.css';
import Filters from '@/components/Filters/Filters';
import NanniesList from '@/components/NanniesList/NanniesList';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';
import { fetchNannies } from '@/lib/api/nanniesApi';
import { sortNannies } from '@/lib/utils';
import { NANNIES_PER_PAGE } from '@/lib/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { useFilterStore } from '@/lib/store/filterStore';

export default function FavoritesClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, favorites } = useAuthStore();
  const sort = useFilterStore(state => state.sort);
  const [visibleCount, setVisibleCount] = useState(NANNIES_PER_PAGE);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const { data, isLoading } = useQuery({
    queryKey: ['nannies'],
    queryFn: fetchNannies,
    enabled: isAuthenticated,
  });

  const favoriteNannies = useMemo(() => {
    const onlyFavorites = (data ?? []).filter(nanny =>
      favorites.includes(nanny.id),
    );
    return sortNannies(onlyFavorites, sort);
  }, [data, favorites, sort]);

  useEffect(() => {
    setVisibleCount(NANNIES_PER_PAGE);
  }, [sort]);

  const visible = favoriteNannies.slice(0, visibleCount);
  const hasMore = visibleCount < favoriteNannies.length;

  if (isAuthLoading || !isAuthenticated) {
    return <p className={css.status}>Loading...</p>;
  }

  return (
    <main className={css.page}>
      <div className={css.container}>
        <Filters />

        {isLoading && <p className={css.status}>Loading favorites...</p>}

        {!isLoading && favoriteNannies.length === 0 && (
          <p className={css.status}>
            You have no favorite nannies yet. Add some from the Nannies page.
          </p>
        )}

        {visible.length > 0 && (
          <div className={css.results}>
            <NanniesList nannies={visible} />
            {hasMore && (
              <LoadMoreBtn
                onClick={() =>
                  setVisibleCount(prev => prev + NANNIES_PER_PAGE)
                }
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
