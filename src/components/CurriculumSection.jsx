import React, { useState, useMemo } from 'react';
import { BookOpen, Layers, Search, FileText } from 'lucide-react';
import { COURSES_SYLLABI } from '../data/cseData';

export default function CurriculumSection() {
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [query, setQuery] = useState('');

  const semesters = ['All', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'];

  const filteredCourses = useMemo(() => {
    return COURSES_SYLLABI.filter(c => {
      const matchSem = selectedSemester === 'All' || c.semester === selectedSemester;
      const cleanQ = query.toLowerCase().trim();
      const matchQ = !cleanQ ||
        c.code.toLowerCase().includes(cleanQ) ||
        c.title.toLowerCase().includes(cleanQ) ||
        c.domain.toLowerCase().includes(cleanQ) ||
        c.topics.some(t => t.toLowerCase().includes(cleanQ));
      return matchSem && matchQ;
    });
  }, [selectedSemester, query]);

  return (
    <section id="curriculum-section" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#E6DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#102D69]" />
              ACADEMIC SCHEME OF INSTRUCTION
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              AUTONOMOUS CSE CURRICULUM
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/70 max-w-xl mt-2 font-medium">
              Industry-aligned credit framework focusing on distributed algorithms, compiler design, and cloud infrastructures.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#111111]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search syllabus topic, e.g. 'Kubernetes'..."
              className="w-full pl-9 pr-3 py-2 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-tech text-sm text-[#111111] placeholder-[#111111]/45 focus:outline-none shadow-print-sm"
            />
          </div>
        </div>

        {/* Semester Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {semesters.map((sem) => {
            const isSelected = selectedSemester === sem;
            return (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-3.5 py-1.5 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-x-px -translate-y-px'
                    : 'bg-[#F6F2EB] border-[#111111] text-[#111111] hover:bg-[#E6DED4]'
                }`}
              >
                {sem}
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
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
                      {course.credits} CREDITS
                    </span>
                  </div>
                </div>

                <h4 className="font-tech text-lg font-bold uppercase tracking-wide text-[#111111] mb-1">
                  {course.title}
                </h4>

                <p className="font-tech text-xs font-semibold uppercase text-[#102D69] mb-4">
                  {course.domain}
                </p>

                <div>
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

              <div className="pt-4 mt-4 border-t-2 border-[#111111] flex items-center justify-between font-tech text-xs font-bold uppercase">
                <span className="flex items-center gap-1.5 text-[#111111]">
                  <FileText className="w-3.5 h-3.5 text-[#102D69]" />
                  SYLLABUS PDF
                </span>
                <span className="text-[#102D69] underline cursor-pointer">
                  VIEW SCHEME &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
