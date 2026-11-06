import React from 'react';
import { Rocket, Calendar, MapPin, Edit3, Plus } from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

export default function ProjectsAndEventsSection() {
  const { projects, events, isAdmin, openAdminModal } = useDepartmentData();

  return (
    <section id="projects-section" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#F6F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Student Innovation Projects */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
                <Rocket className="w-4 h-4 text-[#102D69]" />
                KSCST RESEARCH, PATENTS &amp; STUDENT PROTOTYPES
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
                STUDENT RESEARCH &amp; INNOVATIONS ({projects.length})
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#111111]/70 max-w-xl mt-2 font-medium">
                Prototypes engineered by PACE CSE students under ASCII, GLUG PACE, and Embed Club for state &amp; national platforms like KSCST and Smart India Hackathon.
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => openAdminModal('projects')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#F5B700] text-[#111111] font-tech text-xs font-bold uppercase border-2 border-[#111111] shadow-print-sm cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Manage Projects</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#E6DED4] border-2 border-[#111111] shadow-print rounded-[2px] p-5 flex flex-col justify-between transition-transform hover:-translate-x-px hover:-translate-y-px"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-[#111111]">
                    <span className="font-tech text-xs font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] border border-[#111111] truncate max-w-[170px]">
                      {proj.status}
                    </span>
                    <span className="font-tech text-xs font-bold uppercase text-[#111111]/70 truncate max-w-[90px]">
                      {proj.team}
                    </span>
                  </div>

                  <h4 className="font-tech text-base sm:text-lg font-bold uppercase text-[#111111] mb-1.5 leading-snug">
                    {proj.title}
                  </h4>

                  <p className="font-sans text-xs text-[#111111]/85 leading-relaxed mb-4 font-medium">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(proj.technologies || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="font-tech text-xs font-semibold px-2 py-0.5 rounded-[2px] bg-[#F6F2EB] text-[#111111] border border-[#111111]/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-[#111111] flex items-center justify-between font-tech text-xs font-bold uppercase">
                  <span className="text-[#102D69] truncate max-w-[140px]">{proj.domain}</span>
                  {isAdmin ? (
                    <button
                      onClick={() => openAdminModal('projects')}
                      className="text-[#111111] hover:text-[#102D69] flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <span className="text-[#111111] underline cursor-pointer">
                      CASE STUDY &rarr;
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events & Conferences */}
        <div id="events-section" className="pt-8 border-t-2 border-[#111111]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#102D69]" />
                DEPARTMENT CALENDAR &amp; CONFERENCES
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
                CONFERENCES, SYMPOSIA &amp; SESSIONS ({events.length})
              </h2>
            </div>

            {isAdmin && (
              <button
                onClick={() => openAdminModal('events')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#F5B700] text-[#111111] font-tech text-xs font-bold uppercase border-2 border-[#111111] shadow-print-sm cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add / Edit Events</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-[#111111]">
                    <span className="font-tech text-xs font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111]">
                      {ev.type}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#102D69]">
                      {ev.date}
                    </span>
                  </div>

                  <h4 className="font-tech text-base sm:text-lg font-bold uppercase text-[#111111] mb-2 leading-snug">
                    {ev.title}
                  </h4>

                  <p className="font-sans text-xs text-[#111111]/85 mb-4 leading-relaxed font-medium">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-[#111111] flex items-center justify-between font-tech text-xs">
                  <span className="flex items-center gap-1 text-[#111111] font-semibold truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-[#102D69] shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => openAdminModal('events')}
                      className="text-[#102D69] font-bold uppercase text-[11px] cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
