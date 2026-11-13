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
  accentHex: number;
  mechanic: string;
  schematic: string;
  codeSnippet: string;
}

export const V8_MODULE_SYSTEMS: V8ModuleMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    shortTitle: "V8 Stack & Heap",
    category: "Memory",
    subsystem: "V8 Scavenger GC",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#f59e0b",
    accentHex: 0xf59e0b,
    mechanic: "Contiguous Stack / Dynamic Heap Pointer",
    schematic: "[ Stack Frame ] -> [ 0xHeap ]",
    codeSnippet: "Smi: (val << 1) | 0"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    shortTitle: "Control & AST",
    category: "Interpreter",
    subsystem: "Ignition Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#10b981",
    accentHex: 0x10b981,
    mechanic: "Conditional Branch Jump Offset Registers",
    schematic: "AST Branch -> Jump If False",
    codeSnippet: "JumpIfFalse [r0], [offset]"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    shortTitle: "Scope & Closures",
    category: "Scope",
    subsystem: "Context Resolver",
    tagline: "Lexical environments and heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#a855f7",
    accentHex: 0xa855f7,
    mechanic: "Context Stack Linked Lexical Environment",
    schematic: "[[Scope]] -> Outer LexicalEnv",
    codeSnippet: "ctx->set_context_slot(var)"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    shortTitle: "Fast Elements",
    category: "Elements",
    subsystem: "Elements Table",
    tagline: "Packed Smi elements and amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#38bdf8",
    accentHex: 0x38bdf8,
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer",
    schematic: "[ PACKED_SMI -> HOLEY_ELEMENTS ]",
    codeSnippet: "elements->get(i)"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    shortTitle: "Hidden Classes",
    category: "Compiler",
    subsystem: "TurboFan IC Shapes",
    tagline: "V8 Shapes, inline caches and prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#f43f5e",
    accentHex: 0xf43f5e,
    mechanic: "Shape Transition Tree & Property Offset Table",
    schematic: "Map0 -> Map1(+x) -> Map2(+y)",
    codeSnippet: "IC: Monomorphic Slot Hit"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    shortTitle: "The Event Loop",
    category: "Async",
    subsystem: "Libuv Task Queue",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#ec4899",
    accentHex: 0xec4899,
    mechanic: "Dual Priority Queue Scheduler (P0 / P1)",
    schematic: "Stack -> Microtasks -> Timers",
    codeSnippet: "drain_microtask_queue()"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    shortTitle: "DOM & Render",
    category: "Rendering",
    subsystem: "Blink Compositor",
    tagline: "Critical rendering path and GPU layer geometry",
    url: "https://dom-apis.vercel.app",
    accent: "#06b6d4",
    accentHex: 0x06b6d4,
    mechanic: "Render Tree & Paint Layer Tree Compositor",
    schematic: "DOM + CSSOM -> Paint -> GPU",
    codeSnippet: "requestAnimationFrame(frame)"
  }
];

function createV8TopicCardCanvas(mod: V8ModuleMeta, isSelected: boolean, isHovered: boolean): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 768);
  if (isSelected) {
    bgGrad.addColorStop(0, "#161b28");
    bgGrad.addColorStop(1, "#0c101a");
  } else if (isHovered) {
    bgGrad.addColorStop(0, "#141824");
    bgGrad.addColorStop(1, "#0e111a");
  } else {
    bgGrad.addColorStop(0, "#0f131e");
    bgGrad.addColorStop(1, "#0a0c14");
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 768);

  // Outer border
  ctx.lineWidth = isSelected ? 12 : 6;
  ctx.strokeStyle = isSelected ? mod.accent : isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)";
  ctx.strokeRect(20, 20, 984, 728);

  // Top accent bar
  ctx.fillStyle = mod.accent;
  ctx.fillRect(20, 20, 984, 18);

  // Header: Index & Category Pill
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.roundRect(60, 75, 220, 56, 28);
  ctx.fill();

  ctx.fillStyle = mod.accent;
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(`${mod.index} · ${mod.category.toUpperCase()}`, 82, 112);

  // Status LED dot
  ctx.beginPath();
  ctx.arc(930, 102, 14, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? mod.accent : "rgba(255,255,255,0.3)";
  ctx.fill();
  if (isSelected) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }

  // Topic Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px sans-serif";
  ctx.fillText(mod.shortTitle, 60, 220);

  // Subsystem Tag
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.font = "500 32px monospace";
  ctx.fillText(mod.subsystem, 60, 285);

  // Schematic / Code Box
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.beginPath();
  ctx.roundRect(60, 340, 904, 250, 20);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.stroke();

  // Box Header
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 22px monospace";
  ctx.fillText("V8 RUNTIME MECHANIC / INVARIANT", 90, 385);

  // Schematic content
  ctx.fillStyle = mod.accent;
  ctx.font = "bold 38px monospace";
  ctx.fillText(mod.schematic, 90, 460);

  // Code snippet
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "32px monospace";
  ctx.fillText(mod.codeSnippet, 90, 535);

  // Footer Tagline
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.font = "400 28px sans-serif";
  ctx.fillText(mod.tagline, 60, 660);

  // Corner grid marks
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.font = "bold 20px monospace";
  ctx.fillText("V8-UNIVERSE · RUNTIME-SYS", 690, 660);

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
    camera.position.set(0, 5.2, 8.2);
    camera.lookAt(0, -0.3, 0);

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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x181e2b, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.1);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.9, 15);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Active Accent Point Light
    const activePointLight = new THREE.PointLight(0xf59e0b, 2.8, 9);
    activePointLight.position.set(0, 2.5, 0);
    scene.add(activePointLight);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Dark Titanium Circular Substrate Base Slab
    const baseGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.22, 48);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e1118,
      metalness: 0.85,
      roughness: 0.35,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.11;
    baseMesh.receiveShadow = true;
    coreGroup.add(baseMesh);

    // Center V8 Core JIT Reactor (Brushed Aluminum)
    const centerGeo = new THREE.CylinderGeometry(1.0, 1.1, 0.38, 36);
    const centerMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f2438,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.5
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.position.y = 0.19;
    centerMesh.castShadow = true;
    centerMesh.receiveShadow = true;
    coreGroup.add(centerMesh);

    // Center Core Cap
    const capGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.3,
      roughness: 0.3
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 0.40;
    coreGroup.add(capMesh);

    // Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const groundMesh = new THREE.Mesh(shadowGeo, shadowMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.23;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 7 Radial Topic Card Meshes in Orbital Layout
    const cardMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      sideMat: THREE.MeshPhysicalMaterial;
      mod: V8ModuleMeta;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGeo = new THREE.BoxGeometry(1.7, 0.22, 1.3);
    const radius = 2.85;

    V8_MODULE_SYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_MODULE_SYSTEMS.length;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const isSelected = mod.id === activeIdRef.current;
      const canvas = createV8TopicCardCanvas(mod, isSelected, false);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;

      const sideMat = new THREE.MeshPhysicalMaterial({
        color: 0x141824,
        metalness: 0.8,
        roughness: 0.3,
        clearcoat: 0.4
      });

      const topMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        metalness: 0.2,
        roughness: 0.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2
      });

      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
      const mesh = new THREE.Mesh(cardGeo, materials);
      mesh.position.set(x, 0.11, z);
      mesh.rotation.y = -angle;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      coreGroup.add(mesh);

      cardMeshes.push({
        id: mod.id,
        mesh,
        baseY: 0.11,
        targetY: 0.11,
        topMat,
        sideMat,
        mod,
        texture
      });
    });

    const updateCardTextures = (activeModId: string, hoveredModId: string | null) => {
      cardMeshes.forEach((item) => {
        const isSel = item.id === activeModId;
        const isHov = item.id === hoveredModId;
        const canvas = createV8TopicCardCanvas(item.mod, isSel, isHov);
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

      const activeMod = V8_MODULE_SYSTEMS.find((m) => m.id === activeIdRef.current);
      if (activeMod) {
        activePointLight.color.setHex(activeMod.accentHex);
      }

      cardMeshes.forEach((item) => {
        const isActive = item.id === activeIdRef.current;
        const isHovered = item.id === hoveredId;

        item.targetY = isActive ? item.baseY + 0.38 : isHovered ? item.baseY + 0.18 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 9, delta);

        if (isActive) {
          activePointLight.position.x = THREE.MathUtils.damp(activePointLight.position.x, item.mesh.position.x, 8, delta);
          activePointLight.position.z = THREE.MathUtils.damp(activePointLight.position.z, item.mesh.position.z, 8, delta);
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
    <div className="relative w-full h-[480px] sm:h-[520px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
