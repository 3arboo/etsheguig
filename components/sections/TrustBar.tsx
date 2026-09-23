'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Wrench, Building2, Clock, ShieldCheck } from 'lucide-react';

type Lang = 'ar' | 'fr';

const content = {
  ar: {
    title: 'ثقة وأرقام تتحدث عن نفسها',
    subtitle: 'خبرة ميدانية وإمكانيات تقنية في خدمة أكبر المشاريع الصناعية في الجزائر',
    stats: [
      { icon: Wrench, value: 100, suffix: '+', label: 'معدة ثقيلة', sub: 'أسطول متنوع وجاهز' },
      { icon: Building2, value: 500, suffix: '+', label: 'مشروع منجز', sub: 'في مختلف القطاعات' },
      { icon: Clock, value: 24, suffix: '/7', label: 'دعم ميداني', sub: 'على مدار الساعة' },
      { icon: ShieldCheck, value: 15, suffix: '+', label: 'سنة خبرة', sub: 'في السوق الجزائري' },
    ],
  },
  fr: {
    title: 'La confiance en chiffres',
    subtitle: 'Une expertise terrain et des capacités techniques au service des plus grands projets industriels en Algérie',
    stats: [
      { icon: Wrench, value: 100, suffix: '+', label: 'Engins lourds', sub: 'Flotte diverse et prête' },
      { icon: Building2, value: 500, suffix: '+', label: 'Projets réalisés', sub: 'Dans tous les secteurs' },
      { icon: Clock, value: 24, suffix: '/7', label: 'Support terrain', sub: '24 heures sur 24' },
      { icon: ShieldCheck, value: 15, suffix: '+', label: "ans d'expérience", sub: 'Sur le marché algérien' },
    ],
  },
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl font-bold text-brand-red text-glow-sm sm:text-5xl lg:text-6xl">
      {count}
      <span className="text-brand-red-light">{suffix}</span>
    </span>
  );
}

export default function TrustBar({ lang }: { lang: Lang }) {
  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <section id="trust" className="relative w-full overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse-glow" />
            <span className={`text-xs font-medium text-brand-red ${isRTL ? 'font-arabic' : 'font-inter'}`}>
              {isRTL ? 'لماذا نحن' : 'Pourquoi nous'}
            </span>
          </div>
          <h2 className={`mb-4 text-3xl font-bold text-steel-dark sm:text-4xl lg:text-5xl ${isRTL ? 'font-arabic' : 'font-inter'}`}>
            {t.title}
          </h2>
          <p className={`mx-auto max-w-2xl text-base text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-steel/40 bg-white p-8 text-center transition-all duration-300 hover:border-brand-red/40 hover:shadow-lg hover:shadow-brand-red/10"
              >
                {/* Hover glow */}
                <div className="absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-brand-red/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-steel to-steel-dark transition-transform duration-500 group-hover:scale-110 group-hover:from-brand-red/20">
                    <Icon className="h-7 w-7 text-brand-red" />
                  </div>
                  <div className="mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className={`text-sm font-semibold text-steel-dark ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                    {stat.label}
                  </div>
                  <div className={`mt-1 text-xs text-steel-dark/60 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
