"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Globe, ChevronDown, Send, Menu, X, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BookNowModal, { type BookNowService } from '@/components/BookNowModal';
import { useLanguage, type Lang } from '@/context/LanguageContext';

type PageKey = 'home' | 'pilgrimage' | 'ticketing' | 'visas' | 'tools';

const pageToPath: Record<PageKey, string> = {
  home: '/',
  pilgrimage: '/pilgrimage',
  ticketing: '/ticketing',
  visas: '/visas',
  tools: '/tools'
};

const pathToPage = (pathname: string): PageKey => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/pilgrimage') return 'pilgrimage';
  if (normalized === '/ticketing') return 'ticketing';
  if (normalized === '/visas' || normalized === '/visa') return 'visas';
  if (normalized === '/tools') return 'tools';
  return 'home';
};

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [bookNowInitialService, setBookNowInitialService] = useState<BookNowService>('Flight');
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = pathToPage(pathname || '/');
  const [scrolled, setScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setIsLangMenuOpen(false);
  };

  const navigateTo = (page: PageKey) => {
    setIsMobileMenuOpen(false);
    router.push(pageToPath[page]);
  };

  const openBookNowModal = (service: BookNowService) => {
    setIsMobileMenuOpen(false);
    setBookNowInitialService(service);
    setIsBookNowModalOpen(true);
  };

  const handleHeaderBookNowClick = () => {
    const normalized = (pathname || '/').replace(/\/+$/, '') || '/';
    if (normalized === '/visas' || normalized === '/visa') {
      openBookNowModal('Visa');
    } else if (normalized === '/pilgrimage') {
      openBookNowModal('Pilgrimage');
    } else {
      openBookNowModal('Flight');
    }
  };

  const closeBookNowModal = useCallback(() => {
    setIsBookNowModalOpen(false);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    if (searchParams.get('book') === 'flight') {
      setBookNowInitialService('Flight');
      setIsBookNowModalOpen(true);
      router.replace('/', { scroll: false });
    }
  }, [searchParams, router]);

  const newsletterStatusText = {
    en: {
      invalid: 'Please enter a valid email address.',
      success: 'Thanks for subscribing. We will keep you updated.',
      error: 'Could not complete subscription. Please try again.'
    },
    ar: {
      invalid: 'يرجى إدخال بريد إلكتروني صالح.',
      success: 'شكراً لاشتراكك. سنبقيك على اطلاع.',
      error: 'تعذر إكمال الاشتراك. يرجى المحاولة مرة أخرى.'
    },
    am: {
      invalid: 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ።',
      success: 'ስለተመዘገቡ እናመሰግናለን። ዜናዎችን እናዘምናለን።',
      error: 'ምዝገባውን ማጠናቀቅ አልተቻለም። እባክዎ ዳግም ይሞክሩ።'
    },
    om: {
      invalid: 'Maaloo email sirrii galchi.',
      success: 'Galatoomi subscribe goote. Odeeffannoo siif ni erra.',
      error: 'Galmeen xumuramuu hin dandeenye. Maaloo irra deebi aa yaali.'
    }
  }[lang];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterMessage('');

    const normalizedEmail = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setNewsletterState('error');
      setNewsletterMessage(newsletterStatusText.invalid);
      return;
    }

    setNewsletterState('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setNewsletterState('success');
      setNewsletterMessage(newsletterStatusText.success);
      setNewsletterEmail('');
    } catch {
      setNewsletterState('error');
      setNewsletterMessage(newsletterStatusText.error);
    }
  };

  const navLinkClass = (page: PageKey) =>
    `font-headline tracking-tight font-bold text-sm transition-colors duration-300 ${
      currentPage === page ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
    }`;

  const mobileNavLinkClass = (page: PageKey) =>
    `text-left font-headline font-bold text-lg ${
      currentPage === page ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 font-body flex flex-col overflow-x-hidden">
      <header
        className={`fixed z-50 transition-all duration-500 ${
          scrolled
            ? 'top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full bg-white/70 backdrop-blur-xl shadow-sm py-3 px-6 border border-white/40'
            : 'top-0 left-0 w-full bg-white/80 backdrop-blur-md py-5 px-4 md:px-8 border-b border-gray-200/50'
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button type="button" className="text-2xl font-headline font-extrabold tracking-widest cursor-pointer" onClick={() => navigateTo('home')}>
            <span className="text-gray-900">DARUL</span>
            <span className="text-blue-600">SAFAR</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href={pageToPath.home} className={navLinkClass('home')}>
              {t.nav.home}
            </Link>
            <Link href={pageToPath.pilgrimage} className={navLinkClass('pilgrimage')}>
              {t.nav.pilgrimage}
            </Link>
            <Link href={pageToPath.ticketing} className={navLinkClass('ticketing')}>
              {t.nav.ticketing}
            </Link>
            <Link href={pageToPath.visas} className={navLinkClass('visas')}>
              {t.nav.visas}
            </Link>
            <Link href={pageToPath.tools} className={navLinkClass('tools')}>
              {t.nav.tools}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                type="button"
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
                    <button type="button" onClick={() => handleLangChange('en')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900">
                      <span>English</span>
                      <span className="text-xs text-blue-600 font-bold">EN</span>
                    </button>
                    <button type="button" onClick={() => handleLangChange('am')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900 border-t border-gray-100">
                      <span>አማርኛ</span>
                      <span className="text-xs text-blue-600 font-bold">AM</span>
                    </button>
                    <button type="button" onClick={() => handleLangChange('ar')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900 border-t border-gray-100">
                      <span>العربية</span>
                      <span className="text-xs text-blue-600 font-bold">AR</span>
                    </button>
                    <button type="button" onClick={() => handleLangChange('om')} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors text-gray-900 border-t border-gray-100">
                      <span>Afaan Oromoo</span>
                      <span className="text-xs text-blue-600 font-bold">OM</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button type="button" onClick={handleHeaderBookNowClick} className="bg-emerald-700 text-white px-6 py-2 rounded-full font-headline font-bold hover:bg-emerald-800 hover:scale-105 active:scale-95 transition-all shadow-sm shadow-emerald-700/20">
              {t.hero.cta}
            </button>
          </div>

          <button type="button" className="md:hidden text-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-4 space-y-4 rounded-b-3xl absolute top-full left-0 w-full shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link href={pageToPath.home} className={mobileNavLinkClass('home')} onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.home}
              </Link>
              <Link href={pageToPath.pilgrimage} className={mobileNavLinkClass('pilgrimage')} onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.pilgrimage}
              </Link>
              <Link href={pageToPath.ticketing} className={mobileNavLinkClass('ticketing')} onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.ticketing}
              </Link>
              <Link href={pageToPath.visas} className={mobileNavLinkClass('visas')} onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.visas}
              </Link>
              <Link href={pageToPath.tools} className={mobileNavLinkClass('tools')} onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.tools}
              </Link>
            </nav>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              <div className="flex gap-2">
                <button type="button" onClick={() => handleLangChange('en')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'en' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>
                  EN
                </button>
                <button type="button" onClick={() => handleLangChange('am')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'am' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>
                  AM
                </button>
                <button type="button" onClick={() => handleLangChange('ar')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'ar' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>
                  AR
                </button>
                <button type="button" onClick={() => handleLangChange('om')} className={`px-3 py-1 rounded-full text-sm font-bold border ${lang === 'om' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>
                  OM
                </button>
              </div>
              <button type="button" onClick={handleHeaderBookNowClick} className="bg-emerald-700 text-white px-6 py-3 rounded-full font-headline font-bold w-full text-center shadow-sm shadow-emerald-700/20 hover:bg-emerald-800 active:scale-95 transition-all duration-200">
                {t.hero.cta}
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="pt-24 md:pt-32 flex-grow w-full">{children}</div>

      <footer className="bg-white border-t border-gray-200 text-gray-600 w-full py-16 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 md:col-span-1">
            <span className="font-headline font-black text-2xl tracking-tighter text-gray-900">Darul Safar</span>
            <p className="font-body text-sm text-gray-500 leading-relaxed">{t.footer.brandDesc}</p>
            <div className="pt-4">
              <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">{t.footer.hq}</h4>
              <p className="font-body text-sm text-gray-500">{t.footer.location}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/pilgrimage" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t.nav.pilgrimage}
                </Link>
              </li>
              <li>
                <Link href="/visas" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t.nav.visas}
                </Link>
              </li>
              <li>
                <Link href="/tools" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t.nav.tools}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">{t.footer.legal}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4 md:col-span-1">
            <h4 className="font-headline font-bold text-gray-900 uppercase text-xs tracking-widest mb-4">{t.footer.stayConnected}</h4>
            <p className="font-body text-sm text-gray-500 mb-4">{t.footer.newsletterDesc}</p>
            <form className="relative space-y-3" onSubmit={handleNewsletterSubmit}>
              {newsletterState !== 'idle' && newsletterState !== 'submitting' && newsletterMessage && (
                <div className={`rounded-xl border px-3 py-2 text-xs font-body flex items-start gap-2 ${newsletterState === 'success' ? 'border-blue-200 bg-blue-50/80 text-blue-700' : 'border-red-200 bg-red-50/80 text-red-700'}`}>
                  {newsletterState === 'success' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                  <span>{newsletterMessage}</span>
                </div>
              )}
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterState !== 'idle') {
                      setNewsletterState('idle');
                      setNewsletterMessage('');
                    }
                  }}
                  placeholder={t.footer.emailPlaceholder}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={newsletterState === 'submitting'}
                  className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body text-sm text-gray-400">{t.footer.copyright}</span>
        </div>
      </footer>

      <BookNowModal isOpen={isBookNowModalOpen} onClose={closeBookNowModal} initialService={bookNowInitialService} />

      <motion.button
        type="button"
        onClick={handleHeaderBookNowClick}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed bottom-5 right-5 z-40 bg-emerald-700 text-white px-5 py-3 rounded-full shadow-lg shadow-emerald-700/30 font-headline font-bold text-sm active:scale-95 transition-all"
      >
        {t.hero.cta}
      </motion.button>
    </div>
  );
}
