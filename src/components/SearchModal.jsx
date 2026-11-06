import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Search, X, User, BookOpen, Cpu, Rocket, Calendar, ArrowRight, 
  CornerDownLeft, Sparkles, Shield
} from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const { domains, faculty, curriculum, labs, projects, events, openAdminModal } = useDepartmentData();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setQuery('');
        setActiveCategory('all');
      }, 50);
      return () => clearTimeout(resetTimer);
    }
  }, [isOpen]);

  const allItems = useMemo(() => {
    const list = [];

    // Administrative Command Palette Action
    list.push({
      id: 'cmd-admin-cms',
      category: 'Commands',
      type: 'action',
      actionType: 'open-admin',
      title: 'OPEN DEPARTMENT ADMIN CMS & CUSTOMIZER',
      subtitle: 'Real-time content management panel for faculty, syllabi, labs & settings',
      description: 'Passcode protected admin suite (default: pace2026) · Shortcut: Ctrl+Shift+A',
      icon: Shield,
      badge: 'ADMIN CMD',
      targetId: 'admin-modal',
      keywords: ['admin', 'cms', 'cmd', 'command', 'settings', 'edit', 'manage', 'customizer', 'control', 'pace2026', 'password']
    });

    // Domains
    domains.forEach(d => {
      list.push({
        id: `domain-${d.id}`,
        category: 'Domains',
        type: 'domain',
        title: d.name,
        subtitle: `Track ${d.code} · Lead: ${d.head}`,
        description: d.summary,
        icon: Sparkles,
        badge: `TRACK ${d.code}`,
        targetId: 'domains-section',
        keywords: [d.name, d.shortName, d.head, ...(d.skills || []), ...(d.labs || [])]
      });
    });

    // Faculty
    faculty.forEach(f => {
      list.push({
        id: `fac-${f.id}`,
        category: 'Faculty',
        type: 'faculty',
        title: f.name,
        subtitle: `${f.designation} · ${f.office || f.cabin || 'Academic Block A'}`,
        description: f.specialization,
        icon: User,
        badge: (f.department || 'CSE').toUpperCase(),
        targetId: 'faculty-section',
        keywords: [f.name, f.designation, f.specialization, f.department, f.office || '', ...(f.tags || [])]
      });
    });

    // Courses
    curriculum.forEach(c => {
      list.push({
        id: `course-${c.code}`,
        category: 'Courses',
        type: 'course',
        title: `${c.code}: ${c.title}`,
        subtitle: `${c.semester} · ${c.credits} Credits · ${c.domain}`,
        description: `Topics: ${(c.topics || []).join(', ')}`,
        icon: BookOpen,
        badge: (c.semester || 'SYLLABUS').toUpperCase(),
        targetId: 'curriculum-section',
        keywords: [c.code, c.title, c.semester, c.domain, ...(c.topics || [])]
      });
    });

    // Labs
    labs.forEach(l => {
      list.push({
        id: `lab-${l.id}`,
        category: 'Labs',
        type: 'lab',
        title: l.name,
        subtitle: `${l.code} · ${l.capacity} · Lead: ${l.inCharge}`,
        description: l.hardware,
        icon: Cpu,
        badge: l.code,
        targetId: 'labs-section',
        keywords: [l.name, l.code, l.hardware, l.inCharge, l.purpose || '']
      });
    });

    // Projects
    projects.forEach(p => {
      list.push({
        id: `proj-${p.id}`,
        category: 'Projects',
        type: 'project',
        title: p.title,
        subtitle: `${p.team} · ${p.domain}`,
        description: p.description,
        icon: Rocket,
        badge: p.status?.includes('KSCST') ? 'KSCST' : (p.status?.includes('SIH') ? 'SIH' : 'PROJECT'),
        targetId: 'projects-section',
        keywords: [p.title, p.team, p.domain, p.description, ...(p.technologies || [])]
      });
    });

    // Events
    events.forEach(e => {
      list.push({
        id: `event-${e.id}`,
        category: 'Events',
        type: 'event',
        title: e.title,
        subtitle: `${e.date} · ${e.venue}`,
        description: e.description,
        icon: Calendar,
        badge: (e.type || 'EVENT').toUpperCase(),
        targetId: 'events-section',
        keywords: [e.title, e.date, e.venue, e.type, e.description]
      });
    });

    return list;
  }, [domains, faculty, curriculum, labs, projects, events]);

  const filteredResults = useMemo(() => {
    let items = allItems;
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
    }

    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return items.slice(0, 12);

    const scored = [];
    items.forEach(item => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const subLower = item.subtitle.toLowerCase();
      const descLower = item.description.toLowerCase();

      // Canonical weighted scoring formula from AGENTS.md
      if (titleLower === cleanQuery) score += 100;
      else if (titleLower.startsWith(cleanQuery)) score += 60;
      else if (titleLower.includes(cleanQuery)) score += 40;

      if (item.badge && item.badge.toLowerCase() === cleanQuery) score += 80;
      else if (item.badge && item.badge.toLowerCase().includes(cleanQuery)) score += 50;

      if (subLower.includes(cleanQuery)) score += 20;
      if (descLower.includes(cleanQuery)) score += 10;

      if (item.keywords && Array.isArray(item.keywords)) {
        for (const kw of item.keywords) {
          if (!kw) continue;
          const kwLower = String(kw).toLowerCase();
          if (kwLower === cleanQuery) {
            score += 30;
            break;
          } else if (kwLower.includes(cleanQuery)) {
            score += 15;
            break;
          }
        }
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.item).slice(0, 12);
  }, [allItems, activeCategory, query]);

  const handleSelect = useCallback((item) => {
    if (!item) return;
    onClose();
    if (item.actionType === 'open-admin') {
      openAdminModal('general');
      return;
    }
    if (onSelectResult) {
      onSelectResult(item);
    }
    const el = document.getElementById(item.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onClose, onSelectResult, openAdminModal]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose, handleSelect]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'ALL ENTRIES' },
    { id: 'commands', label: 'COMMANDS' },
    { id: 'domains', label: '5 TRACKS' },
    { id: 'faculty', label: 'FACULTY' },
    { id: 'courses', label: 'SYLLABUS' },
    { id: 'labs', label: 'LABS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'events', label: 'EVENTS' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#111111]/70 backdrop-blur-sm animate-in fade-in duration-100">
      <div 
        className="w-full max-w-2xl bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Technical Metadata Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b-2 border-[#111111] bg-[#E6DED4] text-[#111111] font-tech text-xs tracking-wider">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-[#102D69]">PACE · CSE INDEX</span>
            <span className="opacity-40">|</span>
            <span className="font-mono text-[10px] sm:text-[11px] truncate">12.85° N · 74.96° E MANGALURU</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] shrink-0">
            <button
              onClick={onClose}
              className="bg-[#111111] text-[#F6F2EB] px-1.5 py-0.2 uppercase font-bold cursor-pointer"
            >
              ESC TO CLOSE
            </button>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="flex items-center px-3 sm:px-4 py-3 sm:py-3.5 border-b-2 border-[#111111] bg-[#F6F2EB] gap-2.5 sm:gap-3">
          <Search className="w-5 h-5 text-[#102D69] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search faculty, labs, curriculum modules, research projects, events, or type 'admin'..."
            className="flex-1 bg-transparent text-[#111111] placeholder-[#111111]/45 text-sm sm:text-base font-medium focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#111111]/60 hover:text-[#111111] border border-[#111111]/20 hover:border-[#111111] rounded-[2px] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pill Switcher */}
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 border-b-2 border-[#111111] bg-[#E6DED4]/60 overflow-x-auto text-xs shrink-0">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 sm:px-3 py-1 font-tech font-bold tracking-wider rounded-[2px] transition-all shrink-0 cursor-pointer text-xs uppercase ${
                  isSelected
                    ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm -translate-x-px -translate-y-px'
                    : 'bg-[#F6F2EB] border border-[#111111] text-[#111111] hover:bg-[#E6DED4]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-1.5 divide-y divide-[#111111]/10 flex-1"
        >
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-[#111111]/60">
              <p className="font-tech text-base font-bold uppercase tracking-wider">NO MATCHES FOUND FOR "{query}"</p>
              <p className="text-xs font-sans mt-1 text-[#111111]/50">
                Try searching for "admin", "Sharmila", "Kubernetes", "Deep Learning", or "21CS701"
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-start gap-3 p-2.5 sm:p-3 rounded-[2px] cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-x-px -translate-y-px'
                      : 'bg-[#F6F2EB] border-transparent hover:border-[#111111]/40'
                  }`}
                >
                  <div className={`p-1.5 sm:p-2 border-2 border-[#111111] rounded-[2px] shrink-0 mt-0.5 transition-colors ${
                    isSelected ? 'bg-[#F5B700] text-[#111111]' : 'bg-[#E6DED4] text-[#102D69]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className={`font-bold font-tech text-sm sm:text-base tracking-wide truncate ${
                        isSelected ? 'text-[#F6F2EB]' : 'text-[#111111]'
                      }`}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-[2px] font-tech font-bold uppercase tracking-widest border shrink-0 ${
                          isSelected 
                            ? 'bg-[#F5B700] text-[#111111] border-[#111111]' 
                            : 'bg-[#E6DED4] text-[#102D69] border-[#111111]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs font-sans truncate ${isSelected ? 'text-[#F6F2EB]/80' : 'text-[#111111]/70'}`}>
                      {item.subtitle}
                    </p>
                    <p className={`text-[11px] font-sans line-clamp-1 mt-0.5 ${isSelected ? 'text-[#F6F2EB]/65' : 'text-[#111111]/50'}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className="self-center shrink-0 pr-1">
                    {isSelected ? (
                      <CornerDownLeft className="w-4 h-4 text-[#F5B700]" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#111111]/30 group-hover:text-[#111111]" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Status / Mechanical Footer */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#E6DED4] border-t-2 border-[#111111] font-tech text-xs tracking-wider shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="hidden sm:inline">
              PRESS <strong className="font-mono bg-[#111111] text-[#F6F2EB] px-1 py-0.2 rounded-[2px]">↑ / ↓</strong> TO NAVIGATE
            </span>
            <span className="hidden sm:inline">
              PRESS <strong className="font-mono bg-[#111111] text-[#F6F2EB] px-1 py-0.2 rounded-[2px]">ENTER</strong> TO SELECT
            </span>
            <span className="sm:hidden text-[#111111]/70 font-bold uppercase">
              TAP ENTRY TO JUMP
            </span>
          </div>
          <span className="font-bold text-[#102D69] text-xs">
            {filteredResults.length} RECORD{filteredResults.length === 1 ? '' : 'S'}
          </span>
        </div>

      </div>
    </div>
  );
}
