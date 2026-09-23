'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ChevronUp } from 'lucide-react';
import BrandLogo from '@/components/brand/BrandLogo';

type Lang = 'ar' | 'fr';

const content = {
  ar: {
    tagline: 'مؤسسة هقيق للخدمات البترولية — شريكك الموثوق للحلول الصناعية واللوجستية في حاسي مسعود والجزائر',
    quickLinks: 'روابط سريعة',
    contact: 'معلومات الاتصال',
    address: 'حاسي مسعود / ورقلة، الجزائر',
    rc: 'السجل التجاري: 16/00-1234567 B 23',
    taxId: 'الرقم الجبائي: 000316123456789',
    rights: 'جميع الحقوق محفوظة',
    links: [
      { label: 'الرئيسية', href: '#hero' },
      { label: 'خدماتنا', href: '#services' },
      { label: 'الحجز', href: '#booking' },
      { label: 'من نحن', href: '#trust' },
    ],
  },
  fr: {
    tagline: 'ETS HEGUIUG — Votre partenaire de confiance pour les solutions industrielles et logistiques à Hassi Messaoud et en Algérie',
    quickLinks: 'Liens rapides',
    contact: 'Contact',
    address: 'Hassi Messaoud / Ouargla, Algérie',
    rc: 'Registre de Commerce: 16/00-1234567 B 23',
    taxId: 'N° Fiscal: 000316123456789',
    rights: 'Tous droits réservés',
    links: [
      { label: 'Accueil', href: '#hero' },
      { label: 'Services', href: '#services' },
      { label: 'Réservation', href: '#booking' },
      { label: 'À propos', href: '#trust' },
    ],
  },
};

export default function Footer({ lang }: { lang: Lang }) {
  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <footer id="footer" className="relative w-full bg-steel-dark pt-20 pb-8">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center">
              <BrandLogo compact light />
            </div>
            <p className={`mt-4 max-w-sm text-sm leading-relaxed text-steel-light/80 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
              {t.tagline}
            </p>
            <div className={`mt-4 space-y-1 text-xs text-steel-light/60 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
              <p>{t.rc}</p>
              <p>{t.taxId}</p>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={`mb-4 text-sm font-semibold uppercase tracking-wider text-white ${isRTL ? 'font-arabic' : 'font-inter'}`}>
              {t.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group flex items-center gap-1.5 text-sm text-steel-light transition-colors hover:text-brand-red-light ${isRTL ? 'font-arabic' : 'font-inter'}`}
                  >
                    <span className="h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={`mb-4 text-sm font-semibold uppercase tracking-wider text-white ${isRTL ? 'font-arabic' : 'font-inter'}`}>
              {t.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red-light" />
                <span className={`text-sm text-steel-light/80 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  {t.address}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red-light" />
                <span className="text-sm text-steel-light/80" dir="ltr">
                  +213 660 00 00 00
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-red-light" />
                <span className="text-sm text-steel-light/80" dir="ltr">
                  contact@ets-heguiug.dz
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-steel-light/20 pt-6 sm:flex-row">
          <p className={`text-xs text-steel-light/50 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
            © {new Date().getFullYear()} ETS HEGUIUG — SERVICES PÉTROLIERS. {t.rights}.
          </p>
          <a
            href="#hero"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-steel-light/30 text-steel-light transition-all hover:border-brand-red/50 hover:text-brand-red-light"
          >
            <ChevronUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
