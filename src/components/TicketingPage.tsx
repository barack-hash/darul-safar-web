import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, PlaneTakeoff, PlaneLanding, Users, Calendar, MessageCircle, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    title: "Global Air Ticketing & Logistics",
    subtitle: "Seamless flight arrangements through our elite airline network. Best rates guaranteed.",
    partners: "Our Elite Airline Partners",
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
  const t = translations[lang];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    departure: 'Addis Ababa',
    destination: '',
    date: '',
    passengers: '1'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = t.whatsappMsg
      .replace('{departure}', formData.departure || 'Addis Ababa')
      .replace('{destination}', formData.destination || '[Destination]')
      .replace('{date}', formData.date || '[Date]')
      .replace('{passengers}', formData.passengers || '1');
    
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/251911000000?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center justify-start pb-24">
      {/* Hero Section */}
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-8 mb-16">
        <section className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 hover:border-blue-200 transition-colors duration-500 text-gray-900 py-32 md:py-48 rounded-[3rem] relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative z-10 text-center px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl mb-8 shadow-sm border border-blue-100"
            >
              <Plane className="w-10 h-10 text-blue-600" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-headline font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600"
            >
              {t.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-gray-500 font-body leading-relaxed max-w-2xl mx-auto"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </section>
      </div>

      {/* Airline Partners */}
      <section className="w-full px-4 md:px-8 max-w-7xl mx-auto mb-32 md:mb-48">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <h2 className="text-sm font-label font-bold text-gray-400 uppercase tracking-[0.2em]">{t.partners}</h2>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {airlinePartners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group w-32 h-16 md:w-40 md:h-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 flex items-center justify-center p-4 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 hover:-translate-y-2 hover:scale-105 transition-all duration-500 grayscale hover:grayscale-0 cursor-pointer"
            >
              <img src={partner.logo} alt={partner.name} className="h-16 w-full object-contain transition-transform duration-500 group-hover:scale-110" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="w-full px-4 md:px-8 max-w-4xl mx-auto relative z-20 mb-32 md:mb-48">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/40 backdrop-blur-3xl border border-white/60 hover:border-blue-200 transition-colors duration-500 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 mb-8 text-center">
            <h3 className="text-2xl font-headline font-bold text-gray-900">{t.form.title}</h3>
          </div>

          <form 
            onSubmit={handleWhatsApp}
            className="relative z-10 space-y-8"
          >
            {/* Flight Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                  <PlaneTakeoff className="w-4 h-4" /> {t.form.departure}
                </label>
                <input name="departure" value={formData.departure} onChange={handleChange} required type="text" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="Addis Ababa" />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                  <PlaneLanding className="w-4 h-4" /> {t.form.destination}
                </label>
                <input name="destination" value={formData.destination} onChange={handleChange} required type="text" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="City or Airport Code" />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                  <Calendar className="w-4 h-4" /> {t.form.date}
                </label>
                <input name="date" value={formData.date} onChange={handleChange} required type="date" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                  <Users className="w-4 h-4" /> {t.form.passengers}
                </label>
                <input name="passengers" value={formData.passengers} onChange={handleChange} required type="number" min="1" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-green-500 text-white font-headline font-bold px-8 py-4 rounded-2xl hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                {t.form.whatsappBtn}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Popular Routes Section */}
      <section className="w-full px-4 md:px-8 max-w-7xl mx-auto mb-32 md:mb-48">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">{t.popularRoutes.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { city: t.popularRoutes.dubai, desc: t.popularRoutes.dubaiDesc, icon: "🏙️" },
            { city: t.popularRoutes.jeddah, desc: t.popularRoutes.jeddahDesc, icon: "🕋" },
            { city: t.popularRoutes.istanbul, desc: t.popularRoutes.istanbulDesc, icon: "🕌" },
            { city: t.popularRoutes.london, desc: t.popularRoutes.londonDesc, icon: "🎡" }
          ].map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{route.icon}</div>
              <h3 className="text-xl font-headline font-bold text-gray-900 mb-2">{route.city}</h3>
              <p className="text-sm text-gray-500 font-body leading-relaxed">{route.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Baggage & Services Guide */}
      <section className="w-full px-4 md:px-8 max-w-7xl mx-auto mb-32 md:mb-48">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">{t.baggageGuide.title}</h2>
        </motion.div>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
          {[
            { name: "Ethiopian Airlines", logo: "/ethiopian.png", highlight: t.baggageGuide.ethiopian },
            { name: "Qatar Airways", logo: "/qatar.png", highlight: t.baggageGuide.qatar },
            { name: "Saudia", logo: "/saudia.png", highlight: t.baggageGuide.saudia },
            { name: "Emirates", logo: "/emirates.png", highlight: t.baggageGuide.emirates }
          ].map((airline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="snap-center shrink-0 w-72 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col items-center text-center"
            >
              <div className="h-16 flex items-center justify-center mb-6">
                <img src={airline.logo} alt={airline.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
                <Briefcase className="w-4 h-4" />
                {airline.highlight}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
