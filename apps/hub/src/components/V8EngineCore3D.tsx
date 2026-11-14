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
    accent: "#f59e0b",
    accentHex: 0xf59e0b,
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
    accent: "#10b981",
    accentHex: 0x10b981,
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
    accent: "#a855f7",
    accentHex: 0xa855f7,
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
    accent: "#38bdf8",
    accentHex: 0x38bdf8,
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
    accent: "#f43f5e",
    accentHex: 0xf43f5e,
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
    accent: "#ec4899",
    accentHex: 0xec4899,
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
    accent: "#06b6d4",
    accentHex: 0x06b6d4,
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

  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  if (isSelected) {
    bgGrad.addColorStop(0, "#1a2236");
    bgGrad.addColorStop(1, "#101625");
  } else if (isHovered) {
    bgGrad.addColorStop(0, "#161d2d");
    bgGrad.addColorStop(1, "#0d131f");
  } else {
    bgGrad.addColorStop(0, "#131826");
    bgGrad.addColorStop(1, "#0a0e17");
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.lineWidth = isSelected ? 20 : 10;
  ctx.strokeStyle = isSelected ? mod.accent : isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.12)";
  ctx.strokeRect(18, 18, 988, 988);

  ctx.fillStyle = mod.accent;
  ctx.fillRect(18, 18, 988, 22);

  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.roundRect(70, 75, 280, 70, 35);
  ctx.fill();

  ctx.fillStyle = mod.accent;
  ctx.font = "bold 38px monospace";
  ctx.fillText(`${mod.index} · ${mod.category.toUpperCase()}`, 100, 124);

  ctx.beginPath();
  ctx.arc(930, 110, 16, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? mod.accent : "rgba(255, 255, 255, 0.25)";
  ctx.fill();
  if (isSelected) {
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.stroke();
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 106px sans-serif";
  ctx.fillText(mod.shortTitle, 70, 480);

  ctx.fillStyle = mod.accent;
  ctx.font = "bold 44px monospace";
  ctx.fillText(mod.glyph, 70, 585);

  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 40px monospace";
  ctx.fillText(mod.subsystem, 70, 700);

  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(70, 830, 884, 4);

  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 34px monospace";
  ctx.fillText("V8 · RUNTIME SPEC 2026", 70, 915);

  return canvas;
}

function createTurntableTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#121724";
  ctx.fillRect(0, 0, 1024, 1024);

  const cx = 512;
  const cy = 512;

  ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 470, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 320, 0, Math.PI * 2);
  ctx.arc(cx, cy, 180, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 7; i++) {
    const angle = (i * 2 * Math.PI) / 7;
    ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * 180, cy + Math.sin(angle) * 180);
    ctx.lineTo(cx + Math.cos(angle) * 460, cy + Math.sin(angle) * 460);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
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

    const applyResponsiveCamera = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;

      if (aspect < 1.0) {
        const extraDist = (1.0 - aspect) * 5.2;
        camera.position.set(0, 4.8 + extraDist * 0.35, 7.6 + extraDist);
      } else {
        camera.position.set(0, 4.8, 7.6);
      }
      camera.lookAt(0, -0.2, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    applyResponsiveCamera();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-6, 6, -5);
    scene.add(rimLight);

    const activePointLight = new THREE.PointLight(0xf59e0b, 2.5, 9);
    activePointLight.position.set(0, 2.2, 0);
    scene.add(activePointLight);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const turntableTexture = createTurntableTexture();
    const baseGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.24, 48);
    const baseMatSide = new THREE.MeshPhysicalMaterial({
      color: 0x0f1422,
      metalness: 0.25,
      roughness: 0.35,
      clearcoat: 0.4
    });
    const baseMatTop = new THREE.MeshPhysicalMaterial({
      map: turntableTexture,
      metalness: 0.2,
      roughness: 0.4,
      clearcoat: 0.5
    });
    const baseMaterials = [baseMatSide, baseMatTop, baseMatSide];
    const baseMesh = new THREE.Mesh(baseGeo, baseMaterials);
    baseMesh.position.y = -0.12;
    baseMesh.receiveShadow = true;
    coreGroup.add(baseMesh);

    const centerGeo = new THREE.CylinderGeometry(0.85, 0.9, 0.32, 32);
    const centerMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.65,
      roughness: 0.25,
      clearcoat: 0.6
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.position.y = 0.16;
    centerMesh.castShadow = true;
    centerMesh.receiveShadow = true;
    coreGroup.add(centerMesh);

    const capGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.4,
      roughness: 0.3
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 0.36;
    coreGroup.add(capMesh);

    const shadowGeo = new THREE.PlaneGeometry(14, 14);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.4 });
    const groundMesh = new THREE.Mesh(shadowGeo, shadowMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.26;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const cardMeshes: {
      id: string;
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      topMat: THREE.MeshPhysicalMaterial;
      mod: V8ModuleMeta;
      texture: THREE.CanvasTexture;
    }[] = [];

    const cardGeo = new THREE.BoxGeometry(1.45, 0.26, 1.25);
    const radius = 2.4;

    V8_MODULE_SYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_MODULE_SYSTEMS.length;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const isSelected = mod.id === activeIdRef.current;
      const canvas = createTactileV8CardCanvas(mod, isSelected, false);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const sideMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f1523,
        metalness: 0.2,
        roughness: 0.35,
        clearcoat: 0.5
      });

      const topMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        metalness: 0.15,
        roughness: 0.3,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15
      });

      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
      const mesh = new THREE.Mesh(cardGeo, materials);
      mesh.position.set(x, 0.13, z);
      mesh.rotation.y = 0;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      coreGroup.add(mesh);

      cardMeshes.push({
        id: mod.id,
        mesh,
        baseY: 0.13,
        targetY: 0.13,
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

      if (!isDragging) {
        targetRotationY += 0.0012;
      }

      const combinedTargetY = targetRotationY + parallaxTargetX;
      const combinedTargetX = targetRotationX - parallaxTargetY;

      coreGroup.rotation.y = THREE.MathUtils.damp(coreGroup.rotation.y, combinedTargetY, 4, delta);
      coreGroup.rotation.x = THREE.MathUtils.damp(coreGroup.rotation.x, combinedTargetX, 4, delta);

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

      const currentActive = V8_MODULE_SYSTEMS.find((m) => m.id === activeIdRef.current);
      if (currentActive) {
        activePointLight.color.setHex(currentActive.accentHex);
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

    window.addEventListener("resize", applyResponsiveCamera);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", applyResponsiveCamera);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("click", onClick);

      cardMeshes.forEach((item) => {
        item.texture.dispose();
      });
      turntableTexture.dispose();

      scene.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
