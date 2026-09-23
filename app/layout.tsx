import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ETS HEGUIUG — Services Pétroliers & Solutions Industrielles',
  description:
    'حلول متكاملة في كراء المعدات، الخدمات البترولية، النقل اللوجستي، وتوريد قطع الغيار الصناعية في الجزائر — ETS HEGUIUG.',
  keywords: [
    'كراء المعدات',
    'الخدمات البترولية',
    'النقل اللوجستي',
    'قطع الغيار الصناعية',
    'الهندسة الميكانيكية',
    'حاسي مسعود',
    'ورقلة',
    'ETS HEGUIUG',
  ],
  openGraph: {
    title: 'ETS HEGUIUG — Services Pétroliers & Solutions Industrielles',
    description:
      'حلول متكاملة في كراء المعدات، الخدمات البترولية، النقل اللوجستي، وتوريد قطع الغيار الصناعية.',
    type: 'website',
    locale: 'ar_DZ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${arabic.variable}`}>
      <body className="bg-charcoal text-steel-dark font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
