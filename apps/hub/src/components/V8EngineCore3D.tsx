"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface V8ModuleMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  subsystem: string;
  tagline: string;
  url: string;
  accent: string;
  mechanic: string;
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    category: "Memory",
    subsystem: "V8 Scavenger GC & Memory Allocator",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#f59e0b", // Amber gold
    mechanic: "Contiguous Stack / Dynamic Heap Pointer Allocation"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    category: "Interpreter",
    subsystem: "Ignition Bytecode Dispatcher",
    tagline: "AST branch jumping & truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#10b981", // Emerald
    mechanic: "Conditional Branch Jump Offset Registers"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    category: "Scope",
    subsystem: "Context Resolver & Activation Records",
    tagline: "Lexical environments & heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#6366f1", // Indigo
    mechanic: "Context Stack Linked Lexical Environment"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    category: "Elements",
    subsystem: "V8 Elements Transition Table",
    tagline: "Packed Smi elements & amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#06b6d4", // Cyan
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    category: "Compiler",
    subsystem: "TurboFan JIT Type Feedback Vector",
    tagline: "V8 Shapes, inline caches & prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#a855f7", // Purple
    mechanic: "Shape Transition Tree & Property Offset Table"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    category: "Async",
    subsystem: "Libuv / Browser Event Loop Ring",
    tagline: "Microtask drain priority & macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#f43f5e", // Rose
    mechanic: "Dual Priority Queue Scheduler (Microtask P0 / Timer P1)"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    category: "Rendering",
    subsystem: "Blink Layout & GPU Compositor",
    tagline: "Critical rendering path & GPU layer geometry",
    url: "https://dom-apis.vercel.app",
    accent: "#38bdf8", // Sky blue
    mechanic: "Render Tree & Paint Layer Tree Compositor"
  }
];

interface Props {
  activeId: string;
  onSelectModule: (id: string) => void;
}

export default function V8EngineCore3D({ activeId, onSelectModule }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  const onSelectRef = useRef(onSelectModule);
  onSelectRef.current = onSelectModule;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 5.4, 8.2);
    camera.lookAt(0, -0.3, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x222430, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(4, 9, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 3.5, 12);
    goldLight.position.set(-4, 2, -3);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.5, 12);
    cyanLight.position.set(4, 1.5, 3);
    scene.add(cyanLight);

    const dieGroup = new THREE.Group();
    scene.add(dieGroup);

    // V8 Engine Substrate Base Slab
    const baseGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.28, 32);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0e15,
      metalness: 0.9,
      roughness: 0.24,
      clearcoat: 0.4
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.14;
    baseMesh.receiveShadow = true;
    dieGroup.add(baseMesh);

    // Center V8 Core JIT Reactor
    const coreGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.45, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1f2438,
      metalness: 0.95,
      roughness: 0.15,
      emissive: new THREE.Color(0xf59e0b),
      emissiveIntensity: 0.25
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.22;
    dieGroup.add(coreMesh);

    // Circular ground contact shadow
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.32;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 7 Radial Module Blocks positioned in circular orbit
    const blockMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      mat: THREE.MeshPhysicalMaterial;
    }[] = [];

    const blockGeo = new THREE.BoxGeometry(1.3, 0.38, 1.1);
    const radius = 2.45;

    V8_MODULE_SYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_MODULE_SYSTEMS.length;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const accent = new THREE.Color(mod.accent);

      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x131724,
        metalness: 0.85,
        roughness: 0.22,
        clearcoat: 0.8,
        emissive: accent,
        emissiveIntensity: 0.08
      });

      const mesh = new THREE.Mesh(blockGeo, mat);
      mesh.position.set(x, 0.19, z);
      mesh.rotation.y = -angle;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      dieGroup.add(mesh);

      // Micro LED dot
      const ledGeo = new THREE.SphereGeometry(0.05, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: accent });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(0.45, 0.22, -0.35);
      mesh.add(ledMesh);

      blockMeshes.push({
        id: mod.id,
        mesh,
        baseY: 0.19,
        targetY: 0.19,
        mat
      });
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.2;
    let targetRotationX = 0.35;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        targetRotationY += dx * 0.006;
        targetRotationX = Math.max(0.1, Math.min(0.65, targetRotationX + dy * 0.005));
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
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        targetRotationY += 0.0015;
      }

      dieGroup.rotation.y = THREE.MathUtils.damp(dieGroup.rotation.y, targetRotationY, 4, delta);
      dieGroup.rotation.x = THREE.MathUtils.damp(dieGroup.rotation.x, targetRotationX, 4, delta);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(blockMeshes.map((b) => b.mesh));

      if (intersects.length > 0) {
        hoveredId = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        hoveredId = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      blockMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetY = isActive ? item.baseY + 0.36 : isHovered ? item.baseY + 0.16 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 8, delta);

        const targetEmissive = isActive ? 0.75 : isHovered ? 0.35 : 0.08;
        item.mat.emissiveIntensity = THREE.MathUtils.damp(
          item.mat.emissiveIntensity,
          targetEmissive,
          7,
          delta
        );

        if (isActive) {
          item.mat.color.setHex(0x1a2135);
        } else {
          item.mat.color.setHex(0x131724);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

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
    <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a0c12] via-[#090b10] to-[#07080b] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div ref={mountRef} className="w-full h-full select-none" />
      <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-2 font-mono text-[11px] text-zinc-500">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>THREE.JS WEBGL V8 ENGINE DIE &middot; DRAG TO ORBIT &middot; CLICK BLOCK TO FOCUS</span>
      </div>
    </div>
  );
}
