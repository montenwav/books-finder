import type { Metadata } from 'next';
import './globals.css';
import { PT_Serif } from 'next/font/google';
import AppProvider from './Provider';

export const metadata: Metadata = {
  title: 'Books Finder',
  description:
    'This is a website where you can find many books by genre, author and read more about your favorite ones',
};

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pt-serif',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body className={`${ptSerif.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
