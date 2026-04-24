"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  delay: number;
  href: string;
  color?: 'blue' | 'red' | 'teal' | 'orange';
  image?: string;
};

type Palette = {
  glow: string;
  iconWrap: string;
  iconText: string;
  tag: string;
  ring: string;
  cta: string;
  imageOverlay: string;
};

const colorMap: Record<NonNullable<ServiceCardProps['color']>, Palette> = {
  blue: {
    glow: 'from-sky-200/45 via-blue-100/20 to-transparent',
    iconWrap: 'bg-sky-50/90 border-sky-100',
    iconText: 'text-sky-700',
    tag: 'bg-sky-50/80 text-sky-800 border-sky-100',
    ring: 'group-hover:border-sky-200/80',
    cta: 'group-hover:bg-sky-600 group-hover:text-white',
    imageOverlay: 'from-sky-950/55 via-sky-900/5 to-white/5'
  },
  red: {
    glow: 'from-rose-200/45 via-red-100/20 to-transparent',
    iconWrap: 'bg-rose-50/90 border-rose-100',
    iconText: 'text-rose-700',
    tag: 'bg-rose-50/80 text-rose-800 border-rose-100',
    ring: 'group-hover:border-rose-200/80',
    cta: 'group-hover:bg-rose-600 group-hover:text-white',
    imageOverlay: 'from-rose-950/55 via-rose-900/5 to-white/5'
  },
  teal: {
    glow: 'from-emerald-200/50 via-teal-100/20 to-transparent',
    iconWrap: 'bg-emerald-50/90 border-emerald-100',
    iconText: 'text-emerald-700',
    tag: 'bg-emerald-50/80 text-emerald-800 border-emerald-100',
    ring: 'group-hover:border-emerald-200/80',
    cta: 'group-hover:bg-emerald-700 group-hover:text-white',
    imageOverlay: 'from-emerald-950/60 via-emerald-900/5 to-white/5'
  },
  orange: {
    glow: 'from-amber-200/55 via-orange-100/20 to-transparent',
    iconWrap: 'bg-amber-50/90 border-amber-100',
    iconText: 'text-amber-700',
    tag: 'bg-amber-50/80 text-amber-800 border-amber-100',
    ring: 'group-hover:border-amber-200/80',
    cta: 'group-hover:bg-amber-600 group-hover:text-white',
    imageOverlay: 'from-amber-950/55 via-amber-900/5 to-white/5'
  }
};

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServiceCard({
  icon,
  title,
  description,
  tags,
  delay,
  href,
  color = 'blue',
  image
}: ServiceCardProps) {
  const router = useRouter();
  const palette = colorMap[color];

  const navigate = () => router.push(href);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: smoothEase }}
      whileHover={{ y: -8 }}
      onClick={navigate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate();
        }
      }}
      className={`group relative h-full cursor-pointer overflow-hidden rounded-[2.75rem] border border-white/75 bg-white/58 p-2 shadow-[0_28px_85px_rgba(15,23,42,0.09)] backdrop-blur-2xl transition-all duration-500 [clip-path:inset(0_round_2.75rem)] [contain:paint] hover:bg-white/76 hover:shadow-[0_38px_105px_rgba(15,23,42,0.14)] focus:outline-none focus:ring-4 focus:ring-emerald-200/50 ${palette.ring}`}
    >
      <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl transition-opacity duration-500 ${palette.glow} opacity-70 group-hover:opacity-100`} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,255,255,0.34)_42%,rgba(255,255,255,0.12))]" />

      <div className="relative grid h-full overflow-hidden rounded-[2.35rem] [clip-path:inset(0_round_2.35rem)] [contain:paint] md:grid-cols-[1fr_0.78fr]">
        {/* Content */}
        <div className="relative z-10 flex min-h-[300px] flex-col p-6 md:p-8">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-transform duration-500 group-hover:scale-105 ${palette.iconWrap} ${palette.iconText}`}
            >
              {icon}
            </div>

            <div className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-500 ${palette.cta}`}>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" />
            </div>
          </div>

          <h3 className="max-w-md text-2xl font-black tracking-[-0.04em] text-slate-950 md:text-3xl">
            {title}
          </h3>

          <p className="mt-4 max-w-md flex-1 text-sm leading-7 text-slate-600 md:text-[15px]">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] backdrop-blur-xl ${palette.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-slate-900">
            <span className="relative">
              Learn More
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Image safely clipped */}
        <div className="relative min-h-[240px] overflow-hidden bg-slate-100 [clip-path:inset(0_round_2rem)] [contain:paint] md:min-h-full">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.06]"
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
          )}

          <div className={`absolute inset-0 bg-gradient-to-t ${palette.imageOverlay}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.36),transparent_30%)]" />

        </div>
      </div>
    </motion.article>
  );
}