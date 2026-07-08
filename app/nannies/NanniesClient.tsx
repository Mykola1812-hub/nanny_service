'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import css from './NanniesPage.module.css';
import Filters from '@/components/Filters/Filters';
import NanniesList from '@/components/NanniesList/NanniesList';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';
import { fetchNannies } from '@/lib/api/nanniesApi';
import { sortNannies } from '@/lib/utils';
import { NANNIES_PER_PAGE } from '@/lib/constants';
import { useFilterStore } from '@/lib/store/filterStore';

export default function NanniesClient() {
  const sort = useFilterStore(state => state.sort);
  const [visibleCount, setVisibleCount] = useState(NANNIES_PER_PAGE);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['nannies'],
    queryFn: fetchNannies,
  });

  const sorted = useMemo(
    () => sortNannies(data ?? [], sort),
    [data, sort],
  );

  useEffect(() => {
    setVisibleCount(NANNIES_PER_PAGE);
  }, [sort]);

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <main className={css.page}>
      <div className={css.container}>
        <Filters />

        {isLoading && <p className={css.status}>Loading nannies...</p>}
        {isError && (
          <p className={css.status}>
            Could not load nannies. Please try again later.
          </p>
        )}

        {!isLoading && !isError && sorted.length === 0 && (
          <p className={css.status}>No nannies match the selected filter.</p>
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
