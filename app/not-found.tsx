import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page not found',
};

export default function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        minHeight: '50vh',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <h1 style={{ fontSize: '40px', margin: 0 }}>404</h1>
      <p style={{ color: 'var(--muted)', margin: 0 }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '8px',
          padding: '12px 28px',
          color: '#fff',
          background: 'var(--emerald)',
          borderRadius: '999px',
        }}
      >
        Back home
      </Link>
    </main>
  );
}
