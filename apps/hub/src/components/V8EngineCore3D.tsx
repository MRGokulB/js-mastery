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
  chipColor: number;
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
    accent: "#d97706",
    chipColor: 0xfde047, // Soft pastel amber
    mechanic: "Contiguous Stack / Dynamic Heap Pointer Allocation"
  },
  {
    id: "control-flow",
    index: "02",
    name: "Control Flow & Logic",
    category: "Interpreter",
    subsystem: "Ignition Bytecode Dispatcher",
    tagline: "AST branch jumping and truthy bitmasks",
    url: "https://control-flow-ruby.vercel.app",
    accent: "#059669",
    chipColor: 0x86efac, // Soft pastel mint
    mechanic: "Conditional Branch Jump Offset Registers"
  },
  {
    id: "functions-scope",
    index: "03",
    name: "Functions & Closures",
    category: "Scope",
    subsystem: "Context Resolver & Activation Records",
    tagline: "Lexical environments and heap closure retention",
    url: "https://functions-scope.vercel.app/",
    accent: "#7c3aed",
    chipColor: 0xd8b4fe, // Soft pastel lilac
    mechanic: "Context Stack Linked Lexical Environment"
  },
  {
    id: "arrays-iteration",
    index: "04",
    name: "Arrays & Fast Elements",
    category: "Elements",
    subsystem: "V8 Elements Transition Table",
    tagline: "Packed Smi elements and amortized expansion",
    url: "https://arrays-iteration.vercel.app/",
    accent: "#0284c7",
    chipColor: 0x93c5fd, // Soft pastel sky blue
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer"
  },
  {
    id: "objects-maps",
    index: "05",
    name: "Objects & Hidden Classes",
    category: "Compiler",
    subsystem: "TurboFan JIT Type Feedback Vector",
    tagline: "V8 Shapes, inline caches and prototype lookups",
    url: "https://objects-maps.vercel.app/",
    accent: "#c026d3",
    chipColor: 0xfbcfe8, // Soft pastel peach/pink
    mechanic: "Shape Transition Tree & Property Offset Table"
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    category: "Async",
    subsystem: "Libuv & Browser Event Loop Ring",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#e11d48",
    chipColor: 0xfca5a5, // Soft pastel rose
    mechanic: "Dual Priority Queue Scheduler (Microtask P0 / Timer P1)"
  },
  {
    id: "dom-apis",
    index: "07",
    name: "DOM & Render Pipeline",
    category: "Rendering",
    subsystem: "Blink Layout & GPU Compositor",
    tagline: "Critical rendering path and GPU layer geometry",
    url: "https://dom-apis.vercel.app",
    accent: "#0891b2",
    chipColor: 0xa5f3fc, // Soft pastel cyan
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.3);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.1);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.8, 15);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Soft Ceramic Substrate Base Slab
    const baseGeo = new THREE.CylinderGeometry(3.5, 3.7, 0.22, 40);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0xf4f5f8,
      metalness: 0.1,
      roughness: 0.45,
      clearcoat: 0.3,
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
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 0.4
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.position.y = 0.18;
    centerMesh.castShadow = true;
    centerMesh.receiveShadow = true;
    coreGroup.add(centerMesh);

    // Center tactile core cap
    const capGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.3,
      roughness: 0.3
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 0.38;
    coreGroup.add(capMesh);

    // Diffuse Ground Contact Shadow
    const groundGeo = new THREE.PlaneGeometry(14, 14);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.23;
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

    const blockGeo = new THREE.BoxGeometry(1.25, 0.3, 1.05);
    const radius = 2.35;

    V8_MODULE_SYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_MODULE_SYSTEMS.length;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const mat = new THREE.MeshPhysicalMaterial({
        color: mod.chipColor,
        metalness: 0.12,
        roughness: 0.38,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2
      });

      const mesh = new THREE.Mesh(blockGeo, mat);
      mesh.position.set(x, 0.15, z);
      mesh.rotation.y = -angle;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: mod.id };
      coreGroup.add(mesh);

      // Tactile top label indicator dot
      const dotGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
      const dotMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.3,
        roughness: 0.2
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(0.38, 0.16, -0.32);
      mesh.add(dot);

      blockMeshes.push({
        id: mod.id,
        mesh,
        baseY: 0.15,
        targetY: 0.15,
        mat
      });
    });

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

        item.targetY = isActive ? item.baseY + 0.38 : isHovered ? item.baseY + 0.18 : item.baseY;
        item.mesh.position.y = THREE.MathUtils.damp(item.mesh.position.y, item.targetY, 9, delta);

        const targetRoughness = isActive ? 0.18 : isHovered ? 0.25 : 0.38;
        item.mat.roughness = THREE.MathUtils.damp(item.mat.roughness, targetRoughness, 6, delta);
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
    <div className="relative w-full h-[460px] sm:h-[500px] select-none flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
