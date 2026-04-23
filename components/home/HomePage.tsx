"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Plane, FileText, Briefcase, Moon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ServiceCard from '@/components/home/ServiceCard';

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex flex-col items-center justify-start"
    >
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mb-12">
        <section className="w-full py-32 md:py-48 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="inline-block px-5 py-2 mb-8 bg-blue-50 text-blue-600 font-label text-xs tracking-[0.2em] rounded-full uppercase font-bold shadow-sm border border-blue-100">
                {t.hero.tag}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-900 to-slate-700 leading-[1.1] tracking-tight mb-8 max-w-3xl mx-auto lg:mx-0 flex flex-wrap justify-center lg:justify-start">
              {t.hero.headline.split(' ').map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mr-3 md:mr-4">
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-slate-600 font-body leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
            >
              <motion.button
                type="button"
                onClick={() => router.push('/?book=flight')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-700 text-white font-headline font-bold rounded-2xl hover:bg-emerald-800 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-700/30 w-full sm:w-auto text-lg"
              >
                {t.hero.bookUmrah}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => router.push('/ticketing')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 font-headline font-bold rounded-2xl hover:border-blue-500 hover:text-blue-600 active:scale-95 transition-all duration-200 shadow-sm w-full sm:w-auto text-lg"
              >
                {t.hero.globalTicketing}
              </motion.button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex-1 w-full lg:w-auto relative">
            <div className="aspect-[4/3] lg:aspect-[3/4] w-full rounded-[3rem] bg-gradient-to-br from-gray-100 to-gray-200 border border-white/60 shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden relative group">
              <Image src="/hero-main.png" alt="Traveler" fill priority className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(min-width: 1024px) 40vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>
        </section>
      </div>

      <section className="w-full py-32 md:py-48 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 to-slate-700 mb-6 tracking-tight">{t.nav.solutions}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ServiceCard
              icon={<Moon className="w-8 h-8" />}
              title={t.services.pilgrimage}
              description={t.services.pilgrimageDesc}
              tags={['Umrah', 'Hajj', 'Ziyarah']}
              delay={0.1}
              color="teal"
              image="/pilgrimage.png"
              href="/pilgrimage"
            />
            <ServiceCard
              icon={<Plane className="w-8 h-8" />}
              title={t.services.ticketing}
              description={t.services.ticketingDesc}
              tags={['Ethiopian', 'Qatar', 'Saudia', 'Emirates']}
              delay={0.2}
              color="blue"
              image="/ticketing.png"
              href="/ticketing"
            />
            <ServiceCard
              icon={<FileText className="w-8 h-8" />}
              title={t.services.visas}
              description={t.services.visasDesc}
              tags={['Work', 'Tourist', 'Medical', 'Education']}
              delay={0.3}
              color="orange"
              image="/visa-services.png"
              href="/visas"
            />
            <ServiceCard
              icon={<Briefcase className="w-8 h-8" />}
              title={t.services.tools}
              description={t.services.toolsDesc}
              tags={['B2B Corporate', 'C2C Vacation']}
              delay={0.4}
              color="red"
              image="/specialized-travel.png"
              href="/tools"
            />
          </div>
        </div>
      </section>
    </motion.main>
  );
}
