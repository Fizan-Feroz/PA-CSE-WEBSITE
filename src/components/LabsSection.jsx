import React, { useState } from 'react';
import { Cpu, Server, HardDrive, CheckCircle2 } from 'lucide-react';
import { LABORATORIES } from '../data/cseData';

export default function LabsSection() {
  const [selectedLabId, setSelectedLabId] = useState(LABORATORIES[0].id);
  const activeLab = LABORATORIES.find(l => l.id === selectedLabId) || LABORATORIES[0];

  return (
    <section id="labs-section" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#F6F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
            <Server className="w-4 h-4 text-[#102D69]" />
            CENTERS OF EXCELLENCE &amp; R&amp;D RIGS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
            COMPUTING &amp; CYBER LABORATORIES
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#111111]/70 max-w-xl mt-2 font-medium">
            Air-gapped penetration testing facilities, high-density GPU model training rigs, and AWS cloud staging clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Lab List Selection */}
          <div className="lg:col-span-5 space-y-3">
            {LABORATORIES.map((lab) => {
              const isSelected = lab.id === selectedLabId;
              return (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLabId(lab.id)}
                  className={`p-4 rounded-[2px] border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print -translate-x-px -translate-y-px'
                      : 'bg-[#E6DED4] border-[#111111] text-[#111111] hover:bg-[#F6F2EB] shadow-print-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] border ${
                      isSelected ? 'bg-[#F5B700] text-[#111111] border-[#111111]' : 'bg-[#F6F2EB] text-[#102D69] border-[#111111]'
                    }`}>
                      {lab.code}
                    </span>
                    <span className={`font-tech text-xs font-bold uppercase ${
                      isSelected ? 'text-[#F6F2EB]/80' : 'text-[#111111]/60'
                    }`}>
                      {lab.capacity}
                    </span>
                  </div>
                  <h4 className={`font-tech text-base font-bold uppercase tracking-wide mt-1.5 ${
                    isSelected ? 'text-[#F6F2EB]' : 'text-[#111111]'
                  }`}>
                    {lab.name}
                  </h4>
                  <p className={`font-sans text-xs mt-1 truncate ${
                    isSelected ? 'text-[#F6F2EB]/75' : 'text-[#111111]/70'
                  }`}>
                    Lead: {lab.inCharge}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Lab Hardware & Specs Card */}
          <div className="lg:col-span-7 bg-[#E6DED4] border-2 border-[#111111] rounded-[2px] p-6 shadow-print flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-start justify-between border-b-2 border-[#111111] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] border border-[#111111]">
                      {activeLab.code}
                    </span>
                    <span className="font-tech text-xs font-bold uppercase text-[#111111]/70">
                      IN-CHARGE: {activeLab.inCharge}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-[#111111] leading-none mt-1">
                    {activeLab.name}
                  </h3>
                </div>
                <div className="p-2.5 rounded-[2px] bg-[#F6F2EB] text-[#102D69] border-2 border-[#111111]">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h5 className="font-tech text-xs uppercase tracking-wider text-[#102D69] font-bold mb-2 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-[#102D69]" />
                  DEPLOYED HARDWARE &amp; NETWORK RIG
                </h5>
                <div className="p-3.5 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-mono text-xs text-[#111111] font-medium">
                  {activeLab.hardware}
                </div>
              </div>

              <div>
                <h5 className="font-tech text-xs uppercase tracking-wider text-[#111111] font-bold mb-1.5">
                  LABORATORY MANDATE &amp; CAPABILITIES
                </h5>
                <p className="font-sans text-xs sm:text-sm text-[#111111]/85 leading-relaxed font-medium">
                  {activeLab.purpose}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t-2 border-[#111111] text-xs">
                <div className="p-3 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111]">
                  <span className="font-tech text-[10px] font-bold uppercase text-[#111111]/60 block">CAPACITY</span>
                  <span className="font-tech text-sm font-bold text-[#111111] mt-0.5 block">{activeLab.capacity}</span>
                </div>
                <div className="p-3 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111]">
                  <span className="font-tech text-[10px] font-bold uppercase text-[#111111]/60 block">FACILITY ACCESS</span>
                  <span className="font-tech text-sm font-bold text-[#102D69] mt-0.5 block">08:30 AM – 07:30 PM DAILY</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
