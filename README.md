# PA-CSE · Department of Computer Science & Engineering Portal

> An interactive departmental web platform engineered for **P.A. College of Engineering (PACE), Mangaluru** ([pace.edu.in](https://pace.edu.in) · Estd. 2000), combining an instant **Spotlight Command Palette (<kbd>Ctrl+K</kbd>)** with a tactile **Print Brutalist visual language, SVG circuit navigation, and 3D WebGL Chronology Astrolabe**.

---

## ⚡ Quick Start

```powershell
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Code quality & linting (0 warnings, 0 errors)
npm run lint

# 4. Production build (< 600ms)
npm run build

# 5. Preview production build
npm run preview
```
Visit `http://localhost:5173/` in your browser.

---

## 🏛️ Institutional Profile ([pace.edu.in](https://pace.edu.in))

* **Institution**: P.A. College of Engineering (PACE), Mangaluru
* **Managing Trust**: P.A. Educational Trust (Founded in 1999 by Dr. P.A. Ibrahim Haji)
* **Campus Location**: Nadupadav, Montepadav Post, Kairangala, Mangaluru – 574153, Karnataka, India (`12.85° N · 74.96° E`)
* **Accreditation**: National Board of Accreditation (NBA), Tier-1
* **Affiliation & Approvals**: Affiliated to Visvesvaraya Technological University (VTU), Belagavi; Approved by AICTE, New Delhi
* **Leadership**: Principal: **Dr. Ramis M. K.** · Head of Department & Vice-Principal: **Dr. Sharmila Kumari M.** (`hod_cs@pace.edu.in`)
* **Student Bodies**: **ASCII** (Association of Computer Science Students Innovative Intellectuals) & **GLUG PACE** (GNU/Linux Users Group)

---

## 🎯 Key Capabilities

### 1. Spotlight Command Palette Search (<kbd>Ctrl + K</kbd> / <kbd>/</kbd>)
* **Instant Keyboard Access**: Open anytime with <kbd>Ctrl + K</kbd>, <kbd>Cmd + K</kbd>, or <kbd>/</kbd>.
* **Multi-Entity Weighted Scoring**: Instant fuzzy search across Faculty Directory, Syllabi Modules, Research Laboratories, Student Projects, and Academic Events.
* **Category Pill Switcher**: Fast-switch between `ALL ENTRIES`, `5 TRACKS`, `FACULTY`, `SYLLABUS`, `LABS`, `PROJECTS`, and `EVENTS`.
* **Keyboard Navigation**: Move with <kbd>↑</kbd> and <kbd>↓</kbd>; press <kbd>Enter</kbd> to jump directly to any section on the page.

### 2. Autonomous Curriculum Circuit Tree (`BranchedDomainTree`)
* SVG circuit line navigation connecting the 5 autonomous specialization tracks:
  * `01` **Artificial Intelligence & Machine Learning** (Deep neural networks, computer vision, PyTorch)
  * `02` **Cybersecurity & Digital Forensics** (Offensive/defensive security, SOC range, cryptography)
  * `03` **Cloud Computing & Distributed Systems** (Kubernetes, AWS Academy studio, microservices)
  * `04` **Full-Stack & Systems Engineering** (Systems programming, database modeling, compilers)
  * `05` **IoT, Embedded Systems & Blockchain** (FreeRTOS, LoRaWAN sensor networks, smart contracts)
* Active glowing connection pin and animated bezier reach curve displaying curriculum codes, research facilities, and track coordinators.

### 3. 3D WebGL Chronology Astrolabe (`TimelineObservatory3D`)
* A full-bleed interactive 3D chronology dial built with **Three.js**:
  * Engraved paper dial generated from a canvas texture, with engraved years, tick ring, compass rose and orbit inlay.
  * Central striped gnomon column, concentric brass/cobalt armillary rings and a cobalt academic core.
  * 12 cobalt pillars with golden finials and 8 orbital medallions mapping institutional history from 2000 to 2026+.
  * **Click/tap any medallion** to pause the orbit, focus it to the camera, raise it on a saffron stem and show its full milestone details in the HUD.
  * **Auto-cycles every 5 seconds** through 2000 → 2006 → … → 2026, focusing and raising each medallion in turn; pause/resume is available in the HUD.
  * Projected HTML year labels, a segmented 8-step progress rail, and an era-reactive backdrop that moves from archival paper through dusk to cobalt night.
  * Drag to inspect the 3D astrolabe; the HUD exposes a **RESUME** control to restart the orbit.
  * Dual mode toggle: **`3D · OBSERVATORY`** vs **`2D · CHRONICLE`** — a vertical, era-divided illustrated chronicle with four chapters.

### 4. Hero Section with Continuous SMIL-Animated Orbits
* Vector mechanical eye featuring concentric elliptical orbits with continuously revolving beads driven by SVG SMIL `<animateMotion>`.

### 5. Faculty & Academic Council Directory (`FacultySection`)
* Interactive directory featuring HoD Dr. Sharmila Kumari M. and specialized professors, with instant department filtering and real-time name/specialization search.

### 6. Centers of Excellence & Computing Laboratories (`LabsSection`)
* Interactive showcase of the AI/ML HPC Lab, Cyber Range, AWS Cloud Studio, GLUG PACE Lab, and IoT Range with detailed hardware specs.

---

## 🎨 Design System & Theme Manual

See [**THEME.md**](THEME.md) for the complete design system specification.
* **Canvas Colors**:
  * Canvas: `--paper: #E6DED4`
  * Card Surfaces: `--paper-50: #F6F2EB`
  * Wells & Dividers: `--paper-200: #DCD2C6`
  * Linework & Ink: `--ink: #111111`
  * Heritage Cobalt: `--cobalt: #102D69`
  * Saffron Accent: `--saffron: #F5B700`
* **Typography Hierarchy**:
  * Display Numbers & Headings: **Teko** (`font-heading`)
  * Technical Metadata & Badges: **Rajdhani** (`font-tech`)
  * Body Prose: **Inter** (`font-sans`)
* **Print Shadows**:
  * `shadow-print`: `4px 4px 0 0 #111111`
  * `shadow-print-sm`: `2px 2px 0 0 #111111`
  * `shadow-print-cobalt`: `4px 4px 0 0 #102D69`

---

## 📚 Documentation Index

* 🤖 [**AGENTS.md**](AGENTS.md): Autonomous AI agent operating protocol, data schemas, scoring weights, and verification recipes.
* 🎨 [**THEME.md**](THEME.md): Comprehensive Print Brutalist visual design manual, color tokens, typography, math, physics, and anti-patterns.
* 📘 [**docs/ARCHITECTURE.md**](docs/ARCHITECTURE.md): Component hierarchy, data contracts, and subsystems.
* 🎨 [**docs/DESIGN_SYSTEM.md**](docs/DESIGN_SYSTEM.md): Detailed layout specifications and shadow math.
* 🔍 [**docs/INNOVEX_REVERSE_ENGINEERING.md**](docs/INNOVEX_REVERSE_ENGINEERING.md): Reverse-engineering ledger from `codeforinnovex.in`.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 + Custom Print Brutalist Tokens
* **3D & Graphics**: Three.js (WebGL) + SVG SMIL `<animateMotion>`
* **Icons**: Lucide React
* **Linter**: Oxlint (0 warnings, 0 errors)
