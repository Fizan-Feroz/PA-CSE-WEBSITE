import React, { useState, useMemo } from 'react';
import { Bell, ExternalLink, Compass, Users, ArrowRight, Calendar, Upload, Smartphone, CheckCircle2, AlertTriangle } from 'lucide-react';
import { COLLEGE_INFO, STUDENT_NOTICES, STUDENT_QUICK_LINKS, SECTION_TIMETABLES, DHI_ERP_SYSTEM } from '../data/cseData';

const NOTICE_CATEGORIES = ['ALL', 'EXAMS', 'PLACEMENTS', 'CIRCULARS', 'EVENTS'];

export default function StudentHubSection({ timetables = SECTION_TIMETABLES, onOpenFacultySetup }) {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [totalClasses, setTotalClasses] = useState(40);
  const [daysPresent, setDaysPresent] = useState(34);

  const safeTotal = Math.max(1, Number(totalClasses) || 1);
  const safePresent = Math.min(safeTotal, Math.max(0, Number(daysPresent) || 0));
  const daysAbsent = safeTotal - safePresent;
  const attendancePct = Math.round((safePresent / safeTotal) * 1000) / 10;
  const neededFor85 = attendancePct >= 85 ? 0 : Math.ceil((0.85 * safeTotal - safePresent) / 0.15);
  const canSkipFor75 = attendancePct < 75 ? 0 : Math.floor((safePresent - 0.75 * safeTotal) / 0.75);

  const activeTimetable = timetables[selectedSectionIdx] || timetables[0];

  const filteredNotices = useMemo(() => {
    if (selectedCat === 'ALL') return STUDENT_NOTICES;
    return STUDENT_NOTICES.filter(n => n.category === selectedCat);
  }, [selectedCat]);

  function handleScrollTo(targetId) {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="student-hub-section" className="py-12 sm:py-16 border-b-2 border-[#111111] bg-[#E6DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-[#102D69]" />
              ONE-STOP STUDENT UTILITY &amp; NOTICE BOARD
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              STUDENT HUB, CIRCULARS &amp; CHAPTERS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/75 max-w-2xl mt-2 font-medium">
              Direct access to VTU exam notices, placement drives, essential academic portals, and PACE CSE technical student bodies.
            </p>
          </div>

          {/* Notice Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {NOTICE_CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider border-2 border-[#111111] transition-all cursor-pointer shrink-0 ${
                    active
                      ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm -translate-x-px -translate-y-px'
                      : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#DCD2C6]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notices + Quick Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">

          {/* Left: Notice Board (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-x-px hover:-translate-y-px transition-transform"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111]">
                      {notice.priority}
                    </span>
                    <span className="font-tech text-xs font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
                      {notice.category}
                    </span>
                    <span className="font-mono text-xs text-[#111111]/65 font-semibold">
                      {notice.date}
                    </span>
                  </div>
                  <h3 className="font-tech text-lg font-bold uppercase text-[#111111] leading-snug">
                    {notice.title}
                  </h3>
                  <p className="font-sans text-xs text-[#111111]/80 leading-relaxed font-medium">
                    {notice.summary}
                  </p>
                </div>

                <button
                  onClick={() => handleScrollTo(notice.targetId)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] border-2 border-[#111111] font-tech text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-center"
                >
                  <span>{notice.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Quick Student Links Directory (5 cols) */}
          <div className="lg:col-span-5 bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#111111]">
                <span className="font-tech text-sm font-bold uppercase tracking-wider text-[#102D69] flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  ESSENTIAL STUDENT PORTALS
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#E6DED4] border border-[#111111] rounded-[2px]">
                  {STUDENT_QUICK_LINKS.length} LINKS
                </span>
              </div>

              <div className="space-y-2.5">
                {STUDENT_QUICK_LINKS.map((link, idx) => {
                  const isInternal = link.url.startsWith('#');
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target={isInternal ? undefined : '_blank'}
                      rel={isInternal ? undefined : 'noopener noreferrer'}
                      className="flex items-center justify-between p-3 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] text-[#111111] hover:text-[#F6F2EB] border-2 border-[#111111] transition-colors group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-tech text-sm font-bold uppercase truncate">
                            {link.label}
                          </span>
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111] shrink-0">
                            {link.tag}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] opacity-70 truncate mt-0.5">
                          {link.sub}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 shrink-0 opacity-75 group-hover:opacity-100" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Section Class Timetables Panel */}
        {activeTimetable && (
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-5 mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 mb-4 border-b-2 border-[#111111]">
              <div>
                <span className="font-tech text-sm font-bold uppercase tracking-wider text-[#102D69] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  SECTION CLASS TIMETABLES
                </span>
                <p className="font-mono text-[11px] text-[#111111]/70 mt-0.5">
                  {activeTimetable.semester} · {activeTimetable.room}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {timetables.map((tt, idx) => (
                  <button
                    key={tt.section}
                    onClick={() => setSelectedSectionIdx(idx)}
                    className={`px-3 py-1 rounded-[2px] font-mono text-xs font-bold uppercase border-2 border-[#111111] cursor-pointer transition-all ${
                      selectedSectionIdx === idx
                        ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                        : 'bg-[#E6DED4] text-[#111111] hover:bg-[#DCD2C6]'
                    }`}
                  >
                    {tt.section}
                  </button>
                ))}
                {onOpenFacultySetup && (
                  <button
                    onClick={onOpenFacultySetup}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>UPDATE FROM IMAGE</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {activeTimetable.schedule.map((row) => (
                <div
                  key={row.day}
                  className="p-3 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111]"
                >
                  <span className="font-heading text-2xl font-bold text-[#102D69] leading-none block pb-1.5 mb-2 border-b border-[#111111]/30">
                    {row.day}
                  </span>
                  <ul className="space-y-1.5">
                    {row.slots.map((slot, sIdx) => (
                      <li
                        key={sIdx}
                        className="font-sans text-[11px] font-semibold text-[#111111] bg-[#F6F2EB] px-2 py-1 rounded-[2px] border border-[#111111]/30 leading-snug"
                      >
                        {slot}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dhi Academic ERP: Attendance & Scheduling Integration Panel */}
        <div id="dhi-erp-panel" className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-5 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 mb-4 border-b-2 border-[#111111]">
            <div>
              <span className="font-tech text-sm font-bold uppercase tracking-wider text-[#102D69] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                {DHI_ERP_SYSTEM.appName} · ATTENDANCE &amp; SCHEDULING
              </span>
              <p className="font-mono text-[11px] text-[#111111]/70 mt-0.5">
                {DHI_ERP_SYSTEM.packageId} · v{DHI_ERP_SYSTEM.version} · {DHI_ERP_SYSTEM.architecture}
              </p>
            </div>
            <a
              href={DHI_ERP_SYSTEM.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#102D69] hover:bg-[#0B1E47] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider self-start md:self-auto"
            >
              <span>GET DHI APP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Extracted Dhi Modules (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DHI_ERP_SYSTEM.modules.map((mod) => (
                <div key={mod.code} className="p-3.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[#F5B700] text-[#111111] border border-[#111111] rounded-[2px]">
                        {mod.code}
                      </span>
                      <span className="font-mono text-[10px] text-[#111111]/70 font-semibold">
                        {mod.roles.join(' · ')}
                      </span>
                    </div>
                    <h4 className="font-tech text-sm font-bold uppercase text-[#102D69]">
                      {mod.title}
                    </h4>
                    <p className="font-sans text-[11px] text-[#111111]/80 mt-1 leading-relaxed font-medium">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Dhi Attendance & VTU Eligibility Calculator (5 cols) */}
            <div className="lg:col-span-5 p-4 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#111111]/30">
                  <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#102D69]">
                    MY ATTENDANCE SIMULATOR
                  </span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[#F6F2EB] border border-[#111111] rounded-[2px]">
                    VTU 85% / 75%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <label className="block">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#111111]/75 block mb-1">
                      Total Classes
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={totalClasses}
                      onChange={(e) => setTotalClasses(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-mono text-xs font-bold text-[#111111]"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#111111]/75 block mb-1">
                      Days Present
                    </span>
                    <input
                      type="number"
                      min="0"
                      max={safeTotal}
                      value={daysPresent}
                      onChange={(e) => setDaysPresent(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-mono text-xs font-bold text-[#111111]"
                    />
                  </label>
                  <div className="block">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#111111]/75 block mb-1">
                      Days Absent
                    </span>
                    <div className="w-full px-2 py-1.5 rounded-[2px] bg-[#DCD2C6] border-2 border-[#111111] font-mono text-xs font-bold text-[#111111]">
                      {daysAbsent}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] flex items-center justify-between gap-3">
                <div>
                  <span className="font-heading text-3xl font-bold leading-none text-[#102D69]">
                    {attendancePct}%
                  </span>
                  <p className="font-sans text-[11px] font-semibold text-[#111111]/80 mt-0.5">
                    {attendancePct >= 85
                      ? `VTU Regular Compliant · Can skip ${canSkipFor75} classes above 75%`
                      : attendancePct >= 75
                        ? `Condonation Zone · Attend ${neededFor85} more classes for 85%`
                        : `Shortage Alert · Attend ${neededFor85} consecutive classes for 85%`}
                  </p>
                </div>
                {attendancePct >= 75 ? (
                  <CheckCircle2 className="w-6 h-6 text-[#102D69] shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-[#B91C1C] shrink-0" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Student Chapters & Technical Clubs Strip */}
        <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-[#111111]">
            <span className="font-tech text-sm font-bold uppercase tracking-wider text-[#102D69] flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              STUDENT ASSOCIATIONS &amp; TECHNICAL CLUBS (PACE CSE)
            </span>
            <span className="font-mono text-xs text-[#111111]/70">
              Open to all B.E. CSE Students · Academic Block A
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {COLLEGE_INFO.associations.map((club) => (
              <div
                key={club.name}
                className="p-3.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-2xl font-bold text-[#102D69] leading-none block">
                    {club.name}
                  </span>
                  <p className="font-tech text-xs font-bold uppercase text-[#111111] mt-1 leading-snug">
                    {club.fullName}
                  </p>
                </div>
                <p className="font-sans text-[11px] text-[#111111]/75 mt-2 pt-2 border-t border-[#111111]/20 font-medium">
                  {club.role}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
