import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Clock, Compass, Eye } from 'lucide-react';
import { DEPARTMENT_MILESTONES } from '../data/cseData';

export default function TimelineObservatory3D() {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | '2d'
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [isHourglassFlipped, setIsHourglassFlipped] = useState(false);

  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE6DED4); // Warm print paper

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 38);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for whole astrolabe
    const astrolabeGroup = new THREE.Group();
    scene.add(astrolabeGroup);

    // Materials (Palette: Brass Gold, Deep Cobalt, Ink Black, Saffron)
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      roughness: 0.3,
      metalness: 0.8
    });

    const cobaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x102D69,
      roughness: 0.4,
      metalness: 0.6
    });

    const saffronMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5B700,
      roughness: 0.2,
      metalness: 0.5
    });

    const inkRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true
    });

    // 1. Base Pedestal Ring
    const baseGeo = new THREE.CylinderGeometry(14, 15, 0.8, 64);
    const baseMesh = new THREE.Mesh(baseGeo, brassMaterial);
    baseMesh.position.y = -4;
    astrolabeGroup.add(baseMesh);

    // Base Ink Border Rim
    const rimGeo = new THREE.TorusGeometry(14.8, 0.15, 16, 64);
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, inkRingMaterial);
    rimMesh.position.y = -3.6;
    astrolabeGroup.add(rimMesh);

    // 2. Pillars around the base
    const numPillars = 12;
    for (let i = 0; i < numPillars; i++) {
      const angle = (i / numPillars) * Math.PI * 2;
      const pillarGeo = new THREE.CylinderGeometry(0.25, 0.3, 3, 16);
      const pillarMesh = new THREE.Mesh(pillarGeo, cobaltMaterial);
      pillarMesh.position.set(Math.cos(angle) * 13, -2.5, Math.sin(angle) * 13);
      astrolabeGroup.add(pillarMesh);

      // Saffron finial on top of each pillar
      const ballGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const ballMesh = new THREE.Mesh(ballGeo, saffronMaterial);
      ballMesh.position.set(Math.cos(angle) * 13, -1, Math.sin(angle) * 13);
      astrolabeGroup.add(ballMesh);
    }

    // 3. Nested Armillary Rings (Astrolabe)
    const ring1Geo = new THREE.TorusGeometry(9, 0.3, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, brassMaterial);
    astrolabeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(8, 0.25, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, cobaltMaterial);
    ring2.rotation.x = Math.PI / 4;
    astrolabeGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(7, 0.2, 16, 64);
    const ring3 = new THREE.Mesh(ring3Geo, brassMaterial);
    ring3.rotation.y = Math.PI / 3;
    astrolabeGroup.add(ring3);

    // 4. Central Celestial Spark / Academic Core
    const coreGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMesh = new THREE.Mesh(coreGeo, saffronMaterial);
    astrolabeGroup.add(coreMesh);

    // 5. Orbiting Milestone Nodes along an elevated arc
    const milestoneMeshes = [];
    DEPARTMENT_MILESTONES.forEach((m, idx) => {
      const t = idx / (DEPARTMENT_MILESTONES.length - 1);
      const angle = Math.PI * 0.15 + t * (Math.PI * 1.7);
      const radius = 12.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(t * Math.PI) * 4;

      const nodeGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.35, 32);
      const nodeMat = idx === activeMilestoneIndex ? saffronMaterial : brassMaterial;
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.rotation.x = Math.PI / 6;
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

    // Mouse Drag Rotation Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const domEl = renderer.domElement;

    function onPointerDown(e) {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      astrolabeGroup.rotation.y += deltaX * 0.008;
      astrolabeGroup.rotation.x += deltaY * 0.005;

      // Clamp vertical tilt
      astrolabeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, astrolabeGroup.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
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

      // Internal rings counter-rotation
      ring1.rotation.z = elapsed * 0.15;
      ring2.rotation.y = elapsed * 0.2;
      ring3.rotation.x = elapsed * 0.18;

      // Pulse active milestone disc
      if (milestoneMeshes[activeMilestoneIndex]) {
        const s = 1.0 + Math.sin(elapsed * 4) * 0.08;
        milestoneMeshes[activeMilestoneIndex].scale.set(s, s, s);
      }

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (domEl.parentNode) domEl.parentNode.removeChild(domEl);
      renderer.dispose();
    };
  }, [viewMode, activeMilestoneIndex]);

  const activeMilestone = DEPARTMENT_MILESTONES[activeMilestoneIndex];

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

          {/* Mode Switcher Buttons */}
          <div className="inline-flex rounded-[2px] border-2 border-[#111111] bg-[#F6F2EB] p-1 shadow-print-sm self-start md:self-auto">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-4 py-1.5 font-tech text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                  : 'text-[#111111] hover:bg-[#E6DED4]'
              }`}
            >
              3D · OBSERVATORY
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`px-4 py-1.5 font-tech text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
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
          <div className="relative bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] overflow-hidden">
            
            {/* Top-Left Vintage Chronology Card */}
            <div className="absolute top-4 left-4 z-10 bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm p-4 rounded-[2px] max-w-xs">
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

            {/* Top-Right Interactive Rotation Tip */}
            <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 font-tech text-xs uppercase font-bold text-[#111111]/60 bg-[#E6DED4] border border-[#111111] px-2.5 py-1 rounded-[2px]">
              <Eye className="w-3.5 h-3.5 text-[#102D69]" />
              <span>DRAG TO ROTATE 3D ASTROLABE</span>
            </div>

            {/* Three.js WebGL Canvas Mount */}
            <div ref={containerRef} className="w-full h-[480px] cursor-grab active:cursor-grabbing" />

            {/* Bottom Milestone Scrubber Bar */}
            <div className="p-3 bg-[#E6DED4] border-t-2 border-[#111111] flex items-center gap-2 overflow-x-auto">
              {DEPARTMENT_MILESTONES.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMilestoneIndex(i)}
                  className={`px-3 py-1.5 rounded-[2px] font-tech text-xs font-bold uppercase whitespace-nowrap transition-all border ${
                    activeMilestoneIndex === i
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
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] p-6 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsHourglassFlipped(prev => !prev)}
                  title="Click to turn the hourglass over"
                  className={`size-12 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm flex items-center justify-center cursor-pointer transition-transform duration-700 ${
                    isHourglassFlipped ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <Clock className="w-6 h-6 text-[#102D69]" />
                </button>
                <div>
                  <h4 className="font-tech text-base font-bold uppercase text-[#111111]">
                    HISTORICAL CHRONICLE (2000 – 2026+)
                  </h4>
                  <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                    CLICK HOURGLASS TO INVERT PERSPECTIVE · {DEPARTMENT_MILESTONES.length} KEY MILESTONES
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEPARTMENT_MILESTONES.map((m, i) => (
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
