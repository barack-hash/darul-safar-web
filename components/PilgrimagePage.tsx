"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Droplets, RefreshCw, Footprints, Scissors, Plane, ChevronDown, FileText, Briefcase, Heart, Landmark } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import PackageCard from './pilgrimage/PackageCard';
import Image from 'next/image';

const translations = {
  en: {
    checklistTitle: "Cartographer's Essentials",
    checklistSubtitle: "Preparation Is The First Ritual",
    checklistDesc: "Ensure your physical journey is as seamless as your spiritual one. Our curated list covers the essentials for endurance and focus.",
    categories: {
      sacred: "Sacred Items",
      docs: "Travel Documents",
      comfort: "Comfort & Health"
    },
    items: {
      ihram: "Ihram Clothing (2 Sets)",
      soap: "Unscented Soap & Toiletries",
      passport: "Passport (6+ Months Validity)",
      visa: "Umrah Visa / Nusuk App",
      vax: "Vaccination Certificates",
      sandals: "Comfortable Walking Sandals",
      mat: "Lightweight Prayer Mat",
      meds: "Personal Medical Kit"
    }
  },
  ar: {
    checklistTitle: "أساسيات الرحلة",
    checklistSubtitle: "الاستعداد هو أول منسك",
    checklistDesc: "تأكد من أن رحلتك الجسدية سلسة مثل رحلتك الروحية. تغطي قائمتنا المنسقة الأساسيات للتحمل والتركيز.",
    categories: {
      sacred: "أشياء مقدسة",
      docs: "وثائق السفر",
      comfort: "الراحة والصحة"
    },
    items: {
      ihram: "ملابس الإحرام (طقمين)",
      soap: "صابون ومستلزمات غير معطرة",
      passport: "جواز سفر (صلاحية 6+ أشهر)",
      visa: "تأشيرة العمرة / تطبيق نسك",
      vax: "شهادات التطعيم",
      sandals: "صنادل مشي مريحة",
      mat: "سجادة صلاة خفيفة الوزن",
      meds: "مجموعة طبية شخصية"
    }
  },
  am: {
    checklistTitle: "አስፈላጊ ነገሮች",
    checklistSubtitle: "ዝግጅት የመጀመሪያው ስነ-ስርዓት ነው",
    checklistDesc: "አካላዊ ጉዞዎ ልክ እንደ መንፈሳዊ ጉዞዎ የተሳካ መሆኑን ያረጋግጡ። የእኛ ዝርዝር ለጽናት እና ትኩረት አስፈላጊ ነገሮችን ይሸፍናል።",
    categories: {
      sacred: "ቅዱስ ዕቃዎች",
      docs: "የጉዞ ሰነዶች",
      comfort: "ምቾት እና ጤና"
    },
    items: {
      ihram: "የኢህራም ልብስ (2 ስብስቦች)",
      soap: "ሽታ የሌለው ሳሙና እና የንጽህና መጠበቂያዎች",
      passport: "ፓስፖርት (6+ ወራት የሚያገለግል)",
      visa: "የዑምራ ቪዛ / ኑሱክ መተግበሪያ",
      vax: "የክትባት የምስክር ወረቀቶች",
      sandals: "ምቹ የመራመጃ ጫማዎች",
      mat: "ቀላል የጸሎት ምንጣፍ",
      meds: "የግል የህክምና እቃዎች"
    }
  },
  om: {
    checklistTitle: "Wantoota Barbaachisoo",
    checklistSubtitle: "Qophiin Sirna Jalqabaati",
    checklistDesc: "Imalli qaamaa keessan akkuma imala hafuuraa keessanii milkaa'aa ta'uu isaa mirkaneeffadhaa. Tarreen keenya wantoota jabaachuu fi xiyyeeffannaaf barbaachisan ni haguuga.",
    categories: {
      sacred: "Wantoota Qulqulluu",
      docs: "Sanadoota Imalaa",
      comfort: "Mijatummaa fi Fayyaa"
    },
    items: {
      ihram: "Uffata Ihraam (Tuuta 2)",
      soap: "Saamunaa Urgooftuu Hin Qabne",
      passport: "Paaspoortii (Ji'a 6+ Kan Tajaajilu)",
      visa: "Viizaa Umrah / Appii Nusuk",
      vax: "Waraqaa Ragaa Talaallii",
      sandals: "Kophee Deemsaaf Mijatu",
      mat: "Afaan Salaataa Salphaa",
      meds: "Qoricha Dhuunfaa"
    }
  }
};

export default function PilgrimagePage() {
  const { lang, t: globalT } = useLanguage();
  const pageT = globalT.pilgrimagePage;
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getIconForStep = (id: number) => {
    switch (id) {
      case 1:
        return <Droplets className="w-6 h-6" />;
      case 2:
        return <RefreshCw className="w-6 h-6" />;
      case 3:
        return <Footprints className="w-6 h-6" />;
      case 4:
        return <Scissors className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
  };

  const steps = [
    { id: 1, ...pageT.steps.ihram },
    { id: 2, ...pageT.steps.tawaf },
    { id: 3, ...pageT.steps.sai },
    { id: 4, ...pageT.steps.halq }
  ];

  const handleWhatsApp = (packageName: string) => {
    const message = `Salam, I am interested in the ${packageName} for Umrah/Hajj.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');
  };

  const checklistData = [
    {
      category: t.categories.sacred,
      icon: <Heart className="w-5 h-5" />,
      color: {
        bg: 'bg-rose-400/90',
        text: 'text-rose-800/85',
        border: 'border-rose-200/70',
        lightBg: 'bg-rose-50/75',
        shadow: 'shadow-rose-400/20'
      },
      items: [
        { id: 'ihram', label: t.items.ihram },
        { id: 'soap', label: t.items.soap }
      ]
    },
    {
      category: t.categories.docs,
      icon: <FileText className="w-5 h-5" />,
      color: {
        bg: 'bg-amber-400/90',
        text: 'text-amber-900/80',
        border: 'border-amber-200/70',
        lightBg: 'bg-amber-50/75',
        shadow: 'shadow-amber-400/20'
      },
      items: [
        { id: 'passport', label: t.items.passport },
        { id: 'visa', label: t.items.visa },
        { id: 'vax', label: t.items.vax }
      ]
    },
    {
      category: t.categories.comfort,
      icon: <Briefcase className="w-5 h-5" />,
      color: {
        bg: 'bg-emerald-500/85',
        text: 'text-emerald-900/80',
        border: 'border-emerald-200/70',
        lightBg: 'bg-emerald-50/75',
        shadow: 'shadow-emerald-400/20'
      },
      items: [
        { id: 'sandals', label: t.items.sandals },
        { id: 'mat', label: t.items.mat },
        { id: 'meds', label: t.items.meds }
      ]
    }
  ];

  const packedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="relative w-full min-h-screen overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-20rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute right-[-16rem] top-[16rem] h-[34rem] w-[34rem] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-[4rem] left-[-14rem] h-[32rem] w-[32rem] rounded-full bg-amber-100/55 blur-3xl" />
      </div>

      {/* Hero Canvas */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 md:px-8 md:pb-20 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2.25rem] border border-white/70 bg-white/45 p-1.5 shadow-[0_35px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl md:rounded-[3.4rem] md:p-2"
        >
          <div className="relative isolate min-h-[500px] overflow-hidden rounded-[2rem] bg-slate-200 [clip-path:inset(0_round_2rem)] [contain:paint] md:min-h-[680px] md:rounded-[2.65rem] md:[clip-path:inset(0_round_2.65rem)] lg:min-h-[720px]">
            <Image
              src="/pilgrimage.png"
              alt="Darul Safar pilgrimage journey"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_center] md:object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/28 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/58 via-slate-950/10 to-transparent pointer-events-none" />

            <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-52 md:px-10 md:pb-36 lg:px-12 lg:pb-32">
              <div className="max-w-4xl">
                <h1 className="font-serif text-[2.65rem] font-black leading-[0.95] tracking-[-0.05em] text-white drop-shadow-[0_14px_34px_rgba(0,0,0,0.35)] md:text-7xl lg:text-[5.8rem]">
                  {pageT.title}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/88 md:mt-6 md:text-xl md:leading-9">
                  {pageT.subtitle}
                </p>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 z-30 rounded-[1.6rem] border border-white/30 bg-white/20 p-2 shadow-[0_24px_75px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:bottom-4 md:left-4 md:right-4 md:rounded-[2rem] md:p-3">
              <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-center md:gap-3">
                <div className="rounded-[1.15rem] bg-white/[0.86] px-4 py-3 backdrop-blur-xl md:rounded-[1.45rem] md:px-5 md:py-4">
                  <p className="max-w-2xl text-center text-xs leading-5 text-slate-800 md:text-left md:text-base md:leading-relaxed">
                    {pageT.heroCtaText}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:flex-nowrap md:gap-3">
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(pageT.economyUmrah.title)}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-[1.15rem] bg-emerald-700 px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(4,120,87,0.28)] transition hover:bg-emerald-800 active:scale-[0.98] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6"
                  >
                    {pageT.discussWhatsApp}
                  </button>
                  <span className="inline-flex min-h-12 w-full items-center justify-center whitespace-normal rounded-[1.15rem] bg-white px-5 text-center text-sm font-black leading-5 text-slate-900 shadow-[0_14px_32px_rgba(15,23,42,0.10)] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6">
                    {pageT.heroServicePill}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Packages */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-20">
        <div className="relative z-10">
          <SectionHeader title={pageT.packagesTitle} eyebrow={pageT.packagesEyebrow} className="mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <PackageCard
              title={pageT.economyUmrah.title}
              description={pageT.economyUmrah.desc}
              inclusions={pageT.economyUmrah.inclusions}
              icon={Plane}
              tone="emerald"
              indexLabel="01"
              ctaLabel={pageT.discussWhatsApp}
              onCtaClick={() => handleWhatsApp(pageT.economyUmrah.title)}
            />
            <PackageCard
              title={pageT.premiumHajj.title}
              description={pageT.premiumHajj.desc}
              inclusions={pageT.premiumHajj.inclusions}
              icon={Landmark}
              tone="amber"
              indexLabel="02"
              ctaLabel={pageT.discussWhatsApp}
              onCtaClick={() => handleWhatsApp(pageT.premiumHajj.title)}
            />
          </div>
        </div>
      </section>

      {/* Guide */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-8 py-20 md:py-24">
        <SectionHeader title={pageT.guideTitle} subtitle={pageT.guideSubtitle} className="mb-10 md:mb-12" />

        <div className="rounded-[3rem] border border-white/70 bg-white/50 p-5 md:p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-200/80 before:to-transparent">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-6 group"
                >
                  <div
                    className={`mt-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 z-10 font-headline ${
                      isActive
                        ? 'border border-emerald-700 bg-emerald-700 text-white shadow-lg shadow-emerald-700/25'
                        : 'border border-white/80 bg-white/80 text-emerald-700'
                    }`}
                  >
                    {step.id}
                  </div>

                  <motion.div
                    layout
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                    className={`flex-1 cursor-pointer overflow-hidden rounded-[2rem] border shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all ${
                      isActive
                        ? 'border-emerald-200 bg-white/78 p-7 md:p-8'
                        : 'border-white/80 bg-white/55 p-5 md:p-6 hover:border-emerald-100 hover:bg-white/70'
                    }`}
                  >
                    <motion.div layout className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex rounded-2xl p-2.5 ${
                            isActive ? 'bg-emerald-100/85 text-emerald-800' : 'bg-amber-50/90 text-amber-800/90'
                          }`}
                        >
                          {getIconForStep(step.id)}
                        </div>
                        <span className="font-headline text-xl font-bold text-slate-900">{step.title}</span>
                      </div>
                      <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className={`h-5 w-5 ${isActive ? 'text-emerald-600' : 'text-amber-600/90'}`} />
                      </motion.div>
                    </motion.div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-slate-200/70 pt-6 font-body text-base leading-8 text-slate-600 md:text-lg">
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packing Checklist */}
      <section className="w-full px-4 md:px-8 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl rounded-[3.25rem] border border-white/70 bg-white/50 p-6 shadow-[0_35px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="mb-6 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
                {t.checklistTitle}
              </span>
              <h2 className="mb-6 font-serif text-4xl font-black tracking-[-0.045em] text-slate-950 md:text-6xl">
                {t.checklistSubtitle}
              </h2>
              <p className="mb-10 font-body text-base leading-8 text-slate-600 md:text-lg md:leading-8">
                {t.checklistDesc}
              </p>

              <div className="rounded-[2rem] border border-white/75 bg-white/70 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/25">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-headline text-xl font-bold text-slate-900">{pageT.progressTitle}</h4>
                    <p className="text-base text-slate-500">
                      {pageT.progressText.replace('{count}', String(packedCount))}
                    </p>
                  </div>
                </div>
                <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-emerald-100/80">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(packedCount / 8) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {checklistData.map((category, idx) => (
                <div
                  key={idx}
                  className="rounded-[2rem] border border-white/80 bg-white/65 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors duration-300 hover:border-emerald-100/80 md:p-7"
                >
                  <h3 className="mb-6 flex items-center gap-4 border-b border-slate-200/70 pb-6 font-headline text-2xl font-bold text-slate-900">
                    <span className={`rounded-xl p-3 ${category.color.lightBg} ${category.color.text}`}>
                      {category.icon}
                    </span>
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item) => {
                      const isChecked = checkedItems[item.id] || false;
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 transition-all duration-300 ${
                            isChecked
                              ? `${category.color.lightBg} ${category.color.border} shadow-sm`
                              : 'border-slate-200/55 bg-white/55 hover:border-slate-200/80 hover:bg-white/75'
                          }`}
                        >
                          <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                              isChecked
                                ? `${category.color.bg} text-white shadow-sm ${category.color.shadow}`
                                : 'border border-slate-200/80 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="h-4 w-4" />}
                          </div>
                          <span
                            className={`font-body text-base transition-all duration-300 ${
                              isChecked ? 'text-slate-500 line-through decoration-slate-300 decoration-1' : 'font-medium text-slate-700'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="w-full px-4 pb-24 md:px-8 md:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/70 bg-slate-950 shadow-[0_35px_100px_rgba(15,23,42,0.16)]">
          <div
            className="pointer-events-none absolute -left-24 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 rounded-full bg-emerald-500/[0.22] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-[18rem] w-[18rem] rounded-full bg-amber-400/[0.18] blur-3xl"
            aria-hidden
          />
          <div className="relative z-10 px-6 py-12 md:px-12 md:py-14 lg:px-14 lg:py-16">
            <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200/95">
              {pageT.finalEyebrow}
            </span>
            <h2 className="max-w-3xl font-serif text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
              {pageT.finalTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg md:leading-8">
              {pageT.finalSubtitle}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => handleWhatsApp(pageT.economyUmrah.title)}
                className="inline-flex min-h-14 w-full items-center justify-center rounded-[1.45rem] bg-emerald-600 px-8 font-black text-white shadow-[0_18px_40px_rgba(4,120,87,0.35)] transition hover:bg-emerald-500 sm:w-auto"
              >
                {pageT.discussWhatsApp}
              </button>
              <span className="inline-flex min-h-14 w-full items-center justify-center rounded-[1.45rem] border border-white/20 bg-white/10 px-8 font-black text-white backdrop-blur-sm sm:w-auto">
                {pageT.heroServicePill ?? 'Umrah • Hajj • Ziyarah'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
