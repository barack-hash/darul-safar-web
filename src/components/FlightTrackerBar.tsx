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

type FlightDashboardData = {
  status: string;
  departure: {
    iata: string;
    time: string;
    terminal: string;
    gate: string;
  };
  arrival: {
    iata: string;
    time: string;
    terminal: string;
    gate: string;
  };
};

const statusBadgeClass = (status: string) => {
  const normalized = status.trim().toLowerCase();
  if (normalized === 'active' || normalized === 'landed') {
    return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
  }
  if (normalized === 'delayed') {
    return 'bg-orange-100 text-orange-700 border border-orange-200';
  }
  if (normalized === 'scheduled') {
    return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
  return 'bg-blue-100 text-blue-700 border border-blue-200';
};

const formatFlightTime = (isoTime?: string) => {
  if (!isoTime) return 'TBD';
  const date = new Date(isoTime);
  if (Number.isNaN(date.getTime())) return 'TBD';
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

export default function FlightTrackerBar() {
  const [flightNumber, setFlightNumber] = useState('');
  const [resultText, setResultText] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<FlightDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const formattedFlightNumber = flightNumber.replace(/\s+/g, '').toUpperCase();
    if (!formattedFlightNumber) {
      setResultText('');
      setDashboardData(null);
      return;
    }

    setIsLoading(true);
    setResultText('');
    setDashboardData(null);
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
      const departureIata = (flightData.departure?.iata || '---').toUpperCase();
      const arrivalIata = (flightData.arrival?.iata || '---').toUpperCase();
      const departureTime = formatFlightTime(flightData.departure?.scheduled || flightData.departure?.estimated);
      const arrivalTime = formatFlightTime(flightData.arrival?.scheduled || flightData.arrival?.estimated);
      const departureTerminal = flightData.departure?.terminal || 'TBD';
      const departureGate = flightData.departure?.gate || 'TBD';
      const arrivalTerminal = flightData.arrival?.terminal || 'TBD';
      const arrivalGate = flightData.arrival?.gate || 'TBD';

      setDashboardData({
        status: status || 'TBD',
        departure: {
          iata: departureIata,
          time: departureTime,
          terminal: departureTerminal,
          gate: departureGate,
        },
        arrival: {
          iata: arrivalIata,
          time: arrivalTime,
          terminal: arrivalTerminal,
          gate: arrivalGate,
        },
      });
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
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-4 py-4 md:px-6 md:py-5"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2.5 text-gray-600 shrink-0">
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
              className="h-10 min-w-10 px-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              aria-label="Search flight status"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline text-xs font-headline font-bold">Loading</span>
                </>
              ) : (
                <Search className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {dashboardData && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-4 pt-4 border-t border-white/30"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs uppercase tracking-[0.16em] font-headline font-bold text-gray-600">
                  Visual Flight Dashboard
                </h4>
                <span className={`px-3 py-1 rounded-full text-xs font-headline font-bold ${statusBadgeClass(dashboardData.status)}`}>
                  {dashboardData.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-3xl md:text-4xl font-headline font-extrabold text-gray-900 tracking-tight">
                    {dashboardData.departure.iata}
                  </p>
                  <p className="mt-1 text-sm font-body text-gray-300">
                    {dashboardData.departure.time}
                  </p>
                  <p className="mt-0.5 text-sm font-body text-gray-300">
                    Terminal {dashboardData.departure.terminal} | Gate {dashboardData.departure.gate}
                  </p>
                </div>

                <div className="flex items-center gap-3 px-2">
                  <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                  <div className="w-10 h-10 rounded-full bg-white/70 border border-white/60 shadow-sm flex items-center justify-center">
                    <Plane className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                </div>

                <div className="text-center md:text-right">
                  <p className="text-3xl md:text-4xl font-headline font-extrabold text-gray-900 tracking-tight">
                    {dashboardData.arrival.iata}
                  </p>
                  <p className="mt-1 text-sm font-body text-gray-300">
                    {dashboardData.arrival.time}
                  </p>
                  <p className="mt-0.5 text-sm font-body text-gray-300">
                    Terminal {dashboardData.arrival.terminal} | Gate {dashboardData.arrival.gate}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {!dashboardData && resultText && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-4 pt-4 border-t border-white/30"
            >
              <p className="text-sm font-body text-gray-700">{resultText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
