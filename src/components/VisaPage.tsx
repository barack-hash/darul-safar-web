import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Send, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    title: "Global Visa Consultation Center",
    subtitle: "Navigating international borders with the precision of a global cartographer.",
    form: {
      visaType: "Visa Type",
      destination: "Destination",
      fullName: "Full Name",
      phone: "Phone Number",
      month: "Preferred Travel Month",
      submit: "Get Expert Consultation",
      sending: "Sending...",
    },
    options: {
      types: ["Umrah/Hajj", "Work", "Medical", "Education", "Tourist"],
      destinations: ["Saudi Arabia", "Dubai/UAE", "Thailand", "Turkey", "Schengen"],
      months: ["Next 30 Days", "Within 3 Months", "Plan for Next Year"]
    },
    success: "Thank you! A Darul Safar specialist has received your inquiry and will contact you shortly.",
    disclaimer: "Visa issuance is at the sole discretion of the respective Embassy/Consulate."
  },
  ar: {
    title: "مركز الاستعلام عن التأشيرات",
    subtitle: "التنقل عبر الحدود الدولية بدقة رسام الخرائط العالمي.",
    form: {
      visaType: "نوع التأشيرة",
      destination: "الوجهة",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      month: "شهر السفر المفضل",
      submit: "احصل على استشارة خبراء",
      sending: "جاري الإرسال...",
    },
    options: {
      types: ["عمرة/حج", "عمل", "طبي", "تعليم", "سياحة"],
      destinations: ["المملكة العربية السعودية", "دبي/الإمارات", "تايلاند", "تركيا", "شنغن"],
      months: ["خلال 30 يوماً", "خلال 3 أشهر", "خطة للعام القادم"]
    },
    success: "شكراً لك! لقد تلقى أخصائي دار السفر استفسارك وسيتصل بك قريباً.",
    disclaimer: "إصدار التأشيرة يخضع لتقدير السفارة/القنصلية المعنية."
  },
  am: {
    title: "የቪዛ መጠየቂያ ማዕከል",
    subtitle: "ዓለም አቀፍ ድንበሮችን በዓለም አቀፍ ካርታ አዘጋጅ ትክክለኛነት ማሰስ።",
    form: {
      visaType: "የቪዛ አይነት",
      destination: "መዳረሻ",
      fullName: "ሙሉ ስም",
      phone: "ስልክ ቁጥር",
      month: "ተመራጭ የጉዞ ወር",
      submit: "የባለሙያ ምክር ያግኙ",
      sending: "በመላክ ላይ...",
    },
    options: {
      types: ["ዑምራ/ሐጅ", "ስራ", "ህክምና", "ትምህርት", "ቱሪስት"],
      destinations: ["ሳዑዲ አረቢያ", "ዱባይ/አረብ ኤምሬትስ", "ታይላንድ", "ቱርክ", "ሼንገን"],
      months: ["በቀጣይ 30 ቀናት", "በ3 ወራት ውስጥ", "ለሚቀጥለው ዓመት እቅድ"]
    },
    success: "እናመሰግናለን! የዳሩል ሰፈር ባለሙያ ጥያቄዎን ተቀብሏል እና በቅርቡ ያነጋግርዎታል።",
    disclaimer: "ቪዛ መስጠት በሚመለከተው ኤምባሲ/ቆንስላ ውሳኔ ላይ የተመሰረተ ነው።"
  },
  om: {
    title: "Wiirtuu Gaaffii Viizaa",
    subtitle: "Daangaa idil-addunyaa sirnawaa ta'een qaxxaamuruu.",
    form: {
      visaType: "Gosa Viizaa",
      destination: "Bakka Deeman",
      fullName: "Maqaa Guutuu",
      phone: "Lakkoofsa Bilbilaa",
      month: "Ji'a Imalaa Filatame",
      submit: "Gorsa Ogeessaa Argadhaa",
      sending: "Ergamaa Jira...",
    },
    options: {
      types: ["Umrah/Hajjii", "Hojii", "Yaala", "Barnoota", "Turistii"],
      destinations: ["Saawud Arabiyaa", "Dubay/UAE", "Taaylaandi", "Tarkii", "Schengen"],
      months: ["Guyyoota 30 Itti Aanan", "Ji'oota 3 Keessatti", "Karoora Bara Itti Aanuu"]
    },
    success: "Galatoomaa! Ogeessi Darul Safar gaaffii keessan fudhateera, dhiyoottis isin quunnama.",
    disclaimer: "Viizaa kennuun murtee Embaasii/Qoonsilaa dhimmi ilaallatu qofa irratti hundaa'a."
  }
};

export default function VisaPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    visaType: '',
    destination: '',
    fullName: '',
    phone: '',
    month: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mlgokzaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ visaType: '', destination: '', fullName: '', phone: '', month: '' });
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col items-center justify-start pb-24">
      {/* Hero Section */}
      <section className="w-full bg-navy text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-gold text-gold font-label text-xs tracking-[0.2em] rounded-full uppercase font-bold"
          >
            <Globe2 className="w-4 h-4" />
            Elite Travel Facilitation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-headline font-extrabold mb-6 tracking-tighter"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 font-body leading-relaxed max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="w-full px-4 md:px-8 max-w-4xl mx-auto -mt-12 relative z-20">
        <div className="bg-navy/95 backdrop-blur-xl border border-gold/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="relative z-10 space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Visa Type */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-gold uppercase tracking-widest">
                      {t.form.visaType}
                    </label>
                    <select name="visaType" value={formData.visaType} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none">
                      <option value="" disabled className="text-slate-500">Select...</option>
                      {t.options.types.map((opt, i) => (
                        <option key={i} value={opt} className="bg-navy text-white">{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-gold uppercase tracking-widest">
                      {t.form.destination}
                    </label>
                    <select name="destination" value={formData.destination} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none">
                      <option value="" disabled className="text-slate-500">Select...</option>
                      {t.options.destinations.map((opt, i) => (
                        <option key={i} value={opt} className="bg-navy text-white">{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-gold uppercase tracking-widest">
                      {t.form.fullName}
                    </label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="John Doe" />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-gold uppercase tracking-widest">
                      {t.form.phone}
                    </label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="+251..." />
                  </div>

                  {/* Preferred Month */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-label font-bold text-gold uppercase tracking-widest">
                      {t.form.month}
                    </label>
                    <select name="month" value={formData.month} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none">
                      <option value="" disabled className="text-slate-500">Select...</option>
                      {t.options.months.map((opt, i) => (
                        <option key={i} value={opt} className="bg-navy text-white">{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3 text-slate-400 text-sm">
                    <AlertCircle className="w-5 h-5 text-gold shrink-0" />
                    <p>{t.disclaimer}</p>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-gold text-navy px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-widest hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isSubmitting ? t.form.sending : t.form.submit}
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4">
                  {t.success}
                </h3>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-2 border border-gold text-gold rounded-full font-label text-sm uppercase tracking-widest hover:bg-gold hover:text-navy transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
