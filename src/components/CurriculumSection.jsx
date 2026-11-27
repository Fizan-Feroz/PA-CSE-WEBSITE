import React, { useState, useMemo } from 'react';
import { BookOpen, Search, FileText, Eye, Download, Bot } from 'lucide-react';
import { COURSES_SYLLABI } from '../data/cseData';
import MaterialViewerModal from './MaterialViewerModal';

const SEMESTERS = [
  'All',
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8'
];

const RESOURCE_TYPES = ['All', 'Syllabus', 'Notes', 'Lab Manual', 'PYQ'];

export default function CurriculumSection({
  courses = COURSES_SYLLABI,
  onOpenAssistant,
  activeCourseCode,
  onSelectCourseCode
}) {
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [query, setQuery] = useState('');
  const [localActiveCode, setLocalActiveCode] = useState(null);

  const effectiveCode = activeCourseCode !== undefined ? activeCourseCode : localActiveCode;
  const activeCourse = useMemo(
    () => courses.find(c => c.code === effectiveCode) || null,
    [courses, effectiveCode]
  );

  function openCourseModal(course) {
    if (onSelectCourseCode) {
      onSelectCourseCode(course ? course.code : null);
    } else {
      setLocalActiveCode(course ? course.code : null);
    }
  }

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchSem = selectedSemester === 'All' || c.semester === selectedSemester;
      const matchType =
        selectedType === 'All' ||
        (c.materials && c.materials.some(m => m.type === selectedType));
      const cleanQ = query.toLowerCase().trim();
      const matchQ = !cleanQ ||
        c.code.toLowerCase().includes(cleanQ) ||
        c.title.toLowerCase().includes(cleanQ) ||
        c.domain.toLowerCase().includes(cleanQ) ||
        c.topics.some(t => t.toLowerCase().includes(cleanQ)) ||
        (c.materials && c.materials.some(m => m.title.toLowerCase().includes(cleanQ)));
      return matchSem && matchType && matchQ;
    });
  }, [courses, selectedSemester, selectedType, query]);

  return (
    <section id="curriculum-section" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#E6DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#102D69]" />
              SEMESTER 1–8 COURSE MATERIALS VAULT
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              SYLLABI, NOTES, LAB MANUALS &amp; PYQS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/75 max-w-2xl mt-2 font-medium">
              View study guides, lab programs, and previous year question papers directly in-browser or download them offline in one click.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#111111]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter subject code, e.g. 'BCS304' or 'Lab'..."
              className="w-full pl-9 pr-3 py-2 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-tech text-sm text-[#111111] placeholder-[#111111]/45 focus:outline-none shadow-print-sm"
            />
          </div>
        </div>

        {/* Semester Filter Pills */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
          {SEMESTERS.map((sem) => {
            const isSelected = selectedSemester === sem;
            return (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-3 py-1.5 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-x-px -translate-y-px'
                    : 'bg-[#F6F2EB] border-[#111111] text-[#111111] hover:bg-[#DCD2C6]'
                }`}
              >
                {sem}
              </button>
            );
          })}
        </div>

        {/* Material Type Filter Pills + Faculty Quick Add */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b-2 border-[#111111]/20">
          <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mr-1">
            RESOURCE TYPE:
          </span>
          {RESOURCE_TYPES.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded-[2px] font-mono text-[11px] font-bold uppercase transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#F5B700] text-[#111111] border-[#111111] shadow-print-sm'
                    : 'bg-[#F6F2EB]/70 text-[#111111]/80 border-[#111111]/40 hover:border-[#111111]'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-8 text-center">
            <p className="font-tech text-base font-bold uppercase text-[#111111]">
              No matching courses found for the selected filters.
            </p>
            <button
              onClick={() => {
                setSelectedSemester('All');
                setSelectedType('All');
                setQuery('');
              }}
              className="mt-3 px-4 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const mats = course.materials || [];
              return (
                <div
                  key={course.code}
                  className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-5 transition-transform hover:-translate-x-px hover:-translate-y-px flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-[#111111]">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] border border-[#111111]">
                        {course.code}
                      </span>
                      <div className="flex items-center gap-1.5 font-tech text-xs font-bold uppercase">
                        <span>{course.semester}</span>
                        <span className="text-[#102D69] bg-[#F5B700] px-1.5 py-0.2 rounded-[2px] border border-[#111111]">
                          {course.credits} CR
                        </span>
                      </div>
                    </div>

                    <h4 className="font-tech text-lg font-bold uppercase tracking-wide text-[#111111] mb-1 leading-snug">
                      {course.title}
                    </h4>

                    <p className="font-tech text-xs font-semibold uppercase text-[#102D69] mb-3">
                      {course.domain}
                    </p>

                    <div className="mb-4">
                      <span className="font-tech text-xs uppercase tracking-wider text-[#111111]/70 font-bold block mb-1.5">
                        KEY SYLLABUS TOPICS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.topics.map((t, idx) => (
                          <span
                            key={idx}
                            className="font-tech text-xs font-semibold px-2 py-0.5 rounded-[2px] bg-[#E6DED4] text-[#111111] border border-[#111111]/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Available Resource Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {mats.map((m) => (
                        <span
                          key={m.id}
                          className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-[2px] bg-[#DCD2C6] text-[#111111] border border-[#111111]/50 flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3 text-[#102D69]" />
                          {m.type}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openCourseModal(course)}
                        className="flex-1 py-2.5 px-3 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#F5B700]" />
                          VIEW &amp; DOWNLOAD ({mats.length})
                        </span>
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      {onOpenAssistant && (
                        <button
                          onClick={() => onOpenAssistant(course)}
                          title={`Ask VTU AI Tutor about ${course.code}`}
                          className="py-2.5 px-2.5 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase flex items-center gap-1 cursor-pointer transition-all shrink-0"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>AI</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* In-Site Document Viewer Modal */}
      {activeCourse && (
        <MaterialViewerModal
          key={activeCourse.code}
          course={activeCourse}
          onClose={() => openCourseModal(null)}
        />
      )}
    </section>
  );
}
