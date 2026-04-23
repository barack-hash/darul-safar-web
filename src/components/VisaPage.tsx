import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Send, Globe2, FileText, Camera, Landmark, Files, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DestinationAutocomplete from './DestinationAutocomplete';
import SectionHeader from './ui/SectionHeader';

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
    disclaimer: "Visa issuance is at the sole discretion of the respective Embassy/Consulate.",
    requirements: {
      title: "At a Glance: Standard Requirements",
      passport: "Passport Validity",
      photos: "Photos (Specific Size)",
      financial: "Financial Proof",
      docs: "Supporting Docs",
      sets: {
        saudiUmrah: {
          passportDesc: "Minimum 6 months validity required.",
          photosDesc: "2 recent photos with white background.",
          financialDesc: "Not strictly required for Umrah.",
          docsDesc: "Vaccination card (Meningitis/Yellow Fever)."
        },
        saudiWork: {
          passportDesc: "Minimum 6 months validity required.",
          photosDesc: "2 recent photos with white background.",
          financialDesc: "Not required.",
          docsDesc: "Medical report & Employment Contract."
        },
        dubaiTourist: {
          passportDesc: "Minimum 6 months validity required.",
          photosDesc: "1 passport size photograph.",
          financialDesc: "Bank statement for the last 3 months.",
          docsDesc: "Flight itinerary & Hotel booking."
        },
        schengen: {
          passportDesc: "Minimum 6 months validity required.",
          photosDesc: "Schengen standard (35x45mm).",
          financialDesc: "Bank statement for the last 6 months.",
          docsDesc: "Travel insurance & Itinerary."
        },
        default: {
          passportDesc: "Minimum 6 months validity required.",
          photosDesc: "Recent passport-sized photographs.",
          financialDesc: "Bank statements for the last 3-6 months.",
          docsDesc: "Flight itinerary, hotel booking, etc."
        }
      }
    },
    whatsappBtn: "Send My Checklist to WhatsApp",
    whatsappMsg: "Hi Darul Safar, please send the {destination} {visaType} Visa checklist. I know I need: Passport ({passportDesc}), {photosDesc}, {financialDesc}, and {docsDesc}. What else?"
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
    disclaimer: "إصدار التأشيرة يخضع لتقدير السفارة/القنصلية المعنية.",
    requirements: {
      title: "لمحة سريعة: المتطلبات الأساسية",
      passport: "صلاحية الجواز",
      photos: "صور (حجم محدد)",
      financial: "إثبات مالي",
      docs: "مستندات داعمة",
      sets: {
        saudiUmrah: {
          passportDesc: "صلاحية لا تقل عن 6 أشهر.",
          photosDesc: "صورتان حديثتان بخلفية بيضاء.",
          financialDesc: "غير مطلوب بشكل صارم للعمرة.",
          docsDesc: "بطاقة تطعيم (التهاب السحايا/الحمى الصفراء)."
        },
        saudiWork: {
          passportDesc: "صلاحية لا تقل عن 6 أشهر.",
          photosDesc: "صورتان حديثتان بخلفية بيضاء.",
          financialDesc: "غير مطلوب.",
          docsDesc: "تقرير طبي وعقد عمل."
        },
        dubaiTourist: {
          passportDesc: "صلاحية لا تقل عن 6 أشهر.",
          photosDesc: "صورة واحدة بحجم جواز السفر.",
          financialDesc: "كشف حساب بنكي لآخر 3 أشهر.",
          docsDesc: "مسار الرحلة وحجز الفندق."
        },
        schengen: {
          passportDesc: "صلاحية لا تقل عن 6 أشهر.",
          photosDesc: "معيار شنغن (35x45 مم).",
          financialDesc: "كشف حساب بنكي لآخر 6 أشهر.",
          docsDesc: "تأمين سفر ومسار الرحلة."
        },
        default: {
          passportDesc: "صلاحية لا تقل عن 6 أشهر.",
          photosDesc: "صور شخصية حديثة بحجم جواز السفر.",
          financialDesc: "كشوفات حساب بنكية لآخر 3-6 أشهر.",
          docsDesc: "مسار الرحلة، حجز الفندق، إلخ."
        }
      }
    },
    whatsappBtn: "إرسال قائمة المتطلبات إلى واتساب الخاص بي",
    whatsappMsg: "مرحباً دار السفر، يرجى إرسال قائمة متطلبات تأشيرة {visaType} إلى {destination}. أعلم أنني بحاجة إلى: جواز سفر ({passportDesc})، {photosDesc}، {financialDesc}، و {docsDesc}. ماذا أيضاً؟"
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
    disclaimer: "ቪዛ መስጠት በሚመለከተው ኤምባሲ/ቆንስላ ውሳኔ ላይ የተመሰረተ ነው።",
    requirements: {
      title: "በአጭሩ፡ መደበኛ መስፈርቶች",
      passport: "የፓስፖርት ትክክለኛነት",
      photos: "ፎቶዎች (ልዩ መጠን)",
      financial: "የፋይናንስ ማስረጃ",
      docs: "ደጋፊ ሰነዶች",
      sets: {
        saudiUmrah: {
          passportDesc: "ቢያንስ የ6 ወራት ትክክለኛነት ያስፈልጋል።",
          photosDesc: "2 የቅርብ ጊዜ ፎቶዎች ከነጭ ጀርባ ጋር።",
          financialDesc: "ለዑምራ በጥብቅ አይጠየቅም።",
          docsDesc: "የክትባት ካርድ (ማጅራት ገትር/ቢጫ ወባ)።"
        },
        saudiWork: {
          passportDesc: "ቢያንስ የ6 ወራት ትክክለኛነት ያስፈልጋል።",
          photosDesc: "2 የቅርብ ጊዜ ፎቶዎች ከነጭ ጀርባ ጋር።",
          financialDesc: "አይጠየቅም።",
          docsDesc: "የህክምና ሪፖርት እና የስራ ውል"
        },
        dubaiTourist: {
          passportDesc: "ቢያንስ የ6 ወራት ትክክለኛነት ያስፈልጋል።",
          photosDesc: "1 የፓስፖርት መጠን ፎቶግራፍ።",
          financialDesc: "የባንክ መግለጫዎች ላለፉት 3 ወራት።",
          docsDesc: "የበረራ ትኬት እና የሆቴል ቦታ ማስያዣ።"
        },
        schengen: {
          passportDesc: "ቢያንስ የ6 ወራት ትክክለኛነት ያስፈልጋል።",
          photosDesc: "የሼንገን መደበኛ (35x45mm)።",
          financialDesc: "የባንክ መግለጫዎች ላለፉት 6 ወራት።",
          docsDesc: "የጉዞ ኢንሹራንስ እና የበረራ ትኬት።"
        },
        default: {
          passportDesc: "ቢያንስ የ6 ወራት ትክክለኛነት ያስፈልጋል።",
          photosDesc: "የቅርብ ጊዜ የፓስፖርት መጠን ፎቶግራፎች።",
          financialDesc: "የባንክ መግለጫዎች ላለፉት 3-6 ወራት።",
          docsDesc: "የበረራ ትኬት፣ የሆቴል ቦታ ማስያዣ፣ ወዘተ።"
        }
      }
    },
    whatsappBtn: "የመስፈርቶች ዝርዝር ወደ ዋትስአፕ ይላኩልኝ",
    whatsappMsg: "ሰላም ዳሩል ሰፈር፣ እባክዎ የ {destination} {visaType} ቪዛ መስፈርቶች ዝርዝር ይላኩልኝ። ፓስፖርት ({passportDesc})፣ {photosDesc}፣ {financialDesc} እና {docsDesc} እንደሚያስፈልገኝ አውቃለሁ። ሌላ ምን ያስፈልጋል?"
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
    disclaimer: "Viizaa kennuun murtee Embaasii/Qoonsilaa dhimmi ilaallatu qofa irratti hundaa'a.",
    requirements: {
      title: "Ilaalcha Tokkoon: Ulaagaalee Idilee",
      passport: "Yeroo Paaspoortii",
      photos: "Suuraa (Hanga Murtaa'e)",
      financial: "Ragaa Faayinaansii",
      docs: "Sanadoota Deeggaran",
      sets: {
        saudiUmrah: {
          passportDesc: "Yoo xiqqaate ji'oota 6f tajaajiluu qaba.",
          photosDesc: "Suuraa 2 duuba adii qabu.",
          financialDesc: "Umraaf dirqama miti.",
          docsDesc: "Kaardii talaallii (Meningitis/Yellow Fever)."
        },
        saudiWork: {
          passportDesc: "Yoo xiqqaate ji'oota 6f tajaajiluu qaba.",
          photosDesc: "Suuraa 2 duuba adii qabu.",
          financialDesc: "Hin barbaachisu.",
          docsDesc: "Gabaasa yaalaa fi waliigaltee hojii."
        },
        dubaiTourist: {
          passportDesc: "Yoo xiqqaate ji'oota 6f tajaajiluu qaba.",
          photosDesc: "Suuraa 1 hanga paaspoortii.",
          financialDesc: "Ibsa baankii ji'oota 3 darban.",
          docsDesc: "Tikeetii balalii fi galmee hoteelaa."
        },
        schengen: {
          passportDesc: "Yoo xiqqaate ji'oota 6f tajaajiluu qaba.",
          photosDesc: "Sadarkaa Schengen (35x45mm).",
          financialDesc: "Ibsa baankii ji'oota 6 darban.",
          docsDesc: "Inshuraansii imalaa fi tikeetii balalii."
        },
        default: {
          passportDesc: "Yoo xiqqaate ji'oota 6f tajaajiluu qaba.",
          photosDesc: "Suuraa dhihootti kaafame hanga paaspoortii.",
          financialDesc: "Ibsa baankii ji'oota 3-6 darban.",
          docsDesc: "Tikeetii balalii, galmee hoteelaa, fi kkf."
        }
      }
    },
    whatsappBtn: "Tarree Ulaagaalee WhatsApp Kootti Ergi",
    whatsappMsg: "Akkam Darul Safar, maaloo tarree ulaagaalee viizaa {destination} {visaType} naaf ergaa. Paaspoortii ({passportDesc}), {photosDesc}, {financialDesc}, fi {docsDesc} akkan barbaadu beeka. Maal biraatu barbaachisa?"
  }
};

export default function VisaPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    visaType: '',
    destination: '',
    fullName: '',
    phone: '',
    month: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
    if (submitError) setSubmitError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusText = {
    en: {
      fillAllFields: 'Please complete all fields before submitting.',
      invalidPhone: 'Please enter a valid phone number.',
      submitError: 'We could not submit your inquiry right now. Please try again.',
      submitAnother: 'Submit Another Inquiry'
    },
    ar: {
      fillAllFields: 'يرجى إكمال جميع الحقول قبل الإرسال.',
      invalidPhone: 'يرجى إدخال رقم هاتف صحيح.',
      submitError: 'تعذر إرسال طلبك الآن. يرجى المحاولة مرة أخرى.',
      submitAnother: 'إرسال طلب آخر'
    },
    am: {
      fillAllFields: 'እባክዎ ከመላክዎ በፊት ሁሉንም መስኮች ይሙሉ።',
      invalidPhone: 'እባክዎ ትክክለኛ የስልክ ቁጥር ያስገቡ።',
      submitError: 'ጥያቄዎን አሁን መላክ አልተቻለም። እባክዎ ዳግም ይሞክሩ።',
      submitAnother: 'ሌላ ጥያቄ ያስገቡ'
    },
    om: {
      fillAllFields: 'Maaloo osoo hin erginiin dura dirreewwan hunda guutaa.',
      invalidPhone: 'Maaloo lakkoofsa bilbilaa sirrii galchi.',
      submitError: 'Gaaffiin keessan amma ergamuu hin dandeenye. Maaloo irra deebi aa yaali.',
      submitAnother: 'Gaaffii Biroo Galchi'
    }
  }[lang];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.visaType || !formData.destination || !formData.fullName || !formData.phone || !formData.month) {
      setSubmitError(statusText.fillAllFields);
    }

    if (!formData.fullName.trim()) {
      errors.fullName = statusText.fillAllFields;
    }

    const normalizedPhone = formData.phone.replace(/\s+/g, '');
    if (!/^\+?[0-9]{8,15}$/.test(normalizedPhone)) {
      errors.phone = statusText.invalidPhone;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0 && !(!formData.visaType || !formData.destination || !formData.fullName || !formData.phone || !formData.month);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;
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
        setSubmitError('');
        setFieldErrors({});
        setFormData({ visaType: '', destination: '', fullName: '', phone: '', month: '' });
      } else {
        setSubmitError(statusText.submitError);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setSubmitError(statusText.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActiveReqSet = () => {
    const dest = formData.destination;
    const normalizedDest = dest.toLowerCase();
    const type = formData.visaType;
    
    const isSaudi = normalizedDest.includes('saudi') || dest === t.options.destinations[0];
    const isDubai = normalizedDest.includes('dubai') || normalizedDest.includes('united arab emirates') || dest === t.options.destinations[1];
    const isSchengen = normalizedDest.includes('schengen') || dest === t.options.destinations[4];

    if (isSaudi && type === t.options.types[0]) return t.requirements.sets.saudiUmrah; // Saudi Arabia + Umrah/Hajj
    if (isSaudi && type === t.options.types[1]) return t.requirements.sets.saudiWork; // Saudi Arabia + Work
    if (isDubai && type === t.options.types[4]) return t.requirements.sets.dubaiTourist; // Dubai/UAE + Tourist
    if (isSchengen) return t.requirements.sets.schengen; // Schengen
    
    return t.requirements.sets.default;
  };

  const activeReqs = getActiveReqSet();

  const handleWhatsApp = () => {
    const dest = formData.destination || '[Destination]';
    const type = formData.visaType || '[Visa Type]';
    
    let msg = t.whatsappMsg
      .replace('{destination}', dest)
      .replace('{visaType}', type)
      .replace('{passportDesc}', activeReqs.passportDesc)
      .replace('{photosDesc}', activeReqs.photosDesc)
      .replace('{financialDesc}', activeReqs.financialDesc)
      .replace('{docsDesc}', activeReqs.docsDesc);
      
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/251911000000?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center justify-start pb-24">
      {/* Hero Section */}
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-8 mb-16">
        <section
          className="w-full bg-cover bg-center bg-no-repeat border border-white/20 transition-colors duration-500 py-32 md:py-48 rounded-[3rem] relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          style={{ backgroundImage: "url('/services/VDS11.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent z-0"></div>
          <div className="max-w-4xl mx-auto relative z-10 text-center px-4 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-white/20 text-white font-label text-xs tracking-[0.2em] rounded-full uppercase font-bold bg-white/10 backdrop-blur-md"
          >
            <Globe2 className="w-4 h-4" />
            Elite Travel Facilitation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight text-white"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-slate-100 font-body leading-relaxed max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
          </div>
        </section>
      </div>

      {/* Interactive Form Section */}
      <section className="w-full px-4 md:px-8 max-w-4xl mx-auto -mt-12 relative z-20">
        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 hover:border-blue-200 transition-colors duration-500 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative overflow-hidden">
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
                {submitError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 font-body flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
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
                    <DestinationAutocomplete
                      value={formData.destination}
                      onChange={(value) => {
                        if (fieldErrors.destination) {
                          setFieldErrors((prev) => ({ ...prev, destination: '' }));
                        }
                        if (submitError) setSubmitError('');
                        setFormData((prev) => ({ ...prev, destination: value }));
                      }}
                      placeholder="Select destination country or region"
                      label={t.form.destination}
                    />
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.fullName}
                    </label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required type="text" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="John Doe" />
                    {fieldErrors.fullName && <p className="text-xs text-red-600 font-body">{fieldErrors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
                      {t.form.phone}
                    </label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="+251..." />
                    {fieldErrors.phone && <p className="text-xs text-red-600 font-body">{fieldErrors.phone}</p>}
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
                    className="w-full md:w-auto bg-emerald-700 text-white px-8 py-4 rounded-2xl font-headline font-bold uppercase tracking-widest hover:bg-emerald-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 shrink-0 disabled:opacity-70 disabled:hover:scale-100"
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
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                  <CheckCircle className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-gray-900 mb-4">
                  {t.success}
                </h3>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm font-bold"
                >
                  {statusText.submitAnother}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Visual Requirement Grid */}
      <section className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-24 mb-32 md:mb-48 relative z-20">
        <SectionHeader title={t.requirements.title} className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: t.requirements.passport, desc: activeReqs.passportDesc, icon: <FileText className="w-8 h-8 text-blue-600" /> },
            { title: t.requirements.photos, desc: activeReqs.photosDesc, icon: <Camera className="w-8 h-8 text-blue-600" /> },
            { title: t.requirements.financial, desc: activeReqs.financialDesc, icon: <Landmark className="w-8 h-8 text-blue-600" /> },
            { title: t.requirements.docs, desc: activeReqs.docsDesc, icon: <Files className="w-8 h-8 text-blue-600" /> }
          ].map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform origin-center">
                {req.icon}
              </div>
              <h3 className="text-xl font-headline font-bold text-gray-900 mb-2">{req.title}</h3>
              <p className="text-sm text-gray-500 font-body leading-relaxed">{req.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <motion.button 
            onClick={handleWhatsApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto bg-white border border-emerald-200 text-emerald-700 font-headline font-bold px-8 py-4 rounded-2xl hover:bg-emerald-50 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-100/60 text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            {t.whatsappBtn}
          </motion.button>
        </div>
      </section>
    </div>
  );
}
