import { create } from 'zustand';
import type { SortOption } from '@/types/nanny';

interface FilterStore {
  sort: SortOption;
  setSort: (sort: SortOption) => void;
}

export const useFilterStore = create<FilterStore>(set => ({
  sort: 'show-all',
  setSort: sort => set({ sort }),
}));
