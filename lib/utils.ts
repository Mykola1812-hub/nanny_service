import type { Nanny, SortOption } from '@/types/nanny';

export const getAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const diff = Date.now() - birthDate.getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
};

export const sortNannies = (
  nannies: Nanny[],
  sort: SortOption,
): Nanny[] => {
  const list = [...nannies];

  switch (sort) {
    case 'a-z':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case 'z-a':
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case 'less-than-10':
      return list
        .filter(nanny => nanny.price_per_hour < 10)
        .sort((a, b) => a.price_per_hour - b.price_per_hour);
    case 'greater-than-10':
      return list
        .filter(nanny => nanny.price_per_hour >= 10)
        .sort((a, b) => a.price_per_hour - b.price_per_hour);
    case 'popular':
      return list.sort((a, b) => b.rating - a.rating);
    case 'not-popular':
      return list.sort((a, b) => a.rating - b.rating);
    default:
      return list;
  }
};

const FIREBASE_ERRORS: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered',
  'auth/invalid-credential': 'Invalid email or password',
  'auth/invalid-email': 'Enter a valid email',
  'auth/user-not-found': 'Invalid email or password',
  'auth/wrong-password': 'Invalid email or password',
  'auth/too-many-requests': 'Too many attempts, try again later',
  'auth/weak-password': 'Password is too weak',
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
  ) {
    const code = (error as { code: string }).code;
    return FIREBASE_ERRORS[code] ?? 'Something went wrong, please try again';
  }
  return 'Something went wrong, please try again';
};
