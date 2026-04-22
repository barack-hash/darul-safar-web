import React from 'react';
import { Users, Plane, Headset, ShieldCheck } from 'lucide-react';

const trustStats = [
  { value: '1,000+', label: 'Travelers', subLabel: 'TRAVELERS', icon: Users },
  { value: '15+', label: 'Partner Airlines', subLabel: 'PARTNER AIRLINES', icon: Plane },
  { value: '24/7', label: 'Global Support', subLabel: 'GLOBAL SUPPORT', icon: Headset },
  { value: '100%', label: 'Secure Booking', subLabel: 'SECURE BOOKING', icon: ShieldCheck },
];

export default function TrustRibbon() {
  return (
    <section className="w-full bg-white/5 backdrop-blur-sm border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trustStats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.subLabel} className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white/85" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm md:text-base font-headline font-bold text-white/90 truncate">
                    {item.value} {item.label}
                  </p>
                  <p className="text-[10px] md:text-xs font-label tracking-[0.18em] uppercase text-white/60 truncate">
                    {item.subLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
