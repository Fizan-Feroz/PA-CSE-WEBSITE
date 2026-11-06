# AGENTS.md — Autonomous AI Agent Operating Protocol

> **System**: Department of Computer Science & Engineering Portal — P.A. College of Engineering (PACE), Mangaluru  
> **Source of Truth**: [pace.edu.in](https://pace.edu.in) · Established 2000  
> **Design Architecture**: Print Brutalism + 3D Three.js Astrolabe + Spotlight Search  
> **Target Audience**: Future AI coding agents, autonomous developer subagents, and LLMs pairing on this codebase.

---

## 1. Primary Mission & System Invariants

You are operating on the official web portal for the **Department of Computer Science & Engineering, P.A. College of Engineering (PACE)**, located in Nadupadav, Mangaluru, Karnataka (`12.85° N · 74.96° E`).

### Non-Negotiable Rules & Invariants
1. **Authentic Institutional Context (`pace.edu.in`)**:
   - The institution is **P.A. College of Engineering (PACE)** under the **P.A. Educational Trust** (founded in 1999 by Dr. P.A. Ibrahim Haji).
   - Principal: **Dr. Ramis M. K.**
   - Head of Department & Vice-Principal: **Dr. Sharmila Kumari M.** (`hod_cs@pace.edu.in`).
   - Student Bodies: **ASCII** (Association of Computer Science Students Innovative Intellectuals) and **GLUG PACE** (GNU/Linux Users Group).
   - Affiliations: Affiliated to **Visvesvaraya Technological University (VTU), Belagavi**, approved by **AICTE, New Delhi**, accredited by **NBA (National Board of Accreditation), Tier-1**.
   - **DO NOT** re-introduce generic hackathon boilerplate, tournament prize pools, team registrations, or fictional dates.

2. **Preserve the Print Brutalist Aesthetic (THEME.md)**:
   - **NEVER** convert this portal to generic SaaS dark mode, neon gradients, purple cards, or high-radius rounded buttons (`rounded-xl` / `rounded-2xl`).
   - Background canvas is warm newsprint paper (`#E6DED4`).
   - Cards are light cardstock (`#F6F2EB`).
   - Borders are strictly `2px solid #111111` with `rounded-[2px]`.
   - Shadows are hard drop-shadows with zero blur radius: `box-shadow: 4px 4px 0 0 #111111` (`.shadow-print`).
   - Typography uses the triple-tier hierarchy:
     - **Teko** for display numbers, colossal headings, and placards.
     - **Rajdhani** for technical metadata, badges, and uppercase navigation links.
     - **Inter** for legible body copy.

3. **Three.js WebGL Lifecycle Invariants**:
   - The 3D Astrolabe Observatory in [`src/components/TimelineObservatory3D.jsx`](file:///d:/Projects/PA-CSE-WEBSITE/src/components/TimelineObservatory3D.jsx) must properly dispose of all geometries, materials, event listeners, and render loops inside the `useEffect` cleanup return function.
   - Do not leak WebGL contexts or leave unbounded requestAnimationFrame loops running.

4. **Code Quality & Lint Standards**:
   - Oxlint must pass with **0 warnings and 0 errors** (`npm run lint`).
   - Build must succeed in `< 1000ms` (`npm run build`).
   - Remove unused imports and hoist impure calls outside of component render functions.

---

## 2. Component Map & Architecture

```
src/
├── main.jsx                          # Root React 19 entry point
├── App.jsx                           # Master layout, Hero SMIL orbits, Vision & Mission, Footer
├── index.css                         # Tailwind v4 import, theme CSS variables, shadow-print utilities
├── data/
│   └── cseData.js                    # Single Source of Truth: domains, faculty, labs, courses, projects, events, timeline
└── components/
    ├── Navbar.jsx                    # Header with PACE seal, search omnibar launcher, navigation links
    ├── SearchModal.jsx               # Spotlight search palette (Ctrl+K / /) with fuzzy scoring & keyboard navigation
    ├── BranchedDomainTree.jsx        # SVG circuit-line track tree with active reach animations & pin lights
    ├── TimelineObservatory3D.jsx     # Three.js 3D Astrolabe Clock + 2D historical chronicle toggle
    ├── FacultySection.jsx            # Academic council & faculty directory with instant filter pills & search
    ├── LabsSection.jsx               # Computing laboratories, CoEs, and hardware specs
    ├── CurriculumSection.jsx         # Autonomous scheme syllabi organized by semester
    └── ProjectsAndEventsSection.jsx  # Student research (ASCII / KSCST) and academic conferences/symposia
```

---

## 3. Data Contracts & Canonical Schema (`src/data/cseData.js`)

All dynamic content is strictly governed by [`src/data/cseData.js`](file:///d:/Projects/PA-CSE-WEBSITE/src/data/cseData.js). Agents modifying or adding data must satisfy these TypeScript-equivalent shapes:

### Domain Schema (`CSE_DOMAINS`)
```typescript
interface Domain {
  id: string;                     // e.g., 'ai-ml', 'cybersecurity'
  code: string;                   // e.g., 'TRACK-01'
  name: string;                   // Full title
  shortName: string;              // Compact navigation label
  summary: string;                // 1-2 sentence description
  head: string;                   // Faculty in-charge
  labs: string[];                 // Associated lab facilities
  coursesCount: number;           // Total courses offered
  skills: string[];               // Core competencies
  featuredCourse: string;         // Headline syllabus code & name
}
```

### Faculty Schema (`FACULTY_MEMBERS`)
```typescript
interface FacultyMember {
  id: string;                     // e.g., 'fac-1'
  name: string;                   // Official name with title (e.g., 'Dr. Sharmila Kumari M.')
  designation: string;            // Official institutional role
  department: string;             // Matched with domain name
  qualification: string;          // e.g., 'B.E., M.Tech., Ph.D.'
  experience: string;             // e.g., '24+ Years Academic & Research'
  specialization: string;         // Comma-separated research areas
  email: string;                  // Official pace.edu.in email
  office: string;                 // Campus room location
  publications: number;           // Scopus/IEEE publication count
  tags: string[];                 // Searchable keyword badges
}
```

### Milestone Schema (`DEPARTMENT_MILESTONES`)
```typescript
interface Milestone {
  year: string;                   // e.g., '2000', '2012', '2026'
  title: string;                  // e.g., 'Department Foundation'
  phase: string;                  // e.g., 'Institutional Inception'
  desc: string;                   // Historical narrative summary
}
```

---

## 4. Search Engine Scoring Protocol (`SearchModal.jsx`)

When enhancing or refactoring [`src/components/SearchModal.jsx`](file:///d:/Projects/PA-CSE-WEBSITE/src/components/SearchModal.jsx), preserve the weighted scoring formula:

1. **Title Exact Match**: `+100` points
2. **Title Prefix / Starts With**: `+60` points
3. **Title Substring**: `+40` points
4. **Code / Identifier Exact Match**: `+80` points
5. **Code / Identifier Substring**: `+50` points
6. **Tag / Keyword Exact Match**: `+30` points
7. **Tag / Keyword Substring**: `+15` points
8. **Subtitle Substring**: `+20` points
9. **Description Substring**: `+10` points

Sorting is purely descending by `score`, sliced to the top 12 results for zero layout jitter.

---

## 5. Three.js 3D Astrolabe Operating Rules

The 3D Astrolabe in [`src/components/TimelineObservatory3D.jsx`](file:///d:/Projects/PA-CSE-WEBSITE/src/components/TimelineObservatory3D.jsx) uses:
- Canvas background: `0xE6DED4` (Warm print paper)
- Camera: `PerspectiveCamera(45, width / height, 0.1, 1000)` at `(0, 18, 38)` looking at `(0, 2, 0)`
- Materials:
  - Brass Gold (`0xC5A059`, roughness 0.3, metalness 0.8)
  - Heritage Cobalt (`0x102D69`, roughness 0.4, metalness 0.6)
  - Saffron Accent (`0xF5B700`, roughness 0.2, metalness 0.5)
  - Ink Rim Wireframe (`0x111111`)
- Gimbal physics: Pointer drag updates `rotation.y` by `deltaX * 0.008` and `rotation.x` by `deltaY * 0.005` (clamped between `-0.6` and `+0.6` radians).
- Cleanup: Every listener (`pointerdown`, `pointermove`, `pointerup`, `resize`) and `cancelAnimationFrame` must execute on unmount.

---

## 6. Verification Checklist for Agents

Before concluding any turn modifying this codebase:
- [ ] Run `npm run lint` and ensure 0 warnings and 0 errors.
- [ ] Run `npm run build` and ensure bundle output builds cleanly under 1 second.
- [ ] Verify that no stray hackathon terms ("prize pool", "admit one", "entry pass", "hackathon clock") are reintroduced.
- [ ] Ensure all hyperlinks use valid anchors (`#domains-section`, `#faculty-section`, `#labs-section`, `#curriculum-section`, `#timeline-observatory`).
- [ ] Ensure all file links in documentation use Markdown `file:///` format with forward slashes.
