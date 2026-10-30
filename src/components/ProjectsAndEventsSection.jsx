import React from 'react';
import { Rocket, Calendar, MapPin, Award, ExternalLink, Terminal } from 'lucide-react';
import { STUDENT_PROJECTS, UPCOMING_EVENTS } from '../data/cseData';

export default function ProjectsAndEventsSection() {
  return (
    <section id="projects-section" className="py-12 sm:py-16 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Student Innovation Projects */}
        <div className="mb-14">
          <div className="mb-8">
            <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5" />
              Student Innovation & Hackathons
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mt-1">
              Flagship Student Research & Prototypes
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-1">
              Award-winning prototypes built by PACE CSE students for national hackathons like INNOVEX and smart campus pilots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDENT_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold truncate max-w-[200px]">
                      {proj.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {proj.team}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-1.5">
                    {proj.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-slate-500 font-mono text-[11px]">{proj.domain}</span>
                  <span className="text-cyan-400 flex items-center gap-1 font-semibold group-hover:underline">
                    Case Study &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events & Hackathons */}
        <div id="events-section" className="pt-8 border-t border-slate-800/80">
          <div className="mb-8">
            <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Department Calendar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mt-1">
              Hackathons, Workshops & Seminars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map((ev) => (
              <div
                key={ev.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/20">
                      {ev.type}
                    </span>
                    <span className="text-xs font-mono text-slate-300 font-semibold">
                      {ev.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 mb-2">
                    {ev.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{ev.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
