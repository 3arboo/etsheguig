'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import BrandLogo from '@/components/brand/BrandLogo';

type Lang = 'ar' | 'fr';

const navContent = {
  ar: {
    links: [
      { label: 'الرئيسية', href: '#hero' },
      { label: 'خدماتنا', href: '#services' },
      { label: 'الحجز', href: '#booking' },
      { label: 'من نحن', href: '#trust' },
      { label: 'اتصل بنا', href: '#footer' },
    ],
    cta: 'اطلب الآن',
  },
  fr: {
    links: [
      { label: 'Accueil', href: '#hero' },
      { label: 'Services', href: '#services' },
      { label: 'Réservation', href: '#booking' },
      { label: 'À propos', href: '#trust' },
      { label: 'Contact', href: '#footer' },
    ],
    cta: 'Demander',
  },
};

export default function Navbar({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = navContent[lang];
  const isRTL = lang === 'ar';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal/90 backdrop-blur-xl border-b border-steel/40 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center">
          <BrandLogo compact />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {t.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-sm font-medium text-steel-dark transition-colors hover:text-brand-red ${
                isRTL ? 'font-arabic' : 'font-inter'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right side: Lang toggle + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-full border border-steel/60 bg-white/60 p-0.5 sm:flex">
            <button
              onClick={() => setLang('ar')}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                lang === 'ar'
                  ? 'bg-brand-red text-white'
                  : 'text-steel-dark hover:text-brand-red'
              }`}
            >
              AR
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                lang === 'fr'
                  ? 'bg-brand-red text-white'
                  : 'text-steel-dark hover:text-brand-red'
              }`}
            >
              FR
            </button>
          </div>

          <a
            href="#booking"
            className="hidden rounded-lg bg-brand-red px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition-all hover:bg-brand-red-light hover:shadow-brand-red/50 sm:block"
          >
            {t.cta}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-steel/50 text-steel-dark lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-steel/40 bg-charcoal/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {t.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium text-steel-dark transition-colors hover:bg-steel/20 hover:text-brand-red ${
                    isRTL ? 'font-arabic text-right' : 'font-inter'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => setLang('ar')}
                  className={`flex-1 rounded-lg border px-4 py-2 text-xs font-semibold ${
                    lang === 'ar' ? 'border-brand-red bg-brand-red/10 text-brand-red' : 'border-steel/50 text-steel-dark'
                  }`}
                >
                  العربية
                </button>
                <button
                  onClick={() => setLang('fr')}
                  className={`flex-1 rounded-lg border px-4 py-2 text-xs font-semibold ${
                    lang === 'fr' ? 'border-brand-red bg-brand-red/10 text-brand-red' : 'border-steel/50 text-steel-dark'
                  }`}
                >
                  Français
                </button>
              </div>
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-brand-red px-4 py-3 text-center text-sm font-bold text-white"
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
