import type { Metadata } from 'next';
import FavoritesClient from './FavoritesClient';

export const metadata: Metadata = {
  title: 'Favorites — Nanny.Services',
  description: 'Your saved babysitters',
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
