"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

type DestinationOption = {
  name: string;
  type: 'Country' | 'Region';
};

const DESTINATION_OPTIONS: DestinationOption[] = [
  { name: 'Saudi Arabia', type: 'Country' },
  { name: 'United Arab Emirates (Dubai)', type: 'Country' },
  { name: 'Turkey', type: 'Country' },
  { name: 'Schengen Area (Europe)', type: 'Region' },
  { name: 'Thailand', type: 'Country' },
  { name: 'United States', type: 'Country' },
  { name: 'United Kingdom', type: 'Country' },
  { name: 'China', type: 'Country' },
  { name: 'India', type: 'Country' },
  { name: 'South Africa', type: 'Country' },
  { name: 'Kenya', type: 'Country' },
  { name: 'Qatar', type: 'Country' },
  { name: 'Canada', type: 'Country' },
  { name: 'Australia', type: 'Country' },
  { name: 'Japan', type: 'Country' },
  { name: 'South Korea', type: 'Country' },
  { name: 'Malaysia', type: 'Country' },
  { name: 'Singapore', type: 'Country' },
  { name: 'Egypt', type: 'Country' },
  { name: 'Morocco', type: 'Country' },
  { name: 'Brazil', type: 'Country' },
  { name: 'Argentina', type: 'Country' },
  { name: 'Switzerland', type: 'Country' },
  { name: 'New Zealand', type: 'Country' },
];

interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: React.ReactNode;
}

export default function DestinationAutocomplete({
  value,
  onChange,
  placeholder,
  label,
}: DestinationAutocompleteProps) {
  const inputId = useId();
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
    if (!normalized) return DESTINATION_OPTIONS;
    return DESTINATION_OPTIONS.filter((destination) =>
      destination.name.toLowerCase().includes(normalized)
    );
  }, [searchTerm]);

  const handleSelect = (destination: DestinationOption) => {
    onChange(destination.name);
    setSearchTerm(destination.name);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label htmlFor={inputId} className="block text-xs font-label font-bold uppercase tracking-widest text-emerald-800/90">
        {label}
      </label>
      <input
        id={inputId}
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
        className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 shadow-sm backdrop-blur-md transition-all placeholder:text-gray-400 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      />

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-xl max-h-60 overflow-y-auto">
          {filteredOptions.length ? (
            filteredOptions.map((destination) => (
              <button
                key={destination.name}
                type="button"
                onClick={() => handleSelect(destination)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 active:scale-[0.99] transition-all duration-150 border-b border-slate-100 last:border-b-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-gray-900">{destination.name}</p>
                  <span className="text-xs text-gray-500">{destination.type}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">No matching destinations found.</div>
          )}
        </div>
      )}
    </div>
  );
}
