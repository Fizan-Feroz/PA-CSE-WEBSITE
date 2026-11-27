import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import BranchedDomainTree from './components/BranchedDomainTree';
import FacultySection from './components/FacultySection';
import LabsSection from './components/LabsSection';
import CurriculumSection from './components/CurriculumSection';
import ProjectsAndEventsSection from './components/ProjectsAndEventsSection';
import TimelineObservatory3D from './components/TimelineObservatory3D';
import StudentHubSection from './components/StudentHubSection';
import LocalAISection from './components/LocalAISection';
import FacultySetupModal from './components/FacultySetupModal';
import AcademicChatbotModal from './components/AcademicChatbotModal';
import { COLLEGE_INFO, SECTION_TIMETABLES, COURSES_SYLLABI } from './data/cseData';
import { SUBJECT_CORPUS } from './data/academicCorpus';
import { loadPortalOverrides, savePortalOverrides, fetchLivePortalData } from './utils/portalStore';
import { loadRbacState, saveRbacState } from './utils/rbac';
import { Search, Compass, Phone, Mail, MapPin, BookOpen, Cpu } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFacultySetupOpen, setIsFacultySetupOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantCourse, setAssistantCourse] = useState('ALL');
  const [activeDomainId, setActiveDomainId] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [activeCourseCode, setActiveCourseCode] = useState(null);
  const [timetables, setTimetables] = useState(() => loadPortalOverrides().timetables || SECTION_TIMETABLES);
  const [courses, setCourses] = useState(() => loadPortalOverrides().courses || COURSES_SYLLABI);
  const [rbacState, setRbacState] = useState(() => loadRbacState());

  const activeRole = rbacState.roles.find(r => r.id === rbacState.activeRoleId) || rbacState.roles[0];

  function handleUpdateRbac(nextState) {
    setRbacState(nextState);
    saveRbacState(nextState);
  }

  useEffect(() => {
    let active = true;
    fetchLivePortalData(SECTION_TIMETABLES, COURSES_SYLLABI).then((res) => {
      if (!active || res.source !== 'supabase') return;
      setTimetables(res.timetables);
      setCourses(res.courses);
    });

    function syncFromStore() {
      const overrides = loadPortalOverrides();
      setTimetables(overrides.timetables || SECTION_TIMETABLES);
      setCourses(overrides.courses || COURSES_SYLLABI);
    }
    window.addEventListener('pace-portal-updated', syncFromStore);
    return () => {
      active = false;
      window.removeEventListener('pace-portal-updated', syncFromStore);
    };
  }, []);

  function handleSaveTimetables(nextTimetables) {
    setTimetables(nextTimetables);
    const current = loadPortalOverrides();
    savePortalOverrides({ ...current, timetables: nextTimetables });
  }

  function handleSaveCourses(nextCourses) {
    setCourses(nextCourses);
    const current = loadPortalOverrides();
    savePortalOverrides({ ...current, courses: nextCourses });
  }

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
    } else if (item.type === 'course' && item.courseCode) {
      setActiveCourseCode(item.courseCode);
    } else if (item.type === 'timetable' && item.section) {
      setSelectedSection(item.section);
    }
  }

  function handleOpenAssistant(courseOrCode = 'ALL') {
    if (typeof courseOrCode === 'string') {
      setAssistantCourse(courseOrCode);
    } else if (courseOrCode && typeof courseOrCode === 'object') {
      const titleLower = String(courseOrCode.title || '').toLowerCase();
      const match = SUBJECT_CORPUS.find((s) => {
        const words = s.title.toLowerCase().split(/\s+/).filter(w => w.length >= 5);
        return words.some(w => titleLower.includes(w));
      });
      setAssistantCourse(match ? match.courseCode : 'ALL');
    } else {
      setAssistantCourse('ALL');
    }
    setIsAssistantOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#E6DED4] text-[#111111] selection:bg-[#102D69] selection:text-[#F6F2EB]">
      
      {/* Search Command Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectResult}
        courses={courses}
        timetables={timetables}
      />

      {/* VTU Academic Knowledge Assistant Modal */}
      <AcademicChatbotModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        defaultCourse={assistantCourse}
      />

      {/* Faculty Quick Setup Modal (Timetable Image Scanner, Course Files & Discord-Style Roles) */}
      <FacultySetupModal
        isOpen={isFacultySetupOpen}
        onClose={() => setIsFacultySetupOpen(false)}
        timetables={timetables}
        onSaveTimetables={handleSaveTimetables}
        courses={courses}
        onSaveCourses={handleSaveCourses}
        rbacState={rbacState}
        activeRole={activeRole}
        onUpdateRbac={handleUpdateRbac}
      />

      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFacultySetup={() => setIsFacultySetupOpen(true)}
        onOpenAssistant={() => handleOpenAssistant('ALL')}
      />

      {/* Poster Hero Section (Print Brutalist Visual Engine with SMIL Orbiting Eye & Spark) */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#111111]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Technical Coordinates & Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-[#111111]/20 font-tech text-xs tracking-widest uppercase font-bold text-[#111111]/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#102D69] animate-ping" />
              <span>{COLLEGE_INFO.coordinates} · NADUPADAV, MANGALURU</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">ESTD 2000 · VTU BELAGAVI · AICTE APPROVED</span>
              <span className="bg-[#102D69] text-[#F6F2EB] px-2 py-0.5 rounded-[2px] font-mono">
                NBA TIER-1
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

          {/* Central Mechanical Eye Graphic with Continuous SMIL Orbits */}
          <div className="relative mx-auto w-40 h-28 sm:w-48 sm:h-32 mb-4 flex items-center justify-center">
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="-120 -80 240 160"
            >
              {/* Elliptical Orbit 1 with continuous SMIL revolution */}
              <g transform="rotate(-20)">
                <ellipse rx="100" ry="32" fill="none" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
                <circle r="4" fill="#F5B700" stroke="#111111" strokeWidth="1.5">
                  <animateMotion 
                    path="M100 0A100 32 0 1 1 -100 0A100 32 0 1 1 100 0Z" 
                    dur="8s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </g>

              {/* Elliptical Orbit 2 with continuous SMIL revolution */}
              <g transform="rotate(25)">
                <ellipse rx="90" ry="36" fill="none" stroke="#102D69" strokeWidth="1.5" opacity="0.7" />
                <circle r="4" fill="#102D69" stroke="#111111" strokeWidth="1.5">
                  <animateMotion 
                    path="M90 0A90 36 0 1 1 -90 0A90 36 0 1 1 90 0Z" 
                    dur="11s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </g>

              {/* Central Focal Eye / Academic Pupil */}
              <circle r="16" fill="#F6F2EB" stroke="#111111" strokeWidth="2.5" />
              <circle r="8" fill="#102D69" />
              <circle r="3" fill="#F5B700" />
            </svg>
          </div>

          {/* Giant Brutalist Poster Heading */}
          <div className="text-center max-w-5xl mx-auto space-y-3">
            <p className="font-tech text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-[#102D69]">
              P.A. COLLEGE OF ENGINEERING · NADUPADAV, MANGALURU
            </p>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.88] text-[#111111]">
              COMPUTER SCIENCE <br />
              <span className="text-[#102D69] underline decoration-[#F5B700] decoration-4 underline-offset-8">
                &amp; ENGINEERING
              </span>
            </h1>
            <p className="font-sans text-xs sm:text-base text-[#111111]/80 max-w-2xl mx-auto pt-2 leading-relaxed font-medium">
              Autonomous engineering curricula, air-gapped cyber defense laboratories, VTU-recognized doctoral research center, and student innovation bodies ASCII &amp; GLUG PACE.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full sm:w-auto px-5 py-3.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] font-tech text-sm sm:text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-[#111111] shadow-print hover:shadow-print-cobalt hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#F5B700]" />
              <span>SEARCH EVERYTHING (CTRL + K)</span>
            </button>

            <a
              href="#curriculum-section"
              className="w-full sm:w-auto px-5 py-3.5 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] font-tech text-sm sm:text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-[#111111] shadow-print hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#111111]" />
              <span>COURSE MATERIALS (SEM 1–8)</span>
            </a>

            <a
              href="#local-ai-section"
              className="w-full sm:w-auto px-5 py-3.5 rounded-[2px] bg-[#F6F2EB] hover:bg-[#E6DED4] text-[#111111] font-tech text-sm sm:text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-[#111111] shadow-print hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              <Cpu className="w-4 h-4 text-[#102D69]" />
              <span>LOCAL AI SETUP</span>
            </a>

            <a
              href="#timeline-observatory"
              className="w-full sm:w-auto px-5 py-3.5 rounded-[2px] bg-[#F6F2EB] hover:bg-[#E6DED4] text-[#111111] font-tech text-sm sm:text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-[#111111] shadow-print hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              <Compass className="w-4 h-4 text-[#102D69]" />
              <span>3D OBSERVATORY</span>
            </a>
          </div>

          {/* Technical Metric Placards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#102D69] leading-none block">NBA</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">TIER-1 ACCREDITED</p>
            </div>
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#111111] leading-none block">VTU</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">RESEARCH CENTRE</p>
            </div>
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#102D69] leading-none block">06</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">SPECIALIZED LABS</p>
            </div>
            <div className="p-4 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm text-center">
              <span className="font-heading text-4xl sm:text-5xl font-bold text-[#111111] leading-none block">25+</span>
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 mt-1">YEARS OF EXCELLENCE</p>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission Callout Plaque (Direct from pace.edu.in) */}
      <section className="py-8 bg-[#F6F2EB] border-b-2 border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Vision */}
            <div className="lg:col-span-5 bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm p-6 rounded-[2px] flex flex-col justify-between">
              <div>
                <span className="font-tech text-xs font-bold uppercase tracking-widest text-[#102D69] block mb-1">
                  DEPARTMENT VISION · PACE MANGALURU
                </span>
                <h3 className="font-heading text-3xl font-bold uppercase text-[#111111] mb-2 leading-none">
                  COMPETENT PROFESSIONALS FOR INDUSTRY &amp; SOCIETY
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#111111]/85 font-medium leading-relaxed italic">
                  "{COLLEGE_INFO.vision}"
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#111111]/20 flex items-center justify-between text-xs font-tech font-bold uppercase text-[#102D69]">
                <span>Head of Department: {COLLEGE_INFO.vicePrincipalAndHod}</span>
                <span className="font-mono text-[#111111]">hod_cs@pace.edu.in</span>
              </div>
            </div>

            {/* Mission */}
            <div className="lg:col-span-7 bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm p-6 rounded-[2px]">
              <span className="font-tech text-xs font-bold uppercase tracking-widest text-[#102D69] block mb-1">
                DEPARTMENT MISSION OBJECTIVES
              </span>
              <h3 className="font-heading text-3xl font-bold uppercase text-[#111111] mb-3 leading-none">
                FOUR PILLARS OF ACADEMIC EXCELLENCE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COLLEGE_INFO.mission.map((m, idx) => (
                  <div key={idx} className="p-3 bg-[#F6F2EB] border border-[#111111] rounded-[2px] flex gap-2.5 items-start">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] shrink-0">
                      M{idx + 1}
                    </span>
                    <p className="font-sans text-xs text-[#111111]/85 font-medium leading-relaxed">
                      {m}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* One-Stop Student Hub: Notice Board, Quick Portals & Chapters */}
      <StudentHubSection
        timetables={timetables}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
        onOpenFacultySetup={() => setIsFacultySetupOpen(true)}
        onOpenAssistant={handleOpenAssistant}
      />

      {/* Autonomous Curriculum & Course Materials Vault (Semesters 1–8) */}
      <CurriculumSection
        courses={courses}
        onOpenFacultySetup={() => setIsFacultySetupOpen(true)}
        onOpenAssistant={handleOpenAssistant}
        activeCourseCode={activeCourseCode}
        onSelectCourseCode={setActiveCourseCode}
      />

      {/* Local AI Setup Workbench for Offline Coding & Study */}
      <LocalAISection />

      {/* Specialization Domains & VTU Autonomous Curriculum Circuit Tree */}
      <section id="domains-section" className="py-12 sm:py-16 border-t-2 border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BranchedDomainTree
            activeDomainId={activeDomainId}
            onSelectDomain={(d) => setActiveDomainId(d.id)}
          />
        </div>
      </section>

      {/* 3D Astronomical Clock / Department Chronology Observatory */}
      <TimelineObservatory3D />

      {/* Faculty Directory Section with Pill Filters */}
      <FacultySection />

      {/* Laboratories & Centers of Excellence */}
      <LabsSection />

      {/* Student Research, Prototypes & Events */}
      <ProjectsAndEventsSection />

      {/* Department Footer with Authentic Contact Details */}
      <footer className="border-t-2 border-[#111111] bg-[#111111] py-12 text-[#F6F2EB] font-tech text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <p className="font-heading text-2xl font-bold uppercase text-[#F6F2EB] tracking-wider leading-none">
              DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
            </p>
            <p className="text-[#F6F2EB]/80 uppercase tracking-wider">
              P.A. College of Engineering (PACE), Nadupadav, Montepadav Post, Mangaluru - 574153
            </p>
            <p className="font-mono text-[#F5B700] text-[11px] uppercase">
              Affiliated to VTU Belagavi · Approved by AICTE New Delhi · Accredited by NBA Tier-1
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-[#F6F2EB]/70 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#F5B700]" /> 0824-2284701 / 02 / 03
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#F5B700]" /> hod_cs@pace.edu.in
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F5B700]" /> 12.85° N · 74.96° E
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-bold uppercase tracking-wider text-[#F6F2EB]">
            <a href="#student-hub-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Student Hub</a>
            <a href="#curriculum-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Materials</a>
            <a href="#local-ai-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Local AI</a>
            <a href="#faculty-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Faculty</a>
            <a href="#labs-section" className="hover:text-[#F5B700] transition-colors underline-offset-4 hover:underline">Labs</a>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-[#F5B700] underline cursor-pointer"
            >
              Spotlight Search (Ctrl+K)
            </button>
            <button
              onClick={() => setIsFacultySetupOpen(true)}
              className="text-[#F6F2EB]/70 hover:text-[#F5B700] underline cursor-pointer"
            >
              Faculty / Staff Portal
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-[#F6F2EB]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#F6F2EB]/60 text-[11px] uppercase tracking-widest">
          <p>© {CURRENT_YEAR} Department of CSE · P.A. College of Engineering Mangaluru (pace.edu.in).</p>
          <p className="font-mono text-[#F5B700]">Official Department Portal · Print Brutalist Architecture with 3D Astrolabe</p>
        </div>
      </footer>

    </div>
  );
}
