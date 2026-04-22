import React, { useState } from 'react';
import { Search, Plane, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const NOT_FOUND_TEXT = 'Flight not found or data unavailable.';

const toTitleCase = (value: string) => {
  if (!value) return '';
  return value
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

export default function FlightTrackerBar() {
  const [flightNumber, setFlightNumber] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const formattedFlightNumber = flightNumber.replace(/\s+/g, '').toUpperCase();
    if (!formattedFlightNumber) {
      setResultText('');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/track-flight?flight=${encodeURIComponent(formattedFlightNumber)}`);
      if (!response.ok) {
        setResultText(NOT_FOUND_TEXT);
        return;
      }

      const responseData = await response.json();
      const flightData = responseData?.data?.[0];

      if (!flightData) {
        setResultText(NOT_FOUND_TEXT);
        return;
      }

      const status = toTitleCase(flightData.flight_status || '');
      const terminal = flightData.departure?.terminal || 'TBD';
      const gate = flightData.departure?.gate || 'TBD';

      setResultText(`Status: ${status || 'TBD'} | Terminal: ${terminal} | Gate: ${gate}`);
    } catch {
      setResultText(NOT_FOUND_TEXT);
    } finally {
      setIsLoading(false);
    }
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
              disabled={!flightNumber.trim() || isLoading}
              className="h-10 min-w-10 px-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Search flight status"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
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
