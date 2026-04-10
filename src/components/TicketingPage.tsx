import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Send, Plane, PlaneTakeoff, PlaneLanding, Users, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    title: "Global Air Ticketing & Logistics",
    subtitle: "Seamless flight arrangements through our elite airline network. Best rates guaranteed.",
    partners: "Our Elite Airline Partners",
    form: {
      departure: "Departure City",
      destination: "Destination City",
      departDate: "Departure Date",
      returnDate: "Return Date",
      passengers: "Number of Passengers",
      cabin: "Cabin Class",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      submit: "Request Flight Quote",
      sending: "Sending...",
    },
    options: {
      cabins: ["Economy", "Business", "First Class"]
    },
    success: "Thank you! A Darul Safar ticketing agent has received your request and will contact you shortly with the best options.",
    disclaimer: "Fares and availability are subject to change until ticketed."
  },
  ar: {
    title: "حجز التذاكر العالمية والخدمات اللوجستية",
    subtitle: "ترتيبات طيران سلسة من خلال شبكة خطوطنا الجوية النخبة. أفضل الأسعار مضمونة.",
    partners: "شركاؤنا من الخطوط الجوية النخبة",
    form: {
      departure: "مدينة المغادرة",
      destination: "مدينة الوصول",
      departDate: "تاريخ المغادرة",
      returnDate: "تاريخ العودة",
      passengers: "عدد الركاب",
      cabin: "درجة السفر",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      submit: "طلب عرض سعر رحلة",
      sending: "جاري الإرسال...",
    },
    options: {
      cabins: ["الدرجة السياحية", "درجة رجال الأعمال", "الدرجة الأولى"]
    },
    success: "شكراً لك! لقد تلقى وكيل تذاكر دار السفر طلبك وسيتصل بك قريباً بأفضل الخيارات.",
    disclaimer: "الأسعار والتوافر عرضة للتغيير حتى يتم إصدار التذكرة."
  },
  am: {
    title: "ዓለም አቀፍ የአየር ትኬት እና ሎጂስቲክስ",
    subtitle: "በእኛ ምርጥ የአየር መንገድ አውታረ መረብ በኩል እንከን የለሽ የበረራ ዝግጅቶች። ምርጥ ዋጋዎች ተረጋግጠዋል።",
    partners: "የእኛ ምርጥ የአየር መንገድ አጋሮች",
    form: {
      departure: "መነሻ ከተማ",
      destination: "መድረሻ ከተማ",
      departDate: "የመነሻ ቀን",
      returnDate: "የመመለሻ ቀን",
      passengers: "የመንገደኞች ብዛት",
      cabin: "የበረራ ክፍል",
      fullName: "ሙሉ ስም",
      phone: "ስልክ ቁጥር",
      email: "ኢሜይል",
      submit: "የበረራ ዋጋ ይጠይቁ",
      sending: "በመላክ ላይ...",
    },
    options: {
      cabins: ["ኢኮኖሚ", "ቢዝነስ", "አንደኛ ደረጃ"]
    },
    success: "እናመሰግናለን! የዳሩል ሰፈር የትኬት ወኪል ጥያቄዎን ተቀብሏል እና በቅርቡ ምርጥ አማራጮችን ይዞ ያነጋግርዎታል።",
    disclaimer: "ትኬት እስኪቆረጥ ድረስ ዋጋዎች እና ተገኝነት ሊለወጡ ይችላሉ።"
  },
  om: {
    title: "Tikeetii Qilleensaa Idil-addunyaa fi Loojistiksii",
    subtitle: "Qophii balalii rakkoo hin qabne karaa networkii daandii qilleensaa keenya filatamaa ta'een. Gatiin gaariin mirkanaa'aadha.",
    partners: "Michoota Daandii Qilleensaa Keenya Filatamoo",
    form: {
      departure: "Magaalaa Ka'umsaa",
      destination: "Magaalaa Gahumsaa",
      departDate: "Guyyaa Ka'umsaa",
      returnDate: "Guyyaa Deebii",
      passengers: "Baay'ina Imaltootaa",
      cabin: "Kutaa Balalii",
      fullName: "Maqaa Guutuu",
      phone: "Lakkoofsa Bilbilaa",
      email: "Imeelii",
      submit: "Gatii Balalii Gaafadhu",
      sending: "Ergamaa Jira...",
    },
    options: {
      cabins: ["Ikoonomii", "Bizinasi", "Sadarkaa Tokkoffaa"]
    },
    success: "Galatoomaa! Bakka bu'aan tikeetii Darul Safar gaaffii keessan fudhateera, filannoowwan gaarii ta'aniin dhiyoottis isin quunnama.",
    disclaimer: "Gatiin fi argamuun hanga tikeetiin muramutti jijjiiramuu danda'a."
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
    departure: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    cabin: '',
    fullName: '',
    phone: '',
    email: ''
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Flight Inquiry from ${formData.fullName}`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          className="bg-white/70 backdrop-blur-2xl border border-white/60 hover:border-blue-200 transition-colors duration-500 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative overflow-hidden"
        >
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
                {/* Flight Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      <PlaneTakeoff className="w-4 h-4" /> {t.form.departure}
                    </label>
                    <input name="departure" value={formData.departure} onChange={handleChange} required type="text" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="City or Airport Code" />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      <PlaneLanding className="w-4 h-4" /> {t.form.destination}
                    </label>
                    <input name="destination" value={formData.destination} onChange={handleChange} required type="text" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="City or Airport Code" />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      <Calendar className="w-4 h-4" /> {t.form.departDate}
                    </label>
                    <input name="departDate" value={formData.departDate} onChange={handleChange} required type="date" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      <Calendar className="w-4 h-4" /> {t.form.returnDate}
                    </label>
                    <input name="returnDate" value={formData.returnDate} onChange={handleChange} type="date" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      <Users className="w-4 h-4" /> {t.form.passengers}
                    </label>
                    <input name="passengers" value={formData.passengers} onChange={handleChange} required type="number" min="1" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.cabin}
                    </label>
                    <select name="cabin" value={formData.cabin} onChange={handleChange} required className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none shadow-sm">
                      <option value="" disabled className="text-gray-500">Select...</option>
                      {t.options.cabins.map((opt, i) => (
                        <option key={i} value={opt} className="bg-white text-gray-900">{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 my-8"></div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.fullName}
                    </label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required type="text" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.phone}
                    </label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="+251..." />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.email}
                    </label>
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="john@example.com" />
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
                    className="w-full md:w-auto bg-blue-600 text-white font-headline font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-blue-500/30"
                  >
                    {isSubmitting ? t.form.sending : (
                      <>
                        {t.form.submit}
                        <Send className="w-5 h-5" />
                      </>
                    )}
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
                <h3 className="text-3xl font-headline font-bold text-gray-900 mb-4">Request Received</h3>
                <p className="text-gray-500 font-body max-w-md">
                  {t.success}
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      departure: '', destination: '', departDate: '', returnDate: '', passengers: '1', cabin: '', fullName: '', phone: '', email: ''
                    });
                  }}
                  className="mt-8 px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm font-bold"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
