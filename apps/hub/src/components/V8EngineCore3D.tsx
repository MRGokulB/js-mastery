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
  ctx.fillText("V8 · RUNTIME QUANTUM SPEC", 70, 910);

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

    const activeSpotLight = new THREE.PointLight(0xf59e0b, 2.4, 9);
    activeSpotLight.position.set(0, 3, 0);
    scene.add(activeSpotLight);

    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f7fb,
      metalness: 0.05,
      roughness: 0.6,
      clearcoat: 0.2
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.6;
    floorMesh.receiveShadow = true;
    spaceGroup.add(floorMesh);

    const shadowGeo = new THREE.PlaneGeometry(14, 14);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.58;
    shadowMesh.receiveShadow = true;
    spaceGroup.add(shadowMesh);

    const reactorGroup = new THREE.Group();
    spaceGroup.add(reactorGroup);
    reactorGroup.position.set(0, -0.1, 0);

    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.65,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    reactorGroup.add(coreMesh);

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.15
    });

    const ring1Geo = new THREE.TorusGeometry(1.05, 0.035, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    reactorGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.35, 0.03, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    reactorGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const ring3 = new THREE.Mesh(ring3Geo, ringMat1);
    reactorGroup.add(ring3);

    const tetherGroup = new THREE.Group();
    spaceGroup.add(tetherGroup);

    const monolithMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      mod: V8ModuleMeta;
      texture: THREE.CanvasTexture;
      phase: number;
    }[] = [];

    const pulses: { mesh: THREE.Mesh; progress: number; p1: THREE.Vector3; p2: THREE.Vector3 }[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    const monoGeo = new THREE.BoxGeometry(1.42, 0.24, 1.25);
    const radiusX = 3.2;
    const radiusZ = 2.1;

    V8_MODULE_SYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_MODULE_SYSTEMS.length;
      const x = Math.sin(angle) * radiusX;
      const z = Math.cos(angle) * radiusZ;
      const y = Math.sin(angle * 2) * 0.35;

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -0.1, 0),
        new THREE.Vector3(x, y, z)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xd97706,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(lineGeo, lineMat);
      tetherGroup.add(line);

      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      tetherGroup.add(pMesh);
      pulses.push({
        mesh: pMesh,
        progress: idx / V8_MODULE_SYSTEMS.length,
        p1: new THREE.Vector3(0, -0.1, 0),
        p2: new THREE.Vector3(x, y, z)
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
      const mesh = new THREE.Mesh(monoGeo, materials);
      mesh.position.set(x, y, z);
      mesh.rotation.y = 0;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      spaceGroup.add(mesh);

      monolithMeshes.push({
        id: mod.id,
        mesh,
        baseX: x,
        baseY: y,
        baseZ: z,
        targetY: y,
        topMat,
        mod,
        texture,
        phase: idx * 0.9
      });
    });

    const updateCardTextures = (activeModId: string, hoveredModId: string | null) => {
      monolithMeshes.forEach((item) => {
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
    let targetRotationY = -0.25;
    let targetRotationX = 0.35;

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

      parallaxTargetX = rawX * 0.14;
      parallaxTargetY = rawY * 0.09;

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
      const activeItem = monolithMeshes.find((c) => c.id === activeIdRef.current) || monolithMeshes[0];

      let camTargetX = 0;
      let camTargetY = 4.6;
      let camTargetZ = 7.6;
      let lookTargetX = 0;
      let lookTargetY = 0;
      let lookTargetZ = 0;

      if (currentMode === "focus") {
        camTargetX = activeItem.baseX * 0.5;
        camTargetY = 3.2;
        camTargetZ = 5.2;
        lookTargetX = activeItem.baseX * 0.6;
        lookTargetZ = activeItem.baseZ * 0.6;
      } else if (currentMode === "top") {
        camTargetX = 0;
        camTargetY = 8.6;
        camTargetZ = 0.5;
        lookTargetX = 0;
        lookTargetY = 0;
        lookTargetZ = 0;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, camTargetX, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camTargetY, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camTargetZ, 4, delta);
      camera.lookAt(lookTargetX, lookTargetY, lookTargetZ);

      ring1.rotation.x += delta * 0.8;
      ring1.rotation.y += delta * 0.4;
      ring2.rotation.y -= delta * 0.6;
      ring2.rotation.z += delta * 0.3;
      ring3.rotation.x += delta * 0.3;
      ring3.rotation.z -= delta * 0.5;

      pulses.forEach((pulse) => {
        pulse.progress = (pulse.progress + delta * 0.55) % 1.0;
        pulse.mesh.position.lerpVectors(pulse.p1, pulse.p2, pulse.progress);
      });

      if (!isDragging && currentMode === "orbit") {
        targetRotationY += 0.0014;
      }

      const combinedTargetY = targetRotationY + parallaxTargetX;
      const combinedTargetX = targetRotationX - parallaxTargetY;

      spaceGroup.rotation.y = THREE.MathUtils.damp(spaceGroup.rotation.y, combinedTargetY, 4, delta);
      spaceGroup.rotation.x = THREE.MathUtils.damp(spaceGroup.rotation.x, combinedTargetX, 4, delta);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(monolithMeshes.map((b) => b.mesh));

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

      monolithMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        const floatOffset = Math.sin(currentTime * 0.0018 + item.phase) * 0.08;
        item.targetY = item.baseY + floatOffset + (isActive ? 0.38 : isHovered ? 0.18 : 0);
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

      monolithMeshes.forEach((item) => {
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
