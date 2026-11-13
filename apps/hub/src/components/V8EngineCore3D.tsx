"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface V8ModuleMeta {
  id: string;
  index: string;
  name: string;
  shortTitle: string;
  category: string;
  subsystem: string;
  tagline: string;
  url: string;
  accent: string;
  chipColor: string;
  mechanic: string;
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    shortTitle: "VARIABLES",
    category: "Memory",
    subsystem: "V8 Scavenger GC & Memory Allocator",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#d97706",
    chipColor: "#fef08a", // Soft amber ceramic
    mechanic: "Contiguous Stack / Dynamic Heap Pointer"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    shortTitle: "CONTROL",
    category: "Interpreter",
    subsystem: "Ignition Bytecode Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#059669",
    chipColor: "#bbf7d0", // Soft mint ceramic
    mechanic: "Conditional Branch Jump Offset Registers"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    shortTitle: "SCOPE",
    category: "Scope",
    subsystem: "Context Resolver & Activation Records",
    tagline: "Lexical environments and heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#7c3aed",
    chipColor: "#e9d5ff", // Soft lilac ceramic
    mechanic: "Context Stack Linked Lexical Environment"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    shortTitle: "ARRAYS",
    category: "Elements",
    subsystem: "V8 Elements Transition Table",
    tagline: "Packed Smi elements and amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0284c7",
    chipColor: "#bfdbfe", // Soft sky blue ceramic
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    shortTitle: "OBJECTS",
    category: "Compiler",
    subsystem: "TurboFan JIT Type Feedback Vector",
    tagline: "V8 Shapes, inline caches and prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#c026d3",
    chipColor: "#fbcfe8", // Soft peach/pink ceramic
    mechanic: "Shape Transition Tree & Property Offset Table"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    shortTitle: "ASYNC",
    category: "Async",
    subsystem: "Libuv / Browser Event Loop Ring",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#e11d48",
    chipColor: "#fecdd3", // Soft rose ceramic
    mechanic: "Dual Priority Queue Scheduler (P0 / P1)"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    shortTitle: "DOM",
    category: "Rendering",
    subsystem: "Blink Layout & GPU Compositor",
    tagline: "Critical rendering path and GPU layer geometry",
    url: "https://dom-apis.vercel.app",
    accent: "#0891b2",
    chipColor: "#a5f3fc", // Soft cyan ceramic
    mechanic: "Render Tree & Paint Layer Tree Compositor"
  }
];

function createCleanV8CardCanvas(mod: V8ModuleMeta, isSelected: boolean, isHovered: boolean): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Solid clean pastel background
  ctx.fillStyle = mod.chipColor;
  ctx.fillRect(0, 0, 512, 512);

  // Subtle clean border
  ctx.lineWidth = isSelected ? 16 : 8;
  ctx.strokeStyle = isSelected ? "#0f172a" : isHovered ? "rgba(15, 23, 42, 0.4)" : "rgba(15, 23, 42, 0.15)";
  ctx.strokeRect(8, 8, 496, 496);

  // Top Index Badge
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText(mod.index, 40, 72);

  // Category Tag
  ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
  ctx.font = "bold 20px monospace";
  ctx.fillText(mod.category.toUpperCase(), 40, 108);

  // Status indicator dot
  ctx.beginPath();
  ctx.arc(460, 64, 14, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? "#0f172a" : "rgba(15, 23, 42, 0.25)";
  ctx.fill();

  // Primary Bold Short Title
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 64px sans-serif";
  ctx.fillText(mod.shortTitle, 40, 280);

  // Subsystem Tag
  ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
  ctx.font = "500 24px monospace";
  ctx.fillText(mod.subsystem.split("&")[0].trim(), 40, 330);

  // Bottom corner branding
  ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
  ctx.font = "bold 18px monospace";
  ctx.fillText("V8 · 2026", 40, 460);

  return canvas;
}

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

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 5.0, 7.8);
    camera.lookAt(0, -0.2, 0);

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
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.4);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.2);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.8, 15);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Soft Ceramic Circular Substrate Base Slab
    const baseGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.22, 48);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f3f7,
      metalness: 0.08,
      roughness: 0.45,
      clearcoat: 0.35,
      clearcoatRoughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.11;
    baseMesh.receiveShadow = true;
    coreGroup.add(baseMesh);

    // Center V8 Core Hub (Brushed Aluminum)
    const centerGeo = new THREE.CylinderGeometry(0.9, 0.95, 0.36, 32);
    const centerMat = new THREE.MeshPhysicalMaterial({
      color: 0xe4e4e7,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.4
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.position.y = 0.18;
    centerMesh.castShadow = true;
    centerMesh.receiveShadow = true;
    coreGroup.add(centerMesh);

    // Center Core Cap
    const capGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.3,
      roughness: 0.3
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 0.38;
    coreGroup.add(capMesh);

    // Diffuse Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(14, 14);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const groundMesh = new THREE.Mesh(shadowGeo, shadowMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.23;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 7 Radial Module Blocks positioned in circular orbit
    const cardMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      mod: V8ModuleMeta;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGeo = new THREE.BoxGeometry(1.35, 0.24, 1.15);
    const radius = 2.4;

    V8_MODULE_SYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_MODULE_SYSTEMS.length;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const isSelected = mod.id === activeIdRef.current;
      const canvas = createCleanV8CardCanvas(mod, isSelected, false);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;

      const sideMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(mod.chipColor).multiplyScalar(0.92),
        metalness: 0.1,
        roughness: 0.35,
        clearcoat: 0.5
      });

      const topMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        metalness: 0.12,
        roughness: 0.32,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18
      });

      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
      const mesh = new THREE.Mesh(cardGeo, materials);
      mesh.position.set(x, 0.12, z);
      mesh.rotation.y = -angle;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      coreGroup.add(mesh);

      cardMeshes.push({
        id: mod.id,
        mesh,
        baseY: 0.12,
        targetY: 0.12,
        topMat,
        mod,
        texture
      });
    });

    const updateCardTextures = (activeModId: string, hoveredModId: string | null) => {
      cardMeshes.forEach((item) => {
        const isSel = item.id === activeModId;
        const isHov = item.id === hoveredModId;
        const canvas = createCleanV8CardCanvas(item.mod, isSel, isHov);
        item.texture.image = canvas;
        item.texture.needsUpdate = true;
      });
    };

    // Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.22;
    let targetRotationX = 0.38;

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
        targetRotationX = Math.max(0.12, Math.min(0.65, targetRotationX + dy * 0.005));
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
        updateCardTextures(hoveredId, hoveredId);
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
        targetRotationY += 0.0012;
      }

      coreGroup.rotation.y = THREE.MathUtils.damp(coreGroup.rotation.y, targetRotationY, 4, delta);
      coreGroup.rotation.x = THREE.MathUtils.damp(coreGroup.rotation.x, targetRotationX, 4, delta);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardMeshes.map((b) => b.mesh));

      let newlyHovered: string | null = null;
      if (intersects.length > 0) {
        newlyHovered = intersects[0].object.userData.id;
        container.style.cursor = "pointer";
      } else {
        newlyHovered = null;
        container.style.cursor = isDragging ? "grabbing" : "grab";
      }

      if (newlyHovered !== hoveredId) {
        hoveredId = newlyHovered;
        updateCardTextures(activeIdRef.current, hoveredId);
      }

      cardMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetY = isActive ? item.baseY + 0.38 : isHovered ? item.baseY + 0.18 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 9, delta);
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

      cardMeshes.forEach((item) => {
        item.texture.dispose();
      });

      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
