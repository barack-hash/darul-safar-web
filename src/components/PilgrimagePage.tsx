import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Droplets, RefreshCw, Footprints, Scissors, FileText, Briefcase, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// --- Translation Data ---
const translations = {
  en: {
    title: "Pilgrim's Path",
    subtitle: "A comprehensive guide to the rituals, preparations, and spiritual essence of Umrah.",
    ritualsTitle: "Rituals of Umrah",
    checklistTitle: "Cartographer's Essentials",
    checklistSubtitle: "Preparation Is The First Ritual",
    checklistDesc: "Ensure your physical journey is as seamless as your spiritual one. Our curated list covers the essentials for endurance and focus.",
    steps: [
      {
        id: 1,
        title: "Ihram",
        shortDesc: "Preparation & Intention",
        description: "Entering the sacred state through ritual cleansing, donning the white garments, and making the formal intention (Niyyah) at the Miqat.",
      },
      {
        id: 2,
        title: "Tawaf",
        shortDesc: "Spiritual Orbit",
        description: "Circumambulating the Kaaba seven times in a counter-clockwise direction, echoing celestial harmony and devotion to the Creator.",
      },
      {
        id: 3,
        title: "Sa'i",
        shortDesc: "The Great Search",
        description: "Walking seven times between the hills of Safa and Marwa, commemorating Hagar's desperate search for water for her son Ishmael.",
      },
      {
        id: 4,
        title: "Halq/Taqsir",
        shortDesc: "Completion",
        description: "The final act of shaving (Halq) or clipping (Taqsir) the hair, marking the completion of the pilgrimage and exit from the state of Ihram.",
      }
    ],
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
    title: "مسار الحاج",
    subtitle: "دليل شامل للمناسك والاستعدادات والجوهر الروحي للعمرة.",
    ritualsTitle: "مناسك العمرة",
    checklistTitle: "أساسيات الرحلة",
    checklistSubtitle: "الاستعداد هو أول منسك",
    checklistDesc: "تأكد من أن رحلتك الجسدية سلسة مثل رحلتك الروحية. تغطي قائمتنا المنسقة الأساسيات للتحمل والتركيز.",
    steps: [
      {
        id: 1,
        title: "الإحرام",
        shortDesc: "الاستعداد والنية",
        description: "الدخول في الحالة المقدسة من خلال التطهير الطقسي، وارتداء الملابس البيضاء، وعقد النية الرسمية عند الميقات.",
      },
      {
        id: 2,
        title: "الطواف",
        shortDesc: "المدار الروحي",
        description: "الطواف حول الكعبة سبعة أشواط في اتجاه عكس عقارب الساعة، مردداً صدى الانسجام السماوي والتفاني للخالق.",
      },
      {
        id: 3,
        title: "السعي",
        shortDesc: "البحث العظيم",
        description: "المشي سبع مرات بين تلال الصفا والمروة، إحياء لذكرى بحث هاجر اليائس عن الماء لابنها إسماعيل.",
      },
      {
        id: 4,
        title: "الحلق/التقصير",
        shortDesc: "الاكتمال",
        description: "العمل النهائي المتمثل في حلق أو تقصير الشعر، إيذاناً بانتهاء الحج والخروج من حالة الإحرام.",
      }
    ],
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
      mat: "سجادة صلاة خفيفة",
      meds: "حقيبة طبية شخصية"
    }
  },
  am: {
    title: "የሐጃጅ መንገድ",
    subtitle: "የዑምራን ስርአቶች፣ ዝግጅቶች እና መንፈሳዊ ይዘት የሚያሳይ አጠቃላይ መመሪያ።",
    ritualsTitle: "የዑምራ ስርአቶች",
    checklistTitle: "የጉዞ አስፈላጊ ነገሮች",
    checklistSubtitle: "ዝግጅት የመጀመሪያው ስርአት ነው",
    checklistDesc: "አካላዊ ጉዞዎ እንደ መንፈሳዊ ጉዞዎ የተቃና መሆኑን ያረጋግጡ። የእኛ ዝርዝር ለጽናት እና ትኩረት አስፈላጊ የሆኑትን ይሸፍናል።",
    steps: [
      {
        id: 1,
        title: "ኢህራም",
        shortDesc: "ዝግጅት እና ኒያ",
        description: "በስርአታዊ ትጥበት ወደ ቅዱስ ሁኔታ መግባት፣ ነጭ ልብሶችን መልበስ እና በሚቃት ላይ መደበኛ ኒያ ማድረግ።",
      },
      {
        id: 2,
        title: "ጠዋፍ",
        shortDesc: "መንፈሳዊ ዑደት",
        description: "በካዕባ ዙሪያ ሰባት ጊዜ በተቃራኒ ሰዓት አቅጣጫ መዞር፣ ይህም ሰማያዊ ስምምነትን እና ለፈጣሪ ያለን ታማኝነት ያሳያል።",
      },
      {
        id: 3,
        title: "ሰዕይ",
        shortDesc: "ታላቁ ፍለጋ",
        description: "በሶፋ እና መርዋ ኮረብቶች መካከል ሰባት ጊዜ መመላለስ፣ ሀጀር ለልጇ ኢስማኢል ውሃ ፍለጋ ያደረገችውን ጥረት ለማስታወስ።",
      },
      {
        id: 4,
        title: "ሀልቅ/ተቅሲር",
        shortDesc: "ማጠናቀቂያ",
        description: "የመጨረሻው የፀጉር መላጨት (ሀልቅ) ወይም ማሳጠር (ተቅሲር) ድርጊት፣ ይህም የሐጅ መጠናቀቅን እና ከኢህራም ሁኔታ መውጣትን ያመለክታል።",
      }
    ],
    categories: {
      sacred: "ቅዱስ እቃዎች",
      docs: "የጉዞ ሰነዶች",
      comfort: "ምቾት እና ጤና"
    },
    items: {
      ihram: "የኢህራም ልብስ (2 ስብስቦች)",
      soap: "ሽታ የሌለው ሳሙና እና የንፅህና መጠበቂያዎች",
      passport: "ፓስፖርት (6+ ወራት የሚያገለግል)",
      visa: "የዑምራ ቪዛ / ኑሱክ መተግበሪያ",
      vax: "የክትባት የምስክር ወረቀቶች",
      sandals: "ምቹ የመራመጃ ጫማዎች",
      mat: "ቀላል የሶላት ምንጣፍ",
      meds: "የግል ህክምና ኪት"
    }
  },
  om: {
    title: "Daandii Hajjii",
    subtitle: "Qajeelfama guutuu sirnoota, qophiilee fi hafuura Umrah.",
    ritualsTitle: "Sirnoota Umrah",
    checklistTitle: "Wantoota Barbaachisoo",
    checklistSubtitle: "Qophiin Sirna Jalqabaati",
    checklistDesc: "Imalli qaama keetii akkuma imala hafuura keetii salphaa ta'uu isaa mirkaneessi. Tarreen keenya wantoota jabaachuu fi xiyyeeffannaaf barbaachisan of keessatti qabata.",
    steps: [
      {
        id: 1,
        title: "Ihram",
        shortDesc: "Qophii fi Niyyaa",
        description: "Dhiqannaa sirnaatiin gara haala qulqulluutti seenuu, uffata adii uffachuu fi Miqaat irratti niyyaa idilee gochuu.",
      },
      {
        id: 2,
        title: "Tawaaf",
        shortDesc: "Naannoo Hafuuraa",
        description: "Ka'abaa marsaa torba kallattii faallaa sa'aatiin naanna'uu, kunis walsimannaa samii fi uumaaf of kennuu agarsiisa.",
      },
      {
        id: 3,
        title: "Sa'ii",
        shortDesc: "Barbaacha Guddaa",
        description: "Tulluuwwan Safaa fi Marwaa gidduu yeroo torba deddeebi'uu, kunis Hajar ilma ishee Ismaa'iiliif bishaan barbaaduuf carraaqqii isheen goote yaadachiisa.",
      },
      {
        id: 4,
        title: "Halq/Taqsiir",
        shortDesc: "Xumura",
        description: "Gocha dhumaa rifeensa haaddachuu (Halq) ykn gabaabsuu (Taqsiir), kunis xumuramu hajjii fi haala Ihram keessaa ba'uu agarsiisa.",
      }
    ],
    categories: {
      sacred: "Wantoota Qulqulluu",
      docs: "Sanadoota Imalaa",
      comfort: "Mijaa'ina fi Fayyaa"
    },
    items: {
      ihram: "Uffata Ihram (Tuuta 2)",
      soap: "Saamunaa fi meeshaalee qulqullinaa foolii hin qabne",
      passport: "Paaspoortii (Ji'a 6+ kan tajaajilu)",
      visa: "Viizaa Umrah / Appii Nusuk",
      vax: "Waraqaa Ragaa Talaallii",
      sandals: "Kophee deemsaaf mijatu",
      mat: "Afaan salaataa salphaa",
      meds: "Kittaa yaalaa dhuunfaa"
    }
  }
};

export default function PilgrimagePage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getIconForStep = (id: number) => {
    switch(id) {
      case 1: return <Droplets className="w-6 h-6" />;
      case 2: return <RefreshCw className="w-6 h-6" />;
      case 3: return <Footprints className="w-6 h-6" />;
      case 4: return <Scissors className="w-6 h-6" />;
      default: return <Droplets className="w-6 h-6" />;
    }
  };

  const getStepColor = (id: number) => {
    switch(id) {
      case 1: return { bg: 'bg-teal-600', text: 'text-teal-600', lightBg: 'bg-teal-50', border: 'border-teal-200', shadow: 'shadow-teal-500/30' };
      case 2: return { bg: 'bg-blue-600', text: 'text-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-200', shadow: 'shadow-blue-500/30' };
      case 3: return { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-50', border: 'border-orange-200', shadow: 'shadow-orange-500/30' };
      case 4: return { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-50', border: 'border-red-200', shadow: 'shadow-red-500/30' };
      default: return { bg: 'bg-blue-600', text: 'text-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-200', shadow: 'shadow-blue-500/30' };
    }
  };

  const checklistData = [
    {
      category: t.categories.sacred,
      icon: <Heart className="w-5 h-5" />,
      color: { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-50', border: 'border-red-200', shadow: 'shadow-red-500/20' },
      items: [
        { id: 'ihram', label: t.items.ihram },
        { id: 'soap', label: t.items.soap }
      ]
    },
    {
      category: t.categories.docs,
      icon: <FileText className="w-5 h-5" />,
      color: { bg: 'bg-blue-600', text: 'text-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-200', shadow: 'shadow-blue-500/20' },
      items: [
        { id: 'passport', label: t.items.passport },
        { id: 'visa', label: t.items.visa },
        { id: 'vax', label: t.items.vax }
      ]
    },
    {
      category: t.categories.comfort,
      icon: <Briefcase className="w-5 h-5" />,
      color: { bg: 'bg-teal-600', text: 'text-teal-600', lightBg: 'bg-teal-50', border: 'border-teal-200', shadow: 'shadow-teal-500/20' },
      items: [
        { id: 'sandals', label: t.items.sandals },
        { id: 'mat', label: t.items.mat },
        { id: 'meds', label: t.items.meds }
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-transparent">
      {/* Hero Section */}
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-8 mb-16">
        <section className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 hover:border-blue-200 transition-colors duration-500 text-gray-900 py-32 md:py-48 rounded-[3rem] relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-gray-900 to-gray-900 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block px-4 py-1.5 mb-8 border border-blue-200 text-blue-600 font-label text-xs tracking-[0.2em] rounded-full uppercase font-bold bg-blue-50/50"
          >
            The Sacred Journey
          </motion.span>
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

      {/* Interactive Timeline */}
      <section className="w-full py-32 md:py-48 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-headline font-black text-gray-900 mb-4 tracking-tight">{t.ritualsTitle}</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2 z-0"></div>

          {t.steps.map((step, index) => {
            const isActive = activeStep === step.id;
            const colors = getStepColor(step.id);
            return (
              <motion.div 
                key={step.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }
                }}
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className={`relative z-10 cursor-pointer flex-1 ${isActive ? 'md:flex-[2]' : ''}`}
              >
                <motion.div layout className={`h-full bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border transition-all duration-500 ${isActive ? `${colors.border} shadow-[0_20px_40px_rgb(0,0,0,0.08)]` : `border-gray-200 shadow-sm hover:${colors.border} hover:shadow-md`}`}>
                  
                  <motion.div layout className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${isActive ? `${colors.bg} text-white shadow-lg ${colors.shadow}` : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
                      {getIconForStep(step.id)}
                    </div>
                    <span className="text-5xl font-black text-gray-100 select-none tracking-tighter">
                      0{step.id}
                    </span>
                  </motion.div>

                  <motion.h3 layout className="text-2xl font-headline font-bold text-gray-900 mb-2 tracking-tight">{step.title}</motion.h3>
                  <motion.p layout className={`text-xs font-label uppercase tracking-[0.2em] ${colors.text} font-bold mb-4`}>
                    {step.shortDesc}
                  </motion.p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: 'auto', marginTop: 24 },
                          collapsed: { opacity: 0, height: 0, marginTop: 0 }
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-500 font-body text-base leading-relaxed pt-6 border-t border-gray-100">
                          {step.description}
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
