"use client";

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
    return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
  }
  if (normalized === 'delayed') {
    return 'bg-amber-100 text-amber-800 border border-amber-200';
  }
  if (normalized === 'scheduled') {
    return 'bg-slate-100 text-slate-700 border border-slate-200';
  }
  return 'bg-emerald-50 text-emerald-800 border border-emerald-100';
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
        className="rounded-[2.5rem] border border-white/70 bg-white/55 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-6"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
          <div className="flex shrink-0 items-center gap-2.5 text-slate-600">
            <Plane className="h-4 w-4 text-emerald-700" aria-hidden />
            <span className="font-headline text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
              Live Flight Tracker
            </span>
          </div>
          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              value={flightNumber}
              onChange={(event) => setFlightNumber(event.target.value)}
              placeholder="Flight Number (e.g., ET 500)"
              className="w-full rounded-2xl border border-white/80 bg-white/75 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <button
              type="submit"
              disabled={!flightNumber.trim() || isLoading}
              className="flex h-10 min-w-10 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-3 text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Search flight status"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden text-xs font-headline font-bold sm:inline">Loading</span>
                </>
              ) : (
                <Search className="h-4 w-4" />
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
              className="mt-4 border-t border-white/50 pt-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-headline text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
                  Visual Flight Dashboard
                </h4>
                <span
                  className={`rounded-full px-3 py-1 font-headline text-xs font-bold ${statusBadgeClass(dashboardData.status)}`}
                >
                  {dashboardData.status}
                </span>
              </div>

              <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_1.5fr_1fr]">
                <div className="text-center md:text-left">
                  <p className="font-headline text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                    {dashboardData.departure.iata}
                  </p>
                  <p className="mt-1 font-body text-sm text-slate-500">{dashboardData.departure.time}</p>
                  <p className="mt-0.5 font-body text-sm text-slate-500">
                    Terminal {dashboardData.departure.terminal} | Gate {dashboardData.departure.gate}
                  </p>
                </div>

                <div className="flex items-center gap-3 px-2">
                  <div className="flex-1 border-t-2 border-dashed border-slate-300/80" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 shadow-sm">
                    <Plane className="h-4 w-4 text-emerald-700" aria-hidden />
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-slate-300/80" />
                </div>

                <div className="text-center md:text-right">
                  <p className="font-headline text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                    {dashboardData.arrival.iata}
                  </p>
                  <p className="mt-1 font-body text-sm text-slate-500">{dashboardData.arrival.time}</p>
                  <p className="mt-0.5 font-body text-sm text-slate-500">
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
              className="mt-4 border-t border-white/50 pt-4"
            >
              <p className="font-body text-sm text-slate-600">{resultText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
