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
          className="fixed inset-0 z-[120] bg-gray-900/55 backdrop-blur-sm px-4 py-6 md:py-10 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg mx-auto my-8 md:my-10 bg-white/95 border border-white/60 rounded-3xl shadow-[0_20px_55px_rgba(0,0,0,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Darul Safar
                  </p>
                  <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-gray-900 tracking-tight">
                    Book Now
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-gray-500 font-body">
                    Share your details and our team will contact you shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSuccess ? (
                <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 md:p-5 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-sm md:text-base text-blue-800 font-body leading-relaxed">
                    Thank you, {name.trim()}! Our team will call you at {phone.trim()} to finalize your booking.
                  </p>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-headline font-bold text-gray-800 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-headline font-bold text-gray-800 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-service" className="block text-sm font-headline font-bold text-gray-800 mb-2">
                      Service
                    </label>
                    <select
                      id="lead-service"
                      value={service}
                      onChange={(event) => setService(normalizeService(event.target.value))}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {submitState === 'error' && (
                    <div className="rounded-2xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700 font-body flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-1 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-headline font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
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
