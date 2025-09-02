import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SEO_DEFAULTS } from '@/lib/constants';
import { FuelFoodsProvider } from '@/context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: SEO_DEFAULTS.title,
    template: '%s | fuelfoods.store',
  },
  description: SEO_DEFAULTS.description,
  openGraph: SEO_DEFAULTS.openGraph,
  twitter: SEO_DEFAULTS.twitter,
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FuelFoodsProvider>
          <div className="min-h-screen flex flex-col">
            {/* Sitewide top banner - placed above navigation */}
            <div className="bg-black text-white text-center py-3 px-4">
              <p className="text-sm font-medium">
                Now Shipping Exclusively To The Northeast!
              </p>
            </div>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </FuelFoodsProvider>
      </body>
    </html>
  );
}
