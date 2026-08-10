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
| 6 | P2 Tienda — **P2.1** Setup + BD | ✅ Completado | 2026-08-09 |
| 7 | P2 Tienda — **P2.2** Auth | ✅ Completado | 2026-08-09 |
| 8 | P2 Tienda — **P2.3** Catálogo | ✅ Completado | 2026-08-09 |
| 9 | P2 Tienda — **P2.4** Carrito | ✅ Completado | 2026-08-09 |
| 10 | P2 Tienda — **P2.5** Checkout + pedidos | ✅ Completado | 2026-08-09 |
| 11 | P2 Tienda — **P2.6** Panel admin | ✅ Completado | 2026-08-09 |
| 12 | P2 Tienda — **P2.7** Cierre + portafolio | ✅ Completado | 2026-08-09 |

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

## P2 — Tienda online (✅ completado)

- [x] **P2.1** Setup proyecto `tienda/` + Prisma schema + migración + seed + deploy base → https://tienda-puce-nine.vercel.app
- [x] **P2.2** Auth.js v5 (credentials + roles CUSTOMER/ADMIN), registro/login/logout, `proxy.ts` (Next 16) protege `/cuenta`, `/checkout`, `/pedidos`, `/admin`. Páginas login/registro/cuenta/admin. Usuarios demo: demo@tienda.cl/demo1234 · admin@tienda.cl/admin1234. 10 tests ✅ · lint ✅ · build ✅ · deploy ✅ (login+roles verificados con curl en producción)
- [x] **P2.3** Catálogo: `src/lib/products.ts` (DAL con búsqueda/categoría/precio/orden), `parseCatalogParams`/`buildCatalogUrl` (Zod), `CatalogFilters` (client), `ProductCard`, página `/` con searchParams (Next 16 async) y `/producto/[slug]` con detalle + 404. Placeholder AddToCartButton (P2.4). **22 tests ✅** · lint ✅ · build ✅ · deploy ✅ (búsqueda/filtros/detalle verificados en producción)
- [x] **P2.4** Carrito en cookie (Server Actions + CartProvider context), badge en navbar, `/carrito` con cantidades/subtotal, placeholder `/checkout`.
- [x] **P2.5** Checkout simulado con botón directo (placeOrder transaccional + decremento de stock), `/pedidos` y `/pedidos/[id]`, formato compartido, link "Mis pedidos".
- [x] **P2.6** Admin: CRUD de productos (crear/editar/eliminar, slug autogenerado, stock) y gestión de pedidos (selector de estado, `updateOrderStatus`, solo ADMIN).
- [x] **P2.7** Diseño pulido: fuente Geist, modo claro fijo, hero en home, navbar sticky, footer, hover en tarjetas, filtros que no pierden la búsqueda, contenedores blancos.
- [x] **P2.8** Datos de envío en checkout (nombre, dirección, ciudad, teléfono) guardados en Order y mostrados en pedidos/admin.
- [x] **P2.9** Cancelar pedido devuelve stock, página 404 personalizada, paginación del catálogo (`?pagina=`).
- [x] **P2.10** Subida de imágenes con Vercel Blob — ProductForm con input de archivo, acciones con FormData + put/del, remotePatterns para blob.
- [x] **P2.7 (cierre)** README real + CI (GitHub Actions: lint + tests + build + migrate + seed) + screenshot + tienda en el portafolio (ES/EN) + PROGRESO/PLAN actualizados. 62 tests ✅ · lint ✅ · build ✅.

### Progreso por sesión (P2)

| Fecha | Parte | Avance | Siguiente paso |
|---|---|---|---|
| 2026-08-09 | P2.1 | Proyecto `tienda/` (Next 16.3 + Tailwind 4) creado. BD `tienda` creada en el proyecto Neon existente. Schema Prisma 7 (User, Product, Order, OrderItem, enums Role/OrderStatus) + migración `init` aplicada. Seed con 6 productos (upsert). `src/lib/db.ts` con `PrismaPg`. Catálogo básico en `/` (dinámico, precios CLP). Lint ✅ · Build ✅ · repo `AsherAST/tienda` · **deploy Vercel: https://tienda-puce-nine.vercel.app** (catálogo verificado HTTP 200) | Empezar P2.2 — Auth |
| 2026-08-09 | P2.2 | **Auth.js v5 (beta.32)** con Credentials + rol en JWT (`auth.ts`/`auth.config.ts`), Server Actions register/login/logout, `proxy.ts` (Next 16, Node runtime) protege rutas (`/cuenta`, `/checkout`, `/pedidos`, `/admin`). Páginas `/login`, `/registro`, `/cuenta`, `/admin` + Navbar con sesión. Seed con usuario demo + admin. Vitest configurado: **10 tests ✅** · lint ✅ · build ✅ · deploy ✅. Verificado en producción: login demo/admin (302), `/admin` bloqueado sin sesión y para clientes (307→`/login` o `/`), admin accede (200), `/cuenta` con sesión OK | Empezar P2.3 — Catálogo (listado, búsqueda, filtros, detalle) |
| 2026-08-09 | P2.3 | **Catálogo completo**: DAL `src/lib/products.ts` (getProducts con where dinámico + orden, getProductBySlug, getCategories), `catalog-params.ts` (Zod + buildCatalogUrl + PRICE_FILTERS), `CatalogFilters` client (buscar/categoría/precio/orden), `ProductCard`, página `/` con `searchParams` (Promise en Next 16) y `/producto/[slug]` (detalle + `notFound()`). Placeholder `AddToCartButton` para P2.4. **22 tests ✅** · lint ✅ · build ✅ · deploy ✅. Verificado en producción: `?q=auricular` → Auriculares, `?categoria=Periféricos` → Teclado+Mouse, `?precio=10000` → ≤$10k, detalle 200 con precio/stock/botón, slug inexistente → 404 | Empezar P2.4 — Carrito |
| 2026-08-09 | P2.4–P2.10 | **Carrito** (cookie + CartProvider + `/carrito`), **checkout** (placeOrder transaccional + stock, `/pedidos` + detalle, datos de envío), **admin** (CRUD productos con Vercel Blob + gestión de pedidos), **pulido UI** (Geist, navbar sticky, hero, filtros sin perder búsqueda, paginación, 404, cancelación devuelve stock). Deploy verificado en producción. **62 tests ✅** · lint ✅ · build ✅ | P2.7 cierre |
| 2026-08-09 | P2.7 | **Cierre completado**: CI en GitHub Actions (lint + tests + build + migrate deploy + seed, Postgres de servicio), README real del proyecto, screenshot `tienda.png`, proyecto agregado al portafolio (ES/EN en `content.ts` + test Projects corregido para múltiples proyectos, 45 tests ✅ · build ✅), PROGRESO/PLAN actualizados. Fix menor: imágenes incorrectas de Webcam (asfalto) y Base de Carga (audífonos) en el seed → reemplazadas por fotos correctas de Unsplash y actualizadas en la BD de Neon | P2 terminado → siguiente proyecto (P3) |

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
