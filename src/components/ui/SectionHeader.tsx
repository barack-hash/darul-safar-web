import React from 'react';
import { motion } from 'motion/react';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  eyebrow?: string;
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  eyebrow,
  className = ''
}: SectionHeaderProps) {
  const alignment = align === 'left' ? 'text-left' : 'text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 mb-5">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
