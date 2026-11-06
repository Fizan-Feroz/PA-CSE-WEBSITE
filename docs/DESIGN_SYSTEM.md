# Design System Specification: Print Brutalism & Technical Astrolabe

## 1. Visual Philosophy

The design system is modeled after the **INNOVEX '26** visual language, merging Indian technical heritage (vintage letterpress, railway schedules, blueprint cards, and astronomical observatories) with crisp modern frontend reactivity.

---

## 2. Color Palette & Design Tokens

### Primary Canvas (Warm Newsprint / Khadi Paper)
* **`--paper: #E6DED4` (`rgb(230, 222, 212)`)**: Global background canvas.
* **`--paper-50: #F6F2EB` (`rgb(246, 242, 235)`)**: Elevated card surface & modal background.
* **`--paper-200: #DCD2C6` (`rgb(220, 210, 198)`)**: Recessed card background & footer surface.

### Linework & Contrast (Carbon Ink)
* **`--ink: #111111` (`rgb(17, 17, 17)`)**: All primary borders, typography, and hard drop-shadows.

### Accent Accents (Heritage Cobalt & Saffron)
* **`--cobalt: #102D69` (`rgb(16, 45, 105)`)**: Primary brand color for active badges, track reaches, and prominent CTA buttons.
* **`--cobalt-light: #163A96` (`rgb(22, 58, 150)`)**: Hover state for cobalt buttons.
* **`--saffron: #F5B700` (`rgb(245, 183, 0)`)**: Accent highlight for active track pins, status pill tags, and key metrics.

---

## 3. Typography Architecture

Three complementary font families are loaded via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&family=Teko:wght@500;600;700&display=swap" rel="stylesheet">
```

| Role | Font Family | Tailwind Class | Usage Scenario |
|---|---|---|---|
| **Display Display** | `Teko` | `.font-heading` | Main hero titles, metric counters, section headers. Ultra-condensed, tall, woodblock brutalism. |
| **Technical Sans** | `Rajdhani` | `.font-tech` | Labels, badges, navigation anchors, coordinates, track titles. Sharp, squarish curves. |
| **Body Sans** | `Inter` | `.font-sans` | Paragraphs, long descriptions, syllabus details, faculty bios. |

---

## 4. Shadow Math & Tactile Physics

The design system rejects soft gaussian blurs in favor of **hard, unblurred ink drop-shadows**:

```css
/* Standard Print Shadow */
.shadow-print {
  box-shadow: 4px 4px 0 0 #111111;
}

/* Compact Print Shadow */
.shadow-print-sm {
  box-shadow: 2px 2px 0 0 #111111;
}

/* Brand Cobalt Shadow */
.shadow-print-cobalt {
  box-shadow: 4px 4px 0 0 #102D69;
}

/* Accent Saffron Shadow */
.shadow-print-saffron {
  box-shadow: 4px 4px 0 0 #F5B700;
}
```

### Physical Button Interactions
Buttons provide instant mechanical feedback by translating by 1px on hover and snapping back on active press:
```css
.btn-print {
  border: 2px solid #111111;
  box-shadow: 4px 4px 0 0 #111111;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-print:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 0 #111111;
}
.btn-print:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 #111111;
}
```

---

## 5. Circuit Line Geometry (`BranchedDomainTree`)

The SVG circuit lines use precise cubic-like arc calculations:
* **Vertical Main Spine**: `d="M 14 0 V 210"` (`stroke="#111111" stroke-width="2.5"`).
* **Branch Curves**: `d="M 14 {y - 12} A 12 12 0 0 0 26 {y} H 40"` where `y = 18 + i * 46`.
* **Active Reach Line**: Animated reach path highlighted in Cobalt (`#102D69`, `stroke-width="3.5"`).
* **Pin Dot**: `cx="40" cy="{activeY}" r="4.5"` filled with Saffron (`#F5B700`) and stroked in Ink (`#111111`, `stroke-width="2"`).

---

## 6. Three.js 3D WebGL Standards (`TimelineObservatory3D`)

* **Canvas Ratio**: Responsive width with fixed height (480px) and camera FOV of 45°.
* **Coordinate Space**:
  * Origin `(0, 0, 0)` centered at the celestial core.
  * Pedestal dial top at `y = -3.7`, armillary center at `y = 4.4`.
  * Camera position `(0, 22, 40)` looking at `(0, 1, 0)`.
* **Lighting Model**:
  * Warm ambient light (`0xffffff`, intensity `1.2`).
  * Sun directional key light (`0xfffaed`, intensity `2.0`, positioned at `15, 30, 20`).
  * Cobalt fill light (`0x102D69`, intensity `1.5`, positioned at `-15, -10, -20`).
* **Interaction**: Mouse drag rotation bounded on the X-axis between `-0.4` and `0.6` radians; continuous slow Y-axis drift (`0.003` rad/frame).
