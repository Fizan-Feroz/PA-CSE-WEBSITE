import React from 'react';
import { Search, Bot, LogIn, Shield, Settings } from 'lucide-react';

export default function Navbar({
  onOpenSearch,
  onOpenAssistant,
  onOpenAccount,
  onOpenManage,
  isLoggedIn,
  activeRole,
  canManagePortal
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#111111] bg-[#E6DED4] backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
          
          {/* Brand Seal / Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink">
            <div className="h-9 sm:h-10 px-2 sm:px-2.5 rounded-[2px] bg-[#102D69] border-2 border-[#111111] shadow-print-sm flex items-center justify-center text-[#F6F2EB] font-heading text-xl sm:text-2xl font-bold tracking-wider group-hover:-translate-x-px group-hover:-translate-y-px transition-transform shrink-0">
              PACE
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#111111] leading-none truncate">
                  DEPT OF CSE
                </span>
                <span className="hidden sm:inline-block font-tech text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111] shrink-0">
                  NBA TIER-1
                </span>
              </div>
              <p className="font-tech text-[11px] uppercase tracking-widest text-[#111111]/70 font-semibold hidden md:block truncate">
                P.A. College of Engineering · Mangaluru
              </p>
            </div>
          </a>

          {/* Central Search Omnibar (INNOVEX Brutalist Print Input) */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm min-w-0 mx-1">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm hover:shadow-print hover:-translate-x-px hover:-translate-y-px text-[#111111] transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Search className="w-4 h-4 text-[#102D69] shrink-0" />
                <span className="font-tech text-xs font-semibold tracking-wide text-[#111111]/70 truncate uppercase">
                  Search faculty, syllabi, labs...
                </span>
              </div>
              <div className="hidden lg:flex items-center gap-1 pl-2 font-mono text-[10px] shrink-0">
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
          <nav className="hidden xl:flex items-center gap-4 font-tech text-sm font-bold uppercase tracking-wider text-[#111111] shrink-0 whitespace-nowrap">
            <a href="#student-hub-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Student Hub
            </a>
            <a href="#curriculum-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Materials
            </a>
            <a href="#local-ai-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Local AI
            </a>
            <a href="#faculty-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Faculty
            </a>
            <a href="#labs-section" className="hover:text-[#102D69] transition-colors underline-offset-4 hover:underline">
              Labs
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onOpenAssistant && (
              <button
                onClick={onOpenAssistant}
                title="Open VTU AI Study Assistant"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] hover:bg-[#DCD2C6] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider transition-all hover:-translate-x-px hover:-translate-y-px cursor-pointer whitespace-nowrap"
              >
                <Bot className="w-3.5 h-3.5 text-[#102D69]" />
                <span className="hidden sm:inline">AI TUTOR</span>
              </button>
            )}

            {isLoggedIn && canManagePortal && onOpenManage && (
              <button
                onClick={onOpenManage}
                title="Manage Timetables, Courses & Roles"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider transition-all hover:-translate-x-px hover:-translate-y-px cursor-pointer whitespace-nowrap"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">MANAGE</span>
              </button>
            )}

            {onOpenAccount && (
              isLoggedIn && activeRole ? (
                <button
                  onClick={onOpenAccount}
                  title="View Account & Permissions"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider transition-all hover:-translate-x-px hover:-translate-y-px cursor-pointer whitespace-nowrap"
                  style={{
                    backgroundColor: activeRole.color,
                    color: activeRole.color === '#F5B700' ? '#111111' : '#F6F2EB'
                  }}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{activeRole.name}</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAccount}
                  title="Sign In to Portal"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider transition-all hover:-translate-x-px hover:-translate-y-px cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#F5B700]" />
                  <span className="hidden sm:inline">SIGN IN</span>
                </button>
              )
            )}

            <button
              onClick={onOpenSearch}
              title="Search Portal (Ctrl+K)"
              className="md:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider transition-all hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
