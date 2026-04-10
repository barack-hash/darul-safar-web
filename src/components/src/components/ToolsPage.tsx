import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Info, DollarSign, Plane, Building, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    title: "Strategic Utility Hub",
    subtitle: "Precision tools designed for the modern pilgrim and global trader.",
    form: {
      estimatorTitle: "Smart Budgeter",
      destination: "Destination",
      travelers: "Travelers",
      duration: "Duration (Days)",
      tier: "Package Tier",
      calculate: "Calculate Estimate",
    },
    options: {
      destinations: ["Umrah", "Dubai", "Europe", "SE Asia"],
      tiers: ["Economy", "Standard", "Premium"]
    },
    results: {
      breakdown: "Estimated Breakdown",
      flights: "Flights & Transit",
      visa: "Visa Fees",
      lodging: "Lodging & Subsistence",
      total: "Total Estimate",
      disclaimer: "Estimates are based on current market averages. Contact Darul Safar for a live quote."
    }
  },
  ar: {
    title: "مركز المرافق الاستراتيجية",
    subtitle: "أدوات دقيقة مصممة للحاج الحديث والتاجر العالمي.",
    form: {
      estimatorTitle: "مقدر الميزانية الذكي",
      destination: "الوجهة",
      travelers: "المسافرون",
      duration: "المدة (أيام)",
      tier: "مستوى الباقة",
      calculate: "حساب التقدير",
    },
    options: {
      destinations: ["عمرة", "دبي", "أوروبا", "جنوب شرق آسيا"],
      tiers: ["اقتصادي", "قياسي", "ممتاز"]
    },
    results: {
      breakdown: "التفصيل المقدر",
      flights: "الرحلات الجوية والعبور",
      visa: "رسوم التأشيرة",
      lodging: "السكن والإعاشة",
      total: "التقدير الإجمالي",
      disclaimer: "تستند التقديرات إلى متوسطات السوق الحالية. اتصل بدار السفر للحصول على عرض أسعار مباشر."
    }
  },
  am: {
    title: "ስትራቴጂካዊ የፍጆታ ማዕከል",
    subtitle: "ለዘመናዊው መንገደኛ እና ዓለም አቀፍ ነጋዴ የተነደፉ ትክክለኛ መሳሪያዎች።",
    form: {
      estimatorTitle: "ስማርት የበጀት ግምት",
      destination: "መዳረሻ",
      travelers: "ተጓዦች",
      duration: "ቆይታ (ቀናት)",
      tier: "የጥቅል ደረጃ",
      calculate: "ግምቱን አስላ",
    },
    options: {
      destinations: ["ዑምራ", "ዱባይ", "አውሮፓ", "ደቡብ ምስራቅ እስያ"],
      tiers: ["ኢኮኖሚ", "መደበኛ", "ፕሪሚየም"]
    },
    results: {
      breakdown: "የተገመተው ዝርዝር",
      flights: "በረራዎች እና ትራንዚት",
      visa: "የቪዛ ክፍያዎች",
      lodging: "ማረፊያ እና ቀለብ",
      total: "አጠቃላይ ግምት",
      disclaimer: "ግምቶች አሁን ባለው የገበያ አማካይ ላይ የተመሰረቱ ናቸው። ለቀጥታ ዋጋ ዳሩል ሰፈርን ያነጋግሩ።"
    }
  },
  om: {
    title: "Wiirtuu Tajaajila Tarsiimawaa",
    subtitle: "Meeshaalee sirrii imaltoota ammayyaa fi daldaltoota idil-addunyaaf qophaa'an.",
    form: {
      estimatorTitle: "Tilmaama Baajataa Qaxalee",
      destination: "Bakka Deeman",
      travelers: "Imaltoota",
      duration: "Turtii (Guyyoota)",
      tier: "Sadarkaa Paakeejii",
      calculate: "Tilmaama Herregi",
    },
    options: {
      destinations: ["Umrah", "Dubay", "Awurooppaa", "Eshiyaa Kibba-Bahaa"],
      tiers: ["Ekonomii", "Idilee", "Piriimiyemii"]
    },
    results: {
      breakdown: "Qoodiinsa Tilmaamame",
      flights: "Balali'aa fi Geejjibaa",
      visa: "Kaffaltii Viizaa",
      lodging: "Bultii fi Nyaata",
      total: "Tilmaama Waliigalaa",
      disclaimer: "Tilmaamni kun giddugaleessa gabaa ammaa irratti hundaa'a. Gatii kallattiif Darul Safar quunnamaa."
    }
  }
};

export default function ToolsPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  
  const [destination, setDestination] = useState(t.options.destinations[0]);
  const [travelers, setTravelers] = useState(1);
  const [duration, setDuration] = useState(14);
  const [tier, setTier] = useState(t.options.tiers[1]);
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState({ flights: 0, visa: 0, lodging: 0, total: 0 });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder logic
    let baseCost = 200; // Standard
    if (tier === t.options.tiers[0]) baseCost = 100; // Economy
    if (tier === t.options.tiers[2]) baseCost = 400; // Premium

    let flightCost = 800; // Default
    let visaFee = 150;

    if (destination === t.options.destinations[1]) { flightCost = 400; visaFee = 100; } // Dubai
    if (destination === t.options.destinations[2]) { flightCost = 900; visaFee = 120; } // Europe
    if (destination === t.options.destinations[3]) { flightCost = 700; visaFee = 80; } // SE Asia

    const flights = flightCost * travelers;
    const visa = visaFee * travelers;
    const lodging = baseCost * duration * travelers;
    const total = flights + visa + lodging;

    setResults({ flights, visa, lodging, total });
    setIsCalculated(true);
  };

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col items-center justify-start pb-24">
      {/* Hero Section */}
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-8 mb-8">
        <section className="w-full bg-white/60 backdrop-blur-md border border-white/50 hover:border-gold/50 transition-colors duration-500 py-16 md:py-24 rounded-3xl relative overflow-hidden shadow-xl text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-navy mb-4"
          >
            Strategic <span className="text-gold">Utility</span> Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-on-surface-variant max-w-2xl mx-auto text-lg font-body leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </section>
      </div>

      {/* Tools Grid */}
      <section className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Smart Budget Estimator */}
          <div className="lg:col-span-8 lg:col-start-3 bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 hover:border-gold/50 transition-colors duration-500 shadow-xl flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-gold/20 rounded-xl">
                <Calculator className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-headline text-3xl font-bold text-navy">{t.form.estimatorTitle}</h2>
            </div>

            <form onSubmit={handleCalculate} className="space-y-8 flex-grow">
              {/* Inputs Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
                    {t.form.destination}
                  </label>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-body transition-all appearance-none"
                  >
                    {t.options.destinations.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
                      {t.form.travelers}
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                      className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-body transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
                      {t.form.tier}
                    </label>
                    <select 
                      value={tier}
                      onChange={(e) => setTier(e.target.value)}
                      className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold font-body transition-all appearance-none"
                    >
                      {t.options.tiers.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold">
                      {t.form.duration}
                    </label>
                    <span className="font-headline font-bold text-gold text-xl">{duration}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-navy text-white font-headline font-bold py-4 rounded-xl shadow-lg hover:bg-gold hover:text-navy hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {t.form.calculate}
              </button>

              {/* Results Section */}
              <AnimatePresence>
                {isCalculated && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-6 space-y-6 mt-8 shadow-sm">
                      <h3 className="font-label text-xs uppercase tracking-widest text-gold font-bold mb-4">
                        {t.results.breakdown}
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-on-surface-variant font-body flex items-center gap-2">
                            <Plane className="w-4 h-4 text-navy/50" />
                            {t.results.flights}
                          </span>
                          <span className="font-headline font-bold text-navy">${results.flights.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-on-surface-variant font-body flex items-center gap-2">
                            <FileText className="w-4 h-4 text-navy/50" />
                            {t.results.visa}
                          </span>
                          <span className="font-headline font-bold text-navy">${results.visa.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-on-surface-variant font-body flex items-center gap-2">
                            <Building className="w-4 h-4 text-navy/50" />
                            {t.results.lodging}
                          </span>
                          <span className="font-headline font-bold text-navy">${results.lodging.toLocaleString()}</span>
                        </div>
                        
                        <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                          <span className="font-headline font-bold text-navy uppercase tracking-widest text-sm">{t.results.total}</span>
                          <span className="font-headline font-black text-3xl text-gold">${results.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 mt-6 text-on-surface-variant text-sm bg-surface p-4 rounded-xl border border-outline-variant/10">
                      <Info className="w-5 h-5 text-gold shrink-0" />
                      <p className="italic leading-relaxed">{t.results.disclaimer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
