import React, { useState, useRef } from 'react';
import { Search, Menu, X, Shield, Sparkles, ExternalLink } from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

export default function Navbar({ onOpenSearch }) {
  const { collegeInfo, announcement, openAdminModal } = useDepartmentData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  // Discreet secret: 3 quick clicks on the PACE seal opens admin customizer
  function handleSecretSealClick(e) {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 3) {
      e.preventDefault();
      clickCountRef.current = 0;
      openAdminModal('general');
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 600);
    }
  }

  return (
    <>
      {/* Top Urgent Announcement / Marquee Banner if enabled */}
      {announcement?.enabled && announcement?.text && (
        <div className="bg-[#102D69] text-[#F6F2EB] border-b-2 border-[#111111] py-1.5 px-4 font-tech text-xs tracking-wider">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden truncate">
              <span className="bg-[#F5B700] text-[#111111] text-[10px] font-black uppercase px-1.5 py-0.2 rounded-[2px] border border-[#111111] shrink-0">
                NOTICE
              </span>
              {announcement.link ? (
                <a
                  href={announcement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#F5B700] hover:underline flex items-center gap-1 truncate text-xs"
                >
                  <span className="truncate">{announcement.text}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              ) : (
                <span className="font-semibold text-[#F6F2EB] truncate text-xs">
                  {announcement.text}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b-2 border-[#111111] bg-[#E6DED4] backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Brand Seal / Logo */}
            <a 
              href="#" 
              onClick={handleSecretSealClick}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
              title="P.A. College of Engineering"
            >
              <div className="h-9 sm:h-10 px-2 sm:px-2.5 rounded-[2px] bg-[#102D69] border-2 border-[#111111] shadow-print-sm flex items-center justify-center text-[#F6F2EB] font-heading text-xl sm:text-2xl font-bold tracking-wider group-hover:-translate-x-px group-hover:-translate-y-px transition-transform select-none">
                {collegeInfo.shortName || 'PACE'}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#111111] leading-none truncate">
                    DEPT OF COMPUTER SCIENCE
                  </span>
                  <span className="hidden md:inline-block font-tech text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111] shrink-0">
                    NBA TIER-1
                  </span>
                </div>
                <p className="font-tech text-[11px] uppercase tracking-widest text-[#111111]/70 font-semibold hidden sm:block truncate">
                  P.A. College of Engineering · Mangaluru · Est. {collegeInfo.established || 2000}
                </p>
              </div>
            </a>

            {/* Central Search Omnibar (Desktop & Tablet) */}
            <div className="hidden sm:flex flex-1 max-w-xs md:max-w-sm lg:max-w-md mx-2">
              <button
                onClick={onOpenSearch}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm hover:shadow-print hover:-translate-x-px hover:-translate-y-px text-[#111111] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <Search className="w-3.5 h-3.5 text-[#102D69] shrink-0" />
                  <span className="font-tech text-xs font-semibold tracking-wide text-[#111111]/70 truncate uppercase">
                    Search faculty, syllabi, labs...
                  </span>
                </div>
                <div className="flex items-center gap-1 pl-1 font-mono text-[10px]">
                  <kbd className="px-1 py-0.2 rounded-[2px] bg-[#E6DED4] border border-[#111111] text-[#111111] font-bold">
                    Ctrl+K
                  </kbd>
                </div>
              </button>
            </div>

            {/* Right Desktop Navigation Anchors in Rajdhani Uppercase */}
            <nav className="hidden lg:flex items-center gap-5 font-tech text-sm font-bold uppercase tracking-wider text-[#111111]">
              <a href="#domains-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
                Tracks
              </a>
              <a href="#timeline-observatory" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
                3D Clock
              </a>
              <a href="#faculty-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
                Faculty
              </a>
              <a href="#labs-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
                Labs
              </a>
              <a href="#curriculum-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
                Syllabus
              </a>
              <a href="#projects-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
                Projects
              </a>
            </nav>

            {/* Actions: Search Button on mobile + Hamburger Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="p-1.5 sm:p-2 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                title="Search (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SEARCH</span>
              </button>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-1.5 sm:p-2 rounded-[2px] bg-[#F6F2EB] hover:bg-[#E6DED4] text-[#111111] border-2 border-[#111111] shadow-print-sm cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[#111111] bg-[#F6F2EB] p-4 shadow-print animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[#111111] font-tech text-xs font-bold uppercase text-[#102D69]">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                DEPARTMENT DIRECTORY NAVIGATION
              </span>
              <span className="font-mono text-[#111111]/60">PACE MANGALURU</span>
            </div>

            <nav className="grid grid-cols-2 gap-2 font-tech text-sm font-bold uppercase tracking-wider text-[#111111]">
              <a
                href="#domains-section"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] hover:bg-[#102D69] hover:text-[#F6F2EB] transition-colors flex items-center justify-between"
              >
                <span>5 Tracks</span>
                <Sparkles className="w-3.5 h-3.5 text-[#F5B700]" />
              </a>
              <a
                href="#timeline-observatory"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] hover:bg-[#102D69] hover:text-[#F6F2EB] transition-colors"
              >
                3D Chronology
              </a>
              <a
                href="#faculty-section"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] hover:bg-[#102D69] hover:text-[#F6F2EB] transition-colors"
              >
                Faculty
              </a>
              <a
                href="#labs-section"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] hover:bg-[#102D69] hover:text-[#F6F2EB] transition-colors"
              >
                Laboratories
              </a>
              <a
                href="#curriculum-section"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] hover:bg-[#102D69] hover:text-[#F6F2EB] transition-colors"
              >
                Syllabus
              </a>
              <a
                href="#projects-section"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] hover:bg-[#102D69] hover:text-[#F6F2EB] transition-colors"
              >
                Projects &amp; Events
              </a>
            </nav>

            <div className="mt-4 pt-3 border-t border-[#111111]/20">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full py-2.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#111111]"
              >
                <Search className="w-3.5 h-3.5 text-[#F5B700]" />
                <span>Open Search Directory (Ctrl+K)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
