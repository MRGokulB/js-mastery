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
  glyph: string;
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    shortTitle: "VARIABLES",
    category: "Memory",
    subsystem: "V8 Scavenger GC",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#d97706",
    chipColor: "#fef08a",
    mechanic: "Contiguous Stack / Dynamic Heap Pointer",
    glyph: "Smi: (val << 1) | 0 · Heap 0x"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    shortTitle: "CONTROL",
    category: "Interpreter",
    subsystem: "Ignition Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#059669",
    chipColor: "#bbf7d0",
    mechanic: "Conditional Branch Jump Offset Registers",
    glyph: "JumpIfFalse [r0], [offset]"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    shortTitle: "SCOPE",
    category: "Scope",
    subsystem: "Context Resolver",
    tagline: "Lexical environments and heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#7c3aed",
    chipColor: "#e9d5ff",
    mechanic: "Context Stack Linked Lexical Environment",
    glyph: "[[Scope]] -> Outer LexicalEnv"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    shortTitle: "ARRAYS",
    category: "Elements",
    subsystem: "Elements Table",
    tagline: "Packed Smi elements and amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0284c7",
    chipColor: "#bfdbfe",
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer",
    glyph: "[ PACKED_SMI -> HOLEY_ELEMENTS ]"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    shortTitle: "OBJECTS",
    category: "Compiler",
    subsystem: "TurboFan IC Shapes",
    tagline: "V8 Shapes, inline caches and prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#c026d3",
    chipColor: "#fbcfe8",
    mechanic: "Shape Transition Tree & Property Offset Table",
    glyph: "Map0 -> Map1(+x) -> Map2(+y)"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    shortTitle: "ASYNC",
    category: "Async",
    subsystem: "Libuv / Task Queue",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#e11d48",
    chipColor: "#fecdd3",
    mechanic: "Dual Priority Queue Scheduler (P0 / P1)",
    glyph: "Stack -> Microtasks -> Timers"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    shortTitle: "DOM",
    category: "Rendering",
    subsystem: "Blink Compositor",
    tagline: "Critical rendering path and GPU layer geometry",
    url: "https://dom-apis.vercel.app",
    accent: "#0891b2",
    chipColor: "#a5f3fc",
    mechanic: "Render Tree & Paint Layer Tree Compositor",
    glyph: "DOM + CSSOM -> Paint -> GPU"
  }
];

function createTactileV8CardCanvas(mod: V8ModuleMeta, isSelected: boolean, isHovered: boolean): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = mod.chipColor;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.lineWidth = isSelected ? 24 : 12;
  ctx.strokeStyle = isSelected ? "#0f172a" : isHovered ? "rgba(15, 23, 42, 0.45)" : "rgba(15, 23, 42, 0.18)";
  ctx.strokeRect(18, 18, 988, 988);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 60px sans-serif";
  ctx.fillText(mod.index, 70, 130);

  ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
  ctx.font = "bold 32px monospace";
  ctx.fillText(mod.category.toUpperCase(), 70, 195);

  ctx.fillStyle = isSelected ? "#0f172a" : "rgba(15, 23, 42, 0.25)";
  ctx.fillRect(860, 70, 72, 36);
  ctx.fillStyle = "#d97706";
  ctx.fillRect(868, 78, 56, 20);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 108px sans-serif";
  ctx.fillText(mod.shortTitle, 70, 500);

  ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
  ctx.font = "bold 38px monospace";
  ctx.fillText(mod.glyph, 70, 595);

  ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
  ctx.font = "500 40px monospace";
  ctx.fillText(mod.subsystem, 70, 705);

  ctx.fillStyle = "rgba(15, 23, 42, 0.12)";
  ctx.fillRect(70, 830, 884, 4);

  ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
  ctx.font = "bold 32px monospace";
  ctx.fillText("V8 · RUNTIME SPEC 2026", 70, 910);

  return canvas;
}

interface Props {
  activeId: string;
  viewMode?: "orbit" | "focus" | "top";
  onSelectModule: (id: string) => void;
}

export default function V8EngineCore3D({ activeId, viewMode = "orbit", onSelectModule }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  const viewModeRef = useRef<"orbit" | "focus" | "top">(viewMode);
  viewModeRef.current = viewMode;

  const onSelectRef = useRef(onSelectModule);
  onSelectRef.current = onSelectModule;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.6);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.3);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const activeSpotLight = new THREE.PointLight(0xf59e0b, 2.2, 8);
    activeSpotLight.position.set(0, 3, 0);
    scene.add(activeSpotLight);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

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

    const centerGeo = new THREE.CylinderGeometry(0.85, 0.9, 0.32, 32);
    const centerMat = new THREE.MeshPhysicalMaterial({
      color: 0xe4e4e7,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.4
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.position.y = 0.16;
    centerMesh.castShadow = true;
    centerMesh.receiveShadow = true;
    coreGroup.add(centerMesh);

    const capGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.3,
      roughness: 0.3
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 0.36;
    coreGroup.add(capMesh);

    const shadowGeo = new THREE.PlaneGeometry(14, 14);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const groundMesh = new THREE.Mesh(shadowGeo, shadowMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.23;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const busGroup = new THREE.Group();
    coreGroup.add(busGroup);

    const traceMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2
    });

    const cardMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseX: number;
      baseZ: number;
      baseY: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      mod: V8ModuleMeta;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGeo = new THREE.BoxGeometry(1.48, 0.24, 1.28);
    const radius = 2.4;

    const pulses: { mesh: THREE.Mesh; progress: number; p1: THREE.Vector3; p2: THREE.Vector3 }[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    V8_MODULE_SYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_MODULE_SYSTEMS.length;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const len = radius - 0.9;
      const traceGeo = new THREE.BoxGeometry(len, 0.015, 0.035);
      const traceMesh = new THREE.Mesh(traceGeo, traceMat);
      traceMesh.position.set(Math.cos(angle) * (0.9 + len / 2), 0.005, Math.sin(angle) * (0.9 + len / 2));
      traceMesh.rotation.y = -angle;
      busGroup.add(traceMesh);

      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      busGroup.add(pMesh);
      pulses.push({
        mesh: pMesh,
        progress: idx / V8_MODULE_SYSTEMS.length,
        p1: new THREE.Vector3(Math.cos(angle) * 0.9, 0.02, Math.sin(angle) * 0.9),
        p2: new THREE.Vector3(x, 0.02, z)
      });

      const isSelected = mod.id === activeIdRef.current;
      const canvas = createTactileV8CardCanvas(mod, isSelected, false);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const sideMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(mod.chipColor).multiplyScalar(0.92),
        metalness: 0.12,
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
      mesh.rotation.y = 0;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      coreGroup.add(mesh);

      cardMeshes.push({
        id: mod.id,
        mesh,
        baseX: x,
        baseZ: z,
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
        const canvas = createTactileV8CardCanvas(item.mod, isSel, isHov);
        item.texture.image = canvas;
        item.texture.needsUpdate = true;
      });
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.22;
    let targetRotationX = 0.38;

    let parallaxTargetX = 0;
    let parallaxTargetY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const rawY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = rawX;
      mouse.y = rawY;

      parallaxTargetX = rawX * 0.12;
      parallaxTargetY = rawY * 0.08;

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

      const currentMode = viewModeRef.current;
      const activeItem = cardMeshes.find((c) => c.id === activeIdRef.current) || cardMeshes[0];

      let camTargetX = 0;
      let camTargetY = 4.5;
      let camTargetZ = 7.5;
      let lookTargetX = 0;
      let lookTargetY = -0.15;
      let lookTargetZ = 0;

      if (currentMode === "focus") {
        camTargetX = activeItem.baseX * 0.45;
        camTargetY = 3.2;
        camTargetZ = 5.2;
        lookTargetX = activeItem.baseX * 0.55;
        lookTargetZ = activeItem.baseZ * 0.55;
      } else if (currentMode === "top") {
        camTargetX = 0;
        camTargetY = 8.5;
        camTargetZ = 0.5;
        lookTargetX = 0;
        lookTargetY = 0;
        lookTargetZ = 0;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, camTargetX, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camTargetY, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camTargetZ, 4, delta);
      camera.lookAt(lookTargetX, lookTargetY, lookTargetZ);

      if (!isDragging && currentMode === "orbit") {
        targetRotationY += 0.0012;
      }

      const combinedTargetY = targetRotationY + parallaxTargetX;
      const combinedTargetX = targetRotationX - parallaxTargetY;

      coreGroup.rotation.y = THREE.MathUtils.damp(coreGroup.rotation.y, combinedTargetY, 4, delta);
      coreGroup.rotation.x = THREE.MathUtils.damp(coreGroup.rotation.x, combinedTargetX, 4, delta);

      pulses.forEach((pulse) => {
        pulse.progress = (pulse.progress + delta * 0.5) % 1.0;
        pulse.mesh.position.lerpVectors(pulse.p1, pulse.p2, pulse.progress);
      });

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

      activeSpotLight.position.x = THREE.MathUtils.damp(activeSpotLight.position.x, activeItem.mesh.position.x, 6, delta);
      activeSpotLight.position.z = THREE.MathUtils.damp(activeSpotLight.position.z, activeItem.mesh.position.z, 6, delta);

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
    <div className="relative w-full h-full min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
