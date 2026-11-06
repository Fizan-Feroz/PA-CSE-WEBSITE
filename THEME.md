# THEME.md — Print Brutalist Visual Design System

> **Style Identity**: Indian Silkscreen Print Brutalism + Precision Engineering Artifact  
> **Inspired By**: INNOVEX '26 Poster Architecture & Technical Broadside Aesthetics  
> **Institution**: Department of Computer Science & Engineering, P.A. College of Engineering (PACE), Mangaluru  
> **Color Model**: Pigment Ink on High-Fiber Newsprint Paper  

---

## 1. Design Philosophy

The visual design system of the PA-CSE portal rejects sterile SaaS templates, translucent blur cards, and generic dark mode. Instead, it is built on the philosophy of **tactile print brutalism**:

1. **Pigment over Light**: Surfaces feel like heavy woodblock or silkscreen ink pressed onto warm, unbleached kraft paper (`#E6DED4`).
2. **Structural Honesty**: Linework is visible, uncompromising, and functional. Elements are demarcated with crisp `2px solid #111111` ink strokes.
3. **Heritage Palettes**: Grounded in deep Indian academic cobalt (`#102D69`) and vivid marigold/saffron (`#F5B700`), reminiscent of historical engineering institutions, government gazettes, and technical broadsides.
4. **Mechanical Physics**: Buttons and interactive placards do not float with soft shadows; they behave like spring-loaded physical keys with hard, 0-blur ink drop-shadows that displace upon press.

---

## 2. Color Palette & Token Registry

| Token Name | Hex Code | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--paper` | `#E6DED4` | `rgb(230, 222, 212)` | Main viewport canvas, body background, neutral container fill |
| `--paper-50` | `#F6F2EB` | `rgb(246, 242, 235)` | Elevated card surfaces, search omnibar, modal dialog backgrounds |
| `--paper-200` | `#DCD2C6` | `rgb(220, 210, 198)` | Secondary card wells, inactive filter tabs, subtle divider fills |
| `--ink` | `#111111` | `rgb(17, 17, 17)` | Primary typography, structural 2px borders, mechanical drop-shadows |
| `--cobalt` | `#102D69` | `rgb(16, 45, 105)` | Institutional heritage brand color, active buttons, selection highlights |
| `--cobalt-light`| `#163A96` | `rgb(22, 58, 150)` | Hover state for cobalt buttons, secondary ring geometry |
| `--saffron` | `#F5B700` | `rgb(245, 183, 0)` | High-voltage focal accent, active milestone nodes, badge highlights |

### CSS Variables (`src/index.css`)
```css
@layer base {
  :root {
    --paper: #E6DED4;
    --paper-50: #F6F2EB;
    --paper-200: #DCD2C6;
    --ink: #111111;
    --cobalt: #102D69;
    --cobalt-light: #163A96;
    --saffron: #F5B700;
  }
}
```

---

## 3. Typography Hierarchy

The portal combines three deliberate typographic families imported via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&family=Teko:wght@500;600;700&display=swap" rel="stylesheet">
```

### 1. Colossal Display Headings: `Teko` (`.font-heading`)
- **Character**: Ultra-condensed, tall, monumental woodblock letterforms.
- **Weights**: 500 (Medium), 600 (SemiBold), 700 (Bold).
- **Transform**: Strictly `uppercase` with tight tracking (`tracking-tight`) and compressed line height (`leading-[0.88]` to `leading-none`).
- **Usage**: Department hero banner (`COMPUTER SCIENCE & ENGINEERING`), statistics numbers (`NBA`, `94.8%`, `06`), major section headlines.

### 2. Technical Metadata & Navigation: `Rajdhani` (`.font-tech`)
- **Character**: Squared industrial geometric curves, aerospace/circuit-board character.
- **Weights**: 600 (SemiBold), 700 (Bold).
- **Transform**: Strictly `uppercase` with wide letter-spacing (`tracking-wider` or `tracking-widest`).
- **Usage**: Navigation bar links, filter pills, circuit-tree labels, card subheadings, coordinates strips, action button labels.

### 3. Body Prose: `Inter` (`font-sans`)
- **Character**: High-legibility neutral humanist sans-serif with tall x-height.
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold).
- **Usage**: Multi-line descriptions, syllabus topic lists, faculty research summaries, vision & mission statements.

### 4. Machine Coordinates & Timestamps: `Monospace` (`font-mono`)
- **Character**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`.
- **Usage**: Course codes (`21CS401`), lab numbers (`LAB-204`), geo-coordinates (`12.85° N · 74.96° E`), keyboard shortcut badges (`CTRL + K`).

---

## 4. Brutalist Geometry & Shadow Math

### The 2px Border Rule
Every structural element (cards, buttons, inputs, modals, badges) must feature:
```css
border: 2px solid #111111;
border-radius: 2px; /* Never use rounded-lg, rounded-xl, or rounded-full for cards */
```

### Zero-Blur Drop Shadow Matrix
All shadows are hard offset blocks without Gaussian blur:

```css
/* Standard Print Shadow (Cards, Hero Buttons, Modals) */
.shadow-print {
  box-shadow: 4px 4px 0 0 #111111;
}

/* Compact Print Shadow (Badges, Small Buttons, In-Card Tiles) */
.shadow-print-sm {
  box-shadow: 2px 2px 0 0 #111111;
}

/* Cobalt Accent Shadow (Active Primary CTA Buttons, Search Dialog) */
.shadow-print-cobalt {
  box-shadow: 4px 4px 0 0 #102D69;
}

/* Saffron Accent Shadow (Gold Milestones, Awards) */
.shadow-print-saffron {
  box-shadow: 4px 4px 0 0 #F5B700;
}
```

---

## 5. Physical Interaction & Button Physics

Interactive elements simulate spring-loaded mechanical printing stamps:

### Hover State
Translates up and left by 1px, increasing visual depth:
```css
hover:-translate-x-px hover:-translate-y-px hover:shadow-print
```

### Active / Click State
Displaces down and right by 1px to 2px, compressing the shadow into the surface:
```css
active:translate-x-0.5 active:translate-y-0.5 active:shadow-print-sm
```

---

## 6. Motion & Visual Animation Protocols

### 1. SMIL Orbital Mechanics (Hero Eye Graphic)
The hero banner features SVG vector orbits driven by native SMIL `<animateMotion>`:
- **Orbit 1**: Ellipse rotated at `-20°` (`rx="100" ry="32"`), moving a saffron electron (`#F5B700`) over an 8-second indefinite cycle.
- **Orbit 2**: Ellipse rotated at `+25°` (`rx="90" ry="36"`), moving a cobalt electron (`#102D69`) over an 11-second indefinite cycle.
- **Central Core**: Concentric print circles representing the department's academic focus.

### 2. Three.js 3D Astrolabe Gimbal
Located in [`src/components/TimelineObservatory3D.jsx`](file:///d:/Projects/PA-CSE-WEBSITE/src/components/TimelineObservatory3D.jsx):
- Base cylinder with 12 cobalt pillars and saffron finials.
- 3 nested concentric brass rings counter-rotating in 3 axes (`elapsed * 0.15`, `0.2`, `0.18`).
- Interactive mouse/pointer drag allowing horizontal and clamped vertical tilt rotation.
- Pulsing active milestone disc (`scale = 1.0 + Math.sin(t * 4) * 0.08`).

### 3. Circuit Tree SVG Routing (`BranchedDomainTree.jsx`)
- Interactive SVG circuit spine connecting 5 specialization tracks.
- Hovering or selecting a track dynamically recalculates the bezier curve (`d="M 14 ... Q 28 ... 44 ..."`), illuminating the node with a saffron LED pin light.

---

## 7. Anti-Patterns (What NEVER To Do)

1. ❌ **No Translucent Glassmorphism**: Do not use `backdrop-blur-xl bg-white/10` or frosted glass effects. Use opaque paper `#E6DED4` or `#F6F2EB`.
2. ❌ **No Blurred Shadows**: Never use standard Tailwind `shadow-lg`, `shadow-xl`, or `shadow-2xl`. Always use `.shadow-print` or `.shadow-print-sm`.
3. ❌ **No Rounded Bubble Cards**: Never use `rounded-2xl`, `rounded-3xl`, or `rounded-full` for cards or containers. Only `rounded-[2px]`.
4. ❌ **No Dark Mode Overrides**: Do not add dark mode toggle classes (`dark:bg-slate-900`) that revert the design to standard modern tech SaaS.
5. ❌ **No Fictional Boilerplate**: Do not insert arbitrary hackathon countdown timers or generic lorem ipsum; ground all copy in authentic `pace.edu.in` facts.
