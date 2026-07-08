'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useAuthStore } from '@/lib/store/authStore';

interface HeaderProps {
  variant?: 'solid' | 'hero';
}

export default function Header({ variant = 'solid' }: HeaderProps) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (variant === 'solid' && pathname === '/') {
    return null;
  }

  const isActive = (href: string) =>
    pathname === href ? `${css.link} ${css.active}` : css.link;

  return (
    <header
      className={`${css.header} ${variant === 'hero' ? css.heroHeader : ''}`}
    >
      <div className={css.inner}>
        <Link href="/" className={css.logo} aria-label="Home">
          Nanny<span>.Services</span>
        </Link>

        <nav className={css.nav} aria-label="Main navigation">
          <Link href="/" className={isActive('/')}>
            Home
          </Link>
          <Link href="/nannies" className={isActive('/nannies')}>
            Nannies
          </Link>
          {isAuthenticated && variant !== 'hero' && (
            <Link href="/favorites" className={isActive('/favorites')}>
              Favorites
            </Link>
          )}
        </nav>

        <AuthNavigation />
      </div>
    </header>
  );
}
