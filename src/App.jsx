import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import BranchedDomainTree from './components/BranchedDomainTree';
import FacultySection from './components/FacultySection';
import LabsSection from './components/LabsSection';
import CurriculumSection from './components/CurriculumSection';
import ProjectsAndEventsSection from './components/ProjectsAndEventsSection';
import { 
  Search, Terminal, Shield, ArrowRight, 
  Code2, Users, Cpu, Award, BookOpen, Sparkles 
} from 'lucide-react';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDomainId, setActiveDomainId] = useState(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleSelectResult(item) {
    if (item.type === 'domain') {
      const domainId = item.id.replace('domain-', '');
      setActiveDomainId(domainId);
    }
  }

  return (
    <div className="min-h-screen bg-[#E6DED4] text-[#111111] selection:bg-[#102D69] selection:text-[#F6F2EB]">
      
      {/* Search Command Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectResult}
      />

      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Poster Hero Section (Authentic INNOVEX '26 Poster Aesthetic) */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#111111]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Technical Coordinates & Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-[#111111]/20 font-tech text-xs tracking-widest uppercase font-bold text-[#111111]/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#102D69] animate-ping" />
              <span>12.85° N · 74.96° E MANGALURU, KARNATAKA</span>
            </div>
            <div className="flex items-center gap-2">
              <span>ENTRY PASS · SEASON 2026 NO. 0026</span>
              <span className="bg-[#102D69] text-[#F6F2EB] px-2 py-0.5 rounded-[2px] font-mono">
                PACE · CSE
              </span>
            </div>
          </div>

          {/* Search Quick Callout Plaque */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm hover:shadow-print hover:-translate-x-px hover:-translate-y-px transition-all font-tech text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#102D69]" />
              <span>LAUNCH CSE SPOTLIGHT SEARCH DIRECTORY</span>
              <span className="bg-[#111111] text-[#F6F2EB] px-1.5 py-0.2 rounded-[2px] font-mono text-[11px]">
                CTRL + K
              </span>
            </button>
          </div>

          {/* Giant Brutalist Poster Heading */}
          <div className="text-center max-w-5xl mx-auto space-y-3">
            <p className="font-tech text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-[#102D69]">
              P.A. COLLEGE OF ENGINEERING · NADUPADAV
            </p>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.88] text-[#111111]">
              COMPUTER SCIENCE <br />
              <span className="text-[#102D69] underline decoration-[#F5B700] decoration-4 underline-offset-8">
                &amp; ENGINEERING
              </span>
            </h1>
            <p className="font-sans text-xs sm:text-base text-[#111111]/80 max-w-2xl mx-auto pt-2 leading-relaxed font-medium">
              Autonomous engineering curricula, air-gapped cyber defense laboratories, and award-winning student prototypes built for national hackathons like INNOVEX '26.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] font-tech text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 border-2 border-[#111111] shadow-print hover:shadow-print-cobalt hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#F5B700]" />
              <span>SEARCH DIRECTORY (CTRL + K)</span>
            </button>

            <a
              href="#domains-section"
              className="w-full sm:w-auto px-6 py-3.5 rounded-[2px] bg-[#F6F2EB] hover:bg-[#E6DED4] text-[#111111] font-tech text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-[#111111] shadow-print hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              <Terminal className="w-4 h-4 text-[#102D69]" />
              <span>EXPLORE 5 SPECIALIZATION TRACKS</span>
            </a>
          </div>

          {/* Technical Metric Placards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#102D69] leading-none block">NBA</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">TIER-1 ACCREDITED</p>
            </div>
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#111111] leading-none block">94.8%</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">CAMPUS PLACEMENTS</p>
            </div>
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#102D69] leading-none block">04</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">CENTERS OF EXCELLENCE</p>
            </div>
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#111111] leading-none block">18+</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">HACKATHON WINS</p>
            </div>
          </div>

        </div>
      </section>

      {/* Specialization Domains & INNOVEX-style Branched Tree Menu */}
      <section id="domains-section" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BranchedDomainTree
            activeDomainId={activeDomainId}
            onSelectDomain={(d) => setActiveDomainId(d.id)}
          />
        </div>
      </section>

      {/* Faculty Directory Section with Pill Filters */}
      <FacultySection />

      {/* Laboratories & Centers of Excellence */}
      <LabsSection />

      {/* Autonomous Curriculum & Scheme */}
      <CurriculumSection />

      {/* Student Research, Prototypes & CTFs */}
      <ProjectsAndEventsSection />

      {/* Mechanical / Brutalist Footer */}
      <footer className="border-t-2 border-[#111111] bg-[#111111] py-12 text-[#F6F2EB] font-tech text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-heading text-2xl font-bold uppercase text-[#F6F2EB] tracking-wider leading-none">
              DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
            </p>
            <p className="text-[#F6F2EB]/70 uppercase tracking-wider">
              P.A. College of Engineering (PACE), Nadupadav, Mangaluru, Karnataka 574153
            </p>
            <p className="font-mono text-[#F5B700] text-[11px] uppercase">
              Affiliated to VTU Belagavi · Approved by AICTE · Accredited by NBA
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-bold uppercase tracking-wider text-[#F6F2EB]">
            <a href="#domains-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Tracks</a>
            <a href="#faculty-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Faculty</a>
            <a href="#labs-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Laboratories</a>
            <a href="#curriculum-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Syllabus</a>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-[#F5B700] underline cursor-pointer"
            >
              Spotlight Search (Ctrl+K)
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-[#F6F2EB]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#F6F2EB]/60 text-[11px] uppercase tracking-widest">
          <p>© {new Date().getFullYear()} PA-CSE · P.A. College of Engineering Mangaluru.</p>
          <p className="font-mono text-[#F5B700]">Engineered in the authentic INNOVEX '26 Print Brutalist Aesthetic</p>
        </div>
      </footer>

    </div>
  );
}
