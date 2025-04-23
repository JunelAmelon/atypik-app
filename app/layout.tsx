import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Atypik | Transport sécurisé pour enfants',
  description: 'Service de transport sécurisé pour enfants',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#FFF7F0" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}