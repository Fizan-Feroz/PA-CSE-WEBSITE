# AGENTS.md — Autonomous Agent Operating Protocol (docs mirror)

> **Notice**: The authoritative root copy is located at [`AGENTS.md`](file:///d:/Projects/PA-CSE-WEBSITE/AGENTS.md).  
> **Source of Truth**: [pace.edu.in](https://pace.edu.in) · P.A. College of Engineering (PACE), Mangaluru  
> **Architecture**: React 19 + Vite + Tailwind CSS v4 + Three.js + Lucide React  

---

## 1. Primary Operating Invariants
1. **Zero Fictional / Hackathon Copy**: All data must strictly reflect P.A. College of Engineering Computer Science & Engineering (PACE CSE) as documented in `src/data/cseData.js` and `pace.edu.in`.
2. **Zero Dark Mode Regression**: The portal is built on unbleached kraft paper (`#E6DED4`) with deep ink (`#111111`), cobalt (`#102D69`), and saffron (`#F5B700`). Never introduce generic SaaS dark mode, high-radius bubbles, or blurry drop shadows.
3. **Three.js WebGL Resource Cleanup**: Always clean up geometry, materials, animations, and event listeners on component unmount in `TimelineObservatory3D.jsx`.
4. **Code Quality**: Oxlint must pass with 0 warnings and 0 errors (`npm run lint`). Production build must compile cleanly (`npm run build`).

Refer to [`AGENTS.md`](file:///d:/Projects/PA-CSE-WEBSITE/AGENTS.md) and [`THEME.md`](file:///d:/Projects/PA-CSE-WEBSITE/THEME.md) for complete specifications.
