import React, { createContext, useState, useContext, useEffect } from 'react';

export type Lang = 'en' | 'ar' | 'am' | 'om';

interface Translations {
  nav: {
    home: string;
    pilgrimage: string;
    ticketing: string;
    visas: string;
    tools: string;
    solutions: string;
    services: string;
  };
  hero: {
    tag: string;
    headline: string;
    subtitle: string;
    bookUmrah: string;
    globalTicketing: string;
    cta: string;
  };
  footer: {
    brandDesc: string;
    hq: string;
    location: string;
    quickLinks: string;
    legal: string;
    terms: string;
    privacy: string;
    stayConnected: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    copyright: string;
  };
  services: {
    pilgrimage: string;
    pilgrimageDesc: string;
    ticketing: string;
    ticketingDesc: string;
    visas: string;
    visasDesc: string;
    tools: string;
    toolsDesc: string;
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: { home: "Home", pilgrimage: "Pilgrimage", ticketing: "Ticketing", visas: "Visas", tools: "Tools", solutions: "Solutions", services: "Services" },
    hero: { 
      tag: "The Global Cartographer", 
      headline: "Connecting Ethiopian Travelers to the Globe.", 
      subtitle: "Darul Safar Travel & Trading provides world-class travel solutions for pilgrimage, global ticketing, and specialized logistics.", 
      bookUmrah: "Book Umrah", 
      globalTicketing: "Global Ticketing",
      cta: "Book Now"
    },
    footer: {
      brandDesc: "Connecting horizons and facilitating global trading for the modern Ethiopian traveler.",
      hq: "Headquarters",
      location: "Addis Ababa, Ethiopia",
      quickLinks: "Quick Links",
      legal: "Legal",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      stayConnected: "Stay Connected",
      newsletterDesc: "Join our newsletter for the latest travel updates and trading tools.",
      emailPlaceholder: "Email Address",
      copyright: "© 2026 Darul Safar Travel & Trading. All rights reserved."
    },
    services: {
      pilgrimage: "Religious Pilgrimage",
      pilgrimageDesc: "Premium Umrah, Hajj, and Ziyarah Tours to the holy cities with expert guidance.",
      ticketing: "Global Air Ticketing",
      ticketingDesc: "Seamless flight arrangements through our elite airline network. Best rates guaranteed.",
      visas: "Visa & Document Services",
      visasDesc: "Expert processing for work, tourist, medical, and education permits globally.",
      tools: "Specialized Travel",
      toolsDesc: "Advanced logistics for enterprise-scale travel and bespoke vacation planning."
    }
  },
  ar: {
    nav: { home: "الرئيسية", pilgrimage: "الحج والعمرة", ticketing: "التذاكر", visas: "التأشيرات", tools: "الأدوات", solutions: "الحلول", services: "الخدمات" },
    hero: { 
      tag: "رسام الخرائط العالمي", 
      headline: "ربط المسافرين الإثيوبيين بالعالم.", 
      subtitle: "تقدم دار السفر للسياحة والتجارة حلول سفر عالمية المستوى للحج والعمرة، وحجز التذاكر العالمية، والخدمات اللوجستية المتخصصة.", 
      bookUmrah: "احجز عمرة", 
      globalTicketing: "تذاكر عالمية",
      cta: "احجز الآن"
    },
    footer: {
      brandDesc: "ربط الآفاق وتسهيل التجارة العالمية للمسافر الإثيوبي الحديث.",
      hq: "المقر الرئيسي",
      location: "أديس أبابا، إثيوبيا",
      quickLinks: "روابط سريعة",
      legal: "قانوني",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
      stayConnected: "ابق على تواصل",
      newsletterDesc: "انضم إلى النشرة الإخبارية للحصول على أحدث تحديثات السفر وأدوات التجارة.",
      emailPlaceholder: "عنوان البريد الإلكتروني",
      copyright: "© 2026 دار السفر للسياحة والتجارة. جميع الحقوق محفوظة."
    },
    services: {
      pilgrimage: "الحج والعمرة",
      pilgrimageDesc: "رحلات عمرة وحج وزيارة فاخرة إلى المدن المقدسة مع إرشاد خبير.",
      ticketing: "تذاكر طيران عالمية",
      ticketingDesc: "ترتيبات طيران سلسة من خلال شبكة خطوطنا الجوية النخبة. أفضل الأسعار مضمونة.",
      visas: "خدمات التأشيرات والمستندات",
      visasDesc: "معالجة خبيرة لتصاريح العمل والسياحة والطبية والتعليمية على مستوى العالم.",
      tools: "سفر متخصص",
      toolsDesc: "لوجستيات متقدمة لسفر الشركات وتخطيط العطلات المخصصة."
    }
  },
  am: {
    nav: { home: "ዋና ገፅ", pilgrimage: "ሐጅ እና ዑምራ", ticketing: "ትኬት", visas: "ቪዛ", tools: "መሳሪያዎች", solutions: "መፍትሄዎች", services: "አገልግሎቶች" },
    hero: { 
      tag: "ዓለም አቀፍ ካርታ አዘጋጅ", 
      headline: "ኢትዮጵያውያን ተጓዦችን ከዓለም ጋር ማገናኘት።", 
      subtitle: "ዳሩል ሰፈር የጉዞ እና ንግድ ለሐጅ እና ዑምራ፣ ለአለም አቀፍ ትኬት እና ለልዩ ሎጂስቲክስ አለም አቀፍ ደረጃቸውን የጠበቁ የጉዞ መፍትሄዎችን ይሰጣል።", 
      bookUmrah: "ዑምራ ይመዝገቡ", 
      globalTicketing: "ዓለም አቀፍ ትኬት",
      cta: "አሁን ይመዝገቡ"
    },
    footer: {
      brandDesc: "ለዘመናዊው ኢትዮጵያዊ ተጓዥ አድማሶችን ማገናኘት እና ዓለም አቀፍ ንግድን ማመቻቸት።",
      hq: "ዋና መስሪያ ቤት",
      location: "አዲስ አበባ፣ ኢትዮጵያ",
      quickLinks: "ፈጣን አገናኞች",
      legal: "ህጋዊ",
      terms: "ውሎች እና ሁኔታዎች",
      privacy: "የግላዊነት መመሪያ",
      stayConnected: "ከእኛ ጋር ይገናኙ",
      newsletterDesc: "ለአዳዲስ የጉዞ መረጃዎች እና የንግድ መሳሪያዎች የዜና መጽሔታችንን ይቀላቀሉ።",
      emailPlaceholder: "የኢሜይል አድራሻ",
      copyright: "© 2026 ዳሩል ሰፈር የጉዞ እና ንግድ። መብቱ በህግ የተጠበቀ ነው።"
    },
    services: {
      pilgrimage: "የሃይማኖት ጉዞ",
      pilgrimageDesc: "ፕሪሚየም ዑምራ፣ ሐጅ እና ዚያራ ጉብኝቶች ወደ ቅዱሳን ከተሞች ከባለሙያ መመሪያ ጋር።",
      ticketing: "ዓለም አቀፍ የአየር ትኬት",
      ticketingDesc: "በእኛ ምርጥ የአየር መንገድ አውታረ መረብ በኩል እንከን የለሽ የበረራ ዝግጅቶች። ምርጥ ዋጋዎች የተረጋገጡ ናቸው።",
      visas: "የቪዛ እና የሰነድ አገልግሎቶች",
      visasDesc: "ለስራ፣ ለቱሪስት፣ ለህክምና እና ለትምህርት ፈቃዶች በዓለም አቀፍ ደረጃ የባለሙያ ሂደት።",
      tools: "ልዩ የጉዞ አገልግሎት",
      toolsDesc: "ለድርጅት ደረጃ ጉዞ እና ለተበጀ የእረፍት ጊዜ እቅድ የላቀ ሎጂስቲክስ።"
    }
  },
  om: {
    nav: { home: "Fuula Duraa", pilgrimage: "Hajjii fi Umrah", ticketing: "Tikeetii", visas: "Viizaa", tools: "Meeshaalee", solutions: "Furmaata", services: "Tajaajiloota" },
    hero: { 
      tag: "Kaartaa Idil-addunyaa", 
      headline: "Imaltoota Itoophiyaa Addunyaa Waliin Walquunnamsiisuu.", 
      subtitle: "Darul Safar Travel & Trading furmaata imalaa sadarkaa addunyaa hajjii fi umrah, tikeetii idil-addunyaa fi loojistiksii adda ta'eef ni dhiyeessa.", 
      bookUmrah: "Umrah Galmeessi", 
      globalTicketing: "Tikeetii Idil-addunyaa",
      cta: "Amma Galmeessi"
    },
    footer: {
      brandDesc: "Imaltoota Itoophiyaa ammayyaaf daangaa walquunnamsiisuu fi daldala idil-addunyaa mijeessuu.",
      hq: "Waajjira Muummee",
      location: "Finfinnee, Itoophiyaa",
      quickLinks: "Geessituuwwan Salphaa",
      legal: "Seeraa",
      terms: "Haalawwan fi Dambiiwwan",
      privacy: "Imaammata Iccitii",
      stayConnected: "Nu Waliin Turi",
      newsletterDesc: "Odeeffannoo imalaa haaraa fi meeshaalee daldalaaf barruu keenya hordofi.",
      emailPlaceholder: "Teessoo Imeelii",
      copyright: "© 2026 Darul Safar Travel & Trading. Mirgi hunduu eeggamaadha."
    },
    services: {
      pilgrimage: "Imala Amantii",
      pilgrimageDesc: "Daawwannaa Umrah, Hajjii fi Ziyarah sadarkaa olaanaa gara magaalota qulqulluutti qajeelfama ogeessotaan.",
      ticketing: "Tikeetii Xiyyaaraa Idil-addunyaa",
      ticketingDesc: "Qophii balalii rakkoo hin qabne karaa cimina daandii xiyyaaraa keenyaa. Gatiin gaariin mirkanaa'aadha.",
      visas: "Tajaajila Viizaa fi Sanadaa",
      visasDesc: "Eeyyama hojii, tuuristii, yaalaa fi barnootaa idil-addunyaatti ogeessotaan raawwachuu.",
      tools: "Imala Addaa",
      toolsDesc: "Loojistiksii olaanaa imala dhaabbataaf fi karoora boqonnaa addaa."
    }
  }
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
