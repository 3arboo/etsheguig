'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import HeroSceneWrapper from './HeroSceneWrapper';

type Lang = 'ar' | 'fr';

const content = {
  ar: {
    badge: 'شريكك الصناعي في حاسي مسعود والجزائر',
    title: 'نُحَرّك المشاريع.. نُزَوّد الصناعة.. ونبني المستقبل',
    subtitle:
      'حلول متكاملة في كراء المعدات، الخدمات البترولية، النقل اللوجستي، وتوريد قطع الغيار الصناعية.',
    cta: 'اطلب استشارة / معدة الآن',
    secondary: 'تصفح خدماتنا',
    stats: [
      { value: '+100', label: 'معدة ثقيلة' },
      { value: '+500', label: 'مشروع منجز' },
      { value: '24/7', label: 'دعم ميداني' },
    ],
  },
  fr: {
    badge: 'Votre partenaire industriel à Hassi Messaoud & Algérie',
    title: 'Nous faisons avancer les projets.. nous équipons l\'industrie.. et nous bâtissons l\'avenir',
    subtitle:
      'Solutions intégrées en location d\'équipements, services pétroliers, transport logistique et fourniture de pièces de rechange industrielles.',
    cta: 'Demander une consultation',
    secondary: 'Voir nos services',
    stats: [
      { value: '+100', label: 'Engins lourds' },
      { value: '+500', label: 'Projets réalisés' },
      { value: '24/7', label: 'Support terrain' },
    ],
  },
};

export default function Hero({ lang }: { lang: Lang }) {
  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-charcoal"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/8 blur-[120px]" />
      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-red/30 to-transparent animate-scan" />
      </div>

      {/* 3D Scene - full background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <HeroSceneWrapper />
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />
      <div className={`absolute inset-0 z-10 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-charcoal/60 via-transparent to-transparent`} />

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-24 pb-12 lg:px-8">
        <div className={`flex flex-col ${isRTL ? 'items-start text-right' : 'items-start text-left'} gap-6`}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-brand-red" />
            <span className={`text-xs font-medium text-brand-red ${isRTL ? 'font-arabic' : 'font-inter'}`}>
              {t.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`max-w-3xl text-4xl font-bold leading-tight text-steel-dark sm:text-5xl lg:text-6xl ${
              isRTL ? 'font-arabic' : 'font-inter'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {t.title.split('..').map((part, i, arr) => (
              <span key={i}>
                {part.trim()}
                {i < arr.length - 1 && <span className="text-brand-red text-glow"> .. </span>}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`max-w-2xl text-base text-steel-dark/70 sm:text-lg ${isRTL ? 'font-arabic' : 'font-inter'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#booking"
              className={`group flex items-center justify-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition-all hover:bg-brand-red-light hover:shadow-brand-red/50 box-glow ${
                isRTL ? 'font-arabic' : 'font-inter'
              }`}
            >
              {t.cta}
              {isRTL ? (
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </a>
            <a
              href="#services"
              className={`flex items-center justify-center gap-2 rounded-xl border border-steel/60 bg-white/50 px-7 py-3.5 text-sm font-semibold text-steel-dark backdrop-blur-sm transition-all hover:border-brand-red/50 hover:bg-white ${isRTL ? 'font-arabic' : 'font-inter'}`}
            >
              {t.secondary}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-8"
          >
            {t.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-bold text-brand-red text-glow-sm">{stat.value}</span>
                <span className={`text-xs text-steel-dark/60 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 z-20 h-24 w-full bg-gradient-to-t from-charcoal to-transparent" />
    </section>
  );
}
