import React, { useState, useMemo } from 'react';
import { BookOpen, Layers, Search, CheckCircle, FileText } from 'lucide-react';
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
    <section id="curriculum-section" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Syllabus & Scheme of Instruction
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mt-1">
              Autonomous CSE Curriculum
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-1">
              Industry-aligned credit framework emphasizing systems programming, algorithmic rigor, and cloud architectures.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, e.g. 'Kubernetes'..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>
        </div>

        {/* Semester Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {semesters.map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                selectedSemester === sem
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {sem}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.code}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    {course.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      {course.semester}
                    </span>
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-amber-400 border border-amber-500/20">
                      {course.credits} Credits
                    </span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-1">
                  {course.title}
                </h4>

                <p className="text-xs text-slate-400 mb-4">
                  {course.domain}
                </p>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                    Key Syllabus Modules
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  Detailed Syllabus PDF
                </span>
                <span className="text-cyan-400 font-semibold group-hover:underline">
                  View Syllabus &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
