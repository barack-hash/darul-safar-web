"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Moon,
  Plane,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ServiceCard from '@/components/home/ServiceCard';

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const { t } = useLanguage();
  const homeT = t.homePage;
  const router = useRouter();

  return (
    <motion.main
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08 }}
      className="relative w-full overflow-hidden"
    >
      {/* Soft app-wide atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-22rem] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute right-[-16rem] top-[18rem] h-[36rem] w-[36rem] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-[8rem] left-[-14rem] h-[34rem] w-[34rem] rounded-full bg-amber-100/55 blur-3xl" />
      </div>

      {/* FULL VIEWPORT HERO */}
      <section className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 pt-4 md:min-h-[calc(100vh-8rem)] md:px-8 md:pb-20 md:pt-8">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.85, ease: smoothEase }}
          className="relative flex flex-1 items-stretch"
        >
          <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-br from-white/80 via-white/25 to-emerald-100/45 blur-2xl" />

          <div className="relative w-full rounded-[2.25rem] border border-white/75 bg-white/45 p-1.5 shadow-[0_35px_100px_rgba(15,23,42,0.16)] backdrop-blur-2xl md:rounded-[3.4rem] md:p-2">
            <div className="relative isolate max-h-[560px] min-h-[500px] overflow-hidden rounded-[2rem] bg-slate-200 [clip-path:inset(0_round_2rem)] [contain:paint] md:max-h-none md:min-h-[720px] md:rounded-[2.65rem] md:[clip-path:inset(0_round_2.65rem)] lg:min-h-[calc(100vh-12rem)]">
              <Image
                src="/hero-main.png"
                alt="Darul Safar premium travel experience"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />

              {/* Image treatment */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/20 to-white/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/12 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.34),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(16,185,129,0.22),transparent_38%)]" />

              {/* Minimal top badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: smoothEase }}
                className="absolute left-5 top-5 z-20 hidden rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-[0_16px_50px_rgba(0,0,0,0.14)] backdrop-blur-2xl md:inline-flex md:items-center md:gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t.hero.tag}
              </motion.div>

              {/* Main hero copy */}
              <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 md:px-8 md:pb-8 lg:px-12 lg:pb-12">
                <div className="max-w-4xl pb-52 md:pb-36 lg:pb-32">
                  <motion.h1
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.36, ease: smoothEase }}
                    className="max-w-4xl font-serif text-[2.75rem] font-black leading-[0.95] tracking-[-0.055em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.28)] md:text-7xl lg:text-[6.4rem]"
                  >
                    {t.hero.headline}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.48, ease: smoothEase }}
                    className="mt-4 max-w-2xl text-sm leading-6 text-white/88 md:mt-6 md:text-xl md:leading-9"
                  >
                    {t.hero.subtitle}
                  </motion.p>
                </div>

                {/* Bottom glass action bar - safely clipped inside hero */}
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.58, ease: smoothEase }}
                  className="absolute bottom-3 left-3 right-3 md:bottom-8 md:left-8 md:right-8 lg:bottom-10 lg:left-12 lg:right-12"
                >
                  <div className="rounded-[1.6rem] border border-white/30 bg-white/20 p-2 shadow-[0_24px_75px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:rounded-[2rem] md:p-3">
                    <div className="grid gap-2 rounded-[1.55rem] md:grid-cols-[1fr_auto] md:items-center md:gap-3">
                      <div className="rounded-[1.15rem] bg-white/86 px-4 py-3 backdrop-blur-xl md:rounded-[1.45rem] md:px-5 md:py-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div className="max-w-2xl">
                            <p className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              Darul Safar concierge
                            </p>
                            <p className="text-xs font-bold leading-5 text-slate-800 md:text-base md:leading-6">
                              World-class travel solutions for pilgrimage, visa support, and global ticketing.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:gap-3">
                        <button
                          type="button"
                          onClick={() => router.push('/?book=flight')}
                          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.15rem] bg-emerald-700 px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(4,120,87,0.28)] transition-all hover:bg-emerald-800 active:scale-95 md:min-h-14 md:rounded-[1.45rem] md:px-6"
                        >
                          {t.hero.bookUmrah}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => router.push('/ticketing')}
                          className="inline-flex min-h-12 items-center justify-center rounded-[1.15rem] bg-white px-5 text-sm font-black text-slate-900 shadow-[0_14px_32px_rgba(15,23,42,0.10)] transition-all hover:bg-slate-50 active:scale-95 md:min-h-14 md:rounded-[1.45rem] md:px-6"
                        >
                          {t.hero.globalTicketing}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* QUIET TRANSITION / VALUE STRIP */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.75, ease: smoothEase }}
          className="grid gap-4 md:grid-cols-3"
        >
          {[
            {
              title: homeT.valueCards.guidance.title,
              desc: homeT.valueCards.guidance.desc
            },
            {
              title: homeT.valueCards.coordination.title,
              desc: homeT.valueCards.coordination.desc
            },
            {
              title: homeT.valueCards.pilgrimage.title,
              desc: homeT.valueCards.pilgrimage.desc
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/70 bg-white/55 p-6 shadow-[0_22px_65px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
            >
              <h3 className="text-lg font-black tracking-tight text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="relative mx-auto w-full max-w-7xl px-4 pb-28 md:px-8 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, ease: smoothEase }}
          className="mb-10 overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/48 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl [clip-path:inset(0_round_2.75rem)] [contain:paint] md:mb-14 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-800">
                {homeT.serviceEyebrow}
              </p>
              <h2 className="max-w-2xl font-serif text-4xl font-black tracking-[-0.045em] text-slate-950 md:text-6xl">
                {t.nav.solutions}
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {homeT.serviceStatement}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <ServiceCard
            icon={<Moon className="h-7 w-7" />}
            title={t.services.pilgrimage}
            description={t.services.pilgrimageDesc}
            tags={['Umrah', 'Hajj', 'Ziyarah']}
            delay={0.05}
            color="teal"
            image="/pilgrimage.png"
            href="/pilgrimage"
          />

          <ServiceCard
            icon={<Plane className="h-7 w-7" />}
            title={t.services.ticketing}
            description={t.services.ticketingDesc}
            tags={['Ethiopian', 'Qatar', 'Saudia', 'Emirates']}
            delay={0.1}
            color="blue"
            image="/ticketing.png"
            href="/ticketing"
          />

          <ServiceCard
            icon={<FileText className="h-7 w-7" />}
            title={t.services.visas}
            description={t.services.visasDesc}
            tags={['Work', 'Tourist', 'Medical', 'Education']}
            delay={0.15}
            color="orange"
            image="/visa-services.png"
            href="/visas"
          />

          <ServiceCard
            icon={<Briefcase className="h-7 w-7" />}
            title={t.services.tools}
            description={t.services.toolsDesc}
            tags={['B2B Corporate', 'C2C Vacation']}
            delay={0.2}
            color="red"
            image="/specialized-travel.png"
            href="/tools"
          />
        </div>
      </section>
    </motion.main>
  );
}