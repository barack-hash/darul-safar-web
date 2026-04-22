import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Droplets, RefreshCw, Footprints, Scissors, MessageCircle, Star, Plane, ChevronDown, FileText, Briefcase, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getIconForStep = (id: number) => {
    switch (id) {
      case 1: return <Droplets className="w-6 h-6" />;
      case 2: return <RefreshCw className="w-6 h-6" />;
      case 3: return <Footprints className="w-6 h-6" />;
      case 4: return <Scissors className="w-6 h-6" />;
      default: return <Check className="w-6 h-6" />;
    }
  };

  const getStepColor = (id: number) => {
    switch (id) {
      case 1: return { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', shadow: 'shadow-blue-500/30' };
      case 2: return { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-200', shadow: 'shadow-indigo-500/30' };
      case 3: return { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', shadow: 'shadow-amber-500/30' };
      case 4: return { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200', shadow: 'shadow-emerald-500/30' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', border: 'border-gray-200', shadow: 'shadow-gray-500/30' };
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
      color: { bg: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-200', lightBg: 'bg-rose-50', shadow: 'shadow-rose-500/30' },
      items: [
        { id: 'ihram', label: t.items.ihram },
        { id: 'soap', label: t.items.soap }
      ]
    },
    {
      category: t.categories.docs,
      icon: <FileText className="w-5 h-5" />,
      color: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', lightBg: 'bg-blue-50', shadow: 'shadow-blue-500/30' },
      items: [
        { id: 'passport', label: t.items.passport },
        { id: 'visa', label: t.items.visa },
        { id: 'vax', label: t.items.vax }
      ]
    },
    {
      category: t.categories.comfort,
      icon: <Briefcase className="w-5 h-5" />,
      color: { bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200', lightBg: 'bg-emerald-50', shadow: 'shadow-emerald-500/30' },
      items: [
        { id: 'sandals', label: t.items.sandals },
        { id: 'mat', label: t.items.mat },
        { id: 'meds', label: t.items.meds }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center justify-start pb-24">
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-headline font-black text-gray-900 tracking-tighter mb-6">
            {pageT.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-body max-w-3xl mx-auto leading-relaxed">
            {pageT.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-white/60 bg-white/20 backdrop-blur-sm"
        >
          <img 
            src="/pilgrimage.png" 
            alt="Pilgrimage" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </motion.div>
      </section>

      {/* Packages Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-black text-gray-900 tracking-tight mb-4">
            {pageT.packagesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Economy Umrah */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-10 shadow-[0_20px_40px_rgb(0,0,0,0.08)] flex flex-col hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-500 group"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Plane className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-3xl font-bold text-gray-900 mb-4">{pageT.economyUmrah.title}</h3>
            <p className="text-gray-500 font-body text-lg mb-8 flex-grow">{pageT.economyUmrah.desc}</p>
            
            <ul className="space-y-4 mb-10">
              {pageT.economyUmrah.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 font-body">
                  <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleWhatsApp(pageT.economyUmrah.title)}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-2xl font-headline font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-600/20"
            >
              <MessageCircle className="w-5 h-5" />
              {pageT.discussWhatsApp}
            </button>
          </motion.div>

          {/* Premium Hajj */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-10 shadow-[0_20px_40px_rgb(0,0,0,0.08)] flex flex-col hover:shadow-amber-500/10 hover:border-amber-200 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/40 to-transparent rounded-bl-full -z-10"></div>
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-3xl font-bold text-gray-900 mb-4">{pageT.premiumHajj.title}</h3>
            <p className="text-gray-500 font-body text-lg mb-8 flex-grow">{pageT.premiumHajj.desc}</p>
            
            <ul className="space-y-4 mb-10">
              {pageT.premiumHajj.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 font-body">
                  <Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleWhatsApp(pageT.premiumHajj.title)}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-2xl font-headline font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              {pageT.discussWhatsApp}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pilgrim's Guide Interactive Timeline */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-black text-gray-900 tracking-tight mb-4">
            {pageT.guideTitle}
          </h2>
          <p className="text-xl text-gray-500 font-body">
            {pageT.guideSubtitle}
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
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
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-500 shrink-0 z-10 mt-4 ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white border-gray-200 text-gray-400 group-hover:border-blue-300 group-hover:text-blue-500'}`}>
                  <span className="font-headline font-bold text-sm">{step.id}</span>
                </div>
                
                {/* Card */}
                <motion.div 
                  layout
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className={`flex-1 cursor-pointer backdrop-blur-xl border rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden ${
                    isActive ? 'bg-white/70 p-10 border-blue-300 shadow-blue-500/10' : 'bg-white/60 p-6 border-white/80 hover:border-blue-200'
                  }`}
                >
                  <motion.div layout className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        {getIconForStep(step.id)}
                      </div>
                      <span className="font-headline text-xl font-bold text-gray-900">
                        {step.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
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
                        <p className="text-gray-600 font-body text-lg leading-relaxed pt-6 border-t border-gray-100">
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
      </section>

      {/* Packing Checklist */}
      <section className="w-full bg-white text-gray-900 py-32 md:py-48 px-4 md:px-8 border-t border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          
          {/* Checklist Intro */}
          <div>
            <span className="font-label uppercase tracking-[0.2em] text-blue-600 mb-6 block text-sm font-bold">
              {t.checklistTitle}
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600">
              {t.checklistSubtitle}
            </h2>
            <p className="text-gray-500 text-xl font-body leading-relaxed mb-12">
              {t.checklistDesc}
            </p>
            
            <div className="p-8 bg-gray-50 border border-gray-200 rounded-[2rem]">
               <div className="flex items-center gap-5 mb-4">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                   <Check className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="font-headline font-bold text-xl text-gray-900">Progress</h4>
                   <p className="text-base text-gray-500">
                     {Object.values(checkedItems).filter(Boolean).length} of 8 items packed
                   </p>
                 </div>
               </div>
               <div className="w-full bg-gray-200 h-3 rounded-full mt-6 overflow-hidden">
                 <motion.div 
                   className="h-full bg-blue-600"
                   initial={{ width: 0 }}
                   animate={{ width: `${(Object.values(checkedItems).filter(Boolean).length / 8) * 100}%` }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 />
               </div>
            </div>
          </div>

          {/* Checklist Interactive UI */}
          <div className="space-y-8">
            {checklistData.map((category, idx) => (
              <div key={idx} className={`bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-500 hover:${category.color.border}`}>
                <h3 className="text-2xl font-headline font-bold text-gray-900 mb-6 flex items-center gap-4 border-b border-gray-100 pb-6">
                  <span className={`p-3 ${category.color.lightBg} ${category.color.text} rounded-xl`}>
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
                        className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${isChecked ? `${category.color.lightBg} ${category.color.border}` : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 ${isChecked ? `${category.color.bg} text-white shadow-md ${category.color.shadow}` : 'bg-white border border-gray-300'}`}>
                          {isChecked && <Check className="w-4 h-4" />}
                        </div>
                        <span className={`font-body text-base transition-all duration-300 ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </section>
    </div>
  );
}
