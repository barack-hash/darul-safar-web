"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Globe,
  ChevronDown,
  Send,
  Menu,
  X,
  AlertCircle,
  CheckCircle,
  Moon,
  Plane,
  FileText,
  Sparkles
} from 'lucide-react';
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
  const [mobileBookFabVisible, setMobileBookFabVisible] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setMobileBookFabVisible(y > 120);
    };
    handleScroll();
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
    `relative inline-block pb-1 font-headline text-sm font-bold tracking-tight transition-colors duration-300 ${
      currentPage === page
        ? 'text-emerald-700 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-emerald-600'
        : 'text-slate-500 hover:text-slate-950'
    }`;

  const mobileNavLinkClass = (page: PageKey) =>
    `block rounded-2xl px-4 py-2 text-left font-headline text-sm font-semibold transition-colors ${
      currentPage === page
        ? 'bg-emerald-50 text-emerald-800'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
    }`;

  const mobileQuickIconBtnClass = (page: PageKey) =>
    `flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
      currentPage === page
        ? 'bg-emerald-700 text-white shadow-[0_10px_24px_rgba(4,120,87,0.22)]'
        : 'text-slate-500 hover:bg-white/80 hover:text-slate-950'
    }`;

  const mobileQuickCardClass = (page: PageKey) =>
    `flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-left shadow-sm transition hover:bg-emerald-50/60 active:scale-[0.98] ${
      currentPage === page
        ? 'border-emerald-100 bg-emerald-50 text-emerald-800'
        : 'border-white/70 bg-white/65 text-slate-800'
    }`;

  const langAbbrevClass = (code: Lang) =>
    `text-xs font-bold ${lang === code ? 'text-emerald-700' : 'text-slate-600'}`;

  const headerShellClass = scrolled
    ? 'top-4 border-white/70 bg-white/70 shadow-[0_18px_55px_rgba(15,23,42,0.08)]'
    : 'top-3 border-white/55 bg-white/55 shadow-[0_14px_40px_rgba(15,23,42,0.05)]';

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#F5F5F7] font-body text-gray-900">
      <header
        className={`fixed z-50 w-[94%] max-w-7xl rounded-full border backdrop-blur-2xl transition-all duration-500 ${headerShellClass} left-1/2 -translate-x-1/2 px-4 py-3 md:px-6`}
      >
        <div className="relative flex min-w-0 items-center justify-between gap-2">
          <button
            type="button"
            className="min-w-0 shrink-0 cursor-pointer whitespace-nowrap text-left text-xl font-black tracking-[-0.04em] sm:text-2xl md:text-2xl"
            onClick={() => navigateTo('home')}
          >
            <span className="text-slate-950">DARUL</span>
            <span className="text-emerald-700">SAFAR</span>
          </button>

          <nav className="hidden items-center space-x-8 md:flex">
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

          <div className="hidden items-center gap-5 md:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 rounded-full border border-white/70 bg-white/55 px-3 py-1.5 text-slate-600 backdrop-blur-xl transition-colors hover:bg-white/80 hover:text-slate-950"
              >
                <Globe className="h-5 w-5 shrink-0" aria-hidden />
                <span className="font-label text-sm font-bold">{lang.toUpperCase()}</span>
                <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => handleLangChange('en')}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-emerald-50/50"
                    >
                      <span>English</span>
                      <span className={langAbbrevClass('en')}>EN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLangChange('am')}
                      className="flex w-full items-center justify-between border-t border-white/60 px-4 py-3 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-emerald-50/50"
                    >
                      <span>አማርኛ</span>
                      <span className={langAbbrevClass('am')}>AM</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLangChange('ar')}
                      className="flex w-full items-center justify-between border-t border-white/60 px-4 py-3 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-emerald-50/50"
                    >
                      <span>العربية</span>
                      <span className={langAbbrevClass('ar')}>AR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLangChange('om')}
                      className="flex w-full items-center justify-between border-t border-white/60 px-4 py-3 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-emerald-50/50"
                    >
                      <span>Afaan Oromoo</span>
                      <span className={langAbbrevClass('om')}>OM</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={handleHeaderBookNowClick}
              className="rounded-full bg-slate-950 px-6 py-2 font-headline font-bold text-white shadow-[0_16px_36px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-emerald-800 active:scale-95"
            >
              {t.hero.cta}
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <div className="flex items-center gap-1 rounded-full border border-white/70 bg-white/60 p-1 shadow-[0_12px_35px_rgba(15,23,42,0.07)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => navigateTo('pilgrimage')}
                className={mobileQuickIconBtnClass('pilgrimage')}
                aria-label="Pilgrimage"
              >
                <Moon className="h-4 w-4 shrink-0" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('ticketing')}
                className={mobileQuickIconBtnClass('ticketing')}
                aria-label="Ticketing"
              >
                <Plane className="h-4 w-4 shrink-0" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => navigateTo('visas')}
                className={mobileQuickIconBtnClass('visas')}
                aria-label="Visas"
              >
                <FileText className="h-4 w-4 shrink-0" aria-hidden />
              </button>
            </div>

            <button
              type="button"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/70 shadow-[0_12px_30px_rgba(15,23,42,0.14)] backdrop-blur-xl transition active:scale-95 ${
                isMobileMenuOpen
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                  : 'bg-slate-950 text-white hover:bg-emerald-800'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-3 right-3 top-[calc(100%+0.75rem)] z-[55] max-h-[calc(100vh-7rem)] overflow-y-auto overflow-x-hidden rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-[0_26px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
            >
              <div className="mb-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/80">Quick access</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => navigateTo('pilgrimage')}
                    className={mobileQuickCardClass('pilgrimage')}
                  >
                    <Moon className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="min-w-0 font-headline text-sm font-bold leading-tight">{t.nav.pilgrimage}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('ticketing')}
                    className={mobileQuickCardClass('ticketing')}
                  >
                    <Plane className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="min-w-0 font-headline text-sm font-bold leading-tight">{t.nav.ticketing}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('visas')}
                    className={mobileQuickCardClass('visas')}
                  >
                    <FileText className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="min-w-0 font-headline text-sm font-bold leading-tight">{t.nav.visas}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('tools')}
                    className={mobileQuickCardClass('tools')}
                  >
                    <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
                    <span className="min-w-0 font-headline text-sm font-bold leading-tight">{t.nav.tools}</span>
                  </button>
                </div>
              </div>

              <nav className="flex flex-col gap-0.5 border-t border-white/50 pt-3">
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
              <div className="mt-4 flex flex-col gap-4 border-t border-white/50 pt-4">
                <div className="flex flex-wrap gap-1 rounded-full bg-slate-100/70 p-1">
                  <button
                    type="button"
                    onClick={() => handleLangChange('en')}
                    className={`rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
                      lang === 'en'
                        ? 'border-white bg-white text-emerald-700 shadow-sm'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLangChange('am')}
                    className={`rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
                      lang === 'am'
                        ? 'border-white bg-white text-emerald-700 shadow-sm'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLangChange('ar')}
                    className={`rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
                      lang === 'ar'
                        ? 'border-white bg-white text-emerald-700 shadow-sm'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    AR
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLangChange('om')}
                    className={`rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
                      lang === 'om'
                        ? 'border-white bg-white text-emerald-700 shadow-sm'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    OM
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleHeaderBookNowClick}
                  className="w-full rounded-[1.35rem] bg-slate-950 py-3 text-center font-headline font-bold text-white shadow-[0_16px_36px_rgba(15,23,42,0.16)] transition hover:bg-emerald-800 active:scale-95"
                >
                  {t.hero.cta}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="w-full flex-grow pt-20 md:pt-32">{children}</main>

      <footer className="relative w-full px-4 pb-6 pt-10 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/70 bg-slate-950 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.18)] md:p-12">
          <div
            className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-500/[0.18] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-sky-400/[0.12] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-amber-400/[0.10] blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="space-y-4 md:col-span-1">
              <span className="font-black tracking-[-0.04em] text-2xl">
                <span className="text-white">DARUL</span>
                <span className="text-emerald-300">SAFAR</span>
              </span>
              <p className="font-body text-sm leading-relaxed text-white/65">{t.footer.brandDesc}</p>
              <div className="pt-4">
                <h4 className="mb-2 font-headline text-xs font-bold uppercase tracking-widest text-white">
                  {t.footer.hq}
                </h4>
                <p className="font-body text-sm text-white/65">{t.footer.location}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="mb-4 font-headline text-xs font-bold uppercase tracking-widest text-white">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="font-body text-sm text-white/65 transition-colors hover:text-emerald-200">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href="/pilgrimage" className="font-body text-sm text-white/65 transition-colors hover:text-emerald-200">
                    {t.nav.pilgrimage}
                  </Link>
                </li>
                <li>
                  <Link href="/visas" className="font-body text-sm text-white/65 transition-colors hover:text-emerald-200">
                    {t.nav.visas}
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="font-body text-sm text-white/65 transition-colors hover:text-emerald-200">
                    {t.nav.tools}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="mb-4 font-headline text-xs font-bold uppercase tracking-widest text-white">
                {t.footer.legal}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-body text-sm text-white/65 transition-colors hover:text-emerald-200">
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-white/65 transition-colors hover:text-emerald-200">
                    {t.footer.privacy}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4 md:col-span-1">
              <h4 className="mb-4 font-headline text-xs font-bold uppercase tracking-widest text-white">
                {t.footer.stayConnected}
              </h4>
              <p className="mb-4 font-body text-sm text-white/65">{t.footer.newsletterDesc}</p>
              <form className="relative space-y-3" onSubmit={handleNewsletterSubmit}>
                {newsletterState !== 'idle' && newsletterState !== 'submitting' && newsletterMessage && (
                  <div
                    className={`flex items-start gap-2 rounded-xl border px-3 py-2 font-body text-xs ${
                      newsletterState === 'success'
                        ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100'
                        : 'border-red-300/30 bg-red-400/10 text-red-100'
                    }`}
                  >
                    {newsletterState === 'success' ? (
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    )}
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
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 pr-14 text-sm text-white placeholder:text-white/35 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <button
                    type="submit"
                    disabled={newsletterState === 'submitting'}
                    className="absolute bottom-1.5 right-1.5 top-1.5 flex items-center justify-center rounded-lg bg-white px-3 text-slate-950 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="relative z-10 mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <span className="font-body text-sm text-white/45">{t.footer.copyright}</span>
          </div>
        </div>
      </footer>

      <BookNowModal isOpen={isBookNowModalOpen} onClose={closeBookNowModal} initialService={bookNowInitialService} />

      <motion.button
        type="button"
        onClick={handleHeaderBookNowClick}
        initial={false}
        animate={{
          opacity: mobileBookFabVisible ? 1 : 0,
          y: mobileBookFabVisible ? 0 : 10
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed bottom-4 right-4 z-40 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2.5 font-headline text-xs font-bold text-white shadow-[0_12px_34px_rgba(15,23,42,0.22)] backdrop-blur-md transition hover:bg-emerald-800 active:scale-95 md:hidden ${mobileBookFabVisible ? '' : 'pointer-events-none'}`}
      >
        {t.hero.cta}
      </motion.button>
    </div>
  );
}
