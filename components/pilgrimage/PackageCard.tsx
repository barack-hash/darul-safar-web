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
    iconWrap: 'bg-emerald-50 text-emerald-700',
    button: 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/25',
    check: 'text-emerald-700'
  },
  amber: {
    iconWrap: 'bg-amber-50 text-amber-700',
    button: 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/25',
    check: 'text-amber-600'
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100 overflow-hidden flex flex-col"
    >
      <span className="absolute right-6 bottom-4 text-7xl font-black text-slate-900/5 pointer-events-none select-none">
        {indexLabel}
      </span>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${palette.iconWrap}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-3xl font-bold tracking-tight text-slate-900 mb-3">{title}</h3>
      <p className="font-body text-slate-600 leading-relaxed mb-7 flex-grow">{description}</p>

      <ul className="space-y-3 mb-8">
        {inclusions.map((item, idx) => (
          <li key={`${item}-${idx}`} className="flex items-start gap-3 text-slate-600">
            <Check className={`w-5 h-5 mt-0.5 shrink-0 ${palette.check}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCtaClick}
        className={`relative overflow-hidden w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${palette.button}`}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        <MessageCircle className="w-5 h-5" />
        {ctaLabel}
      </button>
    </motion.article>
  );
}
