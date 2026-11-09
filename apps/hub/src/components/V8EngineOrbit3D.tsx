"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface V8SatelliteMeta {
  id: string;
  index: string;
  name: string;
  shortLabel: string;
  category: string;
  tagline: string;
  subsystem: string;
  mechanic: string;
  url: string;
  accent: string;
  accentHex: number;
}

export const V8_SATELLITES: V8SatelliteMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    shortLabel: "Memory",
    category: "Memory Allocator",
    tagline: "Stack frames, 31-bit Smis, and heap references managed by V8 Scavenger GC.",
    subsystem: "V8 Scavenger GC & Memory Arena",
    mechanic: "Contiguous Stack / Dynamic Heap Pointers",
    url: "https://variables-pi.vercel.app/",
    accent: "#f59e0b",
    accentHex: 0xf59e0b
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    shortLabel: "Control",
    category: "Bytecode Dispatcher",
    tagline: "AST branch jumping and conditional jump offsets evaluated by the Ignition interpreter.",
    subsystem: "Ignition Bytecode Dispatcher",
    mechanic: "Conditional Branch Jump Offset Registers",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#10b981",
    accentHex: 0x10b981
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    shortLabel: "Scope",
    category: "Lexical Scope",
    tagline: "Execution context creation, activation records, and persistent heap closures.",
    subsystem: "Context Resolver & Activation Records",
    mechanic: "Context Stack Linked Lexical Environment",
    url: "https://functions-scope.vercel.app/",
    accent: "#6366f1",
    accentHex: 0x6366f1
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    shortLabel: "Arrays",
    category: "Elements Transition",
    tagline: "Packed Smi elements, holey array avoidances, and amortized buffer doubling.",
    subsystem: "V8 Elements Transition Table",
    mechanic: "Fast Contiguous Indexed Int32 Buffer",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#06b6d4",
    accentHex: 0x06b6d4
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    shortLabel: "Objects",
    category: "JIT Compiler",
    tagline: "V8 Hidden Classes (Shapes), transition trees, and inline caching (IC) lookups.",
    subsystem: "TurboFan JIT Type Feedback Vector",
    mechanic: "Shape Transition Tree & Property Offsets",
    url: "https://objects-maps.vercel.app/",
    accent: "#a855f7",
    accentHex: 0xa855f7
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    shortLabel: "Async",
    category: "Event Loop Ring",
    tagline: "Call stack execution, Promise reaction jobs, and macrotask timer queues.",
    subsystem: "Libuv & Browser Event Loop Ring",
    mechanic: "Dual Priority Queue Scheduler (P0 / P1)",
    url: "https://async-event-loop.vercel.app",
    accent: "#f43f5e",
    accentHex: 0xf43f5e
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    shortLabel: "DOM",
    category: "Browser Engine",
    tagline: "Critical rendering path, reflow layout thrashing, and GPU layer compositing.",
    subsystem: "Blink Layout & GPU Compositor",
    mechanic: "Render Tree & Paint Layer Compositor",
    url: "https://dom-apis.vercel.app",
    accent: "#38bdf8",
    accentHex: 0x38bdf8
  }
];

interface Props {
  activeId: string;
  onSelectSatellite: (id: string) => void;
}

export default function V8EngineOrbit3D({ activeId, onSelectSatellite }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;
  const onSelectRef = useRef(onSelectSatellite);
  onSelectRef.current = onSelectSatellite;

  const targetYawRef = useRef(0);
  const targetPitchRef = useRef(0.25);

  useEffect(() => {
    const idx = V8_SATELLITES.findIndex((s) => s.id === activeId);
    if (idx >= 0) {
      const angle = (idx * (2 * Math.PI)) / V8_SATELLITES.length;
      targetYawRef.current = -angle;
      targetPitchRef.current = 0.2;
    }
  }, [activeId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xecf2fe, 1.2);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const gyroGroup = new THREE.Group();
    scene.add(gyroGroup);

    // Central V8 Reactor Core Sphere
    const coreGeo = new THREE.SphereGeometry(1.05, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    gyroGroup.add(coreMesh);

    // Inner Glowing Amber Ring
    const innerRingGeo = new THREE.TorusGeometry(1.3, 0.04, 16, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = Math.PI / 2;
    gyroGroup.add(innerRingMesh);

    // Outer Thin Titanium Orbital Gimbal Track
    const orbitTrackGeo = new THREE.TorusGeometry(2.35, 0.02, 16, 100);
    const orbitTrackMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.2
    });
    const orbitTrackMesh = new THREE.Mesh(orbitTrackGeo, orbitTrackMat);
    orbitTrackMesh.rotation.x = Math.PI / 2;
    gyroGroup.add(orbitTrackMesh);

    // Ground Shadow
    const groundGeo = new THREE.PlaneGeometry(10, 10);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -2.1;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 7 Satellite Disc Nodes
    const satelliteMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseRadius: number;
      targetOffset: number;
      currentOffset: number;
      mat: THREE.MeshPhysicalMaterial;
      angle: number;
    }[] = [];

    const satGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.14, 32);
    const radius = 2.35;

    V8_SATELLITES.forEach((sat, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_SATELLITES.length;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const satMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.25,
        clearcoat: 0.8
      });

      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.set(x, 0, z);
      satMesh.rotation.x = Math.PI / 2;
      satMesh.rotation.z = -angle;
      satMesh.userData = { id: sat.id, angle };
      gyroGroup.add(satMesh);

      // Embedded LED Core Dot
      const dotGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 24);
      const dotMat = new THREE.MeshBasicMaterial({ color: sat.accentHex });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      satMesh.add(dotMesh);

      // Accent rim ring
      const rimGeo = new THREE.TorusGeometry(0.48, 0.025, 16, 32);
      const rimMat = new THREE.MeshStandardMaterial({
        color: sat.accentHex,
        metalness: 0.5,
        roughness: 0.2
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.rotation.x = Math.PI / 2;
      satMesh.add(rimMesh);

      satelliteMeshes.push({
        id: sat.id,
        mesh: satMesh,
        baseRadius: radius,
        targetOffset: 0,
        currentOffset: 0,
        mat: satMat,
        angle
      });
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityY = 0;
    let velocityX = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velocityY = 0;
      velocityX = 0;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        targetYawRef.current += dx * 0.007;
        targetPitchRef.current = Math.max(-0.4, Math.min(0.5, targetPitchRef.current - dy * 0.005));
        velocityY = dx * 0.003;
        velocityX = -dy * 0.002;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      if (hoveredId) {
        onSelectRef.current(hoveredId);
      }
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("click", onClick);

    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isDragging) {
        velocityY *= 0.94;
        velocityX *= 0.94;
        targetYawRef.current += velocityY;
        targetPitchRef.current = Math.max(-0.4, Math.min(0.5, targetPitchRef.current + velocityX));

        if (Math.abs(velocityY) < 0.0005) {
          targetYawRef.current += 0.0015;
        }
      }

      gyroGroup.rotation.y = THREE.MathUtils.damp(gyroGroup.rotation.y, targetYawRef.current, 5, delta);
      gyroGroup.rotation.x = THREE.MathUtils.damp(gyroGroup.rotation.x, targetPitchRef.current, 5, delta);

      // Subtle pulse on inner core ring
      innerRingMesh.rotation.z += 0.01;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes.map((s) => s.mesh));

      if (intersects.length > 0) {
        hoveredId = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        hoveredId = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      satelliteMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetOffset = isActive ? 0.35 : isHovered ? 0.18 : 0;
        item.currentOffset = THREE.MathUtils.damp(item.currentOffset, item.targetOffset, 8, delta);

        const currentR = item.baseRadius + item.currentOffset;
        item.mesh.position.x = Math.sin(item.angle) * currentR;
        item.mesh.position.z = Math.cos(item.angle) * currentR;

        const targetScale = isActive ? 1.25 : isHovered ? 1.12 : 1.0;
        item.mesh.scale.setScalar(
          THREE.MathUtils.damp(item.mesh.scale.x, targetScale, 8, delta)
        );

        if (isActive) {
          item.mat.color.setHex(0xfbfcfe);
          item.mat.roughness = 0.12;
        } else {
          item.mat.color.setHex(0xf4f5f8);
          item.mat.roughness = 0.25;
        }
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("click", onClick);

      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
