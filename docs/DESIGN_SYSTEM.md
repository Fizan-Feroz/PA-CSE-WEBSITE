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

* **Stage**: Full-bleed, edge-to-edge chronology stage (540px mobile / 600px tablet / 640px desktop) with ink border top and bottom. The WebGL canvas is transparent over a crossfading era backdrop (archival paper → blueprint blue → dusk → cobalt night).
* **Coordinate Space**:
  * Origin `(0, 0, 0)` centered at the celestial core.
  * Pedestal dial top at `y = -3.7`; orbital medallion ring at `y = 0.9`, radius `11.2`; armillary center at `y = 4.4`.
  * Camera position `(0, 21, 39)` looking at `(0, -3, 0)`, FOV 45°; the framing keeps the dial vertically centred above the year rail.
* **Scene Elements**:
  * Canvas-textured paper dial with engraved milestone years, tick ring, compass rose and orbit inlay.
  * Striped cobalt/saffron gnomon column, four armillary rings and a cobalt core.
  * Eight brass/paper medallions with one active saffron face, additive glow, saffron stem and projected HTML year label.
  * Ambient dust/star points, real shadows and an era-reactive lighting palette.
* **Lighting Model**:
  * Era-defined ambient, warm directional key and cobalt/blue rim light, smoothly lerped when the selected milestone changes.
  * The selected medallion drives a saffron point light and glow.
* **Interaction**: Click/tap a medallion to pause the orbit, focus it to the camera, raise it, and update the HUD. While in view the observatory auto-cycles every five seconds, and the active progress pill fills over those five seconds; clicking pauses, and `RESUME` restarts the cycle. Drag rotates the assembly on X between `-0.55` and `0.55` radians. The year rail and 2D chronicle select the same milestone.
* **Labels**: All eight year labels are HTML overlays positioned by projecting 3D world coordinates each frame; active label colors adapt to light/dark eras and remain non-interactive (`pointer-events: none`).
