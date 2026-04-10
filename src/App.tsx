import React, { useState } from 'react';
import { Globe, ChevronDown, Send, Menu, X, Plane, FileText, Briefcase, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PilgrimagePage from './components/PilgrimagePage';
import VisaPage from './components/VisaPage';
import ToolsPage from './components/ToolsPage';
import TicketingPage from './components/TicketingPage';
import { useLanguage, Lang } from './context/LanguageContext';

type Page = 'home' | 'pilgrimage' | 'ticketing' | 'visas' | 'tools';

const ServiceCard = ({ icon, title, description, tags, delay, onClick }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onClick={onClick}
      className="group bg-navy/80 backdrop-blur-md p-8 rounded-2xl border border-navy/50 shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-2 hover:scale-[1.02] hover:border-gold/50 transition-all duration-500 flex flex-col h-full cursor-pointer"
    >
      <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-gold group-hover:text-navy transition-colors duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-headline font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300 font-body text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag: string, i: number) => (
          <span key={i} className="px-2.5 py-1 bg-white/10 text-white text-[10px] uppercase tracking-widest font-bold rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setIsLangMenuOpen(false);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex flex-col overflow-x-hidden">
      {/* Master Header */}
      <header className="sticky top-0 w-full z-50 bg-navy text-white shadow-md">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <img src="/logo.png" alt="Darul Safar Logo" className="h-24 w-auto object-contain drop-shadow-md" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigateTo('home')} className={`font-headline tracking-tight font-bold text-lg transition-colors duration-300 ${currentPage === 'home' ? 'text-gold' : 'hover:text-gold'}`}>{t.nav.home}</button>
            <button onClick={() => navigateTo('pilgrimage')} className={`font-headline tracking-tight font-bold text-lg transition-colors duration-300 ${currentPage === 'pilgrimage' ? 'text-gold' : 'hover:text-gold'}`}>{t.nav.pilgrimage}</button>
            <button onClick={() => navigateTo('ticketing')} className={`font-headline tracking-tight font-bold text-lg transition-colors duration-300 ${currentPage === 'ticketing' ? 'text-gold' : 'hover:text-gold'}`}>{t.nav.ticketing}</button>
            <button onClick={() => navigateTo('visas')} className={`font-headline tracking-tight font-bold text-lg transition-colors duration-300 ${currentPage === 'visas' ? 'text-gold' : 'hover:text-gold'}`}>{t.nav.visas}</button>
            <button onClick={() => navigateTo('tools')} className={`font-headline tracking-tight font-bold text-lg transition-colors duration-300 ${currentPage === 'tools' ? 'text-gold' : 'hover:text-gold'}`}>{t.nav.tools}</button>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
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
                    className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-xl border border-outline-variant/20 overflow-hidden z-[60]"
                  >
                    <button onClick={() => handleLangChange('en')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-surface-container-high transition-colors text-navy">
                      <span>English</span>
                      <span className="text-xs text-gold font-bold">EN</span>
                    </button>
                    <button onClick={() => handleLangChange('am')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-surface-container-high transition-colors text-navy border-t border-outline-variant/10">
                      <span>አማርኛ</span>
                      <span className="text-xs text-gold font-bold">AM</span>
                    </button>
                    <button onClick={() => handleLangChange('ar')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-surface-container-high transition-colors text-navy border-t border-outline-variant/10">
                      <span>العربية</span>
                      <span className="text-xs text-gold font-bold">AR</span>
                    </button>
                    <button onClick={() => handleLangChange('om')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-surface-container-high transition-colors text-navy border-t border-outline-variant/10">
                      <span>Afaan Oromoo</span>
                      <span className="text-xs text-gold font-bold">OM</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="bg-gold text-navy px-6 py-2 rounded-full font-headline font-bold hover:scale-105 active:scale-95 transition-all shadow-md">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-navy border-t border-white/10 px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => navigateTo('home')} className={`text-left font-headline font-bold text-lg ${currentPage === 'home' ? 'text-gold' : 'text-white hover:text-gold'}`}>{t.nav.home}</button>
              <button onClick={() => navigateTo('pilgrimage')} className={`text-left font-headline font-bold text-lg ${currentPage === 'pilgrimage' ? 'text-gold' : 'text-white hover:text-gold'}`}>{t.nav.pilgrimage}</button>
              <button onClick={() => navigateTo('ticketing')} className={`text-left font-headline font-bold text-lg ${currentPage === 'ticketing' ? 'text-gold' : 'text-white hover:text-gold'}`}>{t.nav.ticketing}</button>
              <button onClick={() => navigateTo('visas')} className={`text-left font-headline font-bold text-lg ${currentPage === 'visas' ? 'text-gold' : 'text-white hover:text-gold'}`}>{t.nav.visas}</button>
              <button onClick={() => navigateTo('tools')} className={`text-left font-headline font-bold text-lg ${currentPage === 'tools' ? 'text-gold' : 'text-white hover:text-gold'}`}>{t.nav.tools}</button>
            </nav>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <div className="flex gap-2">
                <button onClick={() => handleLangChange('en')} className={`px-3 py-1 rounded text-sm font-bold border ${lang === 'en' ? 'border-gold text-gold' : 'border-white/20 text-white'}`}>EN</button>
                <button onClick={() => handleLangChange('am')} className={`px-3 py-1 rounded text-sm font-bold border ${lang === 'am' ? 'border-gold text-gold' : 'border-white/20 text-white'}`}>AM</button>
                <button onClick={() => handleLangChange('ar')} className={`px-3 py-1 rounded text-sm font-bold border ${lang === 'ar' ? 'border-gold text-gold' : 'border-white/20 text-white'}`}>AR</button>
                <button onClick={() => handleLangChange('om')} className={`px-3 py-1 rounded text-sm font-bold border ${lang === 'om' ? 'border-gold text-gold' : 'border-white/20 text-white'}`}>OM</button>
              </div>
              <button className="bg-gold text-navy px-6 py-3 rounded-full font-headline font-bold w-full text-center">
                Book Now
              </button>
            </div>
          </div>
        )}
      </header>


      {/* Main Content Area */}
      {currentPage === 'home' ? (
        <main className="flex-grow w-full flex flex-col items-center justify-start">
          {/* Hero Section */}
          <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-8 mb-12">
            <section className="w-full py-20 md:py-32 flex flex-col items-center text-center overflow-hidden bg-white/60 backdrop-blur-md border border-white/50 hover:border-gold/50 transition-colors duration-500 rounded-3xl shadow-xl relative px-4">
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 border border-gold text-gold font-label text-xs tracking-[0.2em] rounded-full uppercase font-bold">
                {t.hero.tag}
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold text-navy leading-tight tracking-tighter mb-6 max-w-5xl flex flex-wrap justify-center">
              {/* Staggered text animation */}
              {t.hero.headline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`inline-block mr-3 md:mr-4 ${i === 1 ? 'text-gold' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-on-surface-variant font-body leading-relaxed max-w-2xl mb-10"
            >
              {t.hero.subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <motion.button 
                onClick={() => navigateTo('pilgrimage')}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="px-8 py-4 bg-navy text-white font-headline font-bold rounded-xl hover:bg-gold hover:text-navy hover:scale-105 active:scale-95 transition-all shadow-lg w-full sm:w-auto"
              >
                {t.hero.bookUmrah}
              </motion.button>
              <motion.button 
                onClick={() => navigateTo('ticketing')}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-navy/10 text-navy font-headline font-bold rounded-xl hover:border-gold hover:text-gold hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-sm w-full sm:w-auto"
              >
                {t.hero.globalTicketing}
              </motion.button>
            </motion.div>
            </section>
          </div>

          {/* Service Pillars Grid */}
          <section className="w-full bg-surface-container-low py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center md:text-left"
              >
                <h2 className="text-4xl md:text-5xl font-headline font-black text-navy mb-4">World-Class Solutions</h2>
                <div className="w-24 h-1 bg-gold mx-auto md:mx-0"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div onClick={() => navigateTo('pilgrimage')} className="cursor-pointer">
                  <ServiceCard 
                    icon={<Moon className="w-8 h-8" />}
                    title="Religious Pilgrimage"
                    description="Premium Umrah, Hajj, and Ziyarah Tours to the holy cities with expert guidance."
                    tags={["Umrah", "Hajj", "Ziyarah"]}
                    delay={0.1}
                  />
                </div>
                {/* Card 2 */}
                <div onClick={() => navigateTo('ticketing')} className="cursor-pointer">
                  <ServiceCard 
                    icon={<Plane className="w-8 h-8" />}
                    title="Global Air Ticketing"
                    description="Seamless flight arrangements through our elite airline network. Best rates guaranteed."
                    tags={["Ethiopian", "Qatar", "Saudia", "Emirates"]}
                    delay={0.2}
                  />
                </div>
                {/* Card 3 */}
                <div onClick={() => navigateTo('visas')} className="cursor-pointer">
                  <ServiceCard 
                    icon={<FileText className="w-8 h-8" />}
                    title="Visa & Document Services"
                    description="Expert processing for work, tourist, medical, and education permits globally."
                    tags={["Work", "Tourist", "Medical", "Education"]}
                    delay={0.3}
                  />
                </div>
                {/* Card 4 */}
                <div onClick={() => navigateTo('tools')} className="cursor-pointer">
                  <ServiceCard 
                    icon={<Briefcase className="w-8 h-8" />}
                    title="Specialized Travel"
                    description="Advanced logistics for enterprise-scale travel and bespoke vacation planning."
                    tags={["B2B Corporate", "C2C Vacation"]}
                    delay={0.4}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : currentPage === 'pilgrimage' ? (
        <main className="flex-grow w-full">
          <PilgrimagePage />
        </main>
      ) : currentPage === 'ticketing' ? (
        <main className="flex-grow w-full">
          <TicketingPage />
        </main>
      ) : currentPage === 'visas' ? (
        <main className="flex-grow w-full">
          <VisaPage />
        </main>
      ) : (
        <main className="flex-grow w-full">
          <ToolsPage />
        </main>
      )}

      {/* Master Footer */}
      <footer className="bg-navy text-white w-full py-12 px-4 md:px-8 border-t-4 border-gold">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Location */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-headline font-black text-2xl tracking-tighter text-white">Darul Safar</span>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              Connecting horizons and facilitating global trading for the modern Ethiopian traveler.
            </p>
            <div className="pt-4">
              <h4 className="font-headline font-bold text-gold uppercase text-xs tracking-widest mb-2">Headquarters</h4>
              <p className="font-body text-sm text-slate-300">
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-gold uppercase text-xs tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('home')} className="font-body text-sm text-slate-300 hover:text-gold transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('pilgrimage')} className="font-body text-sm text-slate-300 hover:text-gold transition-colors">Pilgrimage Services</button></li>
              <li><button onClick={() => navigateTo('visas')} className="font-body text-sm text-slate-300 hover:text-gold transition-colors">Visa Processing</button></li>
              <li><button onClick={() => navigateTo('tools')} className="font-body text-sm text-slate-300 hover:text-gold transition-colors">Trading Tools</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-gold uppercase text-xs tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="font-body text-sm text-slate-300 hover:text-gold transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="font-body text-sm text-slate-300 hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="font-headline font-bold text-gold uppercase text-xs tracking-widest mb-4">Stay Connected</h4>
            <p className="font-body text-sm text-slate-300 mb-4">
              Join our newsletter for the latest travel updates and trading tools.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-gold text-navy rounded-lg hover:bg-white transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body text-sm text-slate-400">
            © {new Date().getFullYear()} Darul Safar Travel & Trading. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
