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
| 13 | P3 Dashboard — **P3.1** Setup + BD + seed | ✅ Completado | 2026-08-11 |
| 14 | P3 Dashboard — **P3.2** Auth roles ADMIN/VIEWER + deploy | ✅ Completado | 2026-08-11 |
| 15 | P3 Dashboard — **P3.3** Tablas inventario/ventas | ✅ Completado | 2026-08-11 |
| 16 | P3 Dashboard — **P3.4** KPIs + gráficas Recharts | ✅ Completado | 2026-08-11 |
| 17 | P3 Dashboard — **P3.5** Roles + export CSV/PDF | ✅ Completado | 2026-08-11 |
| 18 | P3 Dashboard — **P3.6** Cierre (CI, README, portafolio) | ✅ Completado | 2026-08-11 |
| 19 | P4 Chat — **P4.1** Setup + Socket.io custom server + BD | ✅ Completado | 2026-08-12 |
| 20 | P4 Chat — **P4.2** Auth (JWT propias + registro/login/logout + protección de rutas) | ✅ Completado | 2026-08-12 |
| 21 | P4 Chat — **P4.3** Salas + mensajes en tiempo real (Socket.io + persistencia) | ✅ Completado | 2026-08-12 |
| 22 | P4 Chat — **P4.4** "escribiendo…" + presencia de usuarios por sala | ✅ Completado | 2026-08-12 |

## Sesión 2026-08-12

- **Portafolio**: push de 5 commits a `origin/main` (verificado sincronizado). Revisión completa: lint ✅ · 45 tests ✅ · build ✅.
- **P4.1 Chat iniciado** (repo `chat/`): proyecto Next 16 con custom server Node + Socket.io (verificado cliente→ping→pong), BD `chat` en Neon (migración `init` + seed: 2 usuarios, 3 salas, 6 mensajes), libs de auth (jose/bcryptjs) y validators Zod, Vitest 10/10 ✅ · lint ✅ · build ✅. Commit `P4.1 Chat...`.
- **Pendientes**:
  - Screenshot del Dashboard: instalar `libnss3`/`libnspr4` (sudo apt) para que Chromium/Playwright funcione; luego generar `public/projects/dashboard.png` y añadir `image` al proyecto en `content.ts` (ES/EN).
  - P4: subir repo `chat` a GitHub, deploy a Railway (Socket.io), seguir con P4.3 Salas y mensajes.

## Sesión 2026-08-12 (continuación)

- **P4.2 Chat Auth completado** (repo `chat/`, commit `717d3da`): API routes `POST /api/auth/register|login|logout` (Zod, bcryptjs hash, cookie httpOnly 7 días), sesiones JWT propias (jose) en `src/lib/session.ts`, `getSessionUser`/`requireUser` en `src/lib/auth.ts`, layout `(app)` protege `/cuenta` y `/salas` (redirige a `/login` sin sesión), login/registro redirigen a `/salas` con sesión, `AuthForm` (login/registro) + `Navbar` con logout, home con CTAs si no hay sesión. Verificado en vivo: registro 201 + cookie, login 200, `/cuenta` y `/salas` 200 con sesión, redirección sin sesión. **22 tests ✅** · lint ✅ · build ✅.

## Sesión 2026-08-12 (deploy + P4.3)

- **Repo `chat` subido a GitHub** (`AsherAST/chat`) con commits P4.1/P4.2/deploy.
- **Deploy probado en Suga** (gratis, siempre encendido): HTTP 200 en `/` y `/api/health`, pero login/registro → 500 `databasenotreachable` (Suga no alcanza Neon desde su red). Koyeb rechaza altas (fusión Mistral), Railway cobra. **Deploy en pausa** — no descartar P4, seguir con funcionalidad.
- **P4.3 Salas + mensajes en tiempo real completado** (repo `chat/`, commit `93ffcb6`): DAL `src/lib/rooms.ts` (`getRoomById`, `getRoomMessages`, `createRoom`), custom server con **auth de sockets por cookie JWT** y eventos `room:join`/`room:leave`/`message:send` (valida con Zod, persiste en BD y emite `message:new` a la sala), cliente `RoomChat.tsx` (`io({withCredentials:true})`, envía con ack), páginas `/salas` (lista + `CreateRoomForm`) y `/salas/[id]` (historial desde BD, `notFound()` en sala inexistente), Server Action `createRoomAction` (Zod + `refresh()` + `redirect`). **Fix de bug**: `server.ts` no cargaba `.env`, así que `db.ts` en el custom server recibía `undefined` → login 500 en dev; solución `import "dotenv/config"` en `server.ts` + `db.ts` prefiere `DATABASE_URL_UNPOOLED` (evita `channel_binding=require` del pooler que rompe el adapter). Verificado en vivo con dos clientes Socket.io: login demo/guest, ambos hacen `room:join` en `room-general`, demo envía mensaje → guest lo recibe en `message:new` ✅, mensaje persistido en BD ✅, `/salas` 200, `/salas/room-general` 200, sala inexistente 404, sin sesión 307→`/login`. **29 tests ✅** · lint ✅ · build ✅.
- **Pendientes**:
  - Screenshot del Dashboard: instalar `libnss3`/`libnspr4` (sudo apt) para que Chromium/Playwright funcione; luego generar `public/projects/dashboard.png` y añadir `image` al proyecto en `content.ts` (ES/EN).
  - P4: retomar deploy (revisar logs Suga / IP allow en Neon), seguir con P4.5 (cierre).

## Sesión 2026-08-12 (P4.4)

- **P4.4 "escribiendo…" + presencia completado** (repo `chat/`, commit `7e9299b`): custom server con **presencia por sala** (`Map<room, userId → {name, sockets}>`, eventos `room:join`/`room:leave`/`disconnect` emiten `presence:update`) y eventos **`typing:start`/`typing:stop`** (se emiten solo a los demás de la sala con `socket.to`). Cliente `RoomChat`: barra superior con avatares (inicial) + conteo "N en línea", indicador "X está escribiendo…" (throttle de emisión 1.5 s, auto-stop tras 3 s, stop al enviar y al desmontar). Verificado en vivo con 2 clientes: ambos ven "2 en línea" (`Damian, Invitado`) ✅, guest recibe `typing:start` (Damian) y `typing:stop` ✅, al desconectarse guest demo ve "1 en línea" ✅. **33 tests ✅** · lint ✅ · build ✅.

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

## P3 — Dashboard/Sistema de gestión (✅ completado 2026-08-11)

Panel de administración de inventario y ventas, en su propio repo `AsherAST/dashboard`:

- **P3.1** Proyecto `dashboard/` (Next 16 + TS + Tailwind 4), BD `dashboard` en Neon, schema Prisma (User con rol ADMIN/VIEWER, Product con `stockMin`, Order/OrderItem) + migración + seed (2 usuarios, 14 productos, 180 ventas en 90 días).
- **P3.2** Auth.js v5 con credenciales y rol en JWT, registro/login/logout, `proxy.ts` protege todo (login/registro públicos; `/admin` solo ADMIN). Shell del panel con sidebar. **10 tests** ✅ · deploy base + auth verificado en producción (login admin/viewer, redirecciones).
- **P3.3** Tablas de **Inventario** (búsqueda nombre/SKU, filtros categoría/stock bajo/agotado, orden, paginación, badge de estado, banner de alerta) y **Ventas** (búsqueda, filtro por estado, orden, paginación). DALs con Zod para params. **24 tests** ✅.
- **P3.4** Dashboard `/inicio`: KPIs (ingresos, ticket promedio, unidades, pedidos pendientes, stock bajo) y gráficas **Recharts** (ventas por día 30d, por categoría, top productos, pedidos por estado). Agregaciones en `stats.ts`. **30 tests** ✅.
- **P3.5** Roles: `/admin` (usuarios, solo ADMIN), banner de solo lectura para VIEWER, link Usuarios oculto. Export CSV (`/api/export/inventario`, `/api/export/ventas`, respetan filtros) y PDF (`/api/export/pdf` con pdf-lib). **32 tests** ✅.
- **P3.6** README real + CI (GitHub Actions: lint + tests + build + migrate + seed) + deploy conectado a Git (**auto-deploy por push a `main` verificado**) + proyecto publicado en el portafolio (ES/EN). 32 tests ✅ · lint ✅ · build ✅.
- **Verificación en producción**: login admin/viewer, `/admin` bloqueado para VIEWER (307→/inicio), banner solo lectura, CSV/PDF descargables (PDF válido v1.7).

## P3.6 — Cierre (✅ Completado)

- **CI**: `.github/workflows/ci.yml` (lint + tests + build + `prisma migrate deploy` + seed con Postgres de servicio).
- **README** profesional con features, stack, configuración y usuarios de prueba.
- **Deploy conectado a Git**: repo `AsherAST/dashboard`, integración Vercel (`vercel git connect`) → cada push a `main` se autodespliega (verificado: push P3.4 y P3.5 desplegados automáticamente).
- **Portafolio**: proyecto Dashboard agregado a `content.ts` (ES/EN). 45 tests ✅ · lint ✅ · build ✅.
- Screenshot del dashboard: pendiente (no se pudo generar en esta sesión por limitaciones del entorno; el campo `image` del proyecto quedó vacío).

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

## Post-P2 — Mejoras y mantenimiento (2026-08-09)

### TaskFlow (P1) — mejoras de producto post-deploy

- **Editar título del tablero y reordenar columnas con drag & drop; renombrar tareas** (commit `e3fb957`): `updateBoard` + componente `BoardTitle.tsx` (título editable inline), `moveColumn` (transacción de posiciones), DnD de columnas con handle ⠿ en `KanbanBoard.tsx`/`ColumnView.tsx` (estado `dragColumnId`, `handleColumnDrop` inserta en el índice del target), renombrado de tareas con `aria-label` "Título de la tarea".
- **Landing page** (commit `ef75cf1`): `src/app/page.tsx` con hero + CTA a registro, enlace a login y sección de features; redirige a `/boards` si hay sesión.
- **Fix mobile** (commit `661b522`): botones de tarea siempre visibles (se quitó `opacity-0 group-hover`), creación de tablero con botón "+ Nuevo tablero" que despliega el campo de nombre.
- **Verificación**: 79 tests unitarios ✅ · lint ✅ · build ✅ · 6 e2e ✅.

### Recuperación de contraseña segura (código OTP por email) — TaskFlow y Tienda

Se reemplazó el flujo inseguro (mostraba la URL/enlace de recuperación en pantalla y filtraba usuarios) por **código OTP de 6 dígitos enviado por email (SMTP)**:

- **Flujo de 3 pantallas**: 1) ingresar correo → se envía el código al email si la cuenta existe (respuesta genérica, sin enumerar usuarios); 2) ingresar correo + código (máx. 5 intentos, 10 min) → se emite un `changeToken` de un solo uso (15 min); 3) nueva contraseña con el `changeToken` oculto.
- **Seguridad**: código hasheado (sha256), cooldown de reenvío (60 s), intentos limitados, token de un solo uso, el código nunca se devuelve en la respuesta; mensaje neutral tras solicitar (no revela si el correo tiene cuenta).
- **Implementación** (ambos proyectos): `lib/password-reset.ts` (OTP + changeToken), `lib/mailer.ts` (Nodemailer; en dev sin SMTP loguea el código en consola, en producción exige SMTP), columnas `codeHash`/`attempts`/`changeTokenHash` en Prisma + migración aplicada en Neon, validators nuevos (`verifyCodeSchema`), ruta/acción `verify-code`, páginas `/reset-password/code` y `/reset-password` (TaskFlow) y `/recuperar/codigo` y `/recuperar/cambiar` (Tienda).
- **Commits**: TaskFlow `7f1c11b` + `689c214` (mensaje neutral) · Tienda `6a5cb3b` + `9e28e35`.
- **SMTP en producción**: variables `SMTP_HOST/PORT/SECURE/USER/PASS/FROM` configuradas en Vercel para ambos proyectos con Gmail (app password) y redeploy de producción ✅.
- **Verificación**: 79 tests unitarios por proyecto ✅ · lint ✅ · build ✅ · e2e TaskFlow 6 ✅.

### Portafolio — deploy

- Deploy manual con `vercel --prod` desde `/mnt/c/Users/Pc/portafolio` (antes `link:null` sin integración Git); luego se conectó el repo a Vercel y se eliminaron el workflow `deploy.yml` y el secret `VERCEL_TOKEN` para evitar dobles deploys.
- Producción: https://portafolio-pi-eosin.vercel.app muestra **Tienda Online**, **TaskFlow** y **Constructora**.

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
