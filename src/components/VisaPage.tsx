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
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center justify-start pb-24">
      {/* Hero Section */}
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-8 mb-16">
        <section className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 hover:border-blue-200 transition-colors duration-500 text-gray-900 py-32 md:py-48 rounded-[3rem] relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative z-10 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-blue-200 text-blue-600 font-label text-xs tracking-[0.2em] rounded-full uppercase font-bold bg-blue-50/50"
          >
            <Globe2 className="w-4 h-4" />
            Elite Travel Facilitation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-headline font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-500 font-body leading-relaxed max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
          </div>
        </section>
      </div>

      {/* Interactive Form Section */}
      <section className="w-full px-4 md:px-8 max-w-4xl mx-auto -mt-12 relative z-20">
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 hover:border-blue-200 transition-colors duration-500 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

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
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.visaType}
                    </label>
                    <select name="visaType" value={formData.visaType} onChange={handleChange} required className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none shadow-sm">
                      <option value="" disabled className="text-gray-500">Select...</option>
                      {t.options.types.map((opt, i) => (
                        <option key={i} value={opt} className="bg-white text-gray-900">{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.destination}
                    </label>
                    <select name="destination" value={formData.destination} onChange={handleChange} required className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none shadow-sm">
                      <option value="" disabled className="text-gray-500">Select...</option>
                      {t.options.destinations.map((opt, i) => (
                        <option key={i} value={opt} className="bg-white text-gray-900">{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.fullName}
                    </label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required type="text" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="John Doe" />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.phone}
                    </label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="+251..." />
                  </div>

                  {/* Preferred Month */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.month}
                    </label>
                    <select name="month" value={formData.month} onChange={handleChange} required className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none shadow-sm">
                      <option value="" disabled className="text-gray-500">Select...</option>
                      {t.options.months.map((opt, i) => (
                        <option key={i} value={opt} className="bg-white text-gray-900">{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <p>{t.disclaimer}</p>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-headline font-bold uppercase tracking-widest hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 shrink-0 disabled:opacity-70 disabled:hover:scale-100"
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
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-gray-900 mb-4">
                  {t.success}
                </h3>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm font-bold"
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
