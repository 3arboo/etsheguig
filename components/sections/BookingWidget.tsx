'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Fuel, Package, MapPin, Calendar, Send, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Lang = 'ar' | 'fr';

const content = {
  ar: {
    title: 'احجز معداتك الآن',
    subtitle: 'املأ النموذج واحصل على عرض سعر فوري عبر واتساب أو البريد الإلكتروني',
    fields: {
      equipment: 'نوع المعدة',
      duration: 'مدة الكراء',
      location: 'موقع العمل',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني (اختياري)',
      notes: 'ملاحظات إضافية',
    },
    equipmentOptions: [
      { value: 'excavator', label: 'حفارة' },
      { value: 'bulldozer', label: 'بلدوزر' },
      { value: 'crane', label: 'رافعة' },
      { value: 'truck', label: 'شاحنة نقل' },
      { value: 'generator', label: 'مولد كهربائي' },
      { value: 'compressor', label: 'ضاغط هواء' },
      { value: 'other', label: 'أخرى' },
    ],
    durationOptions: [
      { value: 'day', label: 'يومي' },
      { value: 'week', label: 'أسبوعي' },
      { value: 'month', label: 'شهري' },
      { value: 'project', label: 'طول مدة المشروع' },
    ],
    locationOptions: [
      { value: 'hassi-messaoud', label: 'حاسي مسعود' },
      { value: 'ouargla', label: 'ورقلة' },
      { value: 'algiers', label: 'الجزائر العاصمة' },
      { value: 'oran', label: 'وهران' },
      { value: 'hassi-rmel', label: 'حاسي الرمل' },
      { value: 'other', label: 'منطقة أخرى' },
    ],
    whatsapp: 'إرسال عبر واتساب',
    email: 'إرسال عبر البريد',
    success: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.',
    placeholder: 'أخبرنا بتفاصيل مشروعك...',
  },
  fr: {
    title: 'Réservez votre équipement',
    subtitle: 'Remplissez le formulaire et recevez un devis immédiat via WhatsApp ou e-mail',
    fields: {
      equipment: "Type d'équipement",
      duration: 'Durée de location',
      location: 'Lieu de travail',
      name: 'Nom complet',
      phone: 'Téléphone',
      email: 'E-mail (optionnel)',
      notes: 'Notes supplémentaires',
    },
    equipmentOptions: [
      { value: 'excavator', label: 'Excavatrice' },
      { value: 'bulldozer', label: 'Bulldozer' },
      { value: 'crane', label: 'Grue' },
      { value: 'truck', label: 'Camion' },
      { value: 'generator', label: 'Générateur' },
      { value: 'compressor', label: 'Compresseur' },
      { value: 'other', label: 'Autre' },
    ],
    durationOptions: [
      { value: 'day', label: 'Journalier' },
      { value: 'week', label: 'Hebdomadaire' },
      { value: 'month', label: 'Mensuel' },
      { value: 'project', label: 'Durée du projet' },
    ],
    locationOptions: [
      { value: 'hassi-messaoud', label: 'Hassi Messaoud' },
      { value: 'ouargla', label: 'Ouargla' },
      { value: 'algiers', label: 'Alger' },
      { value: 'oran', label: 'Oran' },
      { value: 'hassi-rmel', label: 'Hassi R\'Mel' },
      { value: 'other', label: 'Autre région' },
    ],
    whatsapp: 'Envoyer via WhatsApp',
    email: 'Envoyer par e-mail',
    success: 'Votre demande a été envoyée avec succès! Nous vous contacterons bientôt.',
    placeholder: 'Détails de votre projet...',
  },
};

const WHATSAPP_NUMBER = '213660000000';
const COMPANY_EMAIL = 'contact@ets-heguiug.dz';

export default function BookingWidget({ lang }: { lang: Lang }) {
  const t = content[lang];
  const isRTL = lang === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    equipment: '',
    duration: '',
    location: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const buildMessage = () => {
    const eqLabel = t.equipmentOptions.find((o) => o.value === form.equipment)?.label || form.equipment;
    const durLabel = t.durationOptions.find((o) => o.value === form.duration)?.label || form.duration;
    const locLabel = t.locationOptions.find((o) => o.value === form.location)?.label || form.location;

    const lines = isRTL
      ? [
          'طلب جديد لكراء معدات:',
          `نوع المعدة: ${eqLabel}`,
          `المدة: ${durLabel}`,
          `الموقع: ${locLabel}`,
          `الاسم: ${form.name}`,
          `الهاتف: ${form.phone}`,
          form.email ? `البريد: ${form.email}` : '',
          form.notes ? `ملاحظات: ${form.notes}` : '',
        ].filter(Boolean)
      : [
          'Nouvelle demande de location:',
          `Équipement: ${eqLabel}`,
          `Durée: ${durLabel}`,
          `Lieu: ${locLabel}`,
          `Nom: ${form.name}`,
          `Téléphone: ${form.phone}`,
          form.email ? `Email: ${form.email}` : '',
          form.notes ? `Notes: ${form.notes}` : '',
        ].filter(Boolean);

    return lines.join('\n');
  };

  const sendWhatsApp = () => {
    if (!form.equipment || !form.name || !form.phone) return;
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const sendEmail = () => {
    if (!form.equipment || !form.name || !form.phone) return;
    const subject = isRTL
      ? `طلب كراء معدات - ${form.name}`
      : `Demande de location - ${form.name}`;
    const body = buildMessage();
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const isValid = form.equipment && form.name && form.phone;

  return (
    <section id="booking" className="relative w-full bg-charcoal-light py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-red/5 blur-[100px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-steel/15 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-steel/40 bg-white/90 backdrop-blur-xl shadow-xl"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-steel/30 bg-gradient-to-r from-brand-red/8 to-transparent px-6 py-5 sm:px-8">
            <div>
              <h2 className={`text-xl font-bold text-steel-dark sm:text-2xl ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                {t.title}
              </h2>
              <p className={`mt-1 text-sm text-steel-dark/60 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                {t.subtitle}
              </p>
            </div>
            <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 sm:flex">
              <Truck className="h-6 w-6 text-brand-red" />
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Equipment type */}
              <div className="space-y-2">
                <Label className={`flex items-center gap-1.5 text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  <Fuel className="h-3.5 w-3.5 text-brand-red" />
                  {t.fields.equipment}
                </Label>
                <Select value={form.equipment} onValueChange={(v) => setForm({ ...form, equipment: v })}>
                  <SelectTrigger className="border-steel/50 bg-white text-steel-dark">
                    <SelectValue placeholder={t.fields.equipment} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-steel/50">
                    {t.equipmentOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-steel-dark focus:bg-steel/20 focus:text-brand-red">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label className={`flex items-center gap-1.5 text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  <Calendar className="h-3.5 w-3.5 text-brand-red" />
                  {t.fields.duration}
                </Label>
                <Select value={form.duration} onValueChange={(v) => setForm({ ...form, duration: v })}>
                  <SelectTrigger className="border-steel/50 bg-white text-steel-dark">
                    <SelectValue placeholder={t.fields.duration} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-steel/50">
                    {t.durationOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-steel-dark focus:bg-steel/20 focus:text-brand-red">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className={`flex items-center gap-1.5 text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  <MapPin className="h-3.5 w-3.5 text-brand-red" />
                  {t.fields.location}
                </Label>
                <Select value={form.location} onValueChange={(v) => setForm({ ...form, location: v })}>
                  <SelectTrigger className="border-steel/50 bg-white text-steel-dark">
                    <SelectValue placeholder={t.fields.location} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-steel/50">
                    {t.locationOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-steel-dark focus:bg-steel/20 focus:text-brand-red">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label className={`text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  {t.fields.name}
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.fields.name}
                  className="border-steel/50 bg-white text-steel-dark placeholder:text-steel-dark/40"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className={`text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  {t.fields.phone}
                </Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+213 6XX XXX XXX"
                  className="border-steel/50 bg-white text-steel-dark placeholder:text-steel-dark/40"
                  dir="ltr"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className={`text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  {t.fields.email}
                </Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className="border-steel/50 bg-white text-steel-dark placeholder:text-steel-dark/40"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-5 space-y-2">
              <Label className={`text-steel-dark/70 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                {t.fields.notes}
              </Label>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder={t.placeholder}
                rows={3}
                className={`border-steel/50 bg-white text-steel-dark placeholder:text-steel-dark/40 ${
                  isRTL ? 'font-arabic' : 'font-inter'
                }`}
              />
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={sendWhatsApp}
                disabled={!isValid}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition-all hover:bg-brand-red-light hover:shadow-brand-red/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none ${
                  isRTL ? 'font-arabic' : 'font-inter'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                {t.whatsapp}
              </button>
              <button
                onClick={sendEmail}
                disabled={!isValid}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border border-steel/60 bg-white px-6 py-3.5 text-sm font-bold text-steel-dark transition-all hover:border-brand-red/50 hover:bg-steel/10 disabled:cursor-not-allowed disabled:opacity-40 ${
                  isRTL ? 'font-arabic' : 'font-inter'
                }`}
              >
                <Mail className="h-4 w-4 text-brand-red" />
                {t.email}
              </button>
            </div>

            {/* Success message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className={`text-sm text-green-700 ${isRTL ? 'font-arabic' : 'font-inter'}`}>
                  {t.success}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
