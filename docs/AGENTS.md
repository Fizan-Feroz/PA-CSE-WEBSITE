# Agent Operations & Codebase Manual: `PA-CSE-WEBSITE`

> **Note for AI Agents & Autonomous Coders**: This document outlines architectural invariants, contracts, data schemas, and lifecycle rules. Follow these guidelines strictly when extending or maintaining this repository.

---

## 1. Repository Blueprint

```
PA-CSE-WEBSITE/
├── index.html                           # Root HTML: fonts (Teko, Rajdhani, Inter), meta
├── package.json                         # Dependencies: react, tailwindcss v4, lucide-react, three
├── vite.config.js                       # Vite bundler config with @tailwindcss/vite
├── src/
│   ├── main.jsx                         # React 19 root bootstrap
│   ├── App.jsx                          # Main view: Hero, Orbits, Tree, 3D Timeline, Sections
│   ├── index.css                        # Design tokens, print shadows, brutalist utilities
│   ├── data/
│   │   └── cseData.js                   # Canonical JSON data stores (Domains, Faculty, Labs, Courses)
│   └── components/
│       ├── Navbar.jsx                   # Sticky header with brutalist omnibar trigger
│       ├── SearchModal.jsx              # Spotlight/Command Palette modal (Ctrl+K / /)
│       ├── BranchedDomainTree.jsx       # SVG circuit-branch tree navigation (INNOVEX style)
│       ├── TimelineObservatory3D.jsx    # Three.js WebGL Astrolabe Clock & 2D Journey
│       ├── FacultySection.jsx           # Faculty grid with live department pill filters
│       ├── LabsSection.jsx              # Labs & Centers of Excellence showcase
│       ├── CurriculumSection.jsx        # Autonomous curriculum & topic search
│       └── ProjectsAndEventsSection.jsx # Student prototypes, hackathons & events
└── docs/
    ├── ARCHITECTURE.md                  # Human developer architecture guide
    ├── DESIGN_SYSTEM.md                 # Design tokens, color palettes & brutalist rules
    ├── INNOVEX_REVERSE_ENGINEERING.md   # Reverse-engineering evidence from codeforinnovex.in
    └── AGENTS.md                        # This agent specification
```

---

## 2. Invariant Rules for Autonomous Edits

1. **Maintain Print Brutalist Aesthetic**:
   * Canvas background must remain `--paper` (`#E6DED4`) or `--paper-50` (`#F6F2EB`).
   * Never introduce border-radius values greater than `rounded-[2px]` or `rounded-md` on buttons/cards. The aesthetic is strictly geometric, hard-edged, and letterpress-inspired.
   * Shadows must use `shadow-print` or `shadow-print-sm` (`box-shadow: 4px 4px 0 0 #111111`). Do not use blurry Tailwind shadows (`shadow-lg`, `shadow-xl`) without hard ink offsets.
2. **Three.js Resource Management**:
   * All WebGL renderers in `TimelineObservatory3D.jsx` must be disposed on unmount (`renderer.dispose()`, `domElement.remove()`, `cancelAnimationFrame()`).
   * Geometries and materials must be garbage-collected cleanly to prevent context loss.
3. **Data Immutability in `cseData.js`**:
   * When adding new faculty, labs, or courses, ensure every object conforms strictly to the schema defined in Section 3 below.

---

## 3. Data Schemas (`src/data/cseData.js`)

### A. Domain / Specialization Schema
```typescript
interface CSEDomain {
  id: string;               // Unique slug (e.g., 'ai-ml', 'cybersecurity')
  code: string;             // Two-digit track number (e.g., '01', '02')
  title: string;            // Full title (e.g., 'Artificial Intelligence & Machine Learning')
  shortTitle: string;       // Compact title for tree node
  description: string;      // 1-2 sentence description
  leadFaculty: string;      // Name of faculty lead
  labs: string[];           // List of affiliated laboratory names
  courses: string[];        // List of course code strings (e.g., 'CS601: Deep Learning')
  highlights: string[];     // Track achievement bullet points
  color: string;            // Hex color code
}
```

### B. Faculty Member Schema
```typescript
interface FacultyMember {
  id: string;               // e.g., 'f1', 'f2'
  name: string;             // Full name with salutation
  designation: string;      // Title (e.g., 'Professor & Head of Department')
  department: string;       // Category: 'Administration' | 'Research' | 'Technical' | 'Placements' | 'Academics'
  cabin: string;            // Room / office location
  email: string;            // Official institutional email
  specialization: string;   // Research topics
  experience: string;       // Years of experience (e.g., '22 Years')
  image: string;            // URL to photo
  tags: string[];           // Keywords for fuzzy search (e.g., ['HOD', 'AI/ML'])
}
```

### C. Course / Syllabus Schema
```typescript
interface CourseSyllabus {
  code: string;             // Course code (e.g., '21CS301')
  title: string;            // Course title
  semester: string;         // 'Semester 3' | 'Semester 4' | 'Semester 5' | 'Semester 6'
  credits: number;          // Credit hours (e.g., 3, 4)
  domain: string;           // Specialization domain name
  topics: string[];         // Key syllabus modules
}
```

---

## 4. Search Algorithm & Weight Scoring (`SearchModal.jsx`)

The search engine performs fast, client-side, in-memory fuzzy scoring across all aggregated records without external API requests.

### Scoring Formula:
$$\text{Score} = \sum (\text{Match Weights})$$

| Match Type | Weight Points | Condition |
|---|---|---|
| **Exact Title Match** | `+100` | `title.toLowerCase() === query` |
| **Title Prefix Match** | `+60` | `title.toLowerCase().startsWith(query)` |
| **Title Substring Match** | `+40` | `title.toLowerCase().includes(query)` |
| **Exact Keyword / Tag Match** | `+30` | `kw.toLowerCase() === query` |
| **Subtitle Substring Match** | `+20` | `subtitle.toLowerCase().includes(query)` |
| **Keyword Substring Match** | `+15` | `kw.toLowerCase().includes(query)` |
| **Description Substring Match** | `+10` | `description.toLowerCase().includes(query)` |

Results are sorted descending by score (`b.score - a.score`) and clamped to the top 12 matches.

---

## 5. Automated Verification Recipe for Agents

When changing code, an agent should run the following commands to ensure zero regressions:

```powershell
# 1. Typecheck and build verification
npm run build

# 2. Start server in background
npm run preview -- --port 5173 --host 127.0.0.1

# 3. Execute automated headless test
python scratch/capture_3d_observatory.py
```
A successful test finishes with exit code `0` and outputs rendered PNGs to the `scratch/` directory.
