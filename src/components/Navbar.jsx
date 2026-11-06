import React from 'react';
import { Search } from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#111111] bg-[#E6DED4] backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Seal / Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-10 px-2.5 rounded-[2px] bg-[#102D69] border-2 border-[#111111] shadow-print-sm flex items-center justify-center text-[#F6F2EB] font-heading text-2xl font-bold tracking-wider group-hover:-translate-x-px group-hover:-translate-y-px transition-transform">
              PACE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-bold uppercase tracking-wider text-[#111111] leading-none">
                  DEPT OF COMPUTER SCIENCE
                </span>
                <span className="hidden sm:inline-block font-tech text-[11px] font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111]">
                  NBA TIER-1
                </span>
              </div>
              <p className="font-tech text-xs uppercase tracking-widest text-[#111111]/70 font-semibold hidden md:block">
                P.A. College of Engineering · Mangaluru · Est. 2000
              </p>
            </div>
          </a>

          {/* Central Search Omnibar (INNOVEX Brutalist Print Input) */}
          <div className="flex-1 max-w-md mx-2">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm hover:shadow-print hover:-translate-x-px hover:-translate-y-px text-[#111111] transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-[#102D69] shrink-0" />
                <span className="font-tech text-xs sm:text-sm font-semibold tracking-wide text-[#111111]/70 truncate uppercase">
                  Search faculty, syllabi, labs, research...
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 pl-2 font-mono text-[10px]">
                <kbd className="px-1.5 py-0.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] text-[#111111] font-bold">
                  CTRL
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] text-[#111111] font-bold">
                  K
                </kbd>
              </div>
            </button>
          </div>

          {/* Right Navigation Anchors in Rajdhani Uppercase */}
          <nav className="hidden lg:flex items-center gap-6 font-tech text-sm font-bold uppercase tracking-wider text-[#111111]">
            <a href="#domains-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              5 Tracks
            </a>
            <a href="#faculty-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Faculty
            </a>
            <a href="#labs-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Laboratories
            </a>
            <a href="#curriculum-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Syllabus
            </a>
            <a href="#projects-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Innovation & CTF
            </a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider transition-all hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
