import React, { useState } from 'react';
import { Cpu, Server, HardDrive, Edit3 } from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

export default function LabsSection() {
  const { labs, isAdmin, openAdminModal } = useDepartmentData();
  const [selectedLabId, setSelectedLabId] = useState(labs[0]?.id || '');

  const activeLab = labs.find(l => l.id === selectedLabId) || labs[0];

  if (!labs || labs.length === 0) return null;

  return (
    <section id="labs-section" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#F6F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <Server className="w-4 h-4 text-[#102D69]" />
              CENTERS OF EXCELLENCE &amp; R&amp;D RIGS
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              COMPUTING &amp; CYBER LABORATORIES ({labs.length})
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/70 max-w-xl mt-2 font-medium">
              Air-gapped penetration testing facilities, high-density GPU model training rigs, and AWS cloud staging clusters.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => openAdminModal('labs')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#F5B700] text-[#111111] font-tech text-xs font-bold uppercase border-2 border-[#111111] shadow-print-sm cursor-pointer self-start md:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Labs in CMS</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Lab List Selection */}
          <div className="lg:col-span-5 space-y-3">
            {labs.map((lab) => {
              const isSelected = lab.id === activeLab?.id;
              return (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLabId(lab.id)}
                  className={`p-3.5 sm:p-4 rounded-[2px] border-2 cursor-pointer transition-all ${
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
                  <h4 className={`font-tech text-sm sm:text-base font-bold uppercase tracking-wide mt-1.5 ${
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
          {activeLab && (
            <div className="lg:col-span-7 bg-[#E6DED4] border-2 border-[#111111] rounded-[2px] p-4 sm:p-6 shadow-print flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-start justify-between border-b-2 border-[#111111] pb-4 gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
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
                  <div className="p-2 sm:p-2.5 rounded-[2px] bg-[#F6F2EB] text-[#102D69] border-2 border-[#111111] shrink-0">
                    <Cpu className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                </div>

                <div>
                  <h5 className="font-tech text-xs uppercase tracking-wider text-[#102D69] font-bold mb-2 flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-[#102D69]" />
                    DEPLOYED HARDWARE &amp; NETWORK RIG
                  </h5>
                  <div className="p-3.5 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-mono text-xs text-[#111111] font-medium leading-relaxed">
                    {activeLab.hardware}
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-[#111111] flex flex-wrap items-center justify-between gap-2 font-tech text-xs font-bold uppercase">
                  <span className="text-[#102D69]">LAB CAPACITY: {activeLab.capacity}</span>
                  <span className="bg-[#102D69] text-[#F6F2EB] px-2 py-0.5 rounded-[2px]">
                    AIR-GAPPED RESEARCH FACILITY
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
