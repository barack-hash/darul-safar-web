import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Send, Menu, X, Plane, FileText, Briefcase, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PilgrimagePage from './components/PilgrimagePage';
import VisaPage from './components/VisaPage';
import ToolsPage from './components/ToolsPage';
import TicketingPage from './components/TicketingPage';
import { useLanguage, Lang } from './context/LanguageContext';

type Page = 'home' | 'pilgrimage' | 'ticketing' | 'visas' | 'tools';

const ServiceCard = ({ icon, title, description, tags, delay, onClick, color = 'blue', image }: any) => {
  const colorMap: Record<string, { border: string, iconBg: string, tagBg: string, tagText: string }> = {
    blue: { border: 'hover:border-blue-500/30', iconBg: 'group-hover:bg-blue-600 group-hover:text-white', tagBg: 'group-hover:bg-blue-50', tagText: 'group-hover:text-blue-600' },
    red: { border: 'hover:border-red-500/30', iconBg: 'group-hover:bg-red-500 group-hover:text-white', tagBg: 'group-hover:bg-red-50', tagText: 'group-hover:text-red-600' },
    teal: { border: 'hover:border-teal-500/30', iconBg: 'group-hover:bg-teal-600 group-hover:text-white', tagBg: 'group-hover:bg-teal-50', tagText: 'group-hover:text-teal-600' },
    orange: { border: 'hover:border-orange-500/30', iconBg: 'group-hover:bg-orange-500 group-hover:text-white', tagBg: 'group-hover:bg-orange-50', tagText: 'group-hover:text-orange-600' }
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`group bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:scale-[1.02] ${colors.border} transition-all duration-500 flex flex-col h-full cursor-pointer relative overflow-hidden`}
    >
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="flex-1 flex flex-col">
          <div className={`w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700 mb-6 ${colors.iconBg} transition-colors duration-500 shadow-sm`}>
            {icon}
          </div>
          <h3 className="text-2xl font-headline font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
          <p className="text-gray-500 font-body text-sm leading-relaxed mb-6 flex-grow">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag: string, i: number) => (
              <span key={i} className={`px-3 py-1 bg-gray-100 text-gray-600 text-[10px] uppercase tracking-widest font-bold rounded-full ${colors.tagBg} ${colors.tagText} transition-colors duration-300`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden md:block w-32 lg:w-40 rounded-2xl bg-gradient-to-br from-gray-100/50 to-transparent border border-white/50 flex-shrink-0 relative overflow-hidden">
           {image ? (
             <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay"></div>
           )}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setIsLangMenuOpen(false);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 font-body flex flex-col overflow-x-hidden">
      {/* Master Header */}
      <header className={`fixed z-50 transition-all duration-500 ${scrolled ? 'top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full bg-white/70 backdrop-blur-xl shadow-sm py-3 px-6 border border-white/40' : 'top-0 left-0 w-full bg-white/80 backdrop-blur-md py-5 px-4 md:px-8 border-b border-gray-200/50'}`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-2xl font-headline font-extrabold tracking-widest cursor-pointer" onClick={() => setCurrentPage('home')}>
            <span className="text-gray-900">DARUL</span><span className="text-blue-600">SAFAR</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigateTo('home')} className={`font-headline tracking-tight font-bold text-sm transition-colors duration-300 ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{t.nav.home}</button>
            <button onClick={() => navigateTo('pilgrimage')} className={`font-headline tracking-tight font-bold text-sm transition-colors duration-300 ${currentPage === 'pilgrimage' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{t.nav.pilgrimage}</button>
            <button onClick={() => navigateTo('ticketing')} className={`font-headline tracking-tight font-bold text-sm transition-colors duration-300 ${currentPage === 'ticketing' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{t.nav.ticketing}</button>
            <button onClick={() => navigateTo('visas')} className={`font-headline tracking-tight font-bold text-sm transition-colors duration-300 ${currentPage === 'visas' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{t.nav.visas}</button>
            <button onClick={() => navigateTo('tools')} className={`font-headline tracking-tight font-bold text-sm transition-colors duration-300 ${currentPage === 'tools' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>{t.nav.tools}</button>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors duration-200"
              >
                <Globe className="w-5 h-5" />
                <span className="font-label text-sm font-bold">{lang.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl border border-white/40 overflow-hidden z-[60]"
                  >
                    <button onClick={() => handleLangChange('en')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900">
                      <span>English</span>
                      <span className="text-xs text-blue-600 font-bold">EN</span>
                    </button>
                    <button onClick={() => handleLangChange('am')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900 border-t border-gray-100">
                      <span>አማርኛ</span>
                      <span className="text-xs text-blue-600 font-bold">AM</span>
                    </button>
                    <button onClick={() => handleLangChange('ar')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900 border-t border-gray-100">
                      <span>العربية</span>
                      <span className="text-xs text-blue-600 font-bold">AR</span>
                    </button>
                    <button onClick={() => handleLangChange('om')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900 border-t border-gray-100">
                      <span>Afaan Oromoo</span>
                      <span className="text-xs text-blue-600 font-bold">OM</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-headline font-bold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-sm">
              {t.hero.cta}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-4 space-y-4 rounded-b-3xl absolute top-full left-0 w-full shadow-lg">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => navigateTo('home')} className={`text-left font-headline font-bold text-lg ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.home}</button>
              <button onClick={() => navigateTo('pilgrimage')} className={`text-left font-headline font-bold text-lg ${currentPage === 'pilgrimage' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.pilgrimage}</button>
              <button onClick={() => navigateTo('ticketing')} className={`text-left font-headline font-bold text-lg ${currentPage === 'ticketing' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.ticketing}</button>
              <button onClick={() => navigateTo('visas')} className={`text-left font-headline font-bold text-lg ${currentPage === 'visas' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.visas}</button>
              <button onClick={() => navigateTo('tools')} className={`text-left font-headline font-bold text-lg ${currentPage === 'tools' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>{t.nav.tools}</button>
            </nav>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex gap-2">
                <button onClick={() => handleLangChange('en')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'en' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>EN</button>
                <button onClick={() => handleLangChange('am')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'am' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>AM</button>
                <button onClick={() => handleLangChange('ar')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'ar' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>AR</button>
                <button onClick={() => handleLangChange('om')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'om' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>OM</button>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-headline font-bold w-full text-center shadow-sm">
                {t.hero.cta}
              </button>
            </div>
          </div>
        )}
      </header>


      {/* Main Content Area */}
      <div className="pt-24 md:pt-32 flex-grow w-full">
        {currentPage === 'home' ? (
          <main className="w-full flex flex-col items-center justify-start">
            {/* Hero Section */}
            <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mb-12">
              <section className="w-full py-32 md:py-48 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Left: Typography */}
                <div className="flex-1 text-center lg:text-left z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="inline-block px-5 py-2 mb-8 bg-blue-50 text-blue-600 font-label text-xs tracking-[0.2em] rounded-full uppercase font-bold shadow-sm border border-blue-100">
                      {t.hero.tag}
                    </span>
                  </motion.div>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 leading-[1.1] tracking-tighter mb-8 max-w-3xl mx-auto lg:mx-0 flex flex-wrap justify-center lg:justify-start">
                    {/* Staggered text animation */}
                    {t.hero.headline.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block mr-3 md:mr-4"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-2xl text-gray-500 font-body leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12"
                  >
                    {t.hero.subtitle}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
                  >
                    <motion.button 
                      onClick={() => navigateTo('pilgrimage')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-blue-600 text-white font-headline font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 w-full sm:w-auto text-lg"
                    >
                      {t.hero.bookUmrah}
                    </motion.button>
                    <motion.button 
                      onClick={() => navigateTo('ticketing')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 font-headline font-bold rounded-2xl hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm w-full sm:w-auto text-lg"
                    >
                      {t.hero.globalTicketing}
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right: Image Slot */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 w-full lg:w-auto relative"
                >
                  <div className="aspect-[4/3] lg:aspect-[3/4] w-full rounded-[3rem] bg-gradient-to-br from-gray-100 to-gray-200 border border-white/60 shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden relative group">
                    <img src="/hero-main.png" alt="Traveler" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay"></div>
                  </div>
                </motion.div>
              </section>
            </div>

            {/* Service Pillars Grid */}
            <section className="w-full py-32 md:py-48 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none"></div>
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-16 text-center md:text-left"
                >
                  <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-6 tracking-tight">{t.nav.solutions}</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Card 1 */}
                  <div onClick={() => navigateTo('pilgrimage')} className="cursor-pointer">
                    <ServiceCard 
                      icon={<Moon className="w-8 h-8" />}
                      title={t.services.pilgrimage}
                      description={t.services.pilgrimageDesc}
                      tags={["Umrah", "Hajj", "Ziyarah"]}
                      delay={0.1}
                      color="teal"
                      image="/pilgrimage.png"
                    />
                  </div>
                  {/* Card 2 */}
                  <div onClick={() => navigateTo('ticketing')} className="cursor-pointer">
                    <ServiceCard 
                      icon={<Plane className="w-8 h-8" />}
                      title={t.services.ticketing}
                      description={t.services.ticketingDesc}
                      tags={["Ethiopian", "Qatar", "Saudia", "Emirates"]}
                      delay={0.2}
                      color="blue"
                      image="/ticketing.png"
                    />
                  </div>
                  {/* Card 3 */}
                  <div onClick={() => navigateTo('visas')} className="cursor-pointer">
                    <ServiceCard 
                      icon={<FileText className="w-8 h-8" />}
                      title={t.services.visas}
                      description={t.services.visasDesc}
                      tags={["Work", "Tourist", "Medical", "Education"]}
                      delay={0.3}
                      color="orange"
                      image="/visa-services.png"
                    />
                  </div>
                  {/* Card 4 */}
                  <div onClick={() => navigateTo('tools')} className="cursor-pointer">
                    <ServiceCard 
                      icon={<Briefcase className="w-8 h-8" />}
                      title={t.services.tools}
                      description={t.services.toolsDesc}
                      tags={["B2B Corporate", "C2C Vacation"]}
                      delay={0.4}
                      color="red"
                      image="/specialized-travel.png"
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : currentPage === 'pilgrimage' ? (
          <main className="w-full">
            <PilgrimagePage />
          </main>
        ) : currentPage === 'ticketing' ? (
          <main className="w-full">
            <TicketingPage />
          </main>
        ) : currentPage === 'visas' ? (
          <main className="w-full">
            <VisaPage />
          </main>
        ) : (
          <main className="w-full">
            <ToolsPage />
          </main>
        )}
      </div>

      {/* Master Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 w-full py-16 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Location */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-headline font-black text-2xl tracking-tighter text-gray-900">Darul Safar</span>
            <p className="font-body text-sm text-gray-500 leading-relaxed">
              {t.footer.brandDesc}
            </p>
            <div className="pt-4">
              <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">{t.footer.hq}</h4>
              <p className="font-body text-sm text-gray-500">
                {t.footer.location}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('home')} className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.nav.home}</button></li>
              <li><button onClick={() => navigateTo('pilgrimage')} className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.nav.pilgrimage}</button></li>
              <li><button onClick={() => navigateTo('visas')} className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.nav.visas}</button></li>
              <li><button onClick={() => navigateTo('tools')} className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.nav.tools}</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">{t.footer.legal}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.footer.terms}</a></li>
              <li><a href="#" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.footer.privacy}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">{t.footer.stayConnected}</h4>
            <p className="font-body text-sm text-gray-500 mb-4">
              {t.footer.newsletterDesc}
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t.footer.emailPlaceholder} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body text-sm text-gray-400">
            {t.footer.copyright}
          </span>
        </div>
      </footer>
    </div>
  );
}
