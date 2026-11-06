import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Clock, Compass, Eye } from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

export default function TimelineObservatory3D() {
  const { milestones } = useDepartmentData();
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | '2d'
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [isHourglassFlipped, setIsHourglassFlipped] = useState(false);

  // Safe active milestone index
  const safeIndex = activeMilestoneIndex < milestones.length ? activeMilestoneIndex : 0;
  const activeMilestone = milestones[safeIndex] || {
    year: '2026',
    title: 'Department Foundation',
    phase: 'Institutional Genesis',
    desc: 'PACE Computer Science & Engineering Department academic milestones.'
  };

  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current || milestones.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const isMobile = window.innerWidth < 640;
    const height = isMobile ? 340 : 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE6DED4); // Warm print paper

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 22, 40);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for whole astrolabe
    const astrolabeGroup = new THREE.Group();
    scene.add(astrolabeGroup);

    // Geometries & Materials tracking for full disposal
    const disposables = [];

    function trackMesh(geo, mat) {
      if (geo) disposables.push(geo);
      if (mat) disposables.push(mat);
    }

    // Materials (Palette: Brass Gold, Deep Cobalt, Ink Black, Saffron)
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      roughness: 0.3,
      metalness: 0.8
    });
    trackMesh(null, brassMaterial);

    const cobaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x102D69,
      roughness: 0.4,
      metalness: 0.6
    });
    trackMesh(null, cobaltMaterial);

    const saffronMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5B700,
      roughness: 0.2,
      metalness: 0.5
    });
    trackMesh(null, saffronMaterial);

    const inkRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111
    });
    trackMesh(null, inkRingMaterial);

    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xDCD2C6,
      roughness: 0.92,
      metalness: 0.05
    });
    trackMesh(null, paperMaterial);

    const dialInlayMaterial = new THREE.MeshBasicMaterial({
      color: 0x102D69,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    trackMesh(null, dialInlayMaterial);

    // 1. Stepped brass pedestal with an inset paper astrolabe dial
    const BASE_TOP_Y = -3.7;
    const RING_CENTER_Y = 4.4;

    const baseGeo = new THREE.CylinderGeometry(14.9, 15.3, 1.0, 64);
    trackMesh(baseGeo, null);
    const baseMesh = new THREE.Mesh(baseGeo, brassMaterial);
    baseMesh.position.y = BASE_TOP_Y - 0.5;
    astrolabeGroup.add(baseMesh);

    const dialGeo = new THREE.CircleGeometry(13.35, 64);
    dialGeo.rotateX(-Math.PI / 2);
    trackMesh(dialGeo, null);
    const dialMesh = new THREE.Mesh(dialGeo, paperMaterial);
    dialMesh.position.y = BASE_TOP_Y + 0.02;
    astrolabeGroup.add(dialMesh);

    // Ink outline around the paper dial
    const dialRimGeo = new THREE.TorusGeometry(13.38, 0.05, 8, 96);
    dialRimGeo.rotateX(Math.PI / 2);
    trackMesh(dialRimGeo, null);
    const dialRimMesh = new THREE.Mesh(dialRimGeo, inkRingMaterial);
    dialRimMesh.position.y = BASE_TOP_Y + 0.03;
    astrolabeGroup.add(dialRimMesh);

    // Thin cobalt track that carries the milestone studs
    const trackGeo = new THREE.RingGeometry(10.55, 10.72, 96);
    trackGeo.rotateX(-Math.PI / 2);
    trackMesh(trackGeo, null);
    const trackMeshInlay = new THREE.Mesh(trackGeo, dialInlayMaterial);
    trackMeshInlay.position.y = BASE_TOP_Y + 0.035;
    astrolabeGroup.add(trackMeshInlay);

    // Base ink border rim
    const rimGeo = new THREE.TorusGeometry(14.75, 0.12, 12, 64);
    trackMesh(rimGeo, null);
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, inkRingMaterial);
    rimMesh.position.y = BASE_TOP_Y + 0.02;
    astrolabeGroup.add(rimMesh);

    // 2. Cobalt pillars around the outer brass ring
    const numPillars = 12;
    const PILLAR_RADIUS = 14.15;
    const PILLAR_HEIGHT = 2.5;
    for (let i = 0; i < numPillars; i++) {
      const angle = (i / numPillars) * Math.PI * 2;
      const pillarGeo = new THREE.CylinderGeometry(0.18, 0.24, PILLAR_HEIGHT, 16);
      trackMesh(pillarGeo, null);
      const pillarMesh = new THREE.Mesh(pillarGeo, cobaltMaterial);
      pillarMesh.position.set(
        Math.cos(angle) * PILLAR_RADIUS,
        BASE_TOP_Y + PILLAR_HEIGHT / 2,
        Math.sin(angle) * PILLAR_RADIUS
      );
      astrolabeGroup.add(pillarMesh);

      // Saffron finial on top of each pillar
      const ballGeo = new THREE.SphereGeometry(0.38, 16, 16);
      trackMesh(ballGeo, null);
      const ballMesh = new THREE.Mesh(ballGeo, saffronMaterial);
      ballMesh.position.set(
        Math.cos(angle) * PILLAR_RADIUS,
        BASE_TOP_Y + PILLAR_HEIGHT + 0.22,
        Math.sin(angle) * PILLAR_RADIUS
      );
      astrolabeGroup.add(ballMesh);
    }

    // 3. Armillary rings, raised so they sit above the dial rather than through it
    const armillaryGroup = new THREE.Group();
    armillaryGroup.position.y = RING_CENTER_Y;
    astrolabeGroup.add(armillaryGroup);

    const ringPivots = [];
    function addArmillaryRing(radius, tube, material, tiltX, spinPhase) {
      const pivot = new THREE.Group();
      pivot.rotation.x = tiltX;
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 96);
      trackMesh(ringGeo, null);
      pivot.add(new THREE.Mesh(ringGeo, material));
      armillaryGroup.add(pivot);
      ringPivots.push({ pivot, spinPhase });
    }

    addArmillaryRing(7.9, 0.22, brassMaterial, 0, 0);
    addArmillaryRing(7.1, 0.17, cobaltMaterial, Math.PI / 2.7, Math.PI / 4);
    addArmillaryRing(6.3, 0.14, brassMaterial, -Math.PI / 2.9, Math.PI / 2);
    addArmillaryRing(5.6, 0.11, cobaltMaterial, Math.PI / 2 - 0.12, Math.PI / 3);

    // 4. Central celestial spark / academic core
    const coreGeo = new THREE.SphereGeometry(1.75, 32, 32);
    trackMesh(coreGeo, null);
    const coreMesh = new THREE.Mesh(coreGeo, saffronMaterial);
    armillaryGroup.add(coreMesh);

    const haloGeo = new THREE.TorusGeometry(2.55, 0.06, 8, 64);
    haloGeo.rotateX(Math.PI / 2);
    trackMesh(haloGeo, null);
    const haloMesh = new THREE.Mesh(haloGeo, inkRingMaterial);
    armillaryGroup.add(haloMesh);

    // 5. Milestone studs inlaid on the dial track
    const milestoneMeshes = [];
    milestones.forEach((m, idx) => {
      const count = Math.max(1, milestones.length);
      const angle = Math.PI / 2 + (idx / count) * Math.PI * 2;
      const radius = 10.62;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const nodeGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.26, 32);
      trackMesh(nodeGeo, null);
      const nodeMat = idx === safeIndex ? saffronMaterial : brassMaterial;
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, BASE_TOP_Y + 0.16, z);
      astrolabeGroup.add(nodeMesh);
      milestoneMeshes.push(nodeMesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    dirLight.position.set(15, 25, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x102D69, 1.5, 40);
    blueLight.position.set(-15, 10, -10);
    scene.add(blueLight);

    // Mouse / Touch Drag Rotation Physics
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };

    const domEl = renderer.domElement;

    function onPointerDown(e) {
      isDragging = true;
      previousPosition = { x: e.clientX, y: e.clientY };
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPosition.x;
      const deltaY = e.clientY - previousPosition.y;

      astrolabeGroup.rotation.y += deltaX * 0.008;
      astrolabeGroup.rotation.x += deltaY * 0.005;

      // Clamp vertical tilt
      astrolabeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, astrolabeGroup.rotation.x));

      previousPosition = { x: e.clientX, y: e.clientY };
    }

    function onPointerUp() {
      isDragging = false;
    }

    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Continuous Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow idle orbit if not dragging
      if (!isDragging) {
        astrolabeGroup.rotation.y += 0.0025;
      }

      // Internal rings counter-rotation around the shared celestial center
      if (ringPivots[0]) {
        ringPivots[0].pivot.rotation.y = Math.sin(elapsed * 0.35) * 0.22;
      }
      ringPivots.slice(1).forEach(({ pivot, spinPhase }) => {
        pivot.rotation.y = elapsed * 0.16 + spinPhase;
      });

      if (haloMesh) {
        haloMesh.rotation.z = elapsed * 0.25;
      }

      // Pulse active milestone stud
      if (milestoneMeshes[safeIndex]) {
        const s = 1.0 + Math.sin(elapsed * 4) * 0.1;
        milestoneMeshes[safeIndex].scale.set(s, 1, s);
      }

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const isMob = window.innerWidth < 640;
      const h = isMob ? 340 : 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (domEl.parentNode) domEl.parentNode.removeChild(domEl);
      
      // Clean up WebGL resources
      disposables.forEach(d => {
        if (d && typeof d.dispose === 'function') d.dispose();
      });
      renderer.dispose();
    };
  }, [viewMode, safeIndex, milestones]);

  return (
    <section id="timeline-observatory" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#E6DED4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#102D69]" />
              DEPARTMENT CHRONOLOGY &amp; EVOLUTION
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              INSTITUTIONAL ODYSSEY (2000 – 2026+)
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/70 max-w-xl mt-2 font-medium">
              Interactive 3D Astrolabe displaying key department milestones, NBA accreditations, VTU doctoral research center status, and infrastructure expansions.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex rounded-[2px] border-2 border-[#111111] bg-[#F6F2EB] p-1 shadow-print-sm self-start md:self-auto">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 sm:px-4 py-1.5 font-tech text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                    : 'text-[#111111] hover:bg-[#E6DED4]'
                }`}
              >
                3D · OBSERVATORY
              </button>
              <button
                onClick={() => setViewMode('2d')}
                className={`px-3 sm:px-4 py-1.5 font-tech text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                  viewMode === '2d'
                    ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                    : 'text-[#111111] hover:bg-[#E6DED4]'
                }`}
              >
                2D · CHRONICLE
              </button>
            </div>
        </div>

        {/* 3D Observatory View Container */}
        {viewMode === '3d' ? (
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] overflow-hidden flex flex-col">
            
            {/* Mobile-Friendly Active Milestone Header (Inline on mobile, Floating on sm+) */}
            <div className="sm:hidden p-3 bg-[#E6DED4] border-b-2 border-[#111111]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading text-2xl font-bold text-[#102D69] leading-none">
                  {activeMilestone.year}
                </span>
                <span className="font-mono text-[10px] font-bold text-[#102D69] bg-[#F5B700] text-[#111111] px-1.5 py-0.2 rounded-[2px] border border-[#111111]">
                  {activeMilestone.phase}
                </span>
              </div>
              <h4 className="font-tech text-sm font-bold uppercase text-[#111111]">
                {activeMilestone.title}
              </h4>
              <p className="font-sans text-xs text-[#111111]/80 mt-0.5 line-clamp-2">
                {activeMilestone.desc}
              </p>
            </div>

            <div className="relative">
              {/* Desktop Floating Vintage Chronology Card */}
              <div className="hidden sm:block absolute top-4 left-4 z-10 bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm p-4 rounded-[2px] max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-11 rounded-full bg-[#F5B700] border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-sm font-heading text-xl font-bold">
                    PACE
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#111111]/70 uppercase block">
                      CHRONOLOGY ENGINE · EST. 2000
                    </span>
                    <span className="font-heading text-3xl font-bold text-[#102D69] leading-none">
                      {activeMilestone.year}
                    </span>
                  </div>
                </div>
                <div className="border-t border-[#111111]/30 pt-2 font-tech text-xs">
                  <span className="font-mono text-[11px] font-bold text-[#102D69] uppercase block">
                    [{activeMilestone.phase}]
                  </span>
                  <span className="font-bold text-[#111111] text-sm uppercase block mt-0.5">
                    {activeMilestone.title}
                  </span>
                  <p className="font-sans text-[11px] text-[#111111]/80 mt-1 font-medium leading-relaxed">
                    {activeMilestone.desc}
                  </p>
                </div>
              </div>

              {/* Desktop Rotation Hint */}
              <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 font-tech text-xs uppercase font-bold text-[#111111]/60 bg-[#E6DED4] border border-[#111111] px-2.5 py-1 rounded-[2px]">
                <Eye className="w-3.5 h-3.5 text-[#102D69]" />
                <span>DRAG TO ROTATE 3D ASTROLABE</span>
              </div>

              {/* Three.js WebGL Canvas Mount */}
              <div ref={containerRef} className="w-full h-[340px] sm:h-[480px] cursor-grab active:cursor-grabbing touch-none" />
            </div>

            {/* Bottom Milestone Scrubber Bar */}
            <div className="p-2 sm:p-3 bg-[#E6DED4] border-t-2 border-[#111111] flex items-center gap-2 overflow-x-auto">
              {milestones.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMilestoneIndex(i)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-[2px] font-tech text-xs font-bold uppercase whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                    safeIndex === i
                      ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-y-0.5'
                      : 'bg-[#F6F2EB] text-[#111111] border-[#111111]/30 hover:border-[#111111]'
                  }`}
                >
                  <span className="font-mono mr-1.5 text-[#F5B700]">{m.year}</span>
                  <span>{m.title}</span>
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* 2D Chronicle View with Flipping Hourglass */
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsHourglassFlipped(prev => !prev)}
                  title="Click to turn the hourglass over"
                  className={`size-11 sm:size-12 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm flex items-center justify-center cursor-pointer transition-transform duration-700 ${
                    isHourglassFlipped ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-[#102D69]" />
                </button>
                <div>
                  <h4 className="font-tech text-sm sm:text-base font-bold uppercase text-[#111111]">
                    HISTORICAL CHRONICLE (2000 – 2026+)
                  </h4>
                  <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                    CLICK HOURGLASS TO INVERT PERSPECTIVE · {milestones.length} KEY MILESTONES
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm flex flex-col justify-between transition-transform hover:-translate-x-px hover:-translate-y-px"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-2xl font-bold text-[#102D69] leading-none">{m.year}</span>
                      <span className="font-tech text-[10px] font-bold uppercase bg-[#F5B700] text-[#111111] px-1.5 py-0.2 rounded-[2px] border border-[#111111]">
                        {m.phase}
                      </span>
                    </div>
                    <h5 className="font-tech text-base font-bold uppercase text-[#111111] mb-1 leading-snug">
                      {m.title}
                    </h5>
                    <p className="font-sans text-xs text-[#111111]/80 font-medium leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
