# Forensic Reverse-Engineering Report: INNOVEX '26 (`codeforinnovex.in`)

## 1. Executive Summary

This document details the reverse-engineering analysis performed on `https://codeforinnovex.in/` (Code for INNOVEX '26, organized by NSS IT Wing, NMAMIT). The investigation combined passive/active CDP inspection via REA (Reverse Engineer Anything), static bundle AST reconstruction, and Playwright headless headless execution.

Key findings:
* **Search Architecture**: No database or backend query search engine is exposed publicly. Search and discovery are accomplished through **hierarchical SVG circuit tree navigation (`branched-menu`)**, **instant categorical pill filtering**, and **in-page section jump directories**.
* **Visual Aesthetic**: Vintage Indian newspaper / silkscreen print brutalism characterized by warm parchment paper (`#E6DED4`), carbon ink (`#111111`), Indian cobalt (`#102D69`), and saffron yellow (`#F5B700`).
* **3D & WebGL Objects**: A full 3D interactive armillary sphere / astrolabe clock implemented in **Three.js** with `EffectComposer` bloom post-processing on `/timeline`.
* **Micro-Animations**: SMIL-animated multi-axis orbiting beads, 7.5s mechanical eye blink intervals, electric spark arcs, and flipping 180° hourglasses.

---

## 2. Evidence Ledger & Findings

### Evidence Item A: Static Bundle & Route Inspection
* **Total Chunks Inspected**: 15 main production chunks (~1.1 MB JavaScript, Turbopack/Next.js output).
* **Search Input Elements**: Zero `<input type="search">` or text input elements exist on `/`, `/faq`, `/gallery`, `/rules`, `/guidelines`, `/timeline`, `/sponsors`, or `/team`.
* **String Evidence**: Across all client code, the token `"search"` appears strictly in two contexts:
  1. Standard browser built-ins (`URLSearchParams`, `location.search`).
  2. The descriptive text of Track 05 (*Abhedya: Disaster Resilience*):
     > *"Early warning & prediction, response coordination, search & rescue, offline-first communication"*

### Evidence Item B: The `branched-menu` SVG Circuit Architecture
Instead of free-text query searching, discovery is driven by an SVG-drawn hierarchical tree menu (`10cal0o1ysbjc.js`):
```html
<div class="branched-menu__section" data-open="true">
  <button aria-expanded="true" class="branched-menu__head" type="button">
    Problem statements
  </button>
  <div class="branched-menu__body">
    <div class="branched-menu__tree" style="height: 192px;">
      <svg aria-hidden="true" class="branched-menu__lines" height="192" width="40">
        <path class="branched-menu__base" d="M 14 0 V 158" />
        <path class="branched-menu__base" d="M 14 14 A 10 10 0 0 0 24 24 H 32" />
        <path class="branched-menu__reach" d="M 14 0 V 14 A 10 10 0 0 0 24 24 H 32" />
      </svg>
    </div>
    <!-- Tracks 01 to 05 -->
  </div>
</div>
```

### Evidence Item C: 3D Astrolabe Clock (`/timeline`)
* **Bundle Chunks**:
  * `2fe8gh_0mhor2.js` (586 KB): Unpacked Three.js library (`__THREE__` global namespace).
  * `05kvf6gjb5_nu.js` (40 KB): `Timeline3D` implementation containing `Scene`, `PerspectiveCamera`, `WebGLRenderer`, `EffectComposer`, `UnrealBloomPass`, and `RoomEnvironment`.
* **Rendered 3D Scene**:
  * Concentric brass armillary rings (`CylinderGeometry`, `TorusGeometry`).
  * 12 cobalt boundary pillars topped with golden spherical finials.
  * Rotating central celestial core.
  * Orbit arc holding milestone disks tracking the 24 hours of the hackathon.

### Evidence Item D: Vector Micro-Animations
* **Orbital SMIL Animations**: Located in the hero section:
  ```xml
  <ellipse rx="192" ry="46" stroke-width="1.8" transform="rotate(-27)" />
  <animateMotion dur="14s" path="M192 0A192 46 0 1 1 -192 0A192 46 0 1 1 192 0Z" repeatCount="indefinite" />
  ```
* **Eye Aperture Blink**: Keyframed every 7.5 seconds (`animation: 7.5s ease-in-out infinite eye-blink`).
* **Interactive Flipping Hourglass**: In `/timeline`, the `<button class="hg tl2-head-glass">` triggers a 180° CSS rotation, toggling between morning and night hackathon perspectives.

---

## 3. Translation into PA-CSE Portal

| INNOVEX '26 Original Feature | PA-CSE Implementation | Location in Codebase |
|---|---|---|
| No site-wide search input | Added **Command Palette (<kbd>Ctrl+K</kbd> / <kbd>/</kbd>)** with fuzzy scoring | `src/components/SearchModal.jsx` |
| `branched-menu` circuit tree | Interactive CSE Specialization Track Tree | `src/components/BranchedDomainTree.jsx` |
| 3D Astrolabe Observatory | Three.js WebGL Astrolabe Clock with 24H arc | `src/components/TimelineObservatory3D.jsx` |
| Hero hand spark & eye orbits | Hero SVG mechanical eye with SMIL orbiting beads | `src/App.jsx` |
| Department Pill Switcher | Interactive Faculty & Semester Pill Filters | `src/components/FacultySection.jsx` |
| Print Brutalist Design System | Warm paper `#E6DED4`, `#111111` ink, hard `shadow-print` | `src/index.css` |
