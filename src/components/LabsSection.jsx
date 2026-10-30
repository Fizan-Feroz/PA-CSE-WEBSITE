import React, { useState } from 'react';
import { Cpu, Server, ShieldCheck, CheckCircle2, ChevronRight, HardDrive } from 'lucide-react';
import { LABORATORIES } from '../data/cseData';

export default function LabsSection() {
  const [selectedLabId, setSelectedLabId] = useState(LABORATORIES[0].id);
  const activeLab = LABORATORIES.find(l => l.id === selectedLabId) || LABORATORIES[0];

  return (
    <section id="labs-section" className="py-12 sm:py-16 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5" />
            Infrastructure & Centers of Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mt-1">
            Advanced Computing & Research Laboratories
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mt-1">
            Enterprise GPU workstations, isolated cyber threat sandboxes, AWS cloud nodes, and rapid IoT fabrication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Lab Selection Column */}
          <div className="lg:col-span-5 space-y-2.5">
            {LABORATORIES.map((lab) => {
              const isSelected = lab.id === selectedLabId;
              return (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLabId(lab.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold">
                      {lab.code}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {lab.capacity}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold transition-colors ${
                    isSelected ? 'text-cyan-300' : 'text-slate-200'
                  }`}>
                    {lab.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    Lead: {lab.inCharge}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Lab Hardware & Specs Card */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {activeLab.code}
                    </span>
                    <span className="text-xs text-slate-400">Lab In-Charge: {activeLab.inCharge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">
                    {activeLab.name}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  Deployed Hardware & Network Rig
                </h5>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                  {activeLab.hardware}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Academic & Innovation Mandate
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeLab.purpose}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-500 font-mono text-[10px] block">STUDENT CAPACITY</span>
                  <span className="font-bold text-slate-200 mt-0.5 block">{activeLab.capacity}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-500 font-mono text-[10px] block">AVAILABILITY</span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">Open 8:30 AM – 7:30 PM</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
