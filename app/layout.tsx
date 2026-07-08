import type { Metadata } from 'next';
import { Manrope, Fraunces } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/Providers/TanStackProvider';
import AuthProvider from '@/components/Providers/AuthProvider';
import AuthModals from '@/components/AuthModals/AuthModals';

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
});

const fraunces = Fraunces({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Nanny.Services',
  description: 'Find trusted babysitters online for all occasions',
  openGraph: {
    type: 'website',
    title: 'Nanny.Services',
    description: 'Find trusted babysitters online for all occasions',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            <AuthModals />
            <Toaster position="top-center" />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
