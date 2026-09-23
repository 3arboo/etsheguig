'use client';

import { Cog, Droplet } from 'lucide-react';

export default function BrandLogo({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      <span className="relative inline-flex shrink-0 items-center justify-center">
        <Cog
          className={`${compact ? 'h-9 w-9' : 'h-12 w-12'} ${light ? 'text-white' : 'text-steel-dark'}`}
          strokeWidth={2.25}
        />
        <Droplet
          className={`absolute ${compact ? 'right-[-3px] top-[13px] h-5 w-5' : 'right-[-5px] top-[18px] h-6 w-6'} fill-brand-red text-steel-dark`}
          strokeWidth={2.5}
        />
      </span>
      <span className="flex flex-col leading-[0.95]">
        <span
          className={`whitespace-nowrap text-[1.05rem] font-bold tracking-[0.08em] ${
            light ? 'text-white' : 'text-steel-dark'
          }`}
        >
          ETS HEGUIUG
        </span>
        <span className="mt-1 whitespace-nowrap text-[0.56rem] font-semibold tracking-[0.13em] text-brand-red">
          SERVICES PÉTROLIERS
        </span>
      </span>
    </span>
  );
}
