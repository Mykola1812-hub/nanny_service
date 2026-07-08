import type { SortOption } from '@/types/nanny';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
  { value: 'less-than-10', label: 'Less than 10$' },
  { value: 'greater-than-10', label: 'Greater than 10$' },
  { value: 'popular', label: 'Popular' },
  { value: 'not-popular', label: 'Not popular' },
  { value: 'show-all', label: 'Show all' },
];

export const NANNIES_PER_PAGE = 3;
