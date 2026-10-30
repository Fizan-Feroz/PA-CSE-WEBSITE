import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Clock, RotateCcw, Compass, Eye, Sparkles } from 'lucide-react';

const HACKATHON_HOURS = [
  { hour: '09:00 AM', title: 'Grand Inauguration', phase: 'Kick-off', desc: 'Doors open, badges distributed, hackathon clock starts.' },
  { hour: '12:00 PM', title: 'Problem Statement Lock', phase: 'Architecture', desc: 'Teams freeze track selection and submit system architecture.' },
  { hour: '03:30 PM', title: 'Mentor Round 1', phase: 'Validation', desc: 'Industry architects review database schema and feasibility.' },
  { hour: '07:30 PM', title: 'Dinner & Tech Check', phase: 'Milestone', desc: 'Dinner served; git commits verified for MVP requirements.' },
  { hour: '12:00 AM', title: 'Midnight Review', phase: 'Sprint', desc: 'Core logic functional; debugging APIs and hardware relays.' },
  { hour: '04:00 AM', title: 'Caffeine Surge', phase: 'Polishing', desc: 'UI refinements, stress tests, slide deck preparation.' },
  { hour: '08:30 AM', title: 'Code Freeze', phase: 'Submission', desc: 'GitHub repos frozen, prototypes deployed on staging nodes.' },
  { hour: '09:30 AM', title: 'Grand Finale Pitch', phase: 'Jury Round', desc: '5-minute live demo and Q&A before jury panel.' }
];

export default function TimelineObservatory3D() {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | '2d'
  const [activeHourIndex, setActiveHourIndex] = useState(0);
  const [isHourglassFlipped, setIsHourglassFlipped] = useState(false);

  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = 480;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE6DED4); // INNOVEX warm paper

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

    // Materials (INNOVEX Palette: Brass Gold, Deep Cobalt, Ink Black)
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

    // 4. Central Celestial Spark / Sun
    const coreGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMesh = new THREE.Mesh(coreGeo, saffronMaterial);
    astrolabeGroup.add(coreMesh);

    // 5. Orbiting Milestone Nodes along an elevated arc
    const milestoneMeshes = [];
    HACKATHON_HOURS.forEach((h, idx) => {
      const t = idx / (HACKATHON_HOURS.length - 1);
      const angle = Math.PI * 0.15 + t * (Math.PI * 1.7);
      const radius = 12.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(t * Math.PI) * 4;

      const nodeGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.35, 32);
      const nodeMat = idx === activeHourIndex ? saffronMaterial : brassMaterial;
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.rotation.x = Math.PI / 6;
      astrolabeGroup.add(nodeMesh);
      milestoneMeshes.push(nodeMesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    dirLight.position.set(15, 30, 20);
    scene.add(dirLight);

    const blueFill = new THREE.DirectionalLight(0x102D69, 1.5);
    blueFill.position.set(-15, -10, -20);
    scene.add(blueFill);

    // Mouse drag interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    function onMouseDown(e) {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    }

    function onMouseMove(e) {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      astrolabeGroup.rotation.y += deltaX * 0.008;
      astrolabeGroup.rotation.x = Math.max(-0.4, Math.min(0.6, astrolabeGroup.rotation.x + deltaY * 0.005));

      prevMousePos = { x: e.clientX, y: e.clientY };
    }

    function onMouseUp() {
      isDragging = false;
    }

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous slow astrolabe celestial spin
      if (!isDragging) {
        astrolabeGroup.rotation.y += 0.003;
      }
      ring2.rotation.y += 0.006;
      ring3.rotation.x += 0.004;

      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (domEl.parentNode) domEl.parentNode.removeChild(domEl);
      renderer.dispose();
    };
  }, [viewMode, activeHourIndex]);

  const activeMilestone = HACKATHON_HOURS[activeHourIndex];

  return (
    <section id="timeline-observatory" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#E6DED4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#102D69]" />
              ITINERARY &amp; ASTRONOMICAL CLOCK
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              THE 24 HOURS, HOUR BY HOUR
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/70 max-w-xl mt-2 font-medium">
              Real-time schedule for the 24-hour hackathon sprint. Drag the 3D astrolabe to explore milestones.
            </p>
          </div>

          {/* Mode Switcher Buttons (Exact INNOVEX Style: 3D · OBSERVATORY vs 2D · JOURNEY) */}
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
              2D · JOURNEY
            </button>
          </div>
        </div>

        {/* 3D Observatory View Container */}
        {viewMode === '3d' ? (
          <div className="relative bg-[#F6F2EB] border-2 border-[#111111] shadow-print rounded-[2px] overflow-hidden">
            
            {/* Top-Left Vintage Pocketwatch Status Card (Exact INNOVEX Layout) */}
            <div className="absolute top-4 left-4 z-10 bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm p-4 rounded-[2px] max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-11 rounded-full bg-[#F5B700] border-2 border-[#111111] flex items-center justify-center text-[#111111] shadow-sm font-heading text-lg font-bold">
                  24H
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#111111]/70 uppercase block">
                    DAY 1 · 20 NOV 2026
                  </span>
                  <span className="font-heading text-3xl font-bold text-[#102D69] leading-none">
                    {activeMilestone.hour}
                  </span>
                </div>
              </div>
              <div className="border-t border-[#111111]/30 pt-2 font-tech text-xs">
                <span className="font-bold text-[#111111] uppercase block">{activeMilestone.title}</span>
                <p className="font-sans text-[11px] text-[#111111]/75 mt-0.5 font-medium leading-snug">
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

            {/* Bottom Hour Scrubber Bar */}
            <div className="p-3 bg-[#E6DED4] border-t-2 border-[#111111] flex items-center gap-2 overflow-x-auto">
              {HACKATHON_HOURS.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHourIndex(i)}
                  className={`px-3 py-1 rounded-[2px] font-tech text-xs font-bold uppercase whitespace-nowrap transition-all border ${
                    activeHourIndex === i
                      ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-y-0.5'
                      : 'bg-[#F6F2EB] text-[#111111] border-[#111111]/30 hover:border-[#111111]'
                  }`}
                >
                  {h.hour}
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* 2D Journey View with Flipping Hourglass */
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
                    MECHANICAL SPRINT SCHEDULE
                  </h4>
                  <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                    CLICK HOURGLASS TO INVERT TIMELINE PERSPECTIVE
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {HACKATHON_HOURS.map((h, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#102D69]">{h.hour}</span>
                      <span className="font-tech text-[10px] font-bold uppercase bg-[#F5B700] text-[#111111] px-1.5 py-0.2 rounded-[2px] border border-[#111111]">
                        {h.phase}
                      </span>
                    </div>
                    <h5 className="font-tech text-base font-bold uppercase text-[#111111] mb-1">
                      {h.title}
                    </h5>
                    <p className="font-sans text-xs text-[#111111]/75 font-medium leading-relaxed">
                      {h.desc}
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
