# PA-CSE · Department of Computer Science & Engineering Portal

> An interactive departmental web platform engineered for **P.A. College of Engineering (PACE), Mangaluru**, combining a **Spotlight Command Palette (<kbd>Ctrl+K</kbd>)** with the signature **Print Brutalist visual language, SVG circuit navigation, and 3D WebGL Observatory** reverse-engineered from **INNOVEX '26** (`codeforinnovex.in`).

---

## ⚡ Quick Start

```powershell
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Production build
npm run build

# 4. Preview production build
npm run preview
```
Visit `http://localhost:5173/` in your browser.

---

## 🎯 Key Capabilities

### 1. Spotlight Command Palette Search (<kbd>Ctrl + K</kbd> / <kbd>/</kbd>)
* **Instant Keyboard Access**: Open anytime with <kbd>Ctrl + K</kbd>, <kbd>Cmd + K</kbd>, or <kbd>/</kbd>.
* **Multi-Entity Fuzzy Matching**: Instant scoring across Faculty Directory, Syllabi Modules, Research Labs, Student Projects, and Events.
* **Category Pill Filters**: Filter by `ALL ENTRIES`, `5 TRACKS`, `FACULTY`, `SYLLABUS`, `LABS`, `PROJECTS`, and `EVENTS`.
* **Keyboard Navigation**: Move with <kbd>↑</kbd> and <kbd>↓</kbd>; press <kbd>Enter</kbd> to jump directly to sections on the page.

### 2. INNOVEX-Style Branched Circuit Tree (`BranchedDomainTree`)
* Authentic SVG circuit line navigation (`branched-menu`) connecting 5 CSE Specialization Tracks:
  * `01` **Artificial Intelligence & Machine Learning**
  * `02` **Cybersecurity & Digital Forensics**
  * `03` **Cloud Computing & Distributed Systems**
  * `04` **Full-Stack & Systems Engineering**
  * `05` **IoT, Edge AI & Embedded Systems**
* Active glowing connection pin and animated reach line displaying curriculum codes, research labs, and highlights.

### 3. 3D WebGL Astrolabe Observatory (`TimelineObservatory3D`)
* An interactive 3D armillary sphere / astronomical clock built with **Three.js**:
  * Concentric brass and cobalt armillary rings with celestial sun core.
  * 12 cobalt pillars topped with golden spherical finials.
  * 8 milestone nodes mapping the 24-hour hackathon sprint.
  * Drag to rotate and inspect the 3D model.
  * Dual mode toggle: **`3D · OBSERVATORY`** vs **`2D · JOURNEY`** (with a flippable 180° hourglass).

### 4. Hero Section with SMIL-Animated Orbiting Eye
* Vector mechanical eye featuring concentric elliptical orbits with continuously revolving beads driven by SVG SMIL `<animateMotion>`.

### 5. Dynamic Department Pill Filters (`FacultySection`)
* Instant client-side department switcher (`Administration`, `Research`, `Technical`, `Placements`, `Academics`) with live item counts.

---

## 🎨 Design System & Visual Tokens

Inspired by the authentic newspaper / letterpress brutalism of `codeforinnovex.in`:
* **Canvas Colors**:
  * Canvas: `--paper: #E6DED4`
  * Card Surfaces: `--paper-50: #F6F2EB`
  * Recessed Paper: `--paper-200: #DCD2C6`
  * Linework & Text: `--ink: #111111`
  * Heritage Cobalt: `--cobalt: #102D69`
  * Saffron Accent: `--saffron: #F5B700`
* **Typography**:
  * Titles & Metrics: **Teko** (`font-heading`)
  * Technical Labels: **Rajdhani** (`font-tech`)
  * Body Text: **Inter** (`font-sans`)
* **Hard Print Shadows**:
  * `shadow-print`: `4px 4px 0 0 #111111`
  * `shadow-print-sm`: `2px 2px 0 0 #111111`
  * `shadow-print-cobalt`: `4px 4px 0 0 #102D69`

---

## 📚 Documentation Index

Comprehensive guides for both human engineers and autonomous agents are available in [`docs/`](file:///d:/Projects/PA-CSE-WEBSITE/docs):

* 📘 [**Architecture Guide**](docs/ARCHITECTURE.md): Component hierarchy, data flow, and subsystems.
* 🔍 [**INNOVEX Reverse-Engineering Report**](docs/INNOVEX_REVERSE_ENGINEERING.md): CDP captures, bundle AST analysis, and findings from `codeforinnovex.in`.
* 🎨 [**Design System Specification**](docs/DESIGN_SYSTEM.md): Exact color tokens, typography scales, brutalist shadow math, and SVG geometries.
* 🤖 [**Agent Operations Manual**](docs/AGENTS.md): Machine-readable contracts, data schemas, search scoring algorithms, and verification recipes for AI agents.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 + Custom Print Brutalist Tokens
* **3D & Graphics**: Three.js (WebGL) + SVG SMIL Animations
* **Icons**: Lucide React
