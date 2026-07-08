import type { Metadata } from 'next';
import NanniesClient from './NanniesClient';

export const metadata: Metadata = {
  title: 'Nannies — Nanny.Services',
  description: 'Browse, sort and filter trusted babysitters',
};

export default function NanniesPage() {
  return <NanniesClient />;
}
