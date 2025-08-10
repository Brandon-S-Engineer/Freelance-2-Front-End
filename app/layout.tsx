import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Catálogo Edith Soria',
  description: 'Store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ModalProvider />

        <ToastProvider />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
