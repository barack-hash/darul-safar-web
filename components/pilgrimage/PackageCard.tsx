"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Check, MessageCircle, LucideIcon } from 'lucide-react';

type PackageCardProps = {
  title: string;
  description: string;
  inclusions: string[];
  icon: LucideIcon;
  tone: 'emerald' | 'amber';
  indexLabel: string;
  ctaLabel: string;
  onCtaClick: () => void;
};

const toneClasses = {
  emerald: {
    iconText: 'text-emerald-700',
    check: 'text-emerald-700',
    glow: 'from-emerald-400/22 via-emerald-500/8 to-transparent',
    buttonHover: 'hover:bg-emerald-800'
  },
  amber: {
    iconText: 'text-amber-700',
    check: 'text-amber-600',
    glow: 'from-amber-400/22 via-amber-500/8 to-transparent',
    buttonHover: 'hover:bg-amber-700'
  }
};

export default function PackageCard({
  title,
  description,
  inclusions,
  icon: Icon,
  tone,
  indexLabel,
  ctaLabel,
  onCtaClick
}: PackageCardProps) {
  const palette = toneClasses[tone];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full rounded-[2.75rem] border border-white/75 bg-white/58 p-2 shadow-[0_28px_85px_rgba(15,23,42,0.09)] backdrop-blur-2xl overflow-hidden [clip-path:inset(0_round_2.75rem)] [contain:paint] hover:shadow-[0_40px_100px_rgba(15,23,42,0.13)] focus-within:ring-2 focus-within:ring-slate-900/18 focus-within:ring-offset-2 focus-within:ring-offset-white/60"
    >
      <div className="relative z-[1] flex h-full flex-col overflow-hidden rounded-[2.35rem] p-7 md:p-8">
        <div
          className={`pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${palette.glow} opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
          aria-hidden
        />

        <span className="absolute right-4 bottom-2 z-0 text-[5.5rem] font-black text-slate-900/[0.032] pointer-events-none select-none leading-none">
          {indexLabel}
        </span>

        <div
          className={`relative z-[1] mb-7 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/70 shadow ${palette.iconText}`}
        >
          <Icon className="h-8 w-8" />
        </div>

        <h3 className="relative z-[1] font-serif text-3xl md:text-[2.45rem] font-black tracking-[-0.04em] text-slate-900 mb-4">
          {title}
        </h3>
        <p className="relative z-[1] text-slate-600 leading-8 mb-7 flex-grow">{description}</p>

        <ul className="relative z-[1] mb-8 space-y-3">
          {inclusions.map((item, idx) => (
            <li
              key={`${item}-${idx}`}
              className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/55 px-4 py-3 text-slate-600"
            >
              <Check className={`mt-0.5 h-5 w-5 shrink-0 ${palette.check}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onCtaClick}
          className={`relative z-[1] flex w-full min-h-14 items-center justify-center gap-2 rounded-[1.35rem] bg-slate-950 px-6 font-black text-white transition-colors duration-300 ${palette.buttonHover}`}
        >
          <MessageCircle className="h-5 w-5" />
          {ctaLabel}
        </button>
      </div>
    </motion.article>
  );
}
