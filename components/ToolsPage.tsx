"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, animate } from 'motion/react';
import {
  RefreshCw,
  ArrowRightLeft,
  Clock,
  Plus,
  MapPin,
  Activity,
  Plane,
  Building,
  Utensils,
  FileText,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import FlightTrackerBar from './FlightTrackerBar';

const CURRENCIES = ["USD", "ETB", "SAR", "AED", "EUR"];

function AnimatedNumber({ value }: { value: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(prevValue.current, value, {
        duration: 0.5,
        ease: "easeOut",
        onUpdate(v) {
          node.textContent = v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
      });
      prevValue.current = value;
      return () => controls.stop();
    }
  }, [value]);

  return <span ref={nodeRef}>{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
}

const selectClass =
  'rounded-2xl border-0 bg-slate-100/80 py-2 pl-4 pr-8 font-headline text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 appearance-none cursor-pointer hover:bg-slate-100 transition-colors';

export default function ToolsPage() {
  const { t } = useLanguage();
  const pageT = t.toolsPage;
  const converterRef = useRef<HTMLElement | null>(null);
  const [heroSrc, setHeroSrc] = useState('/services/TOOLS11.png');

  const scrollToConverter = () => {
    converterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");

  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setRates(data.rates);

        const date = new Date(data.time_last_updated * 1000);
        setLastUpdated(
          date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString()
        );
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleSwap = () => {
    setIsSwapping(true);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const calculateConversion = (amt: number, from: string, to: string) => {
    if (!rates) return 0;
    const rateFrom = rates[from];
    const rateTo = rates[to];
    if (!rateFrom || !rateTo) return 0;

    const inUSD = amt / rateFrom;
    return inUSD * rateTo;
  };

  const numericAmount = parseFloat(amount) || 0;
  const result = calculateConversion(numericAmount, fromCurrency, toCurrency);

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (date: Date, timeZone: string) => {
    return date.toLocaleDateString('en-US', { timeZone, weekday: 'short', month: 'short', day: 'numeric' });
  };

  const clockCities = [
    { id: 'addisAbaba', tz: 'Africa/Addis_Ababa', name: pageT.clock.addisAbaba },
    { id: 'riyadh', tz: 'Asia/Riyadh', name: pageT.clock.riyadh },
    { id: 'dubai', tz: 'Asia/Dubai', name: pageT.clock.dubai }
  ];

  const [itinerary, setItinerary] = useState([{ id: 1, activity: '', location: '' }]);
  const [expandedDayId, setExpandedDayId] = useState<number | null>(1);

  const addDay = () => {
    const newId = itinerary.length + 1;
    setItinerary([...itinerary, { id: newId, activity: '', location: '' }]);
    setExpandedDayId(newId);
  };

  const updateDay = (id: number, field: 'activity' | 'location', value: string) => {
    setItinerary(itinerary.map((day) => (day.id === id ? { ...day, [field]: value } : day)));
  };

  const [budgetCurrency, setBudgetCurrency] = useState("USD");
  const [budget, setBudget] = useState({
    flights: 0,
    accommodation: 0,
    food: 0,
    visas: 0
  });

  const updateBudget = (field: keyof typeof budget, value: string) => {
    setBudget({ ...budget, [field]: parseFloat(value) || 0 });
  };

  const totalBudgetInBase = budget.flights + budget.accommodation + budget.food + budget.visas;
  const totalBudgetInETB = calculateConversion(totalBudgetInBase, budgetCurrency, "ETB");

  const getPercentage = (value: number) => {
    if (totalBudgetInBase === 0) return 0;
    return (value / totalBudgetInBase) * 100;
  };

  const handleClearAll = () => {
    setItinerary([{ id: 1, activity: '', location: '' }]);
    setExpandedDayId(1);
    setBudget({ flights: 0, accommodation: 0, food: 0, visas: 0 });
  };

  const inputCardClass =
    'rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition-shadow focus-within:ring-2 focus-within:ring-emerald-500/30';

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
          <div className="relative isolate min-h-[500px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 [clip-path:inset(0_round_2rem)] [contain:paint] md:min-h-[620px] md:rounded-[2.65rem] md:[clip-path:inset(0_round_2.65rem)] lg:min-h-[680px]">
            <Image
              src={heroSrc}
              alt="Darul Safar travel tools dashboard"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              onError={() => setHeroSrc('/hero-main.png')}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/10 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-slate-950/35 via-slate-950/10 to-transparent" />

            <div className="absolute left-5 top-6 z-20 md:left-10 md:top-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-2xl">
                <Clock className="h-4 w-4 shrink-0 text-white" aria-hidden />
                <span>Smart travel tools</span>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-52 md:px-10 md:pb-44 lg:px-12 lg:pb-44">
              <div className="max-w-4xl text-left">
                <h1 className="font-serif text-[2.65rem] font-black leading-[0.95] tracking-[-0.05em] text-white drop-shadow-[0_14px_34px_rgba(0,0,0,0.35)] md:text-7xl lg:text-[5.2rem]">
                  Travel &amp; Trading Tools
                </h1>
                <p className="mt-4 max-w-2xl font-body text-sm leading-6 text-white/88 md:mt-6 md:text-xl md:leading-9">
                  Your digital concierge. Access real-time currency exchange rates, live flight tracking, and smart budget
                  planning designed for the global traveler.
                </p>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 z-30 rounded-[1.6rem] border border-white/30 bg-white/20 p-2 shadow-[0_24px_75px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:bottom-4 md:left-4 md:right-4 md:rounded-[2rem] md:p-3">
              <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-center md:gap-3">
                <div className="rounded-[1.15rem] bg-white/[0.86] px-4 py-3 backdrop-blur-xl md:rounded-[1.45rem] md:px-5 md:py-4">
                  <p className="max-w-2xl text-center text-xs leading-5 text-slate-800 md:text-left md:text-base md:leading-relaxed">
                    Convert currencies, compare city times, plan budgets, and track flights from one calm dashboard.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:flex-nowrap md:gap-3">
                  <button
                    type="button"
                    onClick={scrollToConverter}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-[1.15rem] bg-emerald-700 px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(4,120,87,0.28)] transition hover:bg-emerald-800 active:scale-[0.98] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6"
                  >
                    {pageT.title}
                  </button>
                  <span className="inline-flex min-h-12 w-full items-center justify-center whitespace-normal rounded-[1.15rem] bg-white px-5 text-center text-sm font-black leading-5 text-slate-900 shadow-[0_14px_32px_rgba(15,23,42,0.10)] md:min-h-14 md:w-auto md:rounded-[1.45rem] md:px-6">
                    Currency • Time • Planner • Flights
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Currency converter */}
      <section
        ref={converterRef}
        id="currency-converter"
        className="relative z-20 mx-auto mb-24 w-full max-w-5xl px-4 md:mb-32 md:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[3rem] border border-white/70 bg-white/55 p-6 shadow-[0_35px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl [clip-path:inset(0_round_3rem)] [contain:paint] md:p-10 lg:p-12"
        >
          <div
            className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-400/12 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-sky-300/18 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mb-8 text-center md:mb-10">
            <span className="mb-4 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
              {pageT.title}
            </span>
            <h2 className="font-serif text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
              {pageT.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed text-slate-600 md:text-lg">
              {pageT.subtitle}
            </p>
          </div>

          {isLoading ? (
            <div className="relative z-10 flex flex-col items-center justify-center py-16">
              <RefreshCw className="mb-4 h-10 w-10 animate-spin text-emerald-700" aria-hidden />
              <p className="font-body text-slate-600">{pageT.loading}</p>
            </div>
          ) : error ? (
            <div className="relative z-10 flex flex-col items-center justify-center py-16">
              <p className="font-body text-red-600">{pageT.error}</p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col gap-6">
              <div className={inputCardClass}>
                <label className="mb-2 block text-xs font-label font-bold uppercase tracking-widest text-emerald-800/80">
                  {pageT.from}
                </label>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent font-headline text-4xl font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none md:text-5xl"
                    placeholder="0.00"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className={selectClass}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative z-20 -my-10 flex justify-center">
                <motion.button
                  type="button"
                  onClick={handleSwap}
                  animate={{ rotate: isSwapping ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-emerald-800 hover:-translate-y-0.5"
                  aria-label="Swap currencies"
                >
                  <ArrowRightLeft className="h-6 w-6" />
                </motion.button>
              </div>

              <div className={inputCardClass}>
                <label className="mb-2 block text-xs font-label font-bold uppercase tracking-widest text-emerald-800/80">
                  {pageT.to}
                </label>
                <div className="flex items-center justify-between gap-4">
                  <div className="w-full overflow-hidden text-ellipsis font-headline text-4xl font-bold text-emerald-700 md:text-5xl">
                    <AnimatedNumber value={result} />
                  </div>
                  <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className={selectClass}>
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2 font-body text-xs text-slate-500">
                <Clock className="h-4 w-4 text-emerald-700/70" aria-hidden />
                <span>
                  {pageT.lastUpdated}: {lastUpdated}
                </span>
              </div>

              {rates && (
                <div className="mt-10 border-t border-slate-200/70 pt-10">
                  <h3 className="mb-6 text-center font-label text-xs font-bold uppercase tracking-[0.2em] text-emerald-800/90">
                    {pageT.commonPairs}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                    {[{ from: 'USD' }, { from: 'SAR' }, { from: 'AED' }].map((pair) => (
                      <motion.div
                        key={pair.from}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center gap-2 rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:bg-white"
                      >
                        <span className="font-headline text-lg font-bold text-slate-600">
                          1 {pair.from}
                        </span>
                        <span className="font-headline text-2xl font-black text-emerald-700">
                          {calculateConversion(1, pair.from, 'ETB').toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          ETB
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </section>

      {/* World clock */}
      <section className="mx-auto mb-24 w-full max-w-7xl px-4 md:mb-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10"
        >
          <div className="mb-8 text-center md:mb-10">
            <h2 className="font-serif text-3xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">
              {pageT.clock.title}
            </h2>
            <p className="mt-2 font-body text-slate-600">{pageT.clock.localTime}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {clockCities.map((city) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/65 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-1 md:p-8"
              >
                <div className="absolute right-6 top-6 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <h3 className="font-headline text-lg font-bold uppercase tracking-widest text-slate-600">
                  {city.name}
                </h3>
                <div className="mt-4 flex min-h-[4.5rem] items-baseline justify-center gap-1.5 font-headline font-light tracking-tighter text-slate-950">
                  {currentTime ? (
                    <>
                      <span className="text-5xl md:text-6xl">{formatTime(currentTime, city.tz).split(' ')[0]}</span>
                      <span className="text-2xl font-medium tracking-normal text-slate-500">
                        {formatTime(currentTime, city.tz).split(' ')[1]}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium tabular-nums text-4xl text-slate-300">--:--</span>
                  )}
                </div>
                <div className="mt-2 min-h-[1.25rem] font-body text-sm font-medium text-slate-500">
                  {currentTime ? formatDate(currentTime, city.tz) : '—'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trip planner + budget */}
      <section className="mx-auto mb-24 w-full max-w-7xl px-4 md:mb-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10"
        >
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <span className="mb-2 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">
                Trip planner
              </span>
              <h2 className="font-serif text-3xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">
                {pageT.planner.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 rounded-2xl border border-red-100 bg-white/70 px-4 py-2.5 font-headline text-sm font-bold text-red-600 shadow-sm transition hover:border-red-200 hover:bg-red-50/60"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              {pageT.planner.clearAll}
            </button>
          </div>

          <div className="flex flex-col gap-10">
            <div className="w-full rounded-[2.5rem] border border-white/75 bg-white/60 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8">
              <h3 className="mb-6 font-headline text-2xl font-bold text-slate-900">{pageT.planner.itinerary}</h3>
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {itinerary.map((day) => (
                  <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="z-10 mt-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 font-headline text-sm font-bold text-emerald-800 shadow-sm">
                      {day.id}
                    </div>
                    <motion.div
                      layout
                      onClick={() => setExpandedDayId(expandedDayId === day.id ? null : day.id)}
                      className={`flex-1 cursor-pointer overflow-hidden rounded-[2rem] border shadow-sm transition-all ${
                        expandedDayId === day.id
                          ? 'border-emerald-200 bg-white/80 p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]'
                          : 'border-white/80 bg-white/60 p-5 hover:border-emerald-100'
                      }`}
                    >
                      <motion.div layout className="mb-2 flex items-center justify-between">
                        <span className="font-headline font-bold text-slate-900">
                          {pageT.planner.day} {day.id}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedDayId === day.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden />
                        </motion.div>
                      </motion.div>
                      {expandedDayId === day.id ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.08 }}
                          className="mt-4 flex flex-col gap-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-start gap-2 text-slate-600 focus-within:text-emerald-700">
                            <Activity className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                            <textarea
                              placeholder={pageT.planner.activityDetails}
                              value={day.activity}
                              onChange={(e) => updateDay(day.id, 'activity', e.target.value)}
                              onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                              }}
                              className="min-h-[60px] w-full resize-none overflow-hidden border-b border-slate-200 bg-transparent font-body text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                            />
                          </div>
                          <div className="flex items-start gap-2 text-slate-600 focus-within:text-emerald-700">
                            <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                            <textarea
                              placeholder={pageT.planner.locationNotes}
                              value={day.location}
                              onChange={(e) => updateDay(day.id, 'location', e.target.value)}
                              onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                              }}
                              className="min-h-[60px] w-full resize-none overflow-hidden border-b border-slate-200 bg-transparent font-body text-slate-900 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <p className="truncate font-body text-sm text-slate-600">
                          {day.activity || <span className="italic text-slate-400">No activity planned...</span>}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <button
                type="button"
                onClick={addDay}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-200 py-4 font-headline font-bold text-emerald-700 transition hover:bg-emerald-50"
              >
                <Plus className="h-5 w-5" aria-hidden />
                {pageT.planner.addDay}
              </button>
            </div>

            <div className="mx-auto flex w-full max-w-2xl flex-col rounded-[2.5rem] border border-white/75 bg-white/60 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-headline text-2xl font-bold text-slate-900">{pageT.planner.budget}</h3>
                <select
                  value={budgetCurrency}
                  onChange={(e) => setBudgetCurrency(e.target.value)}
                  className="rounded-2xl border border-white/80 bg-slate-100/80 px-3 py-1.5 font-headline text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow space-y-6">
                {[
                  {
                    id: 'flights' as const,
                    label: pageT.planner.flights,
                    icon: <Plane className="h-5 w-5" />,
                    bar: 'bg-emerald-500/85',
                    iconBg: 'bg-emerald-600'
                  },
                  {
                    id: 'accommodation' as const,
                    label: pageT.planner.accommodation,
                    icon: <Building className="h-5 w-5" />,
                    bar: 'bg-slate-500/75',
                    iconBg: 'bg-slate-600'
                  },
                  {
                    id: 'food' as const,
                    label: pageT.planner.food,
                    icon: <Utensils className="h-5 w-5" />,
                    bar: 'bg-amber-500/80',
                    iconBg: 'bg-amber-600'
                  },
                  {
                    id: 'visas' as const,
                    label: pageT.planner.visas,
                    icon: <FileText className="h-5 w-5" />,
                    bar: 'bg-sky-500/75',
                    iconBg: 'bg-sky-600'
                  }
                ].map((item) => (
                  <div key={item.id} className="group">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-700">
                        <div className={`rounded-lg p-2 text-white shadow-sm ${item.iconBg}`}>{item.icon}</div>
                        <span className="font-headline font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm text-slate-500">{budgetCurrency}</span>
                        <input
                          type="number"
                          value={budget[item.id] || ''}
                          onChange={(e) => updateBudget(item.id, e.target.value)}
                          placeholder="0"
                          className="w-24 rounded-xl border border-white/80 bg-white/70 px-3 py-1.5 text-right font-headline font-bold text-slate-900 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
                        />
                      </div>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getPercentage(budget[item.id])}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${item.bar}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-slate-200/70 pt-8">
                <div className="mb-2 flex items-end justify-between">
                  <span className="font-headline text-sm font-bold uppercase tracking-widest text-slate-500">
                    {pageT.planner.totalBudget}
                  </span>
                  <div className="text-right">
                    <span className="font-headline text-3xl font-black text-slate-900">
                      <AnimatedNumber value={totalBudgetInBase} />
                    </span>
                    <span className="ml-2 font-headline font-bold text-slate-500">{budgetCurrency}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <span className="flex items-center gap-2 font-body font-medium text-emerald-800">
                    <RefreshCw className="h-4 w-4" aria-hidden />
                    {pageT.planner.estInEtb}
                  </span>
                  <span className="font-headline text-xl font-bold text-emerald-800">
                    <AnimatedNumber value={totalBudgetInETB} /> ETB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Flight tracker */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10"
        >
          <h2 className="font-serif text-3xl font-black tracking-[-0.035em] text-slate-950 md:text-4xl">
            Live Flight Tracker
          </h2>
          <p className="mt-2 max-w-2xl font-body text-base leading-relaxed text-slate-600 md:text-lg">
            Real-time departure, arrival, and gate information.
          </p>
          <div className="mt-8">
            <FlightTrackerBar />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
