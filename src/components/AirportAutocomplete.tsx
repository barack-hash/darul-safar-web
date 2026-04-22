import React, { useEffect, useMemo, useRef, useState } from 'react';

type AirportOption = {
  code: string;
  name: string;
  country: string;
};

const AIRPORT_OPTIONS: AirportOption[] = [
  { code: 'ADD', name: 'Addis Ababa', country: 'Ethiopia' },
  { code: 'DIR', name: 'Dire Dawa', country: 'Ethiopia' },
  { code: 'IAD', name: 'Washington Dulles', country: 'United States' },
  { code: 'JFK', name: 'New York', country: 'United States' },
  { code: 'LAX', name: 'Los Angeles', country: 'United States' },
  { code: 'ORD', name: 'Chicago', country: 'United States' },
  { code: 'YYZ', name: 'Toronto', country: 'Canada' },
  { code: 'DXB', name: 'Dubai', country: 'United Arab Emirates' },
  { code: 'AUH', name: 'Abu Dhabi', country: 'United Arab Emirates' },
  { code: 'JED', name: 'Jeddah', country: 'Saudi Arabia' },
  { code: 'RUH', name: 'Riyadh', country: 'Saudi Arabia' },
  { code: 'MED', name: 'Medina', country: 'Saudi Arabia' },
  { code: 'MCT', name: 'Muscat', country: 'Oman' },
  { code: 'BAH', name: 'Bahrain', country: 'Bahrain' },
  { code: 'CAI', name: 'Cairo', country: 'Egypt' },
  { code: 'CPT', name: 'Cape Town', country: 'South Africa' },
  { code: 'JNB', name: 'Johannesburg', country: 'South Africa' },
  { code: 'IST', name: 'Istanbul', country: 'Turkey' },
  { code: 'DOH', name: 'Doha', country: 'Qatar' },
  { code: 'BOM', name: 'Mumbai', country: 'India' },
  { code: 'DEL', name: 'Delhi', country: 'India' },
  { code: 'DAC', name: 'Dhaka', country: 'Bangladesh' },
  { code: 'KHI', name: 'Karachi', country: 'Pakistan' },
  { code: 'LHR', name: 'London Heathrow', country: 'United Kingdom' },
  { code: 'FRA', name: 'Frankfurt', country: 'Germany' },
  { code: 'CDG', name: 'Paris', country: 'France' },
  { code: 'AMS', name: 'Amsterdam', country: 'Netherlands' },
  { code: 'FCO', name: 'Rome', country: 'Italy' },
  { code: 'MAD', name: 'Madrid', country: 'Spain' },
  { code: 'NBO', name: 'Nairobi', country: 'Kenya' },
  { code: 'SIN', name: 'Singapore', country: 'Singapore' },
  { code: 'KUL', name: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'BKK', name: 'Bangkok', country: 'Thailand' },
  { code: 'NRT', name: 'Tokyo', country: 'Japan' },
  { code: 'SYD', name: 'Sydney', country: 'Australia' },
];

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: React.ReactNode;
}

export default function AirportAutocomplete({ value, onChange, placeholder, label }: AirportAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return AIRPORT_OPTIONS;
    return AIRPORT_OPTIONS.filter(
      (airport) =>
        airport.name.toLowerCase().includes(normalized) ||
        airport.code.toLowerCase().includes(normalized)
    );
  }, [searchTerm]);

  const handleSelect = (airport: AirportOption) => {
    const selectedValue = `${airport.name} (${airport.code})`;
    onChange(selectedValue);
    setSearchTerm(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="flex items-center gap-2 text-xs font-label font-bold text-blue-600 uppercase tracking-widest">
        {label}
      </label>
      <input
        type="text"
        value={searchTerm}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => {
          const nextValue = event.target.value;
          setSearchTerm(nextValue);
          onChange(nextValue);
          setIsOpen(true);
        }}
        placeholder={placeholder}
        className="w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
      />

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-xl max-h-60 overflow-y-auto">
          {filteredOptions.length ? (
            filteredOptions.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => handleSelect(airport)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 active:scale-[0.99] transition-all duration-150 border-b border-slate-100 last:border-b-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{airport.name}</p>
                    <p className="text-xs text-gray-500">{airport.country}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
                    {airport.code}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">No matching airports found.</div>
          )}
        </div>
      )}
    </div>
  );
}
