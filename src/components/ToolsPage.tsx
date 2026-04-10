import React, { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'motion/react';
import { RefreshCw, ArrowRightLeft, Clock, Plus, MapPin, Activity, Plane, Building, Utensils, FileText, ChevronDown, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

export default function ToolsPage() {
  const { lang, t } = useLanguage();
  const pageT = t.toolsPage;
  
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");
  
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
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
        
        // Format date
        const date = new Date(data.time_last_updated * 1000);
        setLastUpdated(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString());
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
    
    // Convert to USD first, then to target
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

  // Itinerary State
  const [itinerary, setItinerary] = useState([{ id: 1, activity: '', location: '' }]);
  const [expandedDayId, setExpandedDayId] = useState<number | null>(1);

  const addDay = () => {
    const newId = itinerary.length + 1;
    setItinerary([...itinerary, { id: newId, activity: '', location: '' }]);
    setExpandedDayId(newId);
  };

  const updateDay = (id: number, field: 'activity' | 'location', value: string) => {
    setItinerary(itinerary.map(day => day.id === id ? { ...day, [field]: value } : day));
  };

  // Budget State
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

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center justify-start pb-24">
      {/* Hero Section */}
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto mt-8 mb-16">
        <section className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 hover:border-blue-200 transition-colors duration-500 py-32 md:py-48 rounded-[3rem] relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 mb-6"
          >
            {pageT.title.split(' ')[0]} <span className="text-blue-600">{pageT.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-500 max-w-2xl mx-auto text-xl font-body leading-relaxed"
          >
            {pageT.subtitle}
          </motion.p>
        </section>
      </div>

      {/* Converter Section */}
      <section className="w-full px-4 md:px-8 max-w-3xl mx-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/40 backdrop-blur-3xl border border-white/60 hover:border-blue-200 transition-colors duration-500 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 relative z-10">
              <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-500 font-body">{pageT.loading}</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 relative z-10">
              <p className="text-red-500 font-body">{pageT.error}</p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col gap-6">
              
              {/* From Input */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/50">
                <label className="block text-xs font-label font-bold text-gray-500 uppercase tracking-widest mb-2">
                  {pageT.from}
                </label>
                <div className="flex items-center justify-between gap-4">
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent text-4xl md:text-5xl font-headline font-bold text-gray-900 focus:outline-none"
                    placeholder="0.00"
                  />
                  <select 
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="bg-gray-100/80 text-gray-900 font-headline font-bold text-xl rounded-xl px-4 py-2 focus:outline-none appearance-none cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-10 relative z-20">
                <motion.button
                  onClick={handleSwap}
                  animate={{ rotate: isSwapping ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all"
                >
                  <ArrowRightLeft className="w-6 h-6" />
                </motion.button>
              </div>

              {/* To Input (Result) */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm transition-all">
                <label className="block text-xs font-label font-bold text-gray-500 uppercase tracking-widest mb-2">
                  {pageT.to}
                </label>
                <div className="flex items-center justify-between gap-4">
                  <div className="w-full text-4xl md:text-5xl font-headline font-bold text-blue-600 overflow-hidden text-ellipsis">
                    <AnimatedNumber value={result} />
                  </div>
                  <select 
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="bg-gray-100/80 text-gray-900 font-headline font-bold text-xl rounded-xl px-4 py-2 focus:outline-none appearance-none cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400 font-body">
                <Clock className="w-4 h-4" />
                <span>{pageT.lastUpdated}: {lastUpdated}</span>
              </div>

            </div>
          )}
        </motion.div>

        {/* Common Pairs Grid */}
        {!isLoading && !error && rates && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16"
          >
            <h3 className="text-center font-label font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
              {pageT.commonPairs}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { from: "USD", symbol: "$" },
                { from: "SAR", symbol: "﷼" },
                { from: "AED", symbol: "د.إ" }
              ].map((pair) => (
                <motion.div 
                  key={pair.from}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-gray-500 font-headline font-bold text-lg">1 {pair.from}</span>
                  <span className="text-2xl font-headline font-black text-gray-900">
                    {calculateConversion(1, pair.from, "ETB").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ETB
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* World Clock Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24"
        >
          <div className="text-center mb-10">
            <h2 className="font-headline text-3xl font-bold text-gray-900 tracking-tight mb-2">
              {pageT.clock.title}
            </h2>
            <p className="text-gray-500 font-body uppercase tracking-widest text-xs font-bold">
              {pageT.clock.localTime}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clockCities.map((city, idx) => (
              <motion.div 
                key={city.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col items-center justify-center gap-4 relative overflow-hidden group"
              >
                {/* Live Indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                  </span>
                </div>

                <h3 className="text-gray-500 font-headline font-bold text-lg uppercase tracking-widest">
                  {city.name}
                </h3>
                
                <div className="font-headline font-light text-6xl tracking-tighter text-gray-900 flex items-baseline justify-center gap-1.5">
                  <span>{formatTime(currentTime, city.tz).split(' ')[0]}</span>
                  <span className="text-2xl font-medium text-gray-500 tracking-normal">{formatTime(currentTime, city.tz).split(' ')[1]}</span>
                </div>
                
                <div className="text-gray-400 font-body text-sm font-medium">
                  {formatDate(currentTime, city.tz)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integrated Planners Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div className="md:w-32 hidden md:block"></div>
            <h2 className="font-headline text-3xl font-bold text-gray-900 tracking-tight text-center">
              {pageT.planner.title}
            </h2>
            <div className="md:w-32 flex justify-end">
              <button 
                onClick={handleClearAll}
                className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors bg-white/50 px-4 py-2 rounded-xl backdrop-blur-md border border-red-100 hover:border-red-200 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-headline font-bold text-sm">{pageT.planner.clearAll}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-16">
            {/* Itinerary Planner */}
            <div className="w-full bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <h3 className="font-headline text-2xl font-bold text-gray-900 mb-6">{pageT.planner.itinerary}</h3>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {itinerary.map((day, index) => (
                  <motion.div 
                    key={day.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex items-start gap-6 group is-active"
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 z-10 mt-4">
                      <span className="font-headline font-bold text-sm">{day.id}</span>
                    </div>
                    
                    {/* Card */}
                    <motion.div 
                      layout
                      onClick={() => setExpandedDayId(expandedDayId === day.id ? null : day.id)}
                      className={`flex-1 cursor-pointer backdrop-blur-xl border rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden ${
                        expandedDayId === day.id ? 'bg-white/70 p-10 border-blue-300 shadow-blue-500/10' : 'bg-white/60 p-5 border-white/80 hover:border-blue-200'
                      }`}
                    >
                      <motion.div layout className="flex items-center justify-between mb-2">
                        <span className="font-headline font-bold text-gray-900">
                          {pageT.planner.day} {day.id}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedDayId === day.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </motion.div>
                      </motion.div>

                      {expandedDayId === day.id ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="flex flex-col gap-4 mt-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-start gap-2 text-gray-500 focus-within:text-blue-600 transition-colors">
                            <Activity className="w-4 h-4 shrink-0 mt-1" />
                            <textarea 
                              placeholder={pageT.planner.activityDetails}
                              value={day.activity}
                              onChange={(e) => updateDay(day.id, 'activity', e.target.value)}
                              onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                              }}
                              className="w-full bg-transparent border-b border-gray-200 focus:border-blue-400 focus:outline-none font-body text-gray-900 placeholder:text-gray-400 resize-none min-h-[60px] overflow-hidden transition-colors"
                            />
                          </div>
                          <div className="flex items-start gap-2 text-gray-500 focus-within:text-blue-600 transition-colors">
                            <MapPin className="w-4 h-4 shrink-0 mt-1" />
                            <textarea 
                              placeholder={pageT.planner.locationNotes}
                              value={day.location}
                              onChange={(e) => updateDay(day.id, 'location', e.target.value)}
                              onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                              }}
                              className="w-full bg-transparent border-b border-gray-200 focus:border-blue-400 focus:outline-none font-body text-gray-900 placeholder:text-gray-400 resize-none min-h-[60px] overflow-hidden transition-colors"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-gray-500 font-body text-sm truncate"
                        >
                          {day.activity || <span className="text-gray-400 italic">No activity planned...</span>}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addDay}
                className="mt-8 w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-headline font-bold flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
              >
                <Plus className="w-5 h-5" />
                {pageT.planner.addDay}
              </motion.button>
            </div>

            {/* Budget Planner */}
            <div className="max-w-2xl mx-auto w-full bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgb(0,0,0,0.08)] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-headline text-2xl font-bold text-gray-900">{pageT.planner.budget}</h3>
                <select 
                  value={budgetCurrency}
                  onChange={(e) => setBudgetCurrency(e.target.value)}
                  className="bg-white/60 border border-gray-200 text-gray-900 font-headline font-bold text-sm rounded-xl px-3 py-1.5 focus:outline-none appearance-none cursor-pointer hover:bg-white transition-colors shadow-sm"
                >
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-6 flex-grow">
                {[
                  { id: 'flights', label: pageT.planner.flights, icon: <Plane className="w-5 h-5" />, color: 'bg-blue-500' },
                  { id: 'accommodation', label: pageT.planner.accommodation, icon: <Building className="w-5 h-5" />, color: 'bg-indigo-500' },
                  { id: 'food', label: pageT.planner.food, icon: <Utensils className="w-5 h-5" />, color: 'bg-teal-500' },
                  { id: 'visas', label: pageT.planner.visas, icon: <FileText className="w-5 h-5" />, color: 'bg-purple-500' }
                ].map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className={`p-2 rounded-lg text-white ${item.color} shadow-sm`}>
                          {item.icon}
                        </div>
                        <span className="font-headline font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-body text-sm">{budgetCurrency}</span>
                        <input 
                          type="number" 
                          value={budget[item.id as keyof typeof budget] || ''}
                          onChange={(e) => updateBudget(item.id as keyof typeof budget, e.target.value)}
                          placeholder="0"
                          className="w-24 text-right bg-white/60 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-headline font-bold text-gray-900 transition-all"
                        />
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${getPercentage(budget[item.id as keyof typeof budget])}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="mt-8 pt-8 border-t border-gray-200/60">
                <div className="flex items-end justify-between mb-2">
                  <span className="font-headline font-bold text-gray-500 uppercase tracking-widest text-sm">{pageT.planner.totalBudget}</span>
                  <div className="text-right">
                    <span className="text-3xl font-headline font-black text-gray-900">
                      <AnimatedNumber value={totalBudgetInBase} />
                    </span>
                    <span className="text-gray-500 font-headline font-bold ml-2">{budgetCurrency}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                  <span className="font-body text-blue-600 font-medium flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    {pageT.planner.estInEtb}
                  </span>
                  <span className="font-headline font-bold text-xl text-blue-700">
                    <AnimatedNumber value={totalBudgetInETB} /> ETB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
