"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Send, Globe2, FileText, Camera, Landmark, Files, MessageCircle, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DestinationAutocomplete from './DestinationAutocomplete';

const translations = {
  en: {
    title: "Global Visa Consultation Center",
    subtitle: "Navigating international borders with the precision of a global cartographer.",
    heroBadge: "Visa consultation",
    heroCtaText:
      "Prepare your documents, understand requirements, and receive clear guidance before you apply.",
    heroServicePill: "Work • Tourist • Medical • Education",
    formEyebrow: "Start your visa review",
    requirementsEyebrow: "Document readiness",
    processEyebrow: "How it works",
    processTitle: "A clearer path from documents to decision",
    processDesc1: "Pick the visa category that fits your plans.",
    processDesc2: "Gather passport, photos, and supporting documents.",
    processDesc3: "Submit this form so we can review your file.",
    processDesc4: "Receive clear guidance on what to do next.",
    finalEyebrow: "Start with confidence",
    finalTitle: "Ready to review your visa options?",
    finalSubtitle:
      "Share your destination, visa type, and travel window. Darul Safar will help you understand the next step with calm, clear guidance.",
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
    heroBadge: "استشارة التأشيرات",
    heroCtaText: "جهّز مستنداتك، وافهم المتطلبات، واحصل على إرشاد واضح قبل التقديم.",
    heroServicePill: "عمل • سياحة • علاج • تعليم",
    formEyebrow: "ابدأ مراجعة التأشيرة",
    requirementsEyebrow: "جاهزية المستندات",
    processEyebrow: "كيف نعمل",
    processTitle: "مسار أوضح من المستندات إلى القرار",
    processDesc1: "اختر فئة التأشيرة التي تناسب خططك.",
    processDesc2: "اجمع جواز السفر والصور والمستندات الداعمة.",
    processDesc3: "أرسل هذا النموذج لنراجع ملفك.",
    processDesc4: "احصل على إرشاد واضح بشأن الخطوة التالية.",
    finalEyebrow: "ابدأ بثقة",
    finalTitle: "هل أنت مستعد لمراجعة خيارات التأشيرة؟",
    finalSubtitle:
      "شاركنا الوجهة ونوع التأشيرة وموعد السفر، وستساعدك دار السفر على فهم الخطوة التالية بإرشاد واضح وهادئ.",
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
    heroBadge: "የቪዛ ምክር",
    heroCtaText: "ሰነዶችዎን ያዘጋጁ፣ መስፈርቶችን ይረዱ፣ እና ከማመልከትዎ በፊት ግልጽ መመሪያ ያግኙ።",
    heroServicePill: "ስራ • ቱሪስት • ህክምና • ትምህርት",
    formEyebrow: "የቪዛ ግምገማዎን ይጀምሩ",
    requirementsEyebrow: "የሰነድ ዝግጁነት",
    processEyebrow: "እንዴት እንሰራለን",
    processTitle: "ከሰነዶች እስከ ውሳኔ የበለጠ ግልጽ መንገድ",
    processDesc1: "ከእቅድዎ ጋር የሚስማማውን የቪዛ ምድብ ይምረጡ።",
    processDesc2: "ፓስፖርት፣ ፎቶዎች እና ደጋፊ ሰነዶችን ያዝዙ።",
    processDesc3: "ፋይልዎን እንድንገምግም ይህን ቅጽ ይላኩ።",
    processDesc4: "ቀጣዩን እርምጃ በግልጽ ይወቁ።",
    finalEyebrow: "በመተማመን ይጀምሩ",
    finalTitle: "የቪዛ አማራጮችዎን ለመገምገም ዝግጁ ነዎት?",
    finalSubtitle:
      "መዳረሻዎን፣ የቪዛ አይነትዎን እና የጉዞ ጊዜዎን ያጋሩን። ዳሩል ሰፈር ቀጣዩን እርምጃ በግልጽና በተረጋጋ መመሪያ እንዲረዱ ይረዳዎታል።",
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
    heroBadge: "Gorsa viizaa",
    heroCtaText:
      "Sanadoota kee qopheessi, ulaagaalee hubadhu, fi osoo hin galmeessin dura qajeelfama ifaa argadhu.",
    heroServicePill: "Hojii • Turistii • Yaala • Barnoota",
    formEyebrow: "Sakatta'iinsa viizaa kee jalqabi",
    requirementsEyebrow: "Qophii sanadootaa",
    processEyebrow: "Akkaataa itti hojjennu",
    processTitle: "Daandii ifa ta'e sanadoota irraa gara murteetti",
    processDesc1: "Gosa viizaa karoora kee waliin wal simu filadhu.",
    processDesc2: "Paaspoortii, suuraa, fi sanadoota deeggarsaa walitti qabi.",
    processDesc3: "Unka kana galchi akka faayilii kee ilaalnuuf.",
    processDesc4: "Tarkaanfii itti aanu irratti qajeelfama ifaa argadhu.",
    finalEyebrow: "Amanamummaadhaan jalqabi",
    finalTitle: "Filannoowwan viizaa kee ilaaluuf qophiidhaa?",
    finalSubtitle:
      "Bakka deemtu, gosa viizaa, fi yeroo imalaa nuuf qoodi. Darul Safar tarkaanfii itti aanu qajeelfama ifaa fi tasgabbaa'aa waliin akka hubattu si gargaara.",
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
  const t = translations[lang as keyof typeof translations] ?? translations.en;
  const formRef = useRef<HTMLElement | null>(null);
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const inputClass =
    'w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-gray-900 shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30';
  const labelClass = 'block text-xs font-label font-bold uppercase tracking-widest text-emerald-800/90';

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
              src="/services/VDS11.png"
              alt="Darul Safar visa consultation"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/28 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/58 via-slate-950/10 to-transparent" />

            <div className="absolute left-5 top-6 z-20 md:left-10 md:top-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-2xl">
                <Globe2 className="h-4 w-4 shrink-0 text-white" aria-hidden />
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
                    onClick={scrollToForm}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-[1.15rem] bg-emerald-700 px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(4,120,87,0.28)] transition hover:bg-emerald-800 active:scale-[0.98] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6"
                  >
                    {t.form.submit}
                  </button>
                  <span className="inline-flex min-h-12 w-full items-center justify-center whitespace-normal rounded-[1.15rem] bg-white px-5 text-center text-sm font-black leading-5 text-slate-900 shadow-[0_14px_32px_rgba(15,23,42,0.10)] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6">
                    {t.heroServicePill}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Visa review form */}
      <section
        id="visa-review"
        ref={formRef}
        className="relative z-20 mx-auto mb-28 w-full max-w-5xl px-4 md:mb-36 md:px-8"
      >
        <div className="relative overflow-hidden rounded-[3rem] border border-white/70 bg-white/55 p-6 shadow-[0_35px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl [clip-path:inset(0_round_3rem)] [contain:paint] md:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-sky-300/20 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mb-8 text-center md:mb-10">
            <span className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
              {t.formEyebrow}
            </span>
            <h2 className="font-serif text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
              {t.form.submit}
            </h2>
          </div>

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
                  <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 font-body text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass}>{t.form.visaType}</label>
                    <select
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled className="text-gray-500">
                        Select...
                      </option>
                      {t.options.types.map((opt, i) => (
                        <option key={i} value={opt} className="bg-white text-gray-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

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

                  <div className="space-y-2">
                    <label className={labelClass}>{t.form.fullName}</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      type="text"
                      className={inputClass}
                      placeholder="John Doe"
                    />
                    {fieldErrors.fullName && (
                      <p className="font-body text-xs text-red-600">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>{t.form.phone}</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      className={`${inputClass} placeholder:text-gray-400`}
                      placeholder="+251..."
                    />
                    {fieldErrors.phone && (
                      <p className="font-body text-xs text-red-600">{fieldErrors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className={labelClass}>{t.form.month}</label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled className="text-gray-500">
                        Select...
                      </option>
                      {t.options.months.map((opt, i) => (
                        <option key={i} value={opt} className="bg-white text-gray-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-6 border-t border-slate-200/70 pt-8 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600/90" aria-hidden />
                    <p>{t.disclaimer}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-14 w-full shrink-0 items-center justify-center gap-2 rounded-[1.35rem] bg-slate-950 px-8 font-black text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                  >
                    {isSubmitting ? t.form.sending : t.form.submit}
                    {!isSubmitting && <Send className="h-4 w-4" aria-hidden />}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center rounded-[2rem] border border-emerald-100/80 bg-emerald-50/40 px-6 py-14 text-center backdrop-blur-sm md:py-16"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
                  <CheckCircle className="h-10 w-10" aria-hidden />
                </div>
                <h3 className="mb-4 max-w-lg font-headline text-2xl font-bold text-slate-900 md:text-3xl">
                  {t.success}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 rounded-2xl border border-slate-200 bg-white px-8 py-3 font-bold text-slate-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/50"
                >
                  {statusText.submitAnother}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto mb-28 w-full max-w-7xl px-4 md:mb-36 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10"
        >
          <div className="mb-8 text-center md:mb-10">
            <span className="mb-3 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
              {t.processEyebrow}
            </span>
            <h2 className="font-serif text-2xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">
              {t.processTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: t.form.visaType,
                desc: t.processDesc1,
                Icon: FileText
              },
              {
                step: '02',
                title: t.requirements.docs,
                desc: t.processDesc2,
                Icon: ClipboardList
              },
              {
                step: '03',
                title: t.form.submit,
                desc: t.processDesc3,
                Icon: Send
              },
              {
                step: '04',
                title: t.whatsappBtn,
                desc: t.processDesc4,
                Icon: MessageCircle
              }
            ].map((item, index) => {
              const StepIcon = item.Icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
                >
                  <span className="text-xs font-black text-emerald-600/80">{item.step}</span>
                  <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                    <StepIcon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-headline text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Requirements */}
      <section className="relative z-20 mx-auto mb-28 w-full max-w-7xl px-4 md:mb-36 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10"
        >
          <div className="mb-8 text-center md:mb-10">
            <span className="mb-3 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
              {t.requirementsEyebrow}
            </span>
            <h2 className="font-serif text-2xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">
              {t.requirements.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: t.requirements.passport,
                desc: activeReqs.passportDesc,
                bubble: 'border-emerald-100 bg-emerald-50 text-emerald-700'
              },
              {
                title: t.requirements.photos,
                desc: activeReqs.photosDesc,
                bubble: 'border-amber-100 bg-amber-50 text-amber-800'
              },
              {
                title: t.requirements.financial,
                desc: activeReqs.financialDesc,
                bubble: 'border-slate-200 bg-slate-100 text-slate-700'
              },
              {
                title: t.requirements.docs,
                desc: activeReqs.docsDesc,
                bubble: 'border-emerald-100/80 bg-emerald-50/90 text-emerald-800'
              }
            ].map((req, index) => {
              const icons = [
                <FileText key="f" className="h-7 w-7" aria-hidden />,
                <Camera key="c" className="h-7 w-7" aria-hidden />,
                <Landmark key="l" className="h-7 w-7" aria-hidden />,
                <Files key="fs" className="h-7 w-7" aria-hidden />
              ];
              return (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[220px] flex-col items-center rounded-[2rem] border border-white/75 bg-white/65 p-6 text-center shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${req.bubble}`}
                  >
                    {icons[index]}
                  </div>
                  <h3 className="font-headline text-lg font-bold text-slate-900">{req.title}</h3>
                  <p className="mt-2 flex-grow font-body text-sm leading-relaxed text-slate-600">
                    {req.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/15 bg-slate-950/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.2)] backdrop-blur-xl md:p-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
              <p className="max-w-xl text-center text-sm leading-relaxed text-white/80 md:text-left">
                {t.processDesc4}
              </p>
              <motion.button
                type="button"
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[1.35rem] bg-emerald-600 px-8 py-4 font-black text-white shadow-[0_18px_40px_rgba(4,120,87,0.35)] transition hover:bg-emerald-500 md:w-auto"
              >
                <MessageCircle className="h-6 w-6" aria-hidden />
                {t.whatsappBtn}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
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
                onClick={scrollToForm}
                className="inline-flex min-h-14 w-full items-center justify-center rounded-[1.35rem] bg-white px-8 font-black text-slate-950 shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition hover:bg-emerald-50 sm:w-auto lg:w-full"
              >
                {t.form.submit}
              </button>
              <span className="inline-flex min-h-12 w-full items-center justify-center rounded-[1.35rem] border border-white/20 bg-white/10 px-6 text-center text-sm font-black text-white backdrop-blur-sm sm:w-auto lg:w-full">
                {t.heroServicePill}
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
