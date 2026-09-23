'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Truck, Fuel, Package, ArrowLeft, ArrowRight } from 'lucide-react';

type Lang = 'ar' | 'fr';

const content = {
  ar: {
    sectionTitle: 'ثلاثة أعمدة لخدمتك',
    sectionSubtitle: 'حلول صناعية ولوجستية شاملة تغطي كامل سلسلة القيمة',
    pillars: [
      {
        icon: Truck,
        title: 'أسطول النقل والكراء',
        desc: 'مركبات، معدات ثقيلة، ونقل لوجستي. أسطول حديث ومتنوع يلبي احتياجات المشاريع الكبرى في كل أنحاء البلاد.',
        features: ['معدات ثقيلة', 'نقل مركبات', 'كراء مرن', 'سائقون مؤهلون'],
      },
      {
        icon: Fuel,
        title: 'الخدمات البترولية والصيانة',
        desc: 'هندسة ميكانيكية، خراطة، وصيانة صناعية. خبرة تقنية في خدمة القطاع البترولي والمنشآت الصناعية.',
        features: ['هندسة ميكانيكية', 'خراطة دقيقة', 'صيانة وقائية', 'خدمات بترولية'],
      },
      {
        icon: Package,
        title: 'التوريد وقطع الغيار',
        desc: 'قطع غيار صناعية، مواد بناء، ومستلزمات كهربائية. توريد سريع وموثوق من مصادر معتمدة عالمياً.',
        features: ['قطع غيار', 'مواد بناء', 'مستلزمات كهربائية', 'توريد سريع'],
      },
    ],
    cta: 'اكتشف المزيد',
  },
  fr: {
    sectionTitle: 'Trois piliers à votre service',
    sectionSubtitle: 'Des solutions industrielles et logistiques couvrant toute la chaîne de valeur',
    pillars: [
      {
        icon: Truck,
        title: 'Flotte & Location',
        desc: 'Véhicules, engins lourds et transport logistique. Une flotte moderne et diversifiée pour les grands projets à travers le pays.',
        features: ['Engins lourds', 'Transport', 'Location flexible', 'Chauffeurs qualifiés'],
      },
      {
        icon: Fuel,
        title: 'Services Pétroliers & Maintenance',
        desc: 'Génie mécanique, tournage et maintenance industrielle. Expertise technique au service du secteur pétrolier et industriel.',
        features: ['Génie mécanique', 'Tournage de précision', 'Maintenance préventive', 'Services pétroliers'],
      },
      {
        icon: Package,
        title: 'Fourniture & Pièces de Rechange',
        desc: 'Pièces de rechange industrielles, matériaux de construction et fournitures électriques. Approvisionnement rapide et fiable.',
        features: ['Pièces de rechange', 'Matériaux de construction', 'Fournitures électriques', 'Livraison rapide'],
      },
    ],
    cta: 'En savoir plus',
  },
};

function PillarCard({
  pillar,
  index,
  lang,
}: {
  pillar: (typeof content.ar.pillars)[0];
  index: number;
  lang: Lang;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const isRTL = lang === 'ar';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d' }}
      className="group relative overflow-hidden rounded-2xl border border-steel/40 bg-white p-8 transition-all duration-300 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/10"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Corner accent */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-red/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div style={{ transform: 'translateZ(30px)' }} className="relative">
        {/* Icon */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-steel to-steel-dark shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:from-brand-red/20 group-hover:to-brand-red/5">
          <Icon className="h-8 w-8 text-brand-red" />
        </div>

        {/* Title */}
        <h3 className={`mb-3 text-xl font-bold text-steel-dark ${isRTL ? 'font-arabic' : 'font-inter'}`}>
          {pillar.title}
        </h3>

        {/* Description */}
        <p className={`mb-6 text-sm leading-relaxed text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
          {pillar.desc}
        </p>

        {/* Features */}
        <div className="mb-6 flex flex-wrap gap-2">
          {pillar.features.map((f) => (
            <span
              key={f}
              className={`rounded-full border border-steel/50 bg-steel/10 px-3 py-1 text-xs text-steel-dark/70 ${
                isRTL ? 'font-arabic' : 'font-inter'
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#booking"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-light ${
            isRTL ? 'font-arabic' : 'font-inter'
          }`}
        >
          {content[lang].cta}
          {isRTL ? (
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicePillars({ lang }: { lang: Lang }) {
  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <section id="services" className="relative w-full bg-charcoal py-24 lg:py-32">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-16 text-center ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-red" />
            <span className={`text-xs font-medium text-brand-red ${isRTL ? 'font-arabic' : 'font-inter'}`}>
              {isRTL ? 'خدماتنا' : 'Nos services'}
            </span>
          </div>
          <h2 className={`mb-4 text-3xl font-bold text-steel-dark sm:text-4xl lg:text-5xl ${isRTL ? 'font-arabic' : 'font-inter'}`}>
            {t.sectionTitle}
          </h2>
          <p className={`mx-auto max-w-2xl text-base text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
            {t.sectionSubtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {t.pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
