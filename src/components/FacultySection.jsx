import React, { useState, useMemo } from 'react';
import { Mail, MapPin, Award, Search, Users } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/cseData';

export default function FacultySection() {
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract departments with count
  const departments = useMemo(() => {
    const counts = { All: FACULTY_MEMBERS.length };
    FACULTY_MEMBERS.forEach(f => {
      counts[f.department] = (counts[f.department] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  // Filter faculty
  const filteredFaculty = useMemo(() => {
    return FACULTY_MEMBERS.filter(f => {
      const matchesDept = activeDepartment === 'All' || f.department === activeDepartment;
      const cleanTerm = searchTerm.toLowerCase().trim();
      const matchesSearch = !cleanTerm || 
        f.name.toLowerCase().includes(cleanTerm) ||
        f.designation.toLowerCase().includes(cleanTerm) ||
        f.specialization.toLowerCase().includes(cleanTerm) ||
        f.tags.some(t => t.toLowerCase().includes(cleanTerm));
      return matchesDept && matchesSearch;
    });
  }, [activeDepartment, searchTerm]);

  return (
    <section id="faculty-section" className="py-12 sm:py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Academic Mentorship
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mt-1">
              Distinguished Faculty & Research Mentors
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-1">
              Ph.D. researchers, patent holders, and industry practitioners leading our academic classrooms and research labs.
            </p>
          </div>

          {/* Quick in-section search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter faculty by name/domain..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
          </div>
        </div>

        {/* Category Filter Pills (Signature INNOVEX pattern) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {departments.map((dept) => {
            const isSelected = activeDepartment === dept.name;
            return (
              <button
                key={dept.name}
                onClick={() => setActiveDepartment(dept.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{dept.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {dept.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              No faculty found matching the selected filter.
            </div>
          ) : (
            filteredFaculty.map((faculty) => (
              <div
                key={faculty.id}
                className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 transition-all shadow-lg hover:shadow-cyan-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="size-14 rounded-xl object-cover border border-slate-700/80 group-hover:border-cyan-500/60 shrink-0 shadow-md"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-medium">
                          {faculty.department}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {faculty.experience} exp
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate mt-1">
                        {faculty.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{faculty.designation}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                    <span className="text-slate-500 font-mono text-[11px] block mb-0.5">Focus:</span>
                    {faculty.specialization}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {faculty.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-[11px] truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{faculty.cabin}</span>
                  </span>
                  <a
                    href={`mailto:${faculty.email}`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-colors"
                    title={faculty.email}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
