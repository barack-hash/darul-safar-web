"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

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

const colorMap: Record<string, { border: string; iconTint: string; iconText: string; learnMore: string }> = {
  blue: { border: 'hover:border-blue-200', iconTint: 'bg-blue-50', iconText: 'text-blue-600', learnMore: 'group-hover:text-blue-600' },
  red: { border: 'hover:border-red-200', iconTint: 'bg-rose-50', iconText: 'text-rose-600', learnMore: 'group-hover:text-rose-600' },
  teal: { border: 'hover:border-teal-200', iconTint: 'bg-teal-50', iconText: 'text-teal-600', learnMore: 'group-hover:text-teal-600' },
  orange: { border: 'hover:border-orange-200', iconTint: 'bg-amber-50', iconText: 'text-amber-600', learnMore: 'group-hover:text-amber-600' }
};

export default function ServiceCard({ icon, title, description, tags, delay, href, color = 'blue', image }: ServiceCardProps) {
  const router = useRouter();
  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => router.push(href)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(href);
        }
      }}
      className={`group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/60 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/5 active:scale-[0.99] ${colors.border} transition-all duration-500 flex flex-col h-full cursor-pointer relative overflow-hidden`}
    >
      <div className="flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className={`w-14 h-14 p-3 rounded-2xl flex items-center justify-center mb-6 ${colors.iconTint} ${colors.iconText} transition-all duration-500 shadow-sm group-hover:scale-105`}>
            {icon}
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{title}</h3>
          <p className="text-gray-500 font-body text-sm leading-relaxed mb-6 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <span key={i} className="bg-white/80 backdrop-blur-md border border-white/20 text-slate-900 font-semibold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>
          <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${colors.learnMore}`}>
            <span>Learn More</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
        <div className="relative w-full h-56 md:w-5/12 shrink-0 block md:ml-6 mt-6 md:mt-0">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover rounded-2xl" sizes="(min-width: 768px) 40vw, 100vw" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay rounded-2xl" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
