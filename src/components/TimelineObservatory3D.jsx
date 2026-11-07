import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight, Compass, Eye, Pause, Play, Sparkles } from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

const ERA_DEFS = [
  {
    numeral: 'I',
    label: 'Foundation',
    range: '2000 – 2006',
    indices: [0, 1],
    blurb: 'The department takes root under VTU with its first intake, Linux clusters and the GLUG PACE community.'
  },
  {
    numeral: 'II',
    label: 'Accreditation & Research',
    range: '2012 – 2016',
    indices: [2, 3],
    blurb: 'NBA Tier-1 accreditation and recognition as a VTU research centre establish the academic benchmark.'
  },
  {
    numeral: 'III',
    label: 'Chapters & Specialised Labs',
    range: '2019 – 2022',
    indices: [4, 5],
    blurb: 'Student chapters, Centers of Excellence, the cyber range and GPU-backed AI research labs take shape.'
  },
  {
    numeral: 'IV',
    label: 'Autonomy & Vision',
    range: '2024 – 2026',
    indices: [6, 7],
    blurb: 'The autonomous curriculum, smart-campus research and the next-generation R&D hub point toward 2026+.'
  }
];

const ERA_PALETTES = [
  {
    stage: 'radial-gradient(ellipse at 50% 40%, #FBF4E7 0%, #E9E0D1 38%, #D8C8B4 72%, #C8B7A2 100%)',
    glow: 'rgba(245,183,0,0.20)',
    ambient: 0xFFF4DF,
    ambientIntensity: 1.15,
    key: 0xFFE7C2,
    keyIntensity: 2.1,
    rim: 0x102D69,
    rimIntensity: 0.8,
    particle: 0xC5A059,
    particleOpacity: 0.38,
    motif: 'text-[#111111]'
  },
  {
    stage: 'radial-gradient(ellipse at 50% 40%, #F3F4F0 0%, #DEE5E7 38%, #B9C8D5 74%, #A3B5C5 100%)',
    glow: 'rgba(32,75,153,0.18)',
    ambient: 0xF2F6FF,
    ambientIntensity: 1.0,
    key: 0xE8F0FF,
    keyIntensity: 1.9,
    rim: 0x204B99,
    rimIntensity: 1.0,
    particle: 0x7F98B8,
    particleOpacity: 0.34,
    motif: 'text-[#102D69]'
  },
  {
    stage: 'radial-gradient(ellipse at 50% 38%, #F3D7A4 0%, #CA8C69 30%, #7B5B78 62%, #302D53 100%)',
    glow: 'rgba(245,183,0,0.22)',
    ambient: 0xE8C9B0,
    ambientIntensity: 0.9,
    key: 0xFFD39A,
    keyIntensity: 2.2,
    rim: 0x2E4AA0,
    rimIntensity: 1.2,
    particle: 0xF1C36B,
    particleOpacity: 0.48,
    motif: 'text-[#F6F2EB]'
  },
  {
    stage: 'radial-gradient(ellipse at 50% 34%, #1C408E 0%, #102D69 40%, #071635 100%)',
    glow: 'rgba(245,183,0,0.20)',
    ambient: 0x8FA6DA,
    ambientIntensity: 0.72,
    key: 0xFFE2A8,
    keyIntensity: 2.4,
    rim: 0x5E7CFF,
    rimIntensity: 1.35,
    particle: 0xF5B700,
    particleOpacity: 0.68,
    motif: 'text-[#F6F2EB]'
  }
];

const KEY_MILESTONES = new Set([0, 2, 3, 7]);

function getEraIndex(index) {
  return Math.min(ERA_DEFS.length - 1, Math.floor(index / 2));
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function ChronologySeal({ flipped, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={flipped}
      title="Turn the chronology seal"
      className={`group relative mx-auto flex size-28 shrink-0 items-center justify-center rounded-full border-2 border-[#111111] bg-[#F5B700] shadow-print-sm transition-transform duration-700 lg:mx-0 ${
        flipped ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <span className="absolute inset-2 rounded-full border border-[#111111]/30" />
      <Compass className="size-14 text-[#102D69]" strokeWidth={1.4} />
      <span className="absolute -bottom-2 bg-[#102D69] px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#F6F2EB]">
        est. 2000
      </span>
    </button>
  );
}

function CyclePills({ count, activeIndex, isPaused, isAnimating, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => {
        const isPast = index < activeIndex;
        const isActive = index === activeIndex;
        return (
          <span
            key={index}
            className={`relative h-2 flex-1 overflow-hidden border bg-[#E6DED4] ${
              isActive
                ? 'border-[#102D69]'
                : isPast
                  ? 'border-[#111111]'
                  : 'border-[#111111]/25'
            }`}
          >
            {isPast && <span className="absolute inset-0 bg-[#102D69]" />}
            {isActive && (
              isPaused || !isAnimating ? (
                <span className="absolute inset-0 bg-[#F5B700]" />
              ) : (
                <span
                  key={`cycle-fill-${activeIndex}`}
                  className="auto-cycle-progress absolute inset-0 bg-[#F5B700]"
                />
              )
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function TimelineObservatory3D() {
  const { milestones } = useDepartmentData();
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const labelRefs = useRef([]);
  const [viewMode, setViewMode] = useState('3d');
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [isSealFlipped, setIsSealFlipped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(
    () => typeof IntersectionObserver === 'undefined'
  );

  const safeIndex = activeMilestoneIndex < milestones.length ? activeMilestoneIndex : 0;
  const activeMilestone = milestones[safeIndex] || {
    year: '2026',
    title: 'Department Foundation',
    phase: 'Institutional Genesis',
    desc: 'PACE Computer Science & Engineering Department academic milestones.'
  };

  const eraIndex = getEraIndex(safeIndex);
  const era = ERA_DEFS[eraIndex];
  const eraPalette = ERA_PALETTES[eraIndex];

  const eras = useMemo(
    () => ERA_DEFS.map((definition) => ({
      ...definition,
      items: definition.indices
        .filter((index) => index < milestones.length)
        .map((index) => ({ index, milestone: milestones[index] }))
    })),
    [milestones]
  );

  const activeIndexRef = useRef(safeIndex);
  useEffect(() => {
    activeIndexRef.current = safeIndex;
  }, [safeIndex]);

  const pausedRef = useRef(isPaused);
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  // Only advance the chronology while the observatory is actually on screen
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle through the eight medallions every five seconds
  useEffect(() => {
    if (viewMode !== '3d' || isPaused || !isSectionInView || milestones.length < 2) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setActiveMilestoneIndex((current) => {
        const normalized = current >= 0 && current < milestones.length ? current : 0;
        return (normalized + 1) % milestones.length;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [viewMode, isPaused, isSectionInView, milestones.length]);

  const selectMilestone = (index) => {
    setActiveMilestoneIndex(index);
    setIsPaused(true);
  };

  const openInObservatory = () => {
    setViewMode('3d');
    setIsPaused(true);
  };

  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current || milestones.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 640;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 21, 39);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const astrolabeGroup = new THREE.Group();
    scene.add(astrolabeGroup);

    const disposables = [];
    const track = (resource) => {
      if (resource) disposables.push(resource);
    };

    const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    // ---------------------------------------------------------------------
    // Materials
    // ---------------------------------------------------------------------
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      roughness: 0.3,
      metalness: 0.78
    });
    track(brassMaterial);

    const cobaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x102D69,
      roughness: 0.38,
      metalness: 0.55
    });
    track(cobaltMaterial);

    const saffronMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5B700,
      roughness: 0.22,
      metalness: 0.45
    });
    track(saffronMaterial);

    const inkMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
    track(inkMaterial);

    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xEFE7D9,
      roughness: 0.92,
      metalness: 0.04
    });
    track(paperMaterial);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x102D69,
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0x071733,
      emissiveIntensity: 0.9
    });
    track(coreMaterial);

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xC5A059,
      transparent: true,
      opacity: 0.7
    });
    track(orbitMaterial);

    // ---------------------------------------------------------------------
    // Procedural textures
    // ---------------------------------------------------------------------
    function createDialTexture() {
      const size = 2048;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const center = size / 2;
      const radius = size * 0.5;

      const wash = ctx.createRadialGradient(center, center * 0.84, size * 0.06, center, center, radius);
      wash.addColorStop(0, '#F3EBDD');
      wash.addColorStop(0.62, '#E6DED4');
      wash.addColorStop(1, '#D7CAB9');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, size, size);

      // Paper grain
      for (let i = 0; i < 320; i += 1) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        ctx.fillStyle = `rgba(17,17,17,${Math.random() * 0.035})`;
        ctx.fillRect(x, y, 1.4, 1.4);
      }

      const ring = (r, color, lineWidth, alpha = 1) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(center, center, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      };

      ring(radius * 0.965, '#111111', 9);
      ring(radius * 0.925, '#102D69', 3, 0.8);
      ring(radius * 0.755, '#102D69', 2.5, 0.55);
      ring(radius * 0.545, '#111111', 1.5, 0.22);
      ring(radius * 0.335, '#102D69', 1.5, 0.25);

      // Tick ring
      for (let i = 0; i < 144; i += 1) {
        const angle = (i / 144) * Math.PI * 2;
        const major = i % 12 === 0;
        const r1 = radius * (major ? 0.885 : 0.905);
        const r2 = radius * 0.935;
        ctx.strokeStyle = major ? '#111111' : 'rgba(17,17,17,0.36)';
        ctx.lineWidth = major ? 3.5 : 1.4;
        ctx.beginPath();
        ctx.moveTo(center + Math.cos(angle) * r1, center + Math.sin(angle) * r1);
        ctx.lineTo(center + Math.cos(angle) * r2, center + Math.sin(angle) * r2);
        ctx.stroke();
      }

      // Milestone year engraving around the dial
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#102D69';
      milestones.forEach((milestone, index) => {
        const angle = Math.PI / 2 + (index / Math.max(1, milestones.length)) * Math.PI * 2;
        const x = center + Math.cos(angle) * radius * 0.845;
        const y = center + Math.sin(angle) * radius * 0.845;
        ctx.font = '700 46px Rajdhani, Arial, sans-serif';
        ctx.fillText(milestone.year, x, y);
      });

      // Compass rose
      ctx.save();
      ctx.translate(center, center);
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = '#102D69';
      ctx.lineWidth = 2.4;
      const petals = 16;
      for (let i = 0; i < petals; i += 1) {
        const angle = (i / petals) * Math.PI * 2;
        const inner = radius * 0.1;
        const mid = radius * 0.28;
        const outer = radius * (i % 2 === 0 ? 0.46 : 0.34);
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
        ctx.quadraticCurveTo(
          Math.cos(angle + 0.12) * mid,
          Math.sin(angle + 0.12) * mid,
          Math.cos(angle) * outer,
          Math.sin(angle) * outer
        );
        ctx.quadraticCurveTo(
          Math.cos(angle - 0.12) * mid,
          Math.sin(angle - 0.12) * mid,
          Math.cos(angle) * inner,
          Math.sin(angle) * inner
        );
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(center, center);
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i += 1) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius * 0.32, Math.sin(angle) * radius * 0.32);
        ctx.stroke();
      }
      ctx.restore();

      // Title engraving at the head of the dial
      ctx.fillStyle = '#111111';
      ctx.font = '700 30px Rajdhani, Arial, sans-serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('PACE · COMPUTER SCIENCE & ENGINEERING', center, center - radius * 0.5);
      ctx.font = '600 24px Rajdhani, Arial, sans-serif';
      ctx.fillStyle = 'rgba(16,45,105,0.7)';
      ctx.letterSpacing = '4px';
      ctx.fillText('CHRONOLOGY DIAL · 2000 — 2026', center, center + radius * 0.49);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = maxAnisotropy;
      return texture;
    }

    function createColumnTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const bands = 18;
      const bandHeight = canvas.height / bands;
      for (let i = 0; i < bands; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? '#102D69' : '#F5B700';
        ctx.fillRect(0, i * bandHeight, canvas.width, bandHeight);
        ctx.fillStyle = 'rgba(17,17,17,0.35)';
        ctx.fillRect(0, i * bandHeight, canvas.width, 2);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = maxAnisotropy;
      return texture;
    }

    function createGlowTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 122);
      gradient.addColorStop(0, 'rgba(255,255,255,0)');
      gradient.addColorStop(0.3, 'rgba(245,183,0,0.62)');
      gradient.addColorStop(0.62, 'rgba(245,183,0,0.16)');
      gradient.addColorStop(1, 'rgba(245,183,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    function createDustTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
      gradient.addColorStop(0.35, 'rgba(255,255,255,0.45)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    const dialTexture = createDialTexture();
    track(dialTexture);
    const columnTexture = createColumnTexture();
    track(columnTexture);
    const glowTexture = createGlowTexture();
    track(glowTexture);
    const dustTexture = createDustTexture();
    track(dustTexture);

    // ---------------------------------------------------------------------
    // Base + engraved dial
    // ---------------------------------------------------------------------
    const BASE_TOP_Y = -3.7;
    const ORBIT_Y = 0.9;
    const ORBIT_RADIUS = 11.2;
    const RING_CENTER_Y = 4.4;

    const baseGeo = new THREE.CylinderGeometry(15.8, 16.3, 1.2, 96);
    track(baseGeo);
    const baseMesh = new THREE.Mesh(baseGeo, brassMaterial);
    baseMesh.position.y = BASE_TOP_Y - 0.6;
    baseMesh.receiveShadow = true;
    astrolabeGroup.add(baseMesh);

    const dialGeo = new THREE.CircleGeometry(15, 96);
    dialGeo.rotateX(-Math.PI / 2);
    track(dialGeo);
    const dialMaterial = new THREE.MeshStandardMaterial({
      map: dialTexture,
      roughness: 0.9,
      metalness: 0.03
    });
    track(dialMaterial);
    const dialMesh = new THREE.Mesh(dialGeo, dialMaterial);
    dialMesh.position.y = BASE_TOP_Y + 0.02;
    dialMesh.receiveShadow = true;
    astrolabeGroup.add(dialMesh);

    const rimGeo = new THREE.TorusGeometry(15.58, 0.12, 12, 96);
    rimGeo.rotateX(Math.PI / 2);
    track(rimGeo);
    const rimMesh = new THREE.Mesh(rimGeo, inkMaterial);
    rimMesh.position.y = BASE_TOP_Y + 0.02;
    astrolabeGroup.add(rimMesh);

    // Faint orbit inlay on the dial
    const inlayGeo = new THREE.RingGeometry(ORBIT_RADIUS - 0.13, ORBIT_RADIUS + 0.13, 128);
    inlayGeo.rotateX(-Math.PI / 2);
    track(inlayGeo);
    const inlayMaterial = new THREE.MeshBasicMaterial({
      color: 0x102D69,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide
    });
    track(inlayMaterial);
    const inlayMesh = new THREE.Mesh(inlayGeo, inlayMaterial);
    inlayMesh.position.y = BASE_TOP_Y + 0.035;
    astrolabeGroup.add(inlayMesh);

    // ---------------------------------------------------------------------
    // Pillars
    // ---------------------------------------------------------------------
    const PILLAR_RADIUS = 14.5;
    const PILLAR_HEIGHT = 2.7;
    const numPillars = 12;
    for (let i = 0; i < numPillars; i += 1) {
      const angle = (i / numPillars) * Math.PI * 2;
      const pillarGeo = new THREE.CylinderGeometry(0.18, 0.24, PILLAR_HEIGHT, 16);
      track(pillarGeo);
      const pillarMesh = new THREE.Mesh(pillarGeo, cobaltMaterial);
      pillarMesh.position.set(
        Math.cos(angle) * PILLAR_RADIUS,
        BASE_TOP_Y + PILLAR_HEIGHT / 2,
        Math.sin(angle) * PILLAR_RADIUS
      );
      pillarMesh.castShadow = true;
      astrolabeGroup.add(pillarMesh);

      const ballGeo = new THREE.SphereGeometry(0.38, 16, 16);
      track(ballGeo);
      const ballMesh = new THREE.Mesh(ballGeo, saffronMaterial);
      ballMesh.position.set(
        Math.cos(angle) * PILLAR_RADIUS,
        BASE_TOP_Y + PILLAR_HEIGHT + 0.22,
        Math.sin(angle) * PILLAR_RADIUS
      );
      ballMesh.castShadow = true;
      astrolabeGroup.add(ballMesh);
    }

    // ---------------------------------------------------------------------
    // Central striped gnomon column
    // ---------------------------------------------------------------------
    const columnHeight = RING_CENTER_Y - BASE_TOP_Y;
    const columnGeo = new THREE.CylinderGeometry(0.62, 0.8, columnHeight, 24, 1, false);
    track(columnGeo);
    const columnMaterial = new THREE.MeshStandardMaterial({
      map: columnTexture,
      roughness: 0.42,
      metalness: 0.4
    });
    track(columnMaterial);
    const columnMesh = new THREE.Mesh(columnGeo, columnMaterial);
    columnMesh.position.y = BASE_TOP_Y + columnHeight / 2;
    columnMesh.castShadow = true;
    astrolabeGroup.add(columnMesh);

    const footGeo = new THREE.CylinderGeometry(1.7, 2.2, 0.28, 32);
    track(footGeo);
    const footMesh = new THREE.Mesh(footGeo, brassMaterial);
    footMesh.position.y = BASE_TOP_Y + 0.16;
    footMesh.castShadow = true;
    astrolabeGroup.add(footMesh);

    const collarGeo = new THREE.CylinderGeometry(0.95, 1.2, 0.26, 32);
    track(collarGeo);
    const collarMesh = new THREE.Mesh(collarGeo, cobaltMaterial);
    collarMesh.position.y = RING_CENTER_Y - 0.08;
    collarMesh.castShadow = true;
    astrolabeGroup.add(collarMesh);

    // ---------------------------------------------------------------------
    // Armillary sphere
    // ---------------------------------------------------------------------
    const armillaryGroup = new THREE.Group();
    armillaryGroup.position.y = RING_CENTER_Y;
    astrolabeGroup.add(armillaryGroup);

    const ringPivots = [];
    function addArmillaryRing(radius, tube, material, tiltX, spinPhase) {
      const pivot = new THREE.Group();
      pivot.rotation.x = tiltX;
      const ringGeo = new THREE.TorusGeometry(radius, tube, 14, 96);
      track(ringGeo);
      const ringMesh = new THREE.Mesh(ringGeo, material);
      ringMesh.castShadow = true;
      pivot.add(ringMesh);
      armillaryGroup.add(pivot);
      ringPivots.push({ pivot, spinPhase });
    }

    addArmillaryRing(7.45, 0.2, brassMaterial, 0, 0);
    addArmillaryRing(6.75, 0.16, cobaltMaterial, Math.PI / 2.7, Math.PI / 4);
    addArmillaryRing(6.05, 0.14, brassMaterial, -Math.PI / 2.9, Math.PI / 2);
    addArmillaryRing(5.35, 0.1, cobaltMaterial, Math.PI / 2 - 0.12, Math.PI / 3);

    const coreGeo = new THREE.SphereGeometry(1.9, 32, 32);
    track(coreGeo);
    const coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
    coreMesh.castShadow = true;
    armillaryGroup.add(coreMesh);

    const coreHaloGeo = new THREE.TorusGeometry(2.55, 0.065, 8, 64);
    coreHaloGeo.rotateX(Math.PI / 2);
    track(coreHaloGeo);
    const coreHaloMesh = new THREE.Mesh(coreHaloGeo, saffronMaterial);
    armillaryGroup.add(coreHaloMesh);

    // ---------------------------------------------------------------------
    // Orbital medallions (the clickable interactive nodes)
    // ---------------------------------------------------------------------
    const orbitGeo = new THREE.TorusGeometry(ORBIT_RADIUS, 0.055, 8, 160);
    orbitGeo.rotateX(Math.PI / 2);
    track(orbitGeo);
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMaterial);
    orbitMesh.position.y = ORBIT_Y;
    astrolabeGroup.add(orbitMesh);

    const medallionRingGeo = new THREE.TorusGeometry(0.74, 0.15, 12, 36);
    track(medallionRingGeo);
    const medallionFaceGeo = new THREE.CircleGeometry(0.59, 32);
    track(medallionFaceGeo);
    const medallionCoreGeo = new THREE.BoxGeometry(0.34, 0.34, 0.08);
    track(medallionCoreGeo);

    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false
    });
    track(glowMaterial);

    const stemGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);
    track(stemGeo);
    const stemMaterial = new THREE.MeshBasicMaterial({
      color: 0xF5B700,
      transparent: true,
      opacity: 0.65
    });
    track(stemMaterial);

    const milestoneGroups = [];
    const milestoneHitMeshes = [];
    const milestoneStems = [];
    const milestoneGlows = [];

    milestones.forEach((milestone, index) => {
      const count = Math.max(1, milestones.length);
      const angle = Math.PI / 2 + (index / count) * Math.PI * 2;
      const x = Math.cos(angle) * ORBIT_RADIUS;
      const z = Math.sin(angle) * ORBIT_RADIUS;

      const group = new THREE.Group();
      group.position.set(x, ORBIT_Y, z);
      group.rotation.y = Math.PI / 2 - angle;
      group.userData.milestoneIndex = index;
      astrolabeGroup.add(group);

      const ringMesh = new THREE.Mesh(medallionRingGeo, brassMaterial);
      ringMesh.castShadow = true;
      group.add(ringMesh);

      const faceMesh = new THREE.Mesh(
        medallionFaceGeo,
        index === activeIndexRef.current ? saffronMaterial : paperMaterial
      );
      faceMesh.position.z = 0.012;
      faceMesh.castShadow = true;
      group.add(faceMesh);

      const coreMark = new THREE.Mesh(medallionCoreGeo, cobaltMaterial);
      coreMark.position.z = 0.075;
      coreMark.castShadow = true;
      group.add(coreMark);

      const hitGeo = new THREE.SphereGeometry(1.2, 8, 8);
      track(hitGeo);
      const hitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false
      });
      track(hitMat);
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData.milestoneIndex = index;
      group.add(hitMesh);
      milestoneHitMeshes.push(hitMesh);

      const glow = new THREE.Sprite(glowMaterial);
      glow.scale.set(4.6, 4.6, 1);
      glow.visible = false;
      group.add(glow);
      milestoneGlows.push(glow);

      const stemMesh = new THREE.Mesh(stemGeo, stemMaterial);
      stemMesh.position.set(x, ORBIT_Y, z);
      stemMesh.scale.y = 0.001;
      stemMesh.visible = false;
      astrolabeGroup.add(stemMesh);
      milestoneStems.push(stemMesh);

      group.userData.faceMesh = faceMesh;
      milestoneGroups.push(group);
    });

    // ---------------------------------------------------------------------
    // Ambient dust / stars
    // ---------------------------------------------------------------------
    const particleCount = 170;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 21;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = -2.5 + Math.random() * 17;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    track(particleGeo);
    const particleMaterial = new THREE.PointsMaterial({
      map: dustTexture,
      color: ERA_PALETTES[0].particle,
      size: 0.24,
      transparent: true,
      opacity: ERA_PALETTES[0].particleOpacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    track(particleMaterial);
    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // ---------------------------------------------------------------------
    // Lights
    // ---------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(ERA_PALETTES[0].ambient, ERA_PALETTES[0].ambientIntensity);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(ERA_PALETTES[0].key, ERA_PALETTES[0].keyIntensity);
    keyLight.position.set(18, 30, 22);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -26;
    keyLight.shadow.camera.right = 26;
    keyLight.shadow.camera.top = 26;
    keyLight.shadow.camera.bottom = -26;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 100;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);
    scene.add(keyLight.target);

    const rimLight = new THREE.PointLight(ERA_PALETTES[0].rim, ERA_PALETTES[0].rimIntensity, 48);
    rimLight.position.set(-16, 10, -12);
    scene.add(rimLight);

    const activeLight = new THREE.PointLight(0xF5B700, 0, 11, 2);
    scene.add(activeLight);

    const lightTargets = ERA_PALETTES.map((palette) => ({
      ambientColor: new THREE.Color(palette.ambient),
      ambientIntensity: palette.ambientIntensity,
      keyColor: new THREE.Color(palette.key),
      keyIntensity: palette.keyIntensity,
      rimColor: new THREE.Color(palette.rim),
      rimIntensity: palette.rimIntensity,
      particleColor: new THREE.Color(palette.particle),
      particleOpacity: palette.particleOpacity
    }));

    // ---------------------------------------------------------------------
    // Pointer interaction
    // ---------------------------------------------------------------------
    const domEl = renderer.domElement;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const landmarkWorld = new THREE.Vector3();
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };
    let dragDistance = 0;
    let hoveredIndex = -1;

    function getMilestoneAtPointer(event) {
      const rect = domEl.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(milestoneHitMeshes, false);
      for (const hit of hits) {
        const index = hit.object.userData.milestoneIndex;
        milestoneGroups[index].getWorldPosition(landmarkWorld);
        // Ignore medals hidden behind the central structure
        if (landmarkWorld.z > -2) return index;
      }
      return -1;
    }

    function setHoveredMilestone(index) {
      if (hoveredIndex === index) return;
      hoveredIndex = index;
      domEl.style.cursor = index >= 0 ? 'pointer' : '';
    }

    function onPointerDown(event) {
      isDragging = true;
      dragDistance = 0;
      previousPosition = { x: event.clientX, y: event.clientY };
    }

    function onPointerMove(event) {
      if (isDragging) {
        const deltaX = event.clientX - previousPosition.x;
        const deltaY = event.clientY - previousPosition.y;
        dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
        if (dragDistance > 3) {
          focusTargetRotation = null;
        }
        astrolabeGroup.rotation.y += deltaX * 0.008;
        astrolabeGroup.rotation.x += deltaY * 0.005;
        astrolabeGroup.rotation.x = Math.max(-0.55, Math.min(0.55, astrolabeGroup.rotation.x));
        previousPosition = { x: event.clientX, y: event.clientY };
      } else if (event.pointerType !== 'touch') {
        setHoveredMilestone(getMilestoneAtPointer(event));
      }
    }

    function onPointerUp(event) {
      if (isDragging && dragDistance < 8) {
        const hitIndex = getMilestoneAtPointer(event);
        if (hitIndex >= 0) {
          setActiveMilestoneIndex(hitIndex);
          setIsPaused(true);
          setHoveredMilestone(hitIndex);
        }
      }
      isDragging = false;
    }

    function onPointerLeave() {
      setHoveredMilestone(-1);
    }

    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('pointerleave', onPointerLeave);

    // ---------------------------------------------------------------------
    // HTML label projection
    // ---------------------------------------------------------------------
    const worldPosition = new THREE.Vector3();
    const labelPosition = new THREE.Vector3();

    function updateLabels() {
      const elements = labelRefs.current;
      const activeIdx = activeIndexRef.current;
      const count = Math.max(1, milestones.length);

      milestoneGroups.forEach((group, index) => {
        const element = elements[index];
        if (!element) return;

        group.getWorldPosition(worldPosition);
        labelPosition.copy(worldPosition);
        labelPosition.y += 1.55;

        const ndc = labelPosition.clone().project(camera);
        const isActive = index === activeIdx;
        const circularDistance = Math.min(Math.abs(index - activeIdx), count - Math.abs(index - activeIdx));
        const isNeighbour = circularDistance === 1;
        const frontFacing = worldPosition.z > -1.5;
        const inFrame = Math.abs(ndc.x) < 1.02 && Math.abs(ndc.y) < 1.02 && ndc.z > -1 && ndc.z < 1;
        const visible = inFrame && (isActive || frontFacing);

        const x = (ndc.x * 0.5 + 0.5) * container.clientWidth;
        const y = (-ndc.y * 0.5 + 0.5) * container.clientHeight;

        element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
        element.style.opacity = visible ? String(isActive ? 1 : isNeighbour ? 0.76 : 0.46) : '0';
        element.style.zIndex = isActive ? '26' : '20';
      });
    }

    // ---------------------------------------------------------------------
    // Animation
    // ---------------------------------------------------------------------
    let animationFrameId;
    const clock = new THREE.Clock();
    let orbitTime = 0;
    let pulseTime = 0;
    let lastFocusIndex = -1;
    let focusTargetRotation = null;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      pulseTime += delta;

      const isPausedNow = pausedRef.current;
      const activeIdx = activeIndexRef.current;

      if (!isPausedNow) {
        orbitTime += delta;
      }

      if (activeIdx !== lastFocusIndex) {
        // Bring the selected medallion to the front of the dial
        const targetBase = activeIdx * (Math.PI * 2 / Math.max(1, milestones.length));
        focusTargetRotation = astrolabeGroup.rotation.y + Math.atan2(
          Math.sin(targetBase - astrolabeGroup.rotation.y),
          Math.cos(targetBase - astrolabeGroup.rotation.y)
        );
        lastFocusIndex = activeIdx;
      }

      if (focusTargetRotation !== null) {
        const difference = focusTargetRotation - astrolabeGroup.rotation.y;
        astrolabeGroup.rotation.y += difference * Math.min(1, delta * 4);
        if (Math.abs(difference) < 0.002) {
          astrolabeGroup.rotation.y = focusTargetRotation;
          focusTargetRotation = null;
        }
      } else if (!isPausedNow && !isDragging) {
        // Gentle breathing drift between auto-cycle steps
        astrolabeGroup.rotation.y += 0.015 * delta;
      }

      if (ringPivots[0]) {
        ringPivots[0].pivot.rotation.y = Math.sin(orbitTime * 0.35) * 0.22;
      }
      ringPivots.slice(1).forEach(({ pivot, spinPhase }) => {
        pivot.rotation.y = orbitTime * 0.16 + spinPhase;
      });

      coreHaloMesh.rotation.z = orbitTime * 0.25;

      const targetEraIndex = getEraIndex(activeIdx);
      const targetLight = lightTargets[targetEraIndex];

      ambientLight.color.lerp(targetLight.ambientColor, Math.min(1, delta * 2.4));
      ambientLight.intensity += (targetLight.ambientIntensity - ambientLight.intensity) * Math.min(1, delta * 2.4);
      keyLight.color.lerp(targetLight.keyColor, Math.min(1, delta * 2.4));
      keyLight.intensity += (targetLight.keyIntensity - keyLight.intensity) * Math.min(1, delta * 2.4);
      rimLight.color.lerp(targetLight.rimColor, Math.min(1, delta * 2.4));
      rimLight.intensity += (targetLight.rimIntensity - rimLight.intensity) * Math.min(1, delta * 2.4);
      particleMaterial.color.lerp(targetLight.particleColor, Math.min(1, delta * 2.4));
      particleMaterial.opacity += (targetLight.particleOpacity - particleMaterial.opacity) * Math.min(1, delta * 2.4);
      particles.rotation.y = orbitTime * 0.008;
      particles.position.y = Math.sin(orbitTime * 0.14) * 0.35;

      milestoneGroups.forEach((group, index) => {
        const isActive = index === activeIdx;
        const faceMesh = group.userData.faceMesh;
        faceMesh.material = isActive ? saffronMaterial : paperMaterial;

        const hoverScale = index === hoveredIndex && !isActive ? 1.12 : 1;
        const activeScale = isPausedNow
          ? 1.45 + Math.sin(pulseTime * 4) * 0.05
          : 1.25 + Math.sin(pulseTime * 4) * 0.05;
        group.scale.setScalar(isActive ? activeScale : hoverScale);

        const liftTarget = isActive ? 1.75 : 0;
        const targetY = ORBIT_Y + liftTarget;
        group.position.y += (targetY - group.position.y) * Math.min(1, delta * 7);
        const lift = Math.max(0, group.position.y - ORBIT_Y);

        const stem = milestoneStems[index];
        stem.visible = lift > 0.02;
        if (stem.visible) {
          stem.position.y = ORBIT_Y + lift / 2;
          stem.scale.y = lift;
        }

        const glow = milestoneGlows[index];
        glow.visible = isActive;
        if (isActive) {
          const glowScale = 4.4 + Math.sin(pulseTime * 3) * 0.35 + (isPausedNow ? 0.6 : 0);
          glow.scale.set(glowScale, glowScale, 1);
        }
      });

      // Active point light follows the selected medallion
      if (milestoneGroups[activeIdx]) {
        milestoneGroups[activeIdx].getWorldPosition(worldPosition);
        activeLight.position.copy(worldPosition);
        activeLight.position.y += 0.6;
        const targetIntensity = isPausedNow
          ? 2.4 + Math.sin(pulseTime * 4) * 0.35
          : 1.7 + Math.sin(pulseTime * 4) * 0.18;
        activeLight.intensity += (targetIntensity - activeLight.intensity) * Math.min(1, delta * 4);
      }

      renderer.render(scene, camera);
      updateLabels();
    }

    // ---------------------------------------------------------------------
    // Viewport sizing
    // ---------------------------------------------------------------------
    function applyViewport() {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      if (!nextWidth || !nextHeight) return;
      const aspect = nextWidth / nextHeight;
      const fitScale = Math.min(1, aspect * 1.12);
      astrolabeGroup.scale.setScalar(fitScale);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    }

    const resizeObserver = new ResizeObserver(applyViewport);
    resizeObserver.observe(container);
    applyViewport();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (domEl.parentNode) domEl.parentNode.removeChild(domEl);

      disposables.forEach((resource) => {
        if (resource && typeof resource.dispose === 'function') resource.dispose();
      });
      renderer.dispose();
    };
  }, [viewMode, milestones]);

  return (
    <section ref={sectionRef} id="timeline-observatory" className="relative border-t-2 border-[#111111] bg-[#E6DED4] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="flex items-center gap-1.5 font-tech text-xs font-bold uppercase tracking-widest text-[#102D69]">
              <Compass className="h-4 w-4 text-[#102D69]" />
              DEPARTMENT CHRONOLOGY &amp; EVOLUTION
            </span>
            <h2 className="mt-1 font-heading text-4xl font-bold uppercase leading-none tracking-wide text-[#111111] sm:text-6xl">
              INSTITUTIONAL ODYSSEY (2000 – 2026+)
            </h2>
            <p className="mt-2 max-w-xl font-sans text-xs font-medium text-[#111111]/70 sm:text-sm">
              Explore the department chronology in 3D or read the full chronicle. In 3D, the dial advances every 5 seconds — click any medallion to pause and inspect it.
            </p>
          </div>

          <div className="inline-flex self-start rounded-[2px] border-2 border-[#111111] bg-[#F6F2EB] p-1 shadow-print-sm md:self-auto">
            <button
              onClick={() => setViewMode('3d')}
              className={`cursor-pointer rounded-[2px] px-3 py-1.5 font-tech text-xs font-bold uppercase tracking-wider transition-all sm:px-4 ${
                viewMode === '3d'
                  ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                  : 'text-[#111111] hover:bg-[#E6DED4]'
              }`}
            >
              3D · OBSERVATORY
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`cursor-pointer rounded-[2px] px-3 py-1.5 font-tech text-xs font-bold uppercase tracking-wider transition-all sm:px-4 ${
                viewMode === '2d'
                  ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                  : 'text-[#111111] hover:bg-[#E6DED4]'
              }`}
            >
              2D · CHRONICLE
            </button>
          </div>
        </div>
      </div>

      {viewMode === '3d' ? (
        <div className="relative mt-6 w-full overflow-hidden border-y-2 border-[#111111]">
          {/* Era backdrop layers */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {ERA_PALETTES.map((palette, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000 ease-out"
                style={{ background: palette.stage, opacity: index === eraIndex ? 1 : 0 }}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 50% 44%, ${eraPalette.glow} 0%, transparent 58%)` }}
            />

            {/* Faint astrolabe blueprint behind the scene */}
            <svg
              viewBox="0 0 1000 1000"
              className={`absolute left-1/2 top-1/2 h-[112%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.07] ${eraPalette.motif}`}
              fill="none"
              stroke="currentColor"
            >
              <circle cx="500" cy="500" r="474" strokeWidth="2" />
              <circle cx="500" cy="500" r="398" strokeWidth="1.4" />
              <circle cx="500" cy="500" r="296" strokeWidth="1" />
              <circle cx="500" cy="500" r="186" strokeWidth="1" />
              {Array.from({ length: 72 }).map((_, index) => {
                const angle = (index / 72) * Math.PI * 2;
                const long = index % 9 === 0;
                return (
                  <line
                    key={index}
                    x1={500 + Math.cos(angle) * (long ? 410 : 452)}
                    y1={500 + Math.sin(angle) * (long ? 410 : 452)}
                    x2={500 + Math.cos(angle) * 474}
                    y2={500 + Math.sin(angle) * 474}
                    strokeWidth={long ? 3 : 1}
                  />
                );
              })}
              <path d="M500 90 L548 452 L910 500 L548 548 L500 910 L452 548 L90 500 L452 452 Z" strokeWidth="1.6" />
            </svg>

            {/* Horizon ridges */}
            <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className={`absolute inset-x-0 bottom-0 h-[48%] w-full opacity-[0.13] ${eraPalette.motif}`} fill="currentColor">
              <path d="M0 250 C180 190 290 280 470 225 C650 170 760 250 940 205 C1120 160 1270 230 1440 180 L1440 420 L0 420 Z" />
              <path d="M0 315 C190 265 330 335 520 290 C710 245 850 320 1040 280 C1190 248 1320 300 1440 270 L1440 420 L0 420 Z" opacity="0.65" />
            </svg>
          </div>

          {/* Mobile HUD */}
          <div className="relative z-30 border-b-2 border-[#111111] bg-[#F6F2EB] px-4 py-3 sm:hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-[#102D69]">
                  PACE · CHRONOLOGY ENGINE
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <span className="font-heading text-5xl font-bold leading-none text-[#102D69]">{activeMilestone.year}</span>
                  <span className="border border-[#111111] bg-[#F5B700] px-1.5 py-0.5 font-tech text-[9px] font-bold uppercase tracking-wider text-[#111111]">
                    ERA {era.numeral} · {era.label}
                  </span>
                </div>
                <p className="mt-1 font-tech text-xs font-bold uppercase text-[#111111]">{activeMilestone.title}</p>
                <p className="mt-0.5 line-clamp-2 font-sans text-[11px] text-[#111111]/75">{activeMilestone.desc}</p>
              </div>
              {isPaused && (
                <button
                  onClick={() => setIsPaused(false)}
                  className="flex shrink-0 cursor-pointer items-center gap-1 border border-[#111111] bg-[#102D69] px-2 py-1 font-tech text-[10px] font-bold uppercase text-[#F6F2EB] shadow-print-sm"
                >
                  <Play className="h-3 w-3" /> Resume
                </button>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold text-[#102D69]">{pad(safeIndex + 1)} / {pad(milestones.length)}</span>
              <CyclePills
                count={milestones.length}
                activeIndex={safeIndex}
                isPaused={isPaused}
                isAnimating={isSectionInView && !isPaused}
                className="flex-1"
              />
              <span className="font-mono text-[9px] font-bold uppercase text-[#102D69]/70">
                {isPaused ? 'Paused' : 'Auto · 5s'}
              </span>
            </div>
          </div>

          {/* 3D stage */}
          <div className="relative h-[540px] w-full sm:h-[600px] lg:h-[640px]">
            <div
              ref={containerRef}
              className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
            />

            {/* Projected year labels */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
              {milestones.map((milestone, index) => (
                <span
                  key={milestone.year}
                  ref={(element) => {
                    labelRefs.current[index] = element;
                  }}
                  data-on={index === safeIndex ? 'true' : undefined}
                  style={{ opacity: 0, transform: 'translate3d(-999px, -999px, 0)' }}
                  className={`absolute left-0 top-0 whitespace-nowrap rounded-[2px] border-2 border-[#111111] px-2 py-0.5 font-heading text-xl leading-none tracking-wide transition-colors duration-300 sm:text-2xl ${
                    index === safeIndex
                      ? eraIndex === 3
                        ? 'bg-[#F5B700] text-[#111111] shadow-[3px_3px_0_0_#F6F2EB]'
                        : 'bg-[#102D69] text-[#F6F2EB] shadow-[3px_3px_0_0_#F5B700]'
                      : 'bg-[#F6F2EB]/90 text-[#111111]'
                  }`}
                >
                  {milestone.year}
                </span>
              ))}
            </div>

            {/* Desktop HUD */}
            <div className="absolute left-4 top-4 z-30 hidden w-[360px] border-2 border-[#111111] bg-[#F6F2EB]/95 p-4 shadow-[6px_6px_0_0_#102D69] backdrop-blur-[2px] sm:block">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-12 items-center justify-center rounded-full border-2 border-[#111111] bg-[#F5B700] text-[#102D69]">
                    <Compass className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-[#111111]/65">
                      PACE · CHRONOLOGY ENGINE
                    </p>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#102D69]">
                      2000 — 2026 · {pad(safeIndex + 1)} / {pad(milestones.length)}
                    </p>
                  </div>
                </div>
                <span className="border border-[#111111] bg-[#F5B700] px-1.5 py-0.5 font-tech text-[9px] font-bold uppercase tracking-wider text-[#111111]">
                  ERA {era.numeral}
                </span>
              </div>

              <div className="mt-3 flex items-end gap-2 border-b border-[#111111]/25 pb-2">
                <span className="font-heading text-6xl font-bold leading-[0.75] text-[#102D69]">{activeMilestone.year}</span>
                <div className="pb-0.5">
                  <span className="block font-tech text-[10px] font-bold uppercase tracking-wider text-[#102D69]">
                    {era.label} · {era.range}
                  </span>
                  <span className="mt-0.5 block font-tech text-sm font-bold uppercase leading-tight text-[#111111]">
                    {activeMilestone.title}
                  </span>
                </div>
              </div>

              <p className="mt-2 font-sans text-[11px] font-medium leading-relaxed text-[#111111]/80">
                {activeMilestone.desc}
              </p>

              <CyclePills
                count={milestones.length}
                activeIndex={safeIndex}
                isPaused={isPaused}
                isAnimating={isSectionInView && !isPaused}
                className="mt-3"
              />

              <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#111111]/25 pt-2">
                <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#102D69]">
                  <span className={`size-1.5 rounded-full ${isPaused ? 'border border-[#111111] bg-[#F5B700]' : 'animate-pulse bg-[#102D69]'}`} />
                  {isPaused ? 'Selected · paused' : 'Auto-cycle · 5s'}
                </span>
                {isPaused ? (
                  <button
                    onClick={() => setIsPaused(false)}
                    className="flex cursor-pointer items-center gap-1 border border-[#111111] bg-[#102D69] px-2 py-1 font-tech text-[10px] font-bold uppercase text-[#F6F2EB] shadow-print-sm transition-colors hover:bg-[#0b2250]"
                  >
                    <Play className="h-3 w-3" /> Resume
                  </button>
                ) : (
                  <span className="flex items-center gap-1 font-tech text-[10px] font-bold uppercase text-[#111111]/50">
                    <Pause className="h-3 w-3" /> Click a medallion
                  </span>
                )}
              </div>
            </div>

            {/* Hint / paused state */}
            <div className="pointer-events-none absolute right-4 top-4 z-30 hidden items-center gap-1.5 border border-[#111111] bg-[#F6F2EB]/85 px-2.5 py-1 font-tech text-[11px] font-bold uppercase tracking-wide text-[#111111]/60 backdrop-blur-[2px] md:flex">
              {isPaused ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-[#102D69]" />
                  <span>Orbit paused · drag to inspect</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5 text-[#102D69]" />
                  <span>Auto-cycle · click a medallion to pause</span>
                </>
              )}
            </div>

            {/* Year rail */}
            <div className="absolute inset-x-0 bottom-0 z-30 hidden border-t-2 border-[#111111] bg-[#F6F2EB]/95 px-2 py-2 backdrop-blur-[2px] sm:px-4 lg:block">
              <div className="mx-auto grid w-full max-w-7xl grid-cols-8 gap-1 pr-4 lg:pr-52">
                {milestones.map((milestone, index) => (
                  <button
                    key={milestone.year}
                    onClick={() => selectMilestone(index)}
                    className={`group min-w-0 cursor-pointer border-2 px-1.5 py-1 text-left transition-all sm:px-2.5 ${
                      index === safeIndex
                        ? 'border-[#111111] bg-[#102D69] shadow-[2px_2px_0_0_#F5B700]'
                        : 'border-[#111111]/25 bg-[#F6F2EB] hover:border-[#111111]'
                    }`}
                  >
                    <span className={`block font-heading text-lg leading-none sm:text-2xl ${index === safeIndex ? 'text-[#F6F2EB]' : 'text-[#102D69]'}`}>
                      {milestone.year}
                    </span>
                    <span className={`mt-0.5 hidden truncate font-tech text-[8px] font-bold uppercase leading-tight tracking-wider sm:block ${index === safeIndex ? 'text-[#F6F2EB]/70' : 'text-[#111111]/55'}`}>
                      {milestone.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-[#111111] bg-[#F6F2EB] shadow-print">
            <div className="grid lg:grid-cols-[300px_1fr]">
              <aside className="relative self-start overflow-hidden border-b-2 border-[#111111] bg-[#E6DED4] p-5 sm:p-6 lg:sticky lg:top-24 lg:border-b-0 lg:border-r-2">
                <div className="relative z-10">
                  <p className="font-tech text-[10px] font-bold uppercase tracking-[0.22em] text-[#102D69]">
                    Chronicle engine · 2000 — 2026
                  </p>
                  <div className="mt-4 flex items-center gap-4 lg:block">
                    <ChronologySeal
                      flipped={isSealFlipped}
                      onClick={() => setIsSealFlipped((previous) => !previous)}
                    />
                    <div className="min-w-0 lg:mt-4">
                      <span className="block font-heading text-6xl font-bold leading-none text-[#102D69]">
                        {activeMilestone.year}
                      </span>
                      <span className="mt-1 block border border-[#111111] bg-[#F5B700] px-1.5 py-0.5 font-tech text-[9px] font-bold uppercase tracking-wider text-[#111111]">
                        {activeMilestone.phase}
                      </span>
                    </div>
                  </div>
                  <h4 className="mt-4 font-tech text-lg font-bold uppercase leading-tight text-[#111111]">
                    {activeMilestone.title}
                  </h4>
                  <p className="mt-2 font-sans text-xs font-medium leading-relaxed text-[#111111]/75">
                    {activeMilestone.desc}
                  </p>
                  <div className="mt-4 border-t border-[#111111]/25 pt-3">
                    <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-[#102D69]">
                      {pad(safeIndex + 1)} / {pad(milestones.length)} · {era.label}
                    </span>
                    <button
                      onClick={openInObservatory}
                      className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1 whitespace-nowrap border border-[#111111] bg-[#102D69] px-2 py-1 font-tech text-[10px] font-bold uppercase text-[#F6F2EB] shadow-print-sm transition-colors hover:bg-[#0b2250]"
                    >
                      View in 3D <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <svg
                  viewBox="0 0 400 400"
                  className="pointer-events-none absolute -right-24 -top-16 h-[420px] w-[420px] text-[#102D69] opacity-10"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="200" cy="200" r="188" strokeWidth="2" />
                  <circle cx="200" cy="200" r="138" strokeWidth="1.4" />
                  <circle cx="200" cy="200" r="82" strokeWidth="1" />
                  <path d="M200 16 L226 174 L384 200 L226 226 L200 384 L174 226 L16 200 L174 174 Z" strokeWidth="1.5" />
                </svg>
              </aside>

              <div className="relative overflow-hidden p-4 pb-24 sm:p-8 sm:pb-24">
                <div className="pointer-events-none absolute -right-20 -top-24 h-[520px] w-[520px] rounded-full border border-[#102D69]/10" />
                <div className="pointer-events-none absolute -right-8 top-8 h-[360px] w-[360px] rounded-full border border-[#102D69]/10" />

                <div className="relative flex flex-col justify-between gap-3 border-b-2 border-[#111111] pb-5 sm:flex-row sm:items-end">
                  <div>
                    <p className="font-tech text-[10px] font-bold uppercase tracking-[0.22em] text-[#102D69]">
                      The department chronicle
                    </p>
                    <h3 className="mt-1 font-heading text-4xl font-bold uppercase leading-none text-[#111111] sm:text-5xl">
                      2000 → 2026, era by era
                    </h3>
                  </div>
                  <p className="max-w-xs font-sans text-xs font-medium leading-relaxed text-[#111111]/65">
                    Eight milestones, four eras. Click any entry to hold it in the observatory.
                  </p>
                </div>

                <div className="relative mt-6">
                  <div className="absolute bottom-0 left-[17px] top-2 w-[2px] bg-[#111111]/60" />

                  {eras.map((eraDefinition) => (
                    <section key={eraDefinition.numeral} className="relative">
                      <div className="relative z-10 flex items-start gap-3 pb-3 pt-5">
                        <div className="flex size-9 shrink-0 items-center justify-center border-2 border-[#111111] bg-[#F5B700] font-heading text-xl font-bold leading-none text-[#111111] shadow-print-sm">
                          {eraDefinition.numeral}
                        </div>
                        <div className="min-w-0 border-b border-[#111111]/25 pb-2">
                          <p className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-[#102D69]">
                            Era {eraDefinition.numeral} · {eraDefinition.range}
                          </p>
                          <h4 className="font-heading text-2xl font-bold uppercase leading-none text-[#111111] sm:text-3xl">
                            {eraDefinition.label}
                          </h4>
                          <p className="mt-1 max-w-lg font-sans text-[11px] font-medium leading-relaxed text-[#111111]/60">
                            {eraDefinition.blurb}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {eraDefinition.items.map(({ index, milestone }) => {
                          const isActive = index === safeIndex;
                          const isKey = KEY_MILESTONES.has(index);
                          return (
                            <article key={milestone.year} className="relative pl-12">
                              <span
                                className={`absolute left-[12px] top-6 z-10 size-2.5 rounded-full border-2 border-[#111111] ${
                                  isActive ? 'bg-[#F5B700]' : 'bg-[#F6F2EB]'
                                }`}
                              />
                              <button
                                onClick={() => selectMilestone(index)}
                                className={`w-full cursor-pointer border-2 bg-[#E6DED4] p-3.5 text-left transition-transform sm:p-4 ${
                                  isActive
                                    ? 'border-[#102D69] shadow-print-cobalt'
                                    : 'border-[#111111] shadow-print-sm hover:-translate-x-px hover:-translate-y-px'
                                }`}
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-heading text-3xl font-bold leading-none text-[#102D69]">
                                    {milestone.year}
                                  </span>
                                  <span className="border border-[#111111] bg-[#F5B700] px-1.5 py-0.5 font-tech text-[9px] font-bold uppercase tracking-wider text-[#111111]">
                                    {milestone.phase}
                                  </span>
                                </div>
                                <h5 className="mt-1.5 font-tech text-sm font-bold uppercase leading-snug text-[#111111]">
                                  {milestone.title}
                                </h5>
                                <p className="mt-1 font-sans text-[11px] font-medium leading-relaxed text-[#111111]/70">
                                  {milestone.desc}
                                </p>
                                {isKey && (
                                  <span className="mt-2 flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#102D69]">
                                    <Sparkles className="h-3 w-3 text-[#F5B700]" /> Key milestone
                                  </span>
                                )}
                              </button>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
