"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Grip } from "lucide-react";

export interface V8SubsystemMeta {
  id: string;
  index: string;
  name: string;
  category: string;
  subsystem: string;
  tagline: string;
  url: string;
  accent: string;
  colorHex: number;
  mechanic: string;
  overview: string;
}

export const V8_SUBSYSTEMS: V8SubsystemMeta[] = [
  {
    id: "variables",
    index: "01",
    name: "Variables, Stack & Heap",
    category: "Memory Architecture",
    subsystem: "V8 Scavenger GC & Pointer Allocator",
    tagline: "Stack frames, 31-bit Smis, and heap references",
    url: "https://variables-pi.vercel.app/",
    accent: "#d97706",
    colorHex: 0xf59e0b,
    mechanic: "Contiguous Stack / Dynamic Heap Pointer Allocation",
    overview: "Hardware-level memory modeling exploring 31-bit Small Integer tagging, execution frame registers, and V8 Scavenger garbage collection."
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
    colorHex: 0x10b981,
    mechanic: "Conditional Branch Jump Offset Registers",
    overview: "AST conditional branch resolution, switch statement jump tables, and boolean coercion bitmasks inside Ignition bytecode."
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
    colorHex: 0x8b5cf6,
    mechanic: "Context Stack Linked Lexical Environment",
    overview: "Execution context creation phases, persistent heap closures, and static lexical scoping chains."
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
    colorHex: 0x0ea5e9,
    mechanic: "Fast Contiguous Indexed Int32 Array Buffer",
    overview: "Fast Smi Elements, holey array avoidances, and amortized array capacity doubling in memory."
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
    colorHex: 0xd946ef,
    mechanic: "Shape Transition Tree & Property Offset Table",
    overview: "V8 Hidden Classes (Shapes) transition trees, monomorphic inline caching, and prototype chain lookups."
  },
  {
    id: "async-event-loop",
    index: "06",
    name: "Async & The Event Loop",
    category: "Scheduler",
    subsystem: "Libuv & Browser Event Loop Ring",
    tagline: "Microtask drain priority and macrotask timers",
    url: "https://async-event-loop.vercel.app",
    accent: "#e11d48",
    colorHex: 0xf43f5e,
    mechanic: "Dual Priority Queue Scheduler (Microtask P0 / Timer P1)",
    overview: "Call stack execution, Web API delegation, Promise microtask drain strict priority, and timer phase ticks."
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
    colorHex: 0x06b6d4,
    mechanic: "Render Tree & Paint Layer Tree Compositor",
    overview: "DOM + CSSOM render tree construction, reflow geometry, and GPU layer compositing."
  }
];

interface Props {
  activeId: string;
  onSelectSubsystem: (id: string) => void;
}

export default function V8OrbitalCore3D({ activeId, onSelectSubsystem }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  const onSelectRef = useRef(onSelectSubsystem);
  onSelectRef.current = onSelectSubsystem;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.4, 8.2);
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
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.4);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const v8SystemGroup = new THREE.Group();
    scene.add(v8SystemGroup);

    // Central V8 Engine Core Nucleus (Brushed Titanium Sphere)
    const coreGeo = new THREE.SphereGeometry(0.78, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x181a24,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    v8SystemGroup.add(coreMesh);

    // Glowing Amber Equatorial Band
    const bandGeo = new THREE.TorusGeometry(0.82, 0.04, 16, 64);
    const bandMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    v8SystemGroup.add(bandMesh);

    // Gyroscopic Orbital Gimbal Rings
    const gimbal1Geo = new THREE.TorusGeometry(1.2, 0.012, 16, 64);
    const gimbal1Mat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.35 });
    const gimbal1 = new THREE.Mesh(gimbal1Geo, gimbal1Mat);
    gimbal1.rotation.x = Math.PI / 4;
    v8SystemGroup.add(gimbal1);

    const gimbal2Geo = new THREE.TorusGeometry(2.35, 0.01, 16, 80);
    const gimbal2Mat = new THREE.MeshBasicMaterial({ color: 0xc7d2fe, transparent: true, opacity: 0.3 });
    const gimbal2 = new THREE.Mesh(gimbal2Geo, gimbal2Mat);
    gimbal2.rotation.x = Math.PI / 2.3;
    v8SystemGroup.add(gimbal2);

    // Diffuse Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.1;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // 7 Orbital Subsystem Satellites on inclined plane
    const satelliteMeshes: {
      id: string;
      mesh: THREE.Group;
      sphereMesh: THREE.Mesh;
      basePos: THREE.Vector3;
      mat: THREE.MeshPhysicalMaterial;
      ringMat: THREE.MeshBasicMaterial;
    }[] = [];

    const radius = 2.35;
    const sphereGeo = new THREE.SphereGeometry(0.34, 32, 32);
    const orbitRingGeo = new THREE.TorusGeometry(0.44, 0.015, 16, 32);

    const linePositions: number[] = [];

    V8_SUBSYSTEMS.forEach((mod, idx) => {
      const angle = (idx * (2 * Math.PI)) / V8_SUBSYSTEMS.length;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * 0.45;
      const z = Math.sin(angle) * radius;
      const pos = new THREE.Vector3(x, y, z);

      const group = new THREE.Group();
      group.position.copy(pos);
      group.userData = { id: mod.id };

      const mat = new THREE.MeshPhysicalMaterial({
        color: mod.colorHex,
        metalness: 0.25,
        roughness: 0.28,
        clearcoat: 0.9,
        clearcoatRoughness: 0.15,
        emissive: new THREE.Color(mod.colorHex),
        emissiveIntensity: 0.18
      });

      const sphere = new THREE.Mesh(sphereGeo, mat);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      sphere.userData = { id: mod.id };
      group.add(sphere);

      // Micro orbital halo ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: mod.colorHex,
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.Mesh(orbitRingGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);

      v8SystemGroup.add(group);

      satelliteMeshes.push({
        id: mod.id,
        mesh: group,
        sphereMesh: sphere,
        basePos: pos,
        mat,
        ringMat
      });

      // Line from center to satellite
      linePositions.push(0, 0, 0);
      linePositions.push(pos.x, pos.y, pos.z);
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.25 });
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMat);
    v8SystemGroup.add(linesMesh);

    // Pointer Raycasting and Orbit Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredId: string | null = null;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.15;
    let targetRotationX = 0.22;

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
        targetRotationY += dx * 0.007;
        targetRotationX = Math.max(-0.35, Math.min(0.55, targetRotationX + dy * 0.006));
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
        targetRotationY += 0.0014;
      }

      v8SystemGroup.rotation.y = THREE.MathUtils.damp(
        v8SystemGroup.rotation.y,
        targetRotationY,
        4,
        delta
      );
      v8SystemGroup.rotation.x = THREE.MathUtils.damp(
        v8SystemGroup.rotation.x,
        targetRotationX,
        4,
        delta
      );

      // Rotate core & rings
      coreMesh.rotation.y += 0.004;
      bandMesh.rotation.z += 0.006;
      gimbal1.rotation.y += 0.002;

      raycaster.setFromCamera(mouse, camera);
      const targets = satelliteMeshes.map((s) => s.sphereMesh);
      const intersects = raycaster.intersectObjects(targets);

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

        const targetScale = isActive ? 1.35 : isHovered ? 1.18 : 1.0;
        item.mesh.scale.setScalar(
          THREE.MathUtils.damp(item.mesh.scale.x, targetScale, 8, delta)
        );

        const targetEmissive = isActive ? 0.65 : isHovered ? 0.35 : 0.18;
        item.mat.emissiveIntensity = THREE.MathUtils.damp(
          item.mat.emissiveIntensity,
          targetEmissive,
          7,
          delta
        );

        item.ringMat.opacity = THREE.MathUtils.damp(
          item.ringMat.opacity,
          isActive ? 0.95 : isHovered ? 0.6 : 0.3,
          6,
          delta
        );
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 pointer-events-none whitespace-nowrap">
        <Grip size={13} />
        <span>Drag to orbit V8 engine core &middot; Click module to select subsystem</span>
      </div>
    </div>
  );
}
