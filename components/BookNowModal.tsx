"use client";

import React, { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type BookNowService = 'Visa' | 'Flight' | 'Pilgrimage';

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: BookNowService;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const VISA_SERVICE: BookNowService = 'Visa';
const FLIGHT_SERVICE: BookNowService = 'Flight';
const PILGRIMAGE_SERVICE: BookNowService = 'Pilgrimage';

const serviceOptions: BookNowService[] = [VISA_SERVICE, FLIGHT_SERVICE, PILGRIMAGE_SERVICE];

const normalizeService = (value: string): BookNowService => {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'visa' || normalized === 'visas') return VISA_SERVICE;
  if (normalized === 'pilgrimage') return PILGRIMAGE_SERVICE;
  return FLIGHT_SERVICE;
};

const fieldClassName =
  'w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30';

const labelClassName =
  'mb-2 block text-xs font-label font-bold uppercase tracking-widest text-emerald-800/90';

export default function BookNowModal({ isOpen, onClose, initialService = FLIGHT_SERVICE }: BookNowModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<BookNowService>(initialService);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setService(initialService || 'Flight');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setSubmitState('error');
      setErrorMessage('Please complete your name and phone number.');
      return;
    }

    setSubmitState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://dar-al-safar-portal.com/api/leads/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitState('success');
    } catch {
      setSubmitState('error');
      setErrorMessage('Could not send your request right now. Please try again in a moment.');
    }
  };

  const isLoading = submitState === 'loading';
  const isSuccess = submitState === 'success';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-md md:py-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto my-8 w-full max-w-xl overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/80 shadow-[0_35px_100px_rgba(15,23,42,0.28)] backdrop-blur-2xl md:my-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-400/[0.22] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-12 h-52 w-52 rounded-full bg-amber-300/[0.18] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-1/4 left-1/3 h-40 w-40 rounded-full bg-sky-300/[0.14] blur-3xl"
              aria-hidden
            />

            <div className="relative z-10 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-800">
                    Darul Safar
                  </p>
                  <h2 className="font-serif text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
                    Book Now
                  </h2>
                  <p className="mt-2 font-body text-sm leading-7 text-slate-600 md:text-base">
                    Share your details and our team will contact you shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-950 active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {isSuccess ? (
                <div className="mt-6 flex flex-col gap-4 rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-5 shadow-[0_14px_40px_rgba(4,120,87,0.08)] md:p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden />
                    <p className="font-body leading-relaxed text-emerald-950">
                      Thank you, {name.trim()}! Our team will call you at {phone.trim()} to finalize your booking.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-[1.25rem] bg-slate-950 px-6 py-3 font-headline font-bold text-white transition hover:bg-emerald-800 active:scale-95"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="lead-name" className={labelClassName}>
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      className={fieldClassName}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className={labelClassName}>
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Enter your phone number"
                      className={fieldClassName}
                      required
                    />
                  </div>

                  <div className="rounded-2xl border border-white/70 bg-white/45 p-3 shadow-sm backdrop-blur-sm">
                    <label htmlFor="lead-service" className={labelClassName}>
                      Service
                    </label>
                    <select
                      id="lead-service"
                      value={service}
                      onChange={(event) => setService(normalizeService(event.target.value))}
                      className={fieldClassName}
                    >
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {submitState === 'error' && (
                    <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50/80 p-3 font-body text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-slate-950 px-6 py-3.5 font-headline font-black text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-emerald-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
