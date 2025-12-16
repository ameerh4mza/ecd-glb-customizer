## ECD Car Configurator

Interactive 3D car configurator built with Next.js, Three.js and React Three Fiber.  
Customize body color and wheel styles in real time using GLB / GLTF models or the included demo car model.

### Features

- **3D car viewer**: Orbit, zoom and inspect the car in a studio-style scene.
- **Live paint customization**: Choose from curated palettes or set any hex color.
- **Rim presets**: Swap between multiple rim designs using GLB-based rim models.
- **Model selection**: Support for multiple car entries, each with its own GLB URL and metadata.
- **GLB fallback logic**: When a GLB is missing, the app falls back to a procedural demo model.
- **Fullscreen mode & overlays**: Fullscreen viewer, color indicator, and current configuration summary.

Key UI & 3D components:

- `CarConfigurator` – main page container, model list, and configuration state.
- `CarViewer` – wraps the 3D canvas, fullscreen controls and UI overlays.
- `GltCarViewer` – current 3D scene using `@react-three/fiber` and `@react-three/drei`.
- `CarWithCustomRims`, `Rim1`, `Rim2` – generated GLTF JSX components for wheel customization.
- `ColorPicker` & `CustomizationPanel` – sidebar tools for paint and rim selection.

For a deeper dive into the GLB pipeline and part-detection logic, see `GLB_IMPLEMENTATION.md`.

### Tech Stack

- **Framework**: Next.js (App Router)
- **3D / Rendering**: `three`, `@react-three/fiber`, `@react-three/drei`
- **UI / Icons**: Tailwind CSS, `lucide-react`

### Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

3. **Open the app**

Visit `http://localhost:3000` in your browser.  
The home page renders `CarConfigurator` from `src/components/CarConfigurator.js`.

### Working with GLB Models

- Place car models under `public/models/` (for example: `public/models/car.glb`).
- Update or add entries in `CarConfigurator` to point `glbUrl` at your files.
- Ensure mesh names in the GLB follow sensible naming (body, wheel, rim, grill, etc.) to take advantage of part detection and material overrides described in `GLB_IMPLEMENTATION.md`.

### Build & Production

```bash
npm run build
npm start
```

This will create a production build and start the Next.js server.
