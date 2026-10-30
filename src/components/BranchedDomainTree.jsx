import React, { useState } from 'react';
import { ChevronRight, Cpu, Shield, Cloud, Terminal, Radio, Sparkles } from 'lucide-react';
import { CSE_DOMAINS } from '../data/cseData';

const DOMAIN_ICONS = {
  'ai-ml': Sparkles,
  'cybersecurity': Shield,
  'cloud-devops': Cloud,
  'fullstack-systems': Terminal,
  'iot-robotics': Radio
};

export default function BranchedDomainTree({ activeDomainId, onSelectDomain }) {
  const [hoveredId, setHoveredId] = useState(null);
  const currentActive = hoveredId || activeDomainId || CSE_DOMAINS[0].id;
  const activeIndex = CSE_DOMAINS.findIndex(d => d.id === currentActive);

  // SVG branch line calculations
  const itemHeight = 44;
  const startY = 16;
  const activeY = startY + (activeIndex >= 0 ? activeIndex : 0) * itemHeight;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Specialization Tracks
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-0.5">CSE Academic & Research Domains</h3>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
          5 Core Tracks
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Branched SVG Tree (Inspired directly by INNOVEX branched-menu) */}
        <div className="lg:col-span-5 relative flex items-start pl-2">
          
          {/* Circuit SVG Lines */}
          <div className="relative w-10 shrink-0 h-[225px]">
            <svg 
              className="absolute left-0 top-0 w-10 h-full overflow-visible" 
              viewBox="0 0 40 225"
            >
              {/* Main Vertical Spine */}
              <path 
                d="M 14 0 V 195" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="2"
                strokeLinecap="round" 
              />

              {/* Inactive Branch Curves to each track node */}
              {CSE_DOMAINS.map((_, i) => {
                const y = startY + i * itemHeight;
                return (
                  <path
                    key={`branch-${i}`}
                    d={`M 14 ${y - 10} A 10 10 0 0 0 24 ${y} H 36`}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Active Animated Reach Line */}
              <path
                d={`M 14 0 V ${activeY - 10} A 10 10 0 0 0 24 ${activeY} H 36`}
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              />

              {/* Active glowing circuit dot at connection pin */}
              <circle
                cx="36"
                cy={activeY}
                r="3.5"
                fill="#22D3EE"
                className="transition-all duration-300 drop-shadow-[0_0_6px_#22D3EE]"
              />
            </svg>
          </div>

          {/* Track Nodes List */}
          <div className="flex-1 space-y-1 pl-1">
            {CSE_DOMAINS.map((d, index) => {
              const Icon = DOMAIN_ICONS[d.id] || Sparkles;
              const isSelected = currentActive === d.id;

              return (
                <button
                  key={d.id}
                  onClick={() => onSelectDomain && onSelectDomain(d)}
                  onMouseEnter={() => setHoveredId(d.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full h-10 px-3 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                    <span className="text-xs font-semibold truncate tracking-wide">
                      {d.shortTitle}
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                    isSelected 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}>
                    {d.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Domain Deep Dive Card */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          {(() => {
            const domain = CSE_DOMAINS.find(d => d.id === currentActive) || CSE_DOMAINS[0];
            const Icon = DOMAIN_ICONS[domain.id] || Sparkles;

            return (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold">
                        TRACK {domain.code}
                      </span>
                      <span className="text-xs text-slate-400">Lead: {domain.leadFaculty}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                      <Icon className="w-5 h-5 text-cyan-400" />
                      {domain.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {domain.description}
                </p>

                {/* Key Courses */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Core Curriculum Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.courses.map((c, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/80 text-slate-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research Labs & Highlights */}
                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">
                      Affiliated Research Labs
                    </span>
                    <ul className="space-y-0.5 text-slate-300">
                      {domain.labs.map((l, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span className="truncate">{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">
                      Track Highlights
                    </span>
                    <ul className="space-y-0.5 text-slate-300">
                      {domain.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
