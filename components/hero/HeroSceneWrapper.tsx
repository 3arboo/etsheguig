'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-2 border-amber/20 border-t-amber" />
    </div>
  ),
});

function MobileHeroVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute h-64 w-64 rounded-full border border-brand-red/25 bg-white/20 shadow-[0_0_80px_rgba(168,58,42,0.12)] backdrop-blur-[2px]"
      >
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red shadow-[0_0_18px_rgba(168,58,42,0.8)]" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute h-44 w-44 rounded-full border border-steel-dark/15"
      >
        <div className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-steel-dark/60" />
      </motion.div>
      <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/70 bg-white/45 shadow-xl shadow-brand-red/10 backdrop-blur-xl">
        <div className="h-10 w-10 rounded-full border-4 border-brand-red/30 border-t-brand-red shadow-[0_0_24px_rgba(168,58,42,0.35)]" />
      </div>
    </div>
  );
}

function isMobileOrLowPowerDevice() {
  if (typeof window === 'undefined') return true;

  const narrowScreen = window.matchMedia('(max-width: 767px)').matches;
  const navigatorWithHints = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  const lowMemory = (navigatorWithHints.deviceMemory ?? 8) <= 4;
  const fewCores = (navigatorWithHints.hardwareConcurrency ?? 8) <= 4;

  return narrowScreen || lowMemory || fewCores;
}

export default function HeroSceneWrapper() {
  const [useFallback, setUseFallback] = useState(true);

  useEffect(() => {
    setUseFallback(isMobileOrLowPowerDevice());
  }, []);

  return useFallback ? <MobileHeroVisual /> : <HeroScene />;
}
