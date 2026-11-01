# JavaScript Universe &middot; Monorepo Architecture

> **Engine-Level, Hardware-Conscious Interactive JavaScript Visualizers.**  
> Master the internal mechanics of the V8 JavaScript engine &mdash; execution contexts, stack vs heap allocation, closure lexical environments, and microtask loops through cinematic visual storytelling.

---

## 🏛 Architecture &amp; Monorepo Topology

JavaScript Universe is structured as a **modular micro-frontend monorepo**. Each core JavaScript discipline is an independent Next.js application inside the `apps/` workspace, sharing a standardized aesthetic, animation pipeline, and navigation protocol.

```
js-mastery/
├── apps/
│   ├── hub/                 # Central Discovery Hub & Progressive Curriculum
│   ├── variables/           # Module 01 · Primitives, Stack/Heap, TDZ, Coercion
│   ├── control-flow/        # Module 02 · Short-Circuiting, Truthy/Falsy, AST Branching
│   ├── functions-scope/     # Module 03 · Execution Context, Closures, Hoisting
│   ├── arrays-iteration/    # Module 04 · Array Memory Layout & Functional Pipelines
│   └── objects-maps/        # Module 05 · Object References, Prototypes & Map Internals
└── package.json             # Root monorepo configuration
```

### Architectural Principles

1. **Micro-Frontend Isolation**  
   Each topic compiles as an independent static site. Deep technical visualizers are isolated from one another, enabling independent updates and zero cross-module dependency lock.
2. **Masked Routing Gateway**  
   The central hub guides learners across dedicated micro-frontends through an integrated navigation bridge, using abstracted internal routing targets rather than raw vendor hosting endpoints.
3. **Scrubbable Continuous Narrative**  
   Each concept is engineered with pinned GSAP `ScrollTrigger` timelines: as learners scroll, functions push onto stacks, memory allocations illuminate in real time, and pointers update step by step.
4. **Standard Navigation Standard**  
   - **Disappearing Breadcrumb Header**: Displays the parent identity and active chapter (`JS Universe / <Topic>`). Hides on downward scroll to maximize screen real estate and reveals on upward scroll.
   - **Scroll-to-Top Control**: Smoothly returns users to the start of the narrative.
   - **NextSection Transition Cards**: Positioned at the conclusion of every module, providing context and one-click progression to the next subject.

---

## 📦 Curriculum Roadmap

| Module | Subject | Routing Target | Engine Mechanics Visualized |
| :---: | :--- | :--- | :--- |
| **00** | **Discovery Hub** | `[Gateway]` | Progressive unlock curriculum, on-demand interactive onboarding tour |
| **01** | **Variables &amp; Types** | `[Module: Variables]` | Call stack primitive allocation, heap object references, temporal dead zone, type coercion |
| **02** | **Control Flow &amp; Logic** | `[Module: Control-Flow]` | Abstract syntax tree branching, short-circuit evaluation, truthy/falsy bitwise comparisons |
| **03** | **Functions &amp; Scope** | `[Module: Functions-Scope]` | Execution contexts, lexical environment scopes, closure variable capture, hoisting |
| **04** | **Arrays &amp; Iteration** | `[Module: Arrays-Iteration]` | Contiguous memory allocation, O(n) unshift mutations, functional filter/map pipelines |
| **05** | **Objects &amp; Maps** | `[Module: Objects-Maps]` | Hash map collisions, prototype chain traversal, shallow vs deep cloning, memory leaks |

---

## 🎨 Visual Design &amp; Performance

- **Aesthetic**: Deep dark canvas (`#050505`) enhanced with themed radial glow blooms (Amber, Cyan, Emerald, Blue).
- **Glass Surfaces**: Multi-layered backdrop blurs (`backdrop-blur-xl`), hairline specular borders, and high-contrast typography.
- **Debounced Interaction**: Scroll and scrubber events utilize `useRef` caching to maintain 60fps frame rates without React re-render penalties.
- **Hydration Safe**: Extension-proof DOM tags (`suppressHydrationWarning`) preventing third-party browser plugin attribute mismatches.

---

## 🛠 Local Development

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Running Any Service

```bash
# 1. Main Hub
cd apps/hub
npm run dev

# 2. Variables & Data Types
cd apps/variables
npm run dev

# 3. Control Flow & Logic
cd apps/control-flow
npm run dev

# 4. Functions & Scope
cd apps/functions-scope
npm run dev

# 5. Arrays & Iteration
cd apps/arrays-iteration
npm run dev

# 6. Objects & Maps
cd apps/objects-maps
npm run dev
```

### Production Build

```bash
cd apps/<module-name>
npm run build
```

---

## 📄 License

Proprietary educational platform &middot; Built for Next-Generation Web Engineering Mastery.
