import React, { useState, useMemo } from 'react';
import { Mail, MapPin, Award, Search, Users } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/cseData';

export default function FacultySection() {
  const [activeDepartment, setActiveDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = useMemo(() => {
    const counts = { All: FACULTY_MEMBERS.length };
    FACULTY_MEMBERS.forEach(f => {
      counts[f.department] = (counts[f.department] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

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
    <section id="faculty-section" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#E6DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#102D69]" />
              ACADEMIC COUNCIL &amp; FACULTY DIRECTORY
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              FACULTY &amp; RESEARCH MENTORS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/70 max-w-xl mt-2 font-medium">
              Distinguished professors, doctoral supervisors, and industry fellows heading research labs and student innovation chapters.
            </p>
          </div>

          {/* Quick in-section search styled like print register */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#111111]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name / specialization..."
              className="w-full pl-9 pr-3 py-2 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-tech text-sm text-[#111111] placeholder-[#111111]/45 focus:outline-none shadow-print-sm"
            />
          </div>
        </div>

        {/* Filter Pills (Exact INNOVEX team switcher aesthetic) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {departments.map((dept) => {
            const isSelected = activeDepartment === dept.name;
            return (
              <button
                key={dept.name}
                onClick={() => setActiveDepartment(dept.name)}
                className={`px-3.5 py-1.5 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer flex items-center gap-2 border-2 ${
                  isSelected
                    ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-x-px -translate-y-px'
                    : 'bg-[#F6F2EB] border-[#111111] text-[#111111] hover:bg-[#E6DED4]'
                }`}
              >
                <span>{dept.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-[2px] font-mono font-bold ${
                  isSelected ? 'bg-[#F5B700] text-[#111111]' : 'bg-[#E6DED4] text-[#111111]'
                }`}>
                  {dept.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Faculty Placards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.length === 0 ? (
            <div className="col-span-full py-12 text-center font-tech text-base text-[#111111]/60 uppercase">
              No faculty found matching the active search query.
            </div>
          ) : (
            filteredFaculty.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-5 flex flex-col justify-between transition-transform hover:-translate-x-px hover:-translate-y-px"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="size-16 rounded-[2px] object-cover border-2 border-[#111111] shrink-0 shadow-print-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-tech text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[#102D69] text-[#F6F2EB] border border-[#111111]">
                          {faculty.department}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-[#111111]/60">
                          {faculty.experience} EXP
                        </span>
                      </div>
                      <h4 className="font-tech text-lg font-bold text-[#111111] truncate uppercase">
                        {faculty.name}
                      </h4>
                      <p className="font-tech text-xs text-[#102D69] font-bold uppercase tracking-wide truncate">
                        {faculty.designation}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#111111]/80 mb-4 line-clamp-2 leading-relaxed">
                    <strong className="font-tech text-xs uppercase text-[#111111] block mb-0.5">Specialization:</strong>
                    {faculty.specialization}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {faculty.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-tech text-[11px] font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#E6DED4] text-[#111111] border border-[#111111]/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-[#111111] flex items-center justify-between font-tech text-xs">
                  <span className="flex items-center gap-1.5 text-[#111111] font-semibold truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#102D69] shrink-0" />
                    <span className="truncate">{faculty.cabin}</span>
                  </span>
                  <a
                    href={`mailto:${faculty.email}`}
                    className="p-1.5 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] border border-[#111111] text-[#111111] transition-colors"
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
