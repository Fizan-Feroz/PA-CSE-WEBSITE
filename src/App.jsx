import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import BranchedDomainTree from './components/BranchedDomainTree';
import FacultySection from './components/FacultySection';
import LabsSection from './components/LabsSection';
import CurriculumSection from './components/CurriculumSection';
import ProjectsAndEventsSection from './components/ProjectsAndEventsSection';
import { 
  Search, Sparkles, Terminal, Shield, ArrowRight, 
  ExternalLink, Code2, Users, Cpu, Award, BookOpen 
} from 'lucide-react';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDomainId, setActiveDomainId] = useState(null);

  // Global keyboard shortcut: Ctrl+K, Cmd+K, or '/' to open search
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
    <div className="min-h-screen bg-[#070b12] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectResult}
      />

      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-800/80">
        
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill Announcement */}
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-cyan-300 transition-all shadow-md group cursor-pointer"
            >
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-cyan-400 font-semibold">NEW</span>
              <span>Fast Department Spotlight Search live &middot; Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono border border-slate-700 text-slate-300">
                Ctrl + K
              </kbd>
            </button>
          </div>

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 leading-[1.15]">
              Department of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Computer Science & Engineering
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Empowering innovators at P.A. College of Engineering (PACE), Mangaluru. 
              Engineering scalable distributed systems, secure cyber defense networks, and ethical artificial intelligence.
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-102 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Launch Spotlight Search (Ctrl + K)</span>
            </button>

            <a
              href="#domains-section"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:border-slate-600"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Explore 5 Specialization Tracks</span>
            </a>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">NBA</span>
              <p className="text-xs text-slate-400 mt-1">Tier-1 Accredited</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">94.8%</span>
              <p className="text-xs text-slate-400 mt-1">Placement Record</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">4</span>
              <p className="text-xs text-slate-400 mt-1">Centers of Excellence</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">18+</span>
              <p className="text-xs text-slate-400 mt-1">Hackathon Victories</p>
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

      {/* Faculty Mentors Section with Filter Pills */}
      <FacultySection />

      {/* Laboratories & Infrastructure */}
      <LabsSection />

      {/* Autonomous Curriculum & Scheme */}
      <CurriculumSection />

      {/* Student Projects, Hackathons & CTFs */}
      <ProjectsAndEventsSection />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-bold text-slate-200 text-sm">
              Department of Computer Science & Engineering
            </p>
            <p className="text-slate-400">
              P.A. College of Engineering (PACE), Nadupadav, Mangaluru, Karnataka 574153
            </p>
            <p className="text-slate-500 text-[11px]">
              Affiliated to VTU Belagavi &middot; Approved by AICTE &middot; NBA Accredited
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-300">
            <a href="#domains-section" className="hover:text-cyan-400 transition-colors">Domains</a>
            <a href="#faculty-section" className="hover:text-cyan-400 transition-colors">Faculty</a>
            <a href="#labs-section" className="hover:text-cyan-400 transition-colors">Labs</a>
            <a href="#curriculum-section" className="hover:text-cyan-400 transition-colors">Curriculum</a>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Spotlight Search (Ctrl+K)
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>&copy; {new Date().getFullYear()} PA-CSE. Built with high-performance React &amp; Tailwind CSS.</p>
          <p className="font-mono text-cyan-400/80">Inspired by INNOVEX '26 Architecture &amp; Tree Navigation</p>
        </div>
      </footer>

    </div>
  );
}
