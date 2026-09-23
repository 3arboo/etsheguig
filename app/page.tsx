'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hero/Hero';
import ServicePillars from '@/components/sections/ServicePillars';
import BookingWidget from '@/components/sections/BookingWidget';
import TrustBar from '@/components/sections/TrustBar';
import Footer from '@/components/layout/Footer';

type Lang = 'ar' | 'fr';

export default function Home() {
  const [lang, setLang] = useState<Lang>('ar');

  return (
    <main className="min-h-screen w-full bg-charcoal text-steel-dark" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <ServicePillars lang={lang} />
      <BookingWidget lang={lang} />
      <TrustBar lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
