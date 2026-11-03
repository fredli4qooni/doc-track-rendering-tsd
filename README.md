# doc-explore-maptalks

> **Minimalist Architecture & Developer Documentation Website for Tactical Situation Display (TSD)**  
> Built with Next.js 16 (App Router), React 19, TypeScript, and TailwindCSS.

---

## 📖 Overview

This repository hosts the comprehensive technical documentation website for the dual-stack **Tactical Situation Display (TSD)** project:
- **Frontend (`fe-track-rendering-tsd`)**: MapTalks 1.6.1 + Custom WebGL2 Hardware Instancing + Zustand + Web Workers.
- **Backend (`be-track-rendering-tsd`)**: Go 1.22+ Layered REST API + Pure Go SQLite (WAL Mode) + Protocol Buffers Contract.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- pnpm package manager (`corepack enable && corepack prepare pnpm@latest --activate`)

### Development Server
```bash
# Install dependencies
pnpm install

# Run the development server (default port 3000)
pnpm dev
```
Open **`http://localhost:3000`** in your browser.

### Production Build
```bash
# Type check and build static pages
pnpm build

# Run production server
pnpm start
```

---

## 🛠️ Tech Stack & Key Features

- **Next.js 16 & App Router**: Fast static page generation, server components, and Turbopack bundler.
- **Minimalist Tactical CMS Aesthetic**: Dark theme styling using TailwindCSS with custom HUD palettes.
- **Interactive Deep Linking**: Full synchronization with URL hashes (`#overview`, `#webgl-instancing`, `#api-reference`).
- **Instant Search**: Real-time filtering across topics, summaries, and categories.
- **One-Click Code Copy**: Copy-to-clipboard buttons with visual confirmation feedback.
- **Dual-Stack Topology Diagrams**: Visual system maps and protocol comparisons.

---

## 🔗 Related Repositories

- **Frontend Repository**: [https://github.com/fredli4qooni/fe-track-rendering-tsd.git](https://github.com/fredli4qooni/fe-track-rendering-tsd.git)
- **Backend Repository**: [https://github.com/fredli4qooni/be-track-rendering-tsd.git](https://github.com/fredli4qooni/be-track-rendering-tsd.git)
