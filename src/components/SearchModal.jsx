import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, X, User, BookOpen, Cpu, Rocket, Calendar, ArrowRight, 
  Command, CornerDownLeft, Sparkles, Filter, Hash 
} from 'lucide-react';
import { 
  FACULTY_MEMBERS, COURSES_SYLLABI, LABORATORIES, 
  STUDENT_PROJECTS, UPCOMING_EVENTS, CSE_DOMAINS 
} from '../data/cseData';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Aggregate searchable items
  const allItems = useMemo(() => {
    const list = [];

    // Domains
    CSE_DOMAINS.forEach(d => {
      list.push({
        id: `domain-${d.id}`,
        category: 'Domains',
        type: 'domain',
        title: d.title,
        subtitle: `Track ${d.code} · Lead: ${d.leadFaculty}`,
        description: d.description,
        icon: Sparkles,
        badge: `Track ${d.code}`,
        targetId: `domain-${d.id}`,
        keywords: [d.title, d.shortTitle, d.leadFaculty, ...d.courses, ...d.labs]
      });
    });

    // Faculty
    FACULTY_MEMBERS.forEach(f => {
      list.push({
        id: `fac-${f.id}`,
        category: 'Faculty',
        type: 'faculty',
        title: f.name,
        subtitle: `${f.designation} · ${f.cabin}`,
        description: f.specialization,
        icon: User,
        badge: f.department,
        targetId: 'faculty-section',
        keywords: [f.name, f.designation, f.specialization, f.department, f.cabin, ...f.tags]
      });
    });

    // Courses
    COURSES_SYLLABI.forEach(c => {
      list.push({
        id: `course-${c.code}`,
        category: 'Courses',
        type: 'course',
        title: `${c.code}: ${c.title}`,
        subtitle: `${c.semester} · ${c.credits} Credits · ${c.domain}`,
        description: `Topics: ${c.topics.join(', ')}`,
        icon: BookOpen,
        badge: c.semester,
        targetId: 'curriculum-section',
        keywords: [c.code, c.title, c.semester, c.domain, ...c.topics]
      });
    });

    // Labs
    LABORATORIES.forEach(l => {
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
        keywords: [l.name, l.code, l.hardware, l.inCharge, l.purpose]
      });
    });

    // Projects
    STUDENT_PROJECTS.forEach(p => {
      list.push({
        id: `proj-${p.id}`,
        category: 'Projects',
        type: 'project',
        title: p.title,
        subtitle: `${p.team} · ${p.domain}`,
        description: p.description,
        icon: Rocket,
        badge: p.status,
        targetId: 'projects-section',
        keywords: [p.title, p.team, p.domain, p.description, ...p.technologies]
      });
    });

    // Events
    UPCOMING_EVENTS.forEach(e => {
      list.push({
        id: `event-${e.id}`,
        category: 'Events',
        type: 'event',
        title: e.title,
        subtitle: `${e.date} · ${e.venue}`,
        description: e.description,
        icon: Calendar,
        badge: e.type,
        targetId: 'events-section',
        keywords: [e.title, e.date, e.venue, e.type, e.description]
      });
    });

    return list;
  }, []);

  // Filtered and scored results
  const filteredResults = useMemo(() => {
    let items = allItems;

    // Filter by active category tab
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
    }

    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return items.slice(0, 10);

    // Score matches
    const scored = [];
    items.forEach(item => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const subLower = item.subtitle.toLowerCase();
      const descLower = item.description.toLowerCase();

      // Exact title match gets highest score
      if (titleLower === cleanQuery) score += 100;
      else if (titleLower.startsWith(cleanQuery)) score += 60;
      else if (titleLower.includes(cleanQuery)) score += 40;

      // Subtitle match
      if (subLower.includes(cleanQuery)) score += 20;

      // Description match
      if (descLower.includes(cleanQuery)) score += 10;

      // Keyword match
      for (const kw of item.keywords) {
        const kwLower = kw.toLowerCase();
        if (kwLower === cleanQuery) score += 30;
        else if (kwLower.includes(cleanQuery)) score += 15;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.item).slice(0, 12);
  }, [allItems, query, activeCategory]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  function handleSelect(item) {
    if (onSelectResult) {
      onSelectResult(item);
    }
    const el = document.getElementById(item.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  }

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Results' },
    { id: 'domains', label: 'Tracks & Domains' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'courses', label: 'Syllabus' },
    { id: 'labs', label: 'Labs' },
    { id: 'projects', label: 'Projects' },
    { id: 'events', label: 'Events' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col z-10 transition-all">
        
        {/* Top Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search faculty, courses, labs, hackathons, projects, syllabi..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 text-[15px] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-slate-400">
            <span>ESC</span>
          </div>
        </div>

        {/* Category Pills (INNOVEX Filter Style) */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-slate-900/50 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40"
        >
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "Deep Learning", "Hafeez", "SOC Lab", "CTF", or "Syllabus"</p>
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
                  className={`group flex items-start gap-3.5 p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border border-cyan-500/40 shadow-sm'
                      : 'hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400 group-hover:text-cyan-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300 truncate">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium bg-slate-700/60 text-cyan-400 border border-slate-600/40 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{item.subtitle}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                  </div>

                  <div className="self-center shrink-0 pr-1">
                    {isSelected ? (
                      <CornerDownLeft className="w-4 h-4 text-cyan-400 animate-pulse" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono">↵</kbd>
              to select
            </span>
          </div>
          <span className="text-slate-400 font-mono">
            {filteredResults.length} matching {filteredResults.length === 1 ? 'item' : 'items'}
          </span>
        </div>

      </div>
    </div>
  );
}
