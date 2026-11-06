import React, { useState } from 'react';
import { Cpu, Shield, Cloud, Terminal, Radio, Sparkles, Edit3 } from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

const DOMAIN_ICONS = {
  'ai-ml': Sparkles,
  'cybersecurity': Shield,
  'cloud-devops': Cloud,
  'fullstack-systems': Terminal,
  'iot-robotics': Radio
};

export default function BranchedDomainTree({ activeDomainId, onSelectDomain }) {
  const { domains, isAdmin, openAdminModal } = useDepartmentData();
  const [hoveredId, setHoveredId] = useState(null);
  
  const currentActive = hoveredId || activeDomainId || (domains[0] ? domains[0].id : '');
  const activeIndex = domains.findIndex(d => d.id === currentActive);

  const itemHeight = 48;
  const startY = 24;
  const activeY = startY + (activeIndex >= 0 ? activeIndex : 0) * itemHeight;
  const totalSvgHeight = Math.max(220, domains.length * itemHeight + 10);

  if (!domains || domains.length === 0) return null;

  return (
    <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-4 sm:p-6">
      {/* Header Plaque */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b-2 border-[#111111] gap-3">
        <div>
          <span className="font-tech text-xs tracking-widest uppercase font-bold text-[#102D69] flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#102D69]" />
            VTU AUTONOMOUS CURRICULUM CIRCUIT
          </span>
          <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#111111] mt-0.5 leading-none">
            {domains.length} CSE SPECIALIZATION DOMAINS
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isAdmin && (
            <button
              onClick={() => openAdminModal('tracks')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#F5B700] text-[#111111] font-tech text-xs font-bold uppercase border border-[#111111] shadow-print-sm cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Tracks</span>
            </button>
          )}
          <div className="font-tech text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] text-[#111111]">
            AUTONOMOUS SCHEME · {domains.length} TRACKS
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left: Circuit SVG Tree Navigation */}
        <div className="lg:col-span-5 relative flex items-start pl-1 sm:pl-2">
          
          {/* Circuit SVG Lines */}
          <div 
            className="relative w-11 shrink-0 hidden sm:block"
            style={{ height: `${totalSvgHeight}px` }}
          >
            <svg 
              className="absolute left-0 top-0 w-11 h-full overflow-visible" 
              viewBox={`0 0 44 ${totalSvgHeight}`}
            >
              {/* Main Vertical Spine in dark ink */}
              <path 
                d={`M 14 0 V ${Math.max(10, totalSvgHeight - 20)}`} 
                fill="none" 
                stroke="#111111" 
                strokeWidth="2.5"
                strokeLinecap="round" 
              />

              {/* Inactive Branch Curves to each track node */}
              {domains.map((_, i) => {
                const y = startY + i * itemHeight;
                return (
                  <path
                    key={`branch-${i}`}
                    d={`M 14 ${Math.max(0, y - 12)} A 12 12 0 0 0 26 ${y} H 40`}
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Active Animated Reach Line in Cobalt */}
              <path
                d={`M 14 0 V ${Math.max(0, activeY - 12)} A 12 12 0 0 0 26 ${activeY} H 40`}
                fill="none"
                stroke="#102D69"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-300"
              />

              {/* Active glowing circuit dot at connection pin (Saffron with Ink Border) */}
              <circle
                cx="40"
                cy={activeY}
                r="4.5"
                fill="#F5B700"
                stroke="#111111"
                strokeWidth="2"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Track Nodes List */}
          <div className="flex-1 space-y-1.5 pl-0 sm:pl-1 w-full">
            {domains.map((d) => {
              const Icon = DOMAIN_ICONS[d.id] || Sparkles;
              const isSelected = currentActive === d.id;

              return (
                <button
                  key={d.id}
                  onClick={() => onSelectDomain && onSelectDomain(d)}
                  onMouseEnter={() => setHoveredId(d.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full h-11 px-3 sm:px-3.5 rounded-[2px] flex items-center justify-between text-left transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-x-px -translate-y-px'
                      : 'bg-[#E6DED4]/60 border-[#111111]/30 hover:border-[#111111] text-[#111111] hover:bg-[#E6DED4]'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#F5B700]' : 'text-[#102D69]'
                    }`} />
                    <span className="font-tech text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                      {d.shortName || d.name}
                    </span>
                  </div>
                  <span className={`font-mono text-[11px] sm:text-xs font-black px-1.5 py-0.2 rounded-[2px] ml-1.5 shrink-0 border ${
                    isSelected 
                      ? 'bg-[#F5B700] text-[#111111] border-[#111111]' 
                      : 'bg-[#F6F2EB] text-[#111111] border-[#111111]/40'
                  }`}>
                    {d.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Technical Specification Datasheet Card */}
        <div className="lg:col-span-7 bg-[#E6DED4] border-2 border-[#111111] rounded-[2px] p-4 sm:p-5 relative overflow-hidden shadow-print-sm">
          {(() => {
            const domain = domains.find(d => d.id === currentActive) || domains[0];
            if (!domain) return null;
            const Icon = DOMAIN_ICONS[domain.id] || Sparkles;

            return (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-start justify-between gap-3 sm:gap-4 border-b-2 border-[#111111] pb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-tech font-bold text-xs uppercase px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] border border-[#111111]">
                        TRACK {domain.code}
                      </span>
                      <span className="font-tech font-bold text-xs uppercase text-[#111111]/70">
                        HEAD: {domain.head}
                      </span>
                    </div>
                    <h4 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-[#111111] leading-none mt-1">
                      {domain.name}
                    </h4>
                  </div>
                  <div className="p-2 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] text-[#102D69] shrink-0">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-medium">
                  {domain.summary}
                </p>

                {/* Core Curriculum Modules */}
                <div>
                  <span className="font-tech text-xs uppercase tracking-wider text-[#102D69] font-bold block mb-1.5">
                    CORE TECHNICAL SKILLS &amp; STACK ({domain.coursesCount || (domain.skills || []).length} MODULES)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(domain.skills || []).map((skill, i) => (
                      <span 
                        key={i}
                        className="font-tech text-xs font-semibold px-2.5 py-1 rounded-[2px] bg-[#F6F2EB] border border-[#111111] text-[#111111]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research Labs & Highlights */}
                <div className="pt-3 border-t-2 border-[#111111] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-tech text-xs uppercase tracking-wider text-[#111111] font-bold block mb-1">
                      AFFILIATED RESEARCH LABS
                    </span>
                    <ul className="space-y-1 font-sans text-xs text-[#111111]/80">
                      {(domain.labs || []).map((l, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-[1px] bg-[#102D69] shrink-0" />
                          <span className="font-medium">{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-tech text-xs uppercase tracking-wider text-[#111111] font-bold block mb-1">
                      FEATURED CURRICULUM MODULE
                    </span>
                    <div className="font-sans text-xs text-[#111111]/90 font-semibold p-2.5 bg-[#F6F2EB] border border-[#111111] rounded-[2px] leading-relaxed">
                      {domain.featuredCourse}
                    </div>
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
