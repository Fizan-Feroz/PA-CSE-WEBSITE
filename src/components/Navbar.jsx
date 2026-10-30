import React from 'react';
import { Search, Terminal, Sparkles, BookOpen, Users, Cpu, Rocket } from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              PA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors">
                  PA-CSE
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  NBA Accredited
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Dept. of Computer Science & Engineering · PACE Mangaluru
              </p>
            </div>
          </a>

          {/* Center Search Omnibar Trigger */}
          <div className="flex-1 max-w-md mx-2">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 transition-all shadow-inner group cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-normal text-slate-400 group-hover:text-slate-300 truncate">
                  Search faculty, courses, labs, CTF...
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 pl-2">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-800 border border-slate-700 text-slate-400 shadow-sm">
                  Ctrl
                </kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-800 border border-slate-700 text-slate-400 shadow-sm">
                  K
                </kbd>
              </div>
            </button>
          </div>

          {/* Right Navigation Anchors */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
            <a href="#domains-section" className="hover:text-cyan-400 transition-colors">
              Specializations
            </a>
            <a href="#faculty-section" className="hover:text-cyan-400 transition-colors">
              Faculty
            </a>
            <a href="#labs-section" className="hover:text-cyan-400 transition-colors">
              Research Labs
            </a>
            <a href="#curriculum-section" className="hover:text-cyan-400 transition-colors">
              Curriculum
            </a>
            <a href="#projects-section" className="hover:text-cyan-400 transition-colors">
              Innovation & CTF
            </a>
          </nav>

          {/* Fast Portal Link */}
          <div className="flex items-center gap-2">
            <a
              href="#events-section"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Events & Hackathons</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
