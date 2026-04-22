import React, { useState } from 'react';
import { Search, Plane } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const MOCK_RESULT = 'Status: On Time | Terminal: 2 | Gate: B4';

export default function FlightTrackerBar() {
  const [flightNumber, setFlightNumber] = useState('');
  const [resultText, setResultText] = useState('');

  const handleSearch = () => {
    if (!flightNumber.trim()) {
      setResultText('');
      return;
    }
    setResultText(MOCK_RESULT);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-full max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-4 py-3 md:px-5 md:py-4"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2.5 text-gray-600">
            <Plane className="w-4 h-4 text-blue-600" />
            <span className="text-xs uppercase tracking-[0.16em] font-headline font-bold">
              Live Flight Tracker
            </span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={flightNumber}
              onChange={(event) => setFlightNumber(event.target.value)}
              placeholder="Flight Number (e.g., ET 500)"
              className="w-full bg-white/70 border border-white/60 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400/70 transition"
            />
            <button
              type="submit"
              disabled={!flightNumber.trim()}
              className="h-10 min-w-10 px-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Search flight status"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {resultText && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-3 pt-3 border-t border-white/30"
            >
              <p className="text-sm font-body text-gray-700">{resultText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
