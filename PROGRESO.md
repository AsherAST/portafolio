# PROGRESO — Portafolio Damian Espinosa

Documento de seguimiento del proyecto. Se actualiza al final de cada sprint para retomar el trabajo en futuras sesiones.

## Objetivo general

Portafolio web para buscar trabajo como desarrollador web.

- **Enfoque**: solo desarrollo web (NO se muestran habilidades secundarias: Android, Unity, ML).
- **Proyectos a mostrar**: por ahora únicamente **constructora**. El objetivo es añadir más proyectos web reales después.
- **Plan de proyectos**: ver `PLAN_PROYECTOS.md` (roadmap de P1-P4 para llenar el portafolio y aprender backend).
- **Idioma**: bilingüe ES/EN con conmutador de idioma.
- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Vitest + Playwright.
- **Deploy**: Vercel.

## Estado de sprints

| Sprint | Descripción | Estado | Fecha |
|--------|-------------|--------|-------|
| 1 | Setup del proyecto + PROGRESO.md | ✅ Completado | 2026-08-05 |
| 2 | content.ts ES/EN + LanguageContext + Navbar | ✅ Completado | 2026-08-05 |
| 3 | Hero, About, Skills (solo web) | ✅ Completado | 2026-08-05 |
| 4 | Projects (constructora), Contact, Footer, API route | ✅ Completado | 2026-08-05 |
| 5 | Cierre: lint, build, tests e2e, PROGRESO final + deploy | ✅ Completado | 2026-08-05 |

## Sprint 1 — Setup del proyecto (✅ Completado)

### Qué se hizo
- Creación del proyecto con `create-next-app@latest portafolio`:
  - TypeScript, Tailwind CSS 4, ESLint, App Router, `src/` dir, alias `@/*`, npm.
  - Next.js **16.3.0**, React **19.2.8**.
- Instalación de dependencias (0 vulnerabilidades).
- Verificación: `npm run lint` ✅ y `npm run build` ✅ (página estática prerenderizada OK).

### Estructura base generada
```
portafolio/
├── AGENTS.md / CLAUDE.md   # reglas de Next 16 (leer antes de tocar código)
├── PROGRESO.md             # este documento
├── package.json            # scripts: dev, build, start, lint
└── src/
    ├── app/
    │   ├── layout.tsx      # layout raíz (fuentes Geist, lang)
    │   ├── page.tsx        # página de inicio (plantilla por defecto)
    │   ├── globals.css     # estilos globales + theme Tailwind
    │   └── favicon.ico
```

### Notas importantes
- Next.js 16 tiene cambios respecto a versiones anteriores. `AGENTS.md` indica leer `node_modules/next/dist/docs/` antes de escribir código.
- El layout raíz ya incluye `h-full` / `min-h-full` y variables de fuente Geist.
- Aún no se han instalado Vitest ni Playwright (se harán en sprints posteriores).

## Sprint 2 — Contenido bilingüe + conmutador de idioma (✅ Completado)

### Qué se hizo
- **Vitest configurado** (`vitest.config.mts`, `vitest.setup.ts` con `localStorage.clear()` en `afterEach` para evitar estado compartido entre tests) y scripts `test`, `test:watch`, `test:coverage` en `package.json`.
- **`src/data/content.ts`**: contenido completo ES/EN centralizado con tipos. Incluye `personal` (placeholders: GitHub/LinkedIn con `placeholders.github` / `placeholders.linkedin`, CV en `placeholders.cv`), `nav`, `hero`, `about`, `skills` (solo stack web: Frontend, Backend/APIs, Testing, Herramientas), `projects` (solo **Constructora Horizonte**) y `contact`.
- **`src/context/LanguageContext.tsx`**: proveedor con idioma por defecto `es`, persistencia en `localStorage` (clave `portfolio-lang`), `toggleLang` y traducción `t`.
- **`src/components/Navbar.tsx`**: barra de navegación sticky con links de anclaje, botón de idioma ES/EN y menú móvil hamburguesa.
- **`src/app/layout.tsx`**: envuelve la app en `LanguageProvider`, metadata actualizada.
- **`src/app/page.tsx`**: temporal (placeholder "Portafolio en construcción"); las secciones se montan en el Sprint 3.

### Verificación
- Tests: **14/14 pasan** (content, LanguageContext, Navbar).
- `npm run lint` ✅ · `npm run build` ✅.

### Notas
- Se añadió `// eslint-disable-next-line react-hooks/set-state-in-effect` en el efecto que lee `localStorage`: el patrón lectura-en-effect es necesario para hidratación SSR segura en Next.js y la regla nueva de React Hooks lo marcaba.

## Sprint 3 — Hero, About y Skills (✅ Completado)

### Qué se hizo
- **`src/components/Hero.tsx`**: sección de bienvenida con nombre, rol, resumen y CTAs a `#proyectos` y `#contacto`.
- **`src/components/About.tsx`**: bio con párrafos desde `content.ts` y botón "Descargar CV" que apunta a `placeholders.cv` (con atributo `download`).
- **`src/components/Skills.tsx`**: tarjetas por categoría (solo stack web: Frontend, Backend/APIs, Testing/Calidad, Herramientas) con chips de tecnologías.
- **`src/app/page.tsx`**: monta `Hero`, `About` y `Skills` (en ese orden).

### Verificación
- Tests: **23/23 pasan** (Hero, About, Skills, Navbar, content, LanguageContext).
- `npm run lint` ✅ · `npm run build` ✅.

### Notas
- En los tests de alternar idioma de cada componente se incluye `Navbar` en el render porque el botón de idioma vive ahí.

## Sprint 4 — Proyectos, Contacto, Footer y API (✅ Completado)

### Qué se hizo
- **`src/data/content.ts`**: se añadieron mensajes de validación bilingües en `contact.form.errors`.
- **`src/components/Projects.tsx`**: tarjetas de proyecto con título, descripción, chips de stack, features con check y links (abren en pestaña nueva). Solo muestra **Constructora Horizonte**.
- **`src/components/ContactForm.tsx`**: formulario bilingüe con validación (nombre, email, mensaje), estados idle/sending/sent/error, y `fetch` a `/api/contact`. Traducciones y mensajes desde `content.ts`.
- **`src/components/Contact.tsx`**: sección con título, subtítulo, tarjetas de Email/GitHub/LinkedIn (desde `t.personal`) y el formulario.
- **`src/components/Footer.tsx`**: pie con nombre + año, derechos y enlaces (email/GitHub/LinkedIn).
- **`src/app/api/contact/route.ts`**: `POST /api/contact` con Resend (envs `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `RESEND_API_KEY`), validación y errores. Dependencia `resend` instalada.
- **`src/app/page.tsx`** y **`src/app/layout.tsx`**: se montan `Projects`, `Contact` y `Footer`.

### Verificación
- Tests: **44/44 pasan** (Projects, ContactForm, Contact, Footer, API route + los anteriores).
- `npm run lint` ✅ · `npm run build` ✅ (`/api/contact` queda como ruta dinámica `ƒ`, correcto).

### Notas
- En el test de la API, el mock de `Resend` usa `function (this: {...})` (no arrow) porque `new Resend()` con una arrow function no devuelve la instancia esperada y la ruta respondía 500.
- La clave API de Resend **no** está en el repo; hay que configurarla en Vercel (variables de entorno) para que el formulario envíe correos.

## Sprint 5 — Cierre y deploy (✅ Completado)

### Qué se hizo
- **Playwright configurado** (`playwright.config.ts` con chromium, `webServer` = `npm run dev`, baseURL `http://localhost:3000`) y script `test:e2e`.
- **Tests e2e** en `e2e/`:
  - `home.spec.ts`: hero, secciones presentes, proyecto constructora con sus links, links de navegación.
  - `language.spec.ts`: conmutador ES/EN y persistencia al recargar.
  - `contact.spec.ts`: validación del formulario y enlaces de contacto.
- **`.gitignore`**: se añadieron `/test-results/`, `/playwright-report/`, `/blob-report/`, `/playwright/.cache/`.

### Datos reales configurados
- GitHub: `https://github.com/AsherAST` (en `placeholders.github` y enlaces del proyecto).
- Sitio constructora: `https://constructora-six-theta.vercel.app` (link "Ver sitio"/"View site").
- Repo constructora: `https://github.com/AsherAST/constructora` (link "Ver código"/"View code").
- LinkedIn: `https://www.linkedin.com/in/damian-espinosa-6b46a8277` (en `placeholders.linkedin`).
- ⏳ Pendiente de completar por el usuario: archivo CV (`public/cv-damian-espinosa.pdf`, ruta `placeholders.cv`).

### Verificación final
- Unit: **44/44** ✅ · E2E: **9/9** ✅ · `npm run lint` ✅ · `npm run build` ✅.

## Guía para añadir proyectos futuros

Cada nuevo proyecto web se agrega como objeto en `src/data/content.ts` dentro del array `projects` (campo `projects` del diccionario de cada idioma), siguiendo la forma del proyecto `constructora`:
- `title`, `description`, `stack` (array de tecnologías), `features` (array de logros), `links` (repo/sitio), `image` (opcional).

Luego se actualiza este documento y se corre la suite de tests.

## Instrucciones de deploy (Vercel)

1. Subir el repo a GitHub (usuario `AsherAST`).
   ```bash
   git add .
   git commit -m "Portafolio: Damian Espinosa"
   git branch -M main
   git remote add origin https://github.com/AsherAST/portafolio.git
   git push -u origin main
   ```
2. En vercel.com → **New Project** → importar el repo `portafolio`.
3. Framework auto-detectado: **Next.js** (no requiere configuración extra). Build: `npm run build`.
4. **Variables de entorno** (necesarias solo para el formulario de contacto):
   - `CONTACT_FROM_EMAIL` (remitente, p. ej. `onboarding@resend.dev`)
   - `CONTACT_TO_EMAIL` (tu correo: `damianespinosadev@gmail.com`)
   - `RESEND_API_KEY` (obtenida en resend.com)
5. Deploy → queda disponible en `https://<proyecto>.vercel.app`.

## Comandos útiles

```bash
npm run dev        # servidor de desarrollo (http://localhost:3000)
npm run build      # build de producción
npm run start      # servir build de producción
npm run lint       # lint (ESLint)
npm test           # tests unitarios (Vitest)
npm run test:e2e   # tests e2e (Playwright)
npm run test:coverage  # tests unitarios con cobertura
```
