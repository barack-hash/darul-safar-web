import React, { createContext, useState, useContext, useEffect } from 'react';

export type Lang = 'en' | 'ar' | 'am' | 'om';

interface Translations {
  nav: {
    home: string;
    pilgrimage: string;
    ticketing: string;
    visas: string;
    tools: string;
  };
  hero: {
    tag: string;
    headline: string;
    subtitle: string;
    bookUmrah: string;
    globalTicketing: string;
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: { home: "Home", pilgrimage: "Pilgrimage", ticketing: "Ticketing", visas: "Visas", tools: "Tools" },
    hero: { 
      tag: "The Global Cartographer", 
      headline: "Connecting Ethiopian Travelers to the Globe.", 
      subtitle: "Darul Safar Travel & Trading provides world-class travel solutions for pilgrimage, global ticketing, and specialized logistics.", 
      bookUmrah: "Book Umrah", 
      globalTicketing: "Global Ticketing" 
    }
  },
  ar: {
    nav: { home: "الرئيسية", pilgrimage: "الحج والعمرة", ticketing: "التذاكر", visas: "التأشيرات", tools: "الأدوات" },
    hero: { 
      tag: "رسام الخرائط العالمي", 
      headline: "ربط المسافرين الإثيوبيين بالعالم.", 
      subtitle: "تقدم دار السفر للسياحة والتجارة حلول سفر عالمية المستوى للحج والعمرة، وحجز التذاكر العالمية، والخدمات اللوجستية المتخصصة.", 
      bookUmrah: "احجز عمرة", 
      globalTicketing: "تذاكر عالمية" 
    }
  },
  am: {
    nav: { home: "ዋና ገፅ", pilgrimage: "ሐጅ እና ዑምራ", ticketing: "ትኬት", visas: "ቪዛ", tools: "መሳሪያዎች" },
    hero: { 
      tag: "ዓለም አቀፍ ካርታ አዘጋጅ", 
      headline: "ኢትዮጵያውያን ተጓዦችን ከዓለም ጋር ማገናኘት።", 
      subtitle: "ዳሩል ሰፈር የጉዞ እና ንግድ ለሐጅ እና ዑምራ፣ ለአለም አቀፍ ትኬት እና ለልዩ ሎጂስቲክስ አለም አቀፍ ደረጃቸውን የጠበቁ የጉዞ መፍትሄዎችን ይሰጣል።", 
      bookUmrah: "ዑምራ ይመዝገቡ", 
      globalTicketing: "ዓለም አቀፍ ትኬት" 
    }
  },
  om: {
    nav: { home: "Fuula Duraa", pilgrimage: "Hajjii fi Umrah", ticketing: "Tikeetii", visas: "Viizaa", tools: "Meeshaalee" },
    hero: { 
      tag: "Kaartaa Idil-addunyaa", 
      headline: "Imaltoota Itoophiyaa Addunyaa Waliin Walquunnamsiisuu.", 
      subtitle: "Darul Safar Travel & Trading furmaata imalaa sadarkaa addunyaa hajjii fi umrah, tikeetii idil-addunyaa fi loojistiksii adda ta'eef ni dhiyeessa.", 
      bookUmrah: "Umrah Galmeessi", 
      globalTicketing: "Tikeetii Idil-addunyaa" 
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
