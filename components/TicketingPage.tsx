"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Users,
  Calendar,
  MessageCircle,
  Briefcase,
  AlertCircle,
  CheckCircle,
  MapPin,
  Building2,
  Landmark,
  Globe2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AirportAutocomplete from './AirportAutocomplete';

const translations = {
  en: {
    title: "Global Air Ticketing & Logistics",
    subtitle: "Seamless flight arrangements through our elite airline network. Best rates guaranteed.",
    partners: "Our Elite Airline Partners",
    partnersTitle: "Trusted airline access",
    heroBadge: "Global ticketing",
    heroCtaText:
      "Compare routes, coordinate airlines, and book international flights with clear guidance from Darul Safar.",
    heroAirlinePill: "Ethiopian • Qatar • Saudia • Emirates",
    routesEyebrow: "Popular routes",
    baggageEyebrow: "Airline guidance",
    finalEyebrow: "Ready when you are",
    finalTitle: "Plan your next flight with clarity.",
    finalSubtitle:
      "Share your route, travel date, and passenger count. Darul Safar will help you compare options and move with confidence.",
    form: {
      title: "Flight Inquiry",
      departure: "Departure City",
      destination: "Destination City",
      date: "Preferred Date",
      passengers: "Number of Passengers",
      whatsappBtn: "Get Best Price on WhatsApp",
    },
    whatsappMsg: "Hi Darul Safar, I want to book a flight from {departure} to {destination} on {date} for {passengers} people. Please send me the best price!",
    popularRoutes: {
      title: "Top Destinations",
      dubai: "Dubai, UAE",
      dubaiDesc: "Daily flights with Emirates & FlyDubai.",
      jeddah: "Jeddah, KSA",
      jeddahDesc: "Direct routes for Umrah & Business.",
      istanbul: "Istanbul, Turkey",
      istanbulDesc: "Connecting Europe and Asia.",
      london: "London, UK",
      londonDesc: "Premium direct flights via Ethiopian.",
    },
    baggageGuide: {
      title: "Baggage & Services Guide",
      ethiopian: "2x 23kg bags included",
      qatar: "Award-winning service",
      saudia: "Generous baggage allowance",
      emirates: "Premium In-flight Dining"
    }
  },
  ar: {
    title: "حجز التذاكر العالمية والخدمات اللوجستية",
    subtitle: "ترتيبات طيران سلسة من خلال شبكة خطوطنا الجوية النخبة. أفضل الأسعار مضمونة.",
    partners: "شركاؤنا من الخطوط الجوية النخبة",
    partnersTitle: "وصول موثوق إلى شركات الطيران",
    heroBadge: "تذاكر عالمية",
    heroCtaText:
      "قارن المسارات، ونسق مع شركات الطيران، واحجز الرحلات الدولية بإرشاد واضح من دار السفر.",
    heroAirlinePill: "الإثيوبية • القطرية • السعودية • الإمارات",
    routesEyebrow: "المسارات الشائعة",
    baggageEyebrow: "إرشادات شركات الطيران",
    finalEyebrow: "جاهزون عندما تكون مستعداً",
    finalTitle: "خطط لرحلتك القادمة بوضوح.",
    finalSubtitle:
      "شاركنا المسار وتاريخ السفر وعدد الركاب، وستساعدك دار السفر على مقارنة الخيارات والتحرك بثقة.",
    form: {
      title: "استفسار عن رحلة",
      departure: "مدينة المغادرة",
      destination: "مدينة الوصول",
      date: "التاريخ المفضل",
      passengers: "عدد الركاب",
      whatsappBtn: "احصل على أفضل سعر على واتساب",
    },
    whatsappMsg: "مرحباً دار السفر، أريد حجز رحلة من {departure} إلى {destination} بتاريخ {date} لـ {passengers} أشخاص. يرجى إرسال أفضل سعر!",
    popularRoutes: {
      title: "أفضل الوجهات",
      dubai: "دبي، الإمارات",
      dubaiDesc: "رحلات يومية مع طيران الإمارات وفلاي دبي.",
      jeddah: "جدة، السعودية",
      jeddahDesc: "رحلات مباشرة للعمرة والأعمال.",
      istanbul: "إسطنبول، تركيا",
      istanbulDesc: "ربط أوروبا وآسيا.",
      london: "لندن، المملكة المتحدة",
      londonDesc: "رحلات مباشرة فاخرة عبر الخطوط الإثيوبية.",
    },
    baggageGuide: {
      title: "دليل الأمتعة والخدمات",
      ethiopian: "حقيبتان بوزن 23 كجم متضمنة",
      qatar: "خدمة حائزة على جوائز",
      saudia: "وزن أمتعة سخي",
      emirates: "طعام فاخر على متن الطائرة"
    }
  },
  am: {
    title: "ዓለም አቀፍ የአየር ትኬት እና ሎጂስቲክስ",
    subtitle: "በእኛ ምርጥ የአየር መንገድ አውታረ መረብ በኩል እንከን የለሽ የበረራ ዝግጅቶች። ምርጥ ዋጋዎች ተረጋግጠዋል።",
    partners: "የእኛ ምርጥ የአየር መንገድ አጋሮች",
    partnersTitle: "የታመነ የአየር መንገድ ተደራሽነት",
    heroBadge: "ዓለም አቀፍ ትኬት",
    heroCtaText:
      "መስመሮችን ያወዳድሩ፣ የአየር መንገዶችን ያቀናብሩ፣ እና በዳሩል ሰፈር ግልጽ መመሪያ ዓለም አቀፍ በረራዎችን ይያዙ።",
    heroAirlinePill: "ኢትዮጵያን • ኳታር • ሳዑዲያ • ኤሚሬትስ",
    routesEyebrow: "ታዋቂ መስመሮች",
    baggageEyebrow: "የአየር መንገድ መመሪያ",
    finalEyebrow: "እርስዎ ሲዘጋጁ እኛም ዝግጁ ነን",
    finalTitle: "ቀጣዩን በረራዎን በግልጽነት ያቅዱ።",
    finalSubtitle:
      "መስመርዎን፣ የጉዞ ቀንዎን እና የተሳፋሪዎችን ብዛት ያጋሩን። ዳሩል ሰፈር አማራጮችን እንዲያወዳድሩ እና በመተማመን እንዲጓዙ ይረዳዎታል።",
    form: {
      title: "የበረራ ጥያቄ",
      departure: "መነሻ ከተማ",
      destination: "መድረሻ ከተማ",
      date: "የሚመረጥበት ቀን",
      passengers: "የመንገደኞች ብዛት",
      whatsappBtn: "በዋትስአፕ ምርጥ ዋጋ ያግኙ",
    },
    whatsappMsg: "ሰላም ዳሩል ሰፈር፣ ከ {departure} ወደ {destination} በ {date} ለ {passengers} ሰዎች በረራ መያዝ እፈልጋለሁ። እባክዎ ምርጥ ዋጋ ይላኩልኝ!",
    popularRoutes: {
      title: "ዋና መዳረሻዎች",
      dubai: "ዱባይ፣ የተባበሩት አረብ ኤሚሬቶች",
      dubaiDesc: "በየቀኑ በኤሚሬትስ እና ፍላይ ዱባይ በረራዎች።",
      jeddah: "ጂዳ፣ ሳዑዲ አረቢያ",
      jeddahDesc: "ለዑምራ እና ንግድ ቀጥታ መስመሮች።",
      istanbul: "ኢስታንቡል፣ ቱርክ",
      istanbulDesc: "አውሮፓን እና እስያን ማገናኘት።",
      london: "ለንደን፣ ዩናይትድ ኪንግደም",
      londonDesc: "በኢትዮጵያ አየር መንገድ ፕሪሚየም ቀጥታ በረራዎች።",
    },
    baggageGuide: {
      title: "የሻንጣ እና አገልግሎቶች መመሪያ",
      ethiopian: "2x 23 ኪ.ግ ሻንጣዎች ተካትተዋል",
      qatar: "ተሸላሚ አገልግሎት",
      saudia: "ለጋስ የሻንጣ አበል",
      emirates: "ፕሪሚየም የበረራ ውስጥ ምግብ"
    }
  },
  om: {
    title: "Tikeetii Qilleensaa Idil-addunyaa fi Loojistiksii",
    subtitle: "Qophii balalii rakkoo hin qabne karaa networkii daandii qilleensaa keenya filatamaa ta'een. Gatiin gaariin mirkanaa'aadha.",
    partners: "Michoota Daandii Qilleensaa Keenya Filatamoo",
    partnersTitle: "Seenuu daandii xiyyaaraa amanamaa",
    heroBadge: "Tikeetii idil-addunyaa",
    heroCtaText:
      "Daandii balalii wal bira qabi, daandii xiyyaaraa qindeessi, balalii idil-addunyaa qajeelfama ifaa Darul Safar waliin qabsiisi.",
    heroAirlinePill: "Ethiopian • Qatar • Saudia • Emirates",
    routesEyebrow: "Daandiiwwan beekamoo",
    baggageEyebrow: "Qajeelfama daandii xiyyaaraa",
    finalEyebrow: "Yeroo ati qophooftu nutis qophiidha",
    finalTitle: "Balalii kee itti aanu iftoominaan karoorsi.",
    finalSubtitle:
      "Daandii, guyyaa imalaa, fi baay'ina imaltootaa nuuf qoodi. Darul Safar filannoowwan wal bira qabuufi amantaan imaluuf si gargaara.",
    form: {
      title: "Gaaffii Balalii",
      departure: "Magaalaa Ka'umsaa",
      destination: "Magaalaa Gahumsaa",
      date: "Guyyaa Filatamaa",
      passengers: "Baay'ina Imaltootaa",
      whatsappBtn: "Gatii Gaarii WhatsApp Irraan Argadhu",
    },
    whatsappMsg: "Akkam Darul Safar, balalii {departure} irraa gara {destination} guyyaa {date} namoota {passengers} tiif qabsiisuu barbaada. Maaloo gatii gaarii naaf ergaa!",
    popularRoutes: {
      title: "Bakkeewwan Gahumsaa Beekamoo",
      dubai: "Dubaa'ii, UAE",
      dubaiDesc: "Balalii guyyaa guyyaa Emirates fi FlyDubai waliin.",
      jeddah: "Jiddaa, KSA",
      jeddahDesc: "Daandii kallattii Umrah fi Bizinasiif.",
      istanbul: "Istanbuul, Tarkii",
      istanbulDesc: "Awurooppaa fi Eeshiyaa walquunnamsiisuu.",
      london: "Landan, UK",
      londonDesc: "Balalii kallattii sadarkaa olaanaa daandii xiyyaaraa Itoophiyaatiin.",
    },
    baggageGuide: {
      title: "Qajeelfama Meeshaa fi Tajaajilootaa",
      ethiopian: "Borsaa 2x 23kg of keessatti qabata",
      qatar: "Tajaajila badhaasa argate",
      saudia: "Eeyyama meeshaa gaarii",
      emirates: "Nyaata balalii keessaa sadarkaa olaanaa"
    }
  }
};

const airlinePartners = [
  { name: "Ethiopian Airlines", logo: "/ethiopian.png", url: "https://www.ethiopianairlines.com/" },
  { name: "Qatar Airways", logo: "/qatar.png", url: "https://www.qatarairways.com/" },
  { name: "Saudia", logo: "/saudia.png", url: "https://www.saudia.com/" },
  { name: "Emirates", logo: "/emirates.png", url: "https://www.emirates.com/" }
];

export default function TicketingPage() {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] ?? translations.en;
  const formRef = useRef<HTMLElement | null>(null);
  const [heroSrc, setHeroSrc] = useState('/services/GAT11.png');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    departure: 'Addis Ababa',
    destination: '',
    date: '',
    passengers: '1'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage('');
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusText = {
    en: {
      fillAllFields: 'Please complete all fields before continuing.',
      invalidPassengers: 'Passengers must be at least 1.',
      invalidDate: 'Please choose today or a future date.',
      success: 'Your request is ready. WhatsApp has been opened with your flight details.',
      error: 'Unable to open WhatsApp right now. Please try again.'
    },
    ar: {
      fillAllFields: 'يرجى إكمال جميع الحقول قبل المتابعة.',
      invalidPassengers: 'يجب أن يكون عدد الركاب 1 على الأقل.',
      invalidDate: 'يرجى اختيار تاريخ اليوم أو تاريخ مستقبلي.',
      success: 'طلبك جاهز. تم فتح واتساب مع تفاصيل الرحلة.',
      error: 'تعذر فتح واتساب الآن. يرجى المحاولة مرة أخرى.'
    },
    am: {
      fillAllFields: 'እባክዎ ከመቀጠልዎ በፊት ሁሉንም መስኮች ይሙሉ።',
      invalidPassengers: 'የተሳፋሪ ብዛት ቢያንስ 1 መሆን አለበት።',
      invalidDate: 'እባክዎ የዛሬን ወይም የወደፊት ቀን ይምረጡ።',
      success: 'ጥያቄዎ ዝግጁ ነው። ዋትስአፕ ከየበረራ ዝርዝሮች ጋር ተከፍቷል።',
      error: 'ዋትስአፕን አሁን መክፈት አልተቻለም። እባክዎ ዳግም ይሞክሩ።'
    },
    om: {
      fillAllFields: 'Maaloo osoo hin itti fufiin dura dirreewwan hunda guutaa.',
      invalidPassengers: 'Baay inni imaltootaa yoo xiqqaate 1 ta uu qaba.',
      invalidDate: 'Maaloo guyyaa har aa yookaan gara fuulduraa fili.',
      success: 'Gaaffiin kee qophaa eera. WhatsApp odeeffannoo balalii keetiin banameera.',
      error: 'WhatsApp amma banuu hin dandeenye. Maaloo irra deebi aa yaali.'
    }
  }[lang];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.departure.trim() || !formData.destination.trim() || !formData.date || !formData.passengers) {
      setSubmitState('error');
      setSubmitMessage(statusText.fillAllFields);
    }

    if (Number(formData.passengers) < 1) {
      errors.passengers = statusText.invalidPassengers;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    if (!formData.date || Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      errors.date = statusText.invalidDate;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0 && !!formData.departure.trim() && !!formData.destination.trim() && !!formData.date && !!formData.passengers;
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitState('idle');
    if (!validateForm()) return;

    setIsSubmitting(true);
    const msg = t.whatsappMsg
      .replace('{departure}', formData.departure || 'Addis Ababa')
      .replace('{destination}', formData.destination || '[Destination]')
      .replace('{date}', formData.date || '[Date]')
      .replace('{passengers}', formData.passengers || '1');
    
    try {
      const encodedMsg = encodeURIComponent(msg);
      const win = window.open(`https://wa.me/251911000000?text=${encodedMsg}`, '_blank');
      if (win) {
        setSubmitState('success');
        setSubmitMessage(statusText.success);
      } else {
        setSubmitState('error');
        setSubmitMessage(statusText.error);
      }
    } catch (error) {
      console.error('Error opening WhatsApp', error);
      setSubmitState('error');
      setSubmitMessage(statusText.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToInquiry = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    requestAnimationFrame(() => {
      const firstInput = formRef.current?.querySelector<HTMLElement>('input, [data-airport-input]');
      firstInput?.focus?.();
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-20rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute right-[-16rem] top-[16rem] h-[34rem] w-[34rem] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-[4rem] left-[-14rem] h-[32rem] w-[32rem] rounded-full bg-amber-100/55 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 md:px-8 md:pb-20 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2.25rem] border border-white/70 bg-white/45 p-1.5 shadow-[0_35px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl md:rounded-[3.4rem] md:p-2"
        >
          <div className="relative isolate min-h-[500px] overflow-hidden rounded-[2rem] bg-slate-200 [clip-path:inset(0_round_2rem)] [contain:paint] md:min-h-[680px] md:rounded-[2.65rem] md:[clip-path:inset(0_round_2.65rem)] lg:min-h-[720px]">
            <Image
              src={heroSrc}
              alt="Darul Safar global air ticketing"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[45%_center] md:object-center"
              onError={() => setHeroSrc('/ticketing.png')}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/28 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/58 via-slate-950/10 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-slate-950/35 via-slate-950/10 to-transparent" />

            <div className="absolute left-5 top-6 z-20 md:left-10 md:top-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-2xl shadow-sm">
                <Plane className="h-4 w-4 shrink-0 text-white" aria-hidden />
                <span>{t.heroBadge}</span>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-52 md:px-10 md:pb-44 lg:px-12 lg:pb-44">
              <div className="max-w-4xl text-left">
                <h1 className="font-serif text-[2.65rem] font-black leading-[0.95] tracking-[-0.05em] text-white drop-shadow-[0_14px_34px_rgba(0,0,0,0.35)] md:text-7xl lg:text-[5.2rem]">
                  {t.title}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/88 md:mt-6 md:text-xl md:leading-9">
                  {t.subtitle}
                </p>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 z-30 rounded-[1.6rem] border border-white/30 bg-white/20 p-2 shadow-[0_24px_75px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:bottom-4 md:left-4 md:right-4 md:rounded-[2rem] md:p-3">
              <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-center md:gap-3">
                <div className="rounded-[1.15rem] bg-white/[0.86] px-4 py-3 backdrop-blur-xl md:rounded-[1.45rem] md:px-5 md:py-4">
                  <p className="max-w-2xl text-center text-xs leading-5 text-slate-800 md:text-left md:text-base md:leading-relaxed">
                    {t.heroCtaText}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:flex-nowrap md:gap-3">
                  <button
                    type="button"
                    onClick={scrollToInquiry}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-[1.15rem] bg-emerald-700 px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(4,120,87,0.28)] transition hover:bg-emerald-800 active:scale-[0.98] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6"
                  >
                    {t.form.whatsappBtn}
                  </button>
                  <span className="inline-flex min-h-12 w-full items-center justify-center whitespace-normal rounded-[1.15rem] bg-white px-5 text-center text-sm font-black leading-5 text-slate-900 shadow-[0_14px_32px_rgba(15,23,42,0.10)] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6">
                    {t.heroAirlinePill}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Airline Partners */}
      <section className="mx-auto mb-24 w-full max-w-7xl px-4 md:mb-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10"
        >
          <div className="mb-8 text-center md:mb-10">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-800/90">
              {t.partners}
            </p>
            <h2 className="font-serif text-2xl font-black tracking-[-0.03em] text-slate-950 md:text-3xl">
              {t.partnersTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {airlinePartners.map((partner, index) => (
              <motion.a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group flex h-28 items-center justify-center rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:bg-white md:p-6"
              >
                <div className="relative h-10 w-full md:h-12">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width:768px) 40vw, 180px"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Flight inquiry form */}
      <section
        id="flight-inquiry"
        ref={formRef}
        className="relative z-20 mx-auto mb-32 w-full max-w-5xl px-4 md:mb-40 md:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[3rem] border border-white/70 bg-white/55 p-6 shadow-[0_35px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl [clip-path:inset(0_round_3rem)] [contain:paint] md:p-10 lg:p-12"
        >
          <div
            className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-sky-300/20 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mb-8 text-center md:mb-10">
            <h3 className="font-serif text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
              {t.form.title}
            </h3>
          </div>

          <form onSubmit={handleWhatsApp} className="relative z-10 space-y-8">
            {submitState !== 'idle' && submitMessage && (
              <div
                className={`flex items-start gap-2 rounded-2xl border px-4 py-3 font-body text-sm ${
                  submitState === 'success'
                    ? 'border-emerald-200 bg-emerald-50/80 text-emerald-800'
                    : 'border-red-200 bg-red-50/80 text-red-700'
                }`}
              >
                {submitState === 'success' ? (
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{submitMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <AirportAutocomplete
                  value={formData.departure}
                  onChange={(value) => {
                    if (fieldErrors.departure) {
                      setFieldErrors((prev) => ({ ...prev, departure: '' }));
                    }
                    if (submitState !== 'idle') {
                      setSubmitState('idle');
                      setSubmitMessage('');
                    }
                    setFormData((prev) => ({ ...prev, departure: value }));
                  }}
                  placeholder="Addis Ababa"
                  label={
                    <>
                      <PlaneTakeoff className="h-4 w-4" /> {t.form.departure}
                    </>
                  }
                />
              </div>

              <div className="space-y-2">
                <AirportAutocomplete
                  value={formData.destination}
                  onChange={(value) => {
                    if (fieldErrors.destination) {
                      setFieldErrors((prev) => ({ ...prev, destination: '' }));
                    }
                    if (submitState !== 'idle') {
                      setSubmitState('idle');
                      setSubmitMessage('');
                    }
                    setFormData((prev) => ({ ...prev, destination: value }));
                  }}
                  placeholder="City or Airport Code"
                  label={
                    <>
                      <PlaneLanding className="h-4 w-4" /> {t.form.destination}
                    </>
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-label font-bold uppercase tracking-widest text-emerald-800/90">
                  <Calendar className="h-4 w-4" /> {t.form.date}
                </label>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  type="date"
                  className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-gray-900 shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
                {fieldErrors.date && <p className="font-body text-xs text-red-600">{fieldErrors.date}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-label font-bold uppercase tracking-widest text-emerald-800/90">
                  <Users className="h-4 w-4" /> {t.form.passengers}
                </label>
                <input
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  required
                  type="number"
                  min="1"
                  className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-gray-900 shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
                {fieldErrors.passengers && (
                  <p className="font-body text-xs text-red-600">{fieldErrors.passengers}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1.35rem] bg-slate-950 px-8 font-black text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                <MessageCircle className="h-6 w-6" />
                {isSubmitting ? 'Loading...' : t.form.whatsappBtn}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Popular Routes */}
      <section className="mx-auto mb-28 w-full max-w-7xl px-4 md:mb-36 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10"
        >
          <div className="mb-8 text-center md:mb-10">
            <span className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
              {t.routesEyebrow}
            </span>
            <h2 className="font-serif text-3xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">
              {t.popularRoutes.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                city: t.popularRoutes.dubai,
                desc: t.popularRoutes.dubaiDesc,
                code: 'ADD → DXB',
                Icon: MapPin,
                glow: 'from-emerald-400/15 via-transparent to-sky-400/10'
              },
              {
                city: t.popularRoutes.jeddah,
                desc: t.popularRoutes.jeddahDesc,
                code: 'ADD → JED',
                Icon: Landmark,
                glow: 'from-amber-400/12 via-transparent to-emerald-400/10'
              },
              {
                city: t.popularRoutes.istanbul,
                desc: t.popularRoutes.istanbulDesc,
                code: 'ADD → IST',
                Icon: Building2,
                glow: 'from-sky-400/12 via-transparent to-emerald-400/10'
              },
              {
                city: t.popularRoutes.london,
                desc: t.popularRoutes.londonDesc,
                code: 'ADD → LHR',
                Icon: Globe2,
                glow: 'from-emerald-400/12 via-transparent to-amber-400/8'
              }
            ].map((route, index) => {
              const RouteIcon = route.Icon;
              return (
                <motion.div
                  key={route.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative min-h-[230px] overflow-hidden rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
                >
                  <div
                    className={`pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${route.glow} opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                    aria-hidden
                  />
                  <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                    <RouteIcon className="h-6 w-6" aria-hidden />
                  </div>
                  <p className="relative z-[1] mt-4 inline-flex rounded-full border border-white/80 bg-white/70 px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-slate-700">
                    {route.code}
                  </p>
                  <h3 className="relative z-[1] mt-4 font-headline text-xl font-bold text-slate-900">{route.city}</h3>
                  <p className="relative z-[1] mt-2 font-body text-sm leading-relaxed text-slate-600">{route.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Baggage & Services Guide */}
      <section className="mx-auto mb-28 w-full max-w-7xl px-4 md:mb-36 md:px-8">
        <div className="mb-8 text-center md:mb-10">
          <span className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
            {t.baggageEyebrow}
          </span>
          <h2 className="font-serif text-3xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">
            {t.baggageGuide.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Ethiopian Airlines', logo: '/ethiopian.png', highlight: t.baggageGuide.ethiopian },
            { name: 'Qatar Airways', logo: '/qatar.png', highlight: t.baggageGuide.qatar },
            { name: 'Saudia', logo: '/saudia.png', highlight: t.baggageGuide.saudia },
            { name: 'Emirates', logo: '/emirates.png', highlight: t.baggageGuide.emirates }
          ].map((airline, index) => (
            <motion.div
              key={airline.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group flex min-h-[220px] flex-col rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
            >
              <div className="relative mb-5 flex h-20 w-full items-center justify-center rounded-[1.5rem] border border-white/80 bg-white/75 px-4">
                <div className="relative h-12 w-full max-w-[140px]">
                  <Image src={airline.logo} alt={airline.name} fill className="object-contain" sizes="140px" />
                </div>
              </div>
              <div className="mt-auto inline-flex items-center gap-2 self-start rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
                <Briefcase className="h-4 w-4 shrink-0" aria-hidden />
                {airline.highlight}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-slate-950 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.18)] md:p-12"
        >
          <div
            className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-500/[0.22] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-sky-400/[0.18] blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200/95">
                {t.finalEyebrow}
              </span>
              <h2 className="max-w-xl font-serif text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                {t.finalTitle}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/75 md:text-lg md:leading-8">
                {t.finalSubtitle}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
              <button
                type="button"
                onClick={scrollToInquiry}
                className="inline-flex min-h-14 w-full items-center justify-center rounded-[1.35rem] bg-white px-8 font-black text-slate-950 shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition hover:bg-emerald-50 sm:w-auto lg:w-full"
              >
                {t.form.whatsappBtn}
              </button>
              <span className="inline-flex min-h-12 w-full items-center justify-center rounded-[1.35rem] border border-white/20 bg-white/10 px-6 text-center text-sm font-black text-white backdrop-blur-sm sm:w-auto lg:w-full">
                {t.heroAirlinePill}
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
