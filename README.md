# MysTherm — Marketing Website

Production-grade React marketing website for MysTherm, a mycelium-based thermal insulation startup.

## Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 + Vite | UI framework + build tool |
| TypeScript | Type safety |
| Three.js | 3D panel animations |
| Framer Motion | Scroll animations |
| Zod + react-hook-form | Form validation |
| shadcn/ui | UI components |
| Tailwind CSS v3 | Utility styling |

## Design System

- **Palette:** slate `#2C3E50`, terracotta `#B5451B`, sand `#F5F0E8`, moss `#2E7D55`, charcoal `#1A2530`
- **Fonts:** Playfair Display (headings) + Lato (body) from Google Fonts
- **Aesthetic:** enterprise-refined, earthy materials palette

## Sections

1. **Navbar** — Sticky, transparent-to-slate on scroll, mobile hamburger menu
2. **Hero** — Three.js 3D panel animation with auto-rotation + OrbitControls
3. **StatsBar** — Animated counters triggered on scroll
4. **HowItWorks** — 3 step cards with stagger animation
5. **ProductStack** — Interactive 3D layer exploder with raycaster click selection
6. **Benefits** — 4 benefit cards with hover lift animation
7. **Testimonials** — 2 quote cards with star ratings
8. **ContactForm** — Zod-validated form (idle/submitting/success/error states)
9. **Footer** — 3-column layout

## Three.js Scenes

- **HeroCanvas** — Procedural 4-layer sandwich panel, auto-rotation, OrbitControls
- **LayerExploderCanvas** — Exploded view, raycaster click to inspect each layer

## Setup

```bash
cd mystherm-web
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Project Structure

```
src/
├── components/
│   ├── layout/       Navbar, MobileMenu, Footer
│   ├── sections/     Hero, StatsBar, HowItWorks, ProductStack, Benefits, Testimonials, ContactForm
│   ├── three/        HeroCanvas, LayerExploderCanvas
│   └── ui/           Button, Input, Label, Textarea, Badge, Separator
├── lib/
│   ├── three/        sceneFactory, lights, resize, disposal, models/
│   └── schemas/      contactSchema (Zod)
├── constants/        content.ts — all copy (no hardcoded strings in components)
└── types/            shared TypeScript interfaces
```

## Notes

- All Three.js scenes dispose geometries/materials/renderer on unmount
- Pixel ratio capped at `Math.min(devicePixelRatio, 2)` for performance
- Three.js components lazy-loaded with React.lazy + Suspense
- Form simulates async submit — replace with real API endpoint
- Site content is in French (target market: France)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
