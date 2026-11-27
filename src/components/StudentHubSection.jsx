import React, { useState, useMemo } from 'react';
import { Bell, ExternalLink, Compass, Users, ArrowRight, Calendar, Smartphone, CheckCircle2, AlertTriangle, Calculator, Plus, Trash2, Bot } from 'lucide-react';
import { COLLEGE_INFO, STUDENT_NOTICES, STUDENT_QUICK_LINKS, SECTION_TIMETABLES, DHI_ERP_SYSTEM } from '../data/cseData';

const NOTICE_CATEGORIES = ['ALL', 'EXAMS', 'PLACEMENTS', 'CIRCULARS', 'EVENTS'];
const DAY_MAP = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const TODAY_KEY = DAY_MAP[new Date().getDay()];

function marksToGradePoint(marks) {
  const m = Number(marks);
  if (Number.isNaN(m) || m < 0) return { gp: 0, grade: 'F' };
  if (m >= 90) return { gp: 10, grade: 'O' };
  if (m >= 80) return { gp: 9, grade: 'A+' };
  if (m >= 70) return { gp: 8, grade: 'A' };
  if (m >= 60) return { gp: 7, grade: 'B+' };
  if (m >= 55) return { gp: 6, grade: 'B' };
  if (m >= 50) return { gp: 5, grade: 'C' };
  if (m >= 40) return { gp: 4, grade: 'P' };
  return { gp: 0, grade: 'F' };
}

export default function StudentHubSection({
  timetables = SECTION_TIMETABLES,
  selectedSection,
  onSelectSection,
  onOpenAssistant
}) {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [localSectionIdx, setLocalSectionIdx] = useState(0);
  const [erpTab, setErpTab] = useState('attendance'); // 'attendance' | 'sgpa'
  const [totalClasses, setTotalClasses] = useState(40);
  const [daysPresent, setDaysPresent] = useState(34);

  const [sgpaRows, setSgpaRows] = useState([
    { id: 1, subject: 'Core Subject 1 (4 CR)', credits: 4, marks: 82 },
    { id: 2, subject: 'Core Subject 2 (4 CR)', credits: 4, marks: 76 },
    { id: 3, subject: 'Core Subject 3 (3 CR)', credits: 3, marks: 88 },
    { id: 4, subject: 'Lab / Practical (1 CR)', credits: 1, marks: 94 }
  ]);

  const sgpaStats = useMemo(() => {
    let totalCreds = 0;
    let weightedSum = 0;
    sgpaRows.forEach(r => {
      const c = Math.max(0, Number(r.credits) || 0);
      const { gp } = marksToGradePoint(r.marks);
      totalCreds += c;
      weightedSum += c * gp;
    });
    const sgpa = totalCreds > 0 ? Math.round((weightedSum / totalCreds) * 100) / 100 : 0;
    const vtuPct = sgpa > 0 ? Math.max(0, Math.round(sgpa * 10 * 10) / 10) : 0;
    const division =
      sgpa >= 7.75 ? 'First Class with Distinction' :
      sgpa >= 6.75 ? 'First Class' :
      sgpa >= 5.0 ? 'Second Class' : 'Needs Improvement';
    return { totalCreds, sgpa: sgpa.toFixed(2), vtuPct: vtuPct.toFixed(1), division };
  }, [sgpaRows]);

  const safeTotal = Math.max(1, Number(totalClasses) || 1);
  const safePresent = Math.min(safeTotal, Math.max(0, Number(daysPresent) || 0));
  const daysAbsent = safeTotal - safePresent;
  const attendancePct = Math.round((safePresent / safeTotal) * 1000) / 10;
  const neededFor85 = attendancePct >= 85 ? 0 : Math.ceil((0.85 * safeTotal - safePresent) / 0.15);
  const canSkipFor75 = attendancePct < 75 ? 0 : Math.floor((safePresent - 0.75 * safeTotal) / 0.75);

  const selectedSectionIdx = useMemo(() => {
    if (selectedSection) {
      const idx = timetables.findIndex(t => t.section === selectedSection);
      if (idx >= 0) return idx;
    }
    return Math.min(localSectionIdx, Math.max(0, timetables.length - 1));
  }, [selectedSection, timetables, localSectionIdx]);

  const activeTimetable = timetables[selectedSectionIdx] || timetables[0];

  function handlePickSection(idx) {
    setLocalSectionIdx(idx);
    if (onSelectSection && timetables[idx]) {
      onSelectSection(timetables[idx].section);
    }
  }

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
          <div id="timetable-panel" className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-5 mb-10">
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
                    onClick={() => handlePickSection(idx)}
                    className={`px-3 py-1 rounded-[2px] font-mono text-xs font-bold uppercase border-2 border-[#111111] cursor-pointer transition-all ${
                      selectedSectionIdx === idx
                        ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                        : 'bg-[#E6DED4] text-[#111111] hover:bg-[#DCD2C6]'
                    }`}
                  >
                    {tt.section}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {activeTimetable.schedule.map((row) => {
                const isToday = row.day === TODAY_KEY;
                return (
                  <div
                    key={row.day}
                    className={`p-3 rounded-[2px] border-2 border-[#111111] ${
                      isToday ? 'bg-[#F5B700]/20 shadow-print-sm' : 'bg-[#E6DED4]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#111111]/30">
                      <span className="font-heading text-2xl font-bold text-[#102D69] leading-none">
                        {row.day}
                      </span>
                      {isToday && (
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] bg-[#102D69] text-[#F5B700] border border-[#111111]">
                          TODAY
                        </span>
                      )}
                    </div>
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
                );
              })}
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
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              {onOpenAssistant && (
                <button
                  onClick={() => onOpenAssistant('ALL')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>ASK VTU AI TUTOR</span>
                </button>
              )}
              <a
                href={DHI_ERP_SYSTEM.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#102D69] hover:bg-[#0B1E47] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider"
              >
                <span>GET DHI APP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
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

            {/* Right: Attendance Simulator + VTU SGPA Calculator (5 cols) */}
            <div className="lg:col-span-5 p-4 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-[#111111]/30">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setErpTab('attendance')}
                      className={`px-2.5 py-1 rounded-[2px] font-tech text-[11px] font-bold uppercase border border-[#111111] cursor-pointer transition-colors ${
                        erpTab === 'attendance' ? 'bg-[#102D69] text-[#F6F2EB]' : 'bg-[#F6F2EB] text-[#111111]'
                      }`}
                    >
                      ATTENDANCE
                    </button>
                    <button
                      onClick={() => setErpTab('sgpa')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] font-tech text-[11px] font-bold uppercase border border-[#111111] cursor-pointer transition-colors ${
                        erpTab === 'sgpa' ? 'bg-[#102D69] text-[#F6F2EB]' : 'bg-[#F6F2EB] text-[#111111]'
                      }`}
                    >
                      <Calculator className="w-3 h-3" />
                      <span>VTU SGPA</span>
                    </button>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[#F6F2EB] border border-[#111111] rounded-[2px]">
                    {erpTab === 'attendance' ? 'VTU 85% / 75%' : '2022 SCHEME'}
                  </span>
                </div>

                {erpTab === 'attendance' ? (
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
                ) : (
                  <div className="space-y-1.5 mb-3 max-h-40 overflow-y-auto pr-1">
                    {sgpaRows.map((row) => {
                      const { grade } = marksToGradePoint(row.marks);
                      return (
                        <div key={row.id} className="grid grid-cols-12 gap-1.5 items-center">
                          <input
                            type="text"
                            value={row.subject}
                            onChange={(e) => setSgpaRows(prev => prev.map(r => r.id === row.id ? { ...r, subject: e.target.value } : r))}
                            className="col-span-5 px-2 py-1 rounded-[2px] bg-[#F6F2EB] border border-[#111111] font-sans text-[11px] font-semibold"
                            placeholder="Subject"
                          />
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={row.credits}
                            onChange={(e) => setSgpaRows(prev => prev.map(r => r.id === row.id ? { ...r, credits: e.target.value } : r))}
                            className="col-span-2 px-1.5 py-1 rounded-[2px] bg-[#F6F2EB] border border-[#111111] font-mono text-[11px] font-bold text-center"
                            title="Credits"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={row.marks}
                            onChange={(e) => setSgpaRows(prev => prev.map(r => r.id === row.id ? { ...r, marks: e.target.value } : r))}
                            className="col-span-3 px-1.5 py-1 rounded-[2px] bg-[#F6F2EB] border border-[#111111] font-mono text-[11px] font-bold text-center"
                            title="Marks (0-100)"
                          />
                          <span className="col-span-1 font-mono text-[10px] font-bold text-center text-[#102D69]">
                            {grade}
                          </span>
                          <button
                            onClick={() => setSgpaRows(prev => prev.length > 1 ? prev.filter(r => r.id !== row.id) : prev)}
                            className="col-span-1 flex items-center justify-center text-[#111111]/60 hover:text-[#B91C1C] cursor-pointer"
                            title="Remove subject"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                    <button
                      onClick={() => setSgpaRows(prev => [...prev, { id: Date.now(), subject: `Subject ${prev.length + 1}`, credits: 3, marks: 75 }])}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] bg-[#F6F2EB] hover:bg-[#DCD2C6] border border-[#111111] font-tech text-[10px] font-bold uppercase cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>ADD SUBJECT</span>
                    </button>
                  </div>
                )}
              </div>

              {erpTab === 'attendance' ? (
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
              ) : (
                <div className="p-3 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-heading text-3xl font-bold leading-none text-[#102D69]">
                      {sgpaStats.sgpa} SGPA
                    </span>
                    <p className="font-sans text-[11px] font-semibold text-[#111111]/80 mt-0.5">
                      {sgpaStats.totalCreds} Credits · {sgpaStats.vtuPct}% Equiv · {sgpaStats.division}
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-[#102D69] shrink-0" />
                </div>
              )}
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
