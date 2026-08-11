# PLAN DE PROYECTOS — Damian Espinosa

Documento maestro del plan para llenar el portafolio con más proyectos y conseguir trabajo como **desarrollador full-stack**. Se actualiza al final de cada sesión/fase para retomar el trabajo en futuras sesiones.

## Objetivo

- Pasar de 1 proyecto (Constructora Horizonte, solo frontend) a 4-5 proyectos sólidos, deployados y con calidad de producción.
- Aprender backend sobre la marcha (base actual: **poco/nada** de backend).
- Ritmo: **5-10 h/semana**.

## Estrategia

- Enfocarse en **full-stack** (React/Next/TS + Node), que es lo que se busca en las ofertas.
- **Calidad > cantidad**: cada proyecto deployado en Vercel, con tests (Vitest + Playwright), README profesional y CI (GitHub Actions).
- Cada proyecto enseña algo nuevo de backend mientras es un proyecto real.

### Stack backend a aprender (estándar de la industria)

| Pieza | Herramienta | Uso |
|---|---|---|
| ORM | **Prisma** | Acceso a BD |
| BD dev | SQLite | Sin configuración |
| BD producción | **PostgreSQL (Neon, free)** | Producción en Vercel |
| Auth | **Sesiones JWT propias (jose + bcryptjs)** | Sesiones/cookies; se enseña de cero (Auth.js queda para P2 con OAuth) |
| Validación | **Zod** | Validación de datos |
| UI rápida | shadcn/ui | Dashboards con look profesional |
| Gráficas | Recharts | Dashboard P3 |
| Tiempo real | SSE / Socket.io | Chat P4 |
| Pagos | Stripe (modo test) | Tienda P2 |

## Roadmap de proyectos

| Proyecto | Descripción | Aprende | Stack | Tiempo est. | Estado |
|---|---|---|---|---|---|
| **P1 — TaskFlow** | Gestor de tareas Kanban: tableros, columnas, tareas, drag & drop, login/registro, CRUD | SQL + Prisma, relaciones, auth (sesiones), Server Actions vs API Routes, Zod | Next.js, Prisma, PostgreSQL (Neon), sesiones JWT (jose+bcryptjs), Tailwind | ~3 semanas | ✅ **Completado** — [demo](https://taskflow-six-lac.vercel.app) · [repo](https://github.com/AsherAST/taskflow) |
| **P2 — Tienda online** | Catálogo, búsqueda/filtros, carrito, checkout (simulado; Stripe test queda como mejora), pedidos, panel admin CRUD de productos | Relaciones BD complejas, roles (cliente/admin), estado del carrito, imágenes | Next.js, Prisma, PostgreSQL (Neon), Auth.js, Zod, Vercel Blob | ~4-5 semanas | ✅ **Completado** — [demo](https://tienda-puce-nine.vercel.app) · [repo](https://github.com/AsherAST/tienda) |
| **P3 — Dashboard/Sistema de gestión** | Panel admin (inventario/ventas): tablas con búsqueda/paginación, gráficas, alertas de stock bajo, roles admin/viewer, export CSV/PDF | Agregaciones (SUM, GROUP BY), charts, tablas avanzadas, autorización por roles | Next.js, Prisma, Recharts, Tailwind, pdf-lib | ~3-4 semanas | ✅ **Completado** — [demo](https://dashboard-gamma-roan-35.vercel.app) · [repo](https://github.com/AsherAST/dashboard) |
| **P4 — Chat en tiempo real** | Salas, historial, "escribiendo…", presencia de usuarios | Tiempo real (SSE/Socket.io), updates optimistas, conexiones | Next.js, SSE o Socket.io, Prisma, sesiones JWT | ~3 semanas | ⏳ Pendiente |

> Nota P4: Vercel free no soporta bien WebSockets → usar SSE o Socket.io en otro hosting (Railway/Fly).

## Desglose P2 — Tienda online (por partes)

> Cada parte termina verificable (build + tests + demo desplegable). Se avanza parte por parte, retomando donde dice el progreso. **No avanzar a la siguiente parte sin verificar la anterior.**

| Parte | Qué incluye | Verificación de la parte | Est. |
|---|---|---|---|
| **P2.1** | Setup proyecto `tienda/` (Next 16 + TS + Tailwind), Prisma schema (User, Product, Order, OrderItem), migración + seed, base deployada en Vercel + Neon | `build` ✅ + catálogo poblado visible en Vercel | 1 sesión |
| **P2.2** | Auth.js (credentials ✅ + roles, registro/login/logout, protección de rutas). OAuth GitHub: pendiente (requiere crear OAuth App → envs `AUTH_GITHUB_ID`/`AUTH_GITHUB_SECRET`; ya condicionado en código) | login/registro funcional, rol admin asignado | ✅ hecho |
| **P2.3** | Catálogo público: listado de productos, búsqueda, filtros (categoría/precio), detalle de producto | páginas públicas con datos + filtros funcionando | ✅ hecho |
| **P2.4** | Carrito: agregar/quitar, cantidades, subtotal, persistencia (cookies + BD) | carrito persistente entre recargas | ✅ hecho |
| **P2.5** | Checkout (simulado; Stripe test queda como mejora) + pedidos (Order/OrderItem) + "Mis pedidos" | compra de prueba completa → pedido en BD | ✅ hecho |
| **P2.6** | Panel admin: CRUD de productos, gestión de pedidos, autorización por roles | admin puede crear/editar/borrar + ver pedidos | ✅ hecho |
| **P2.7** | Cierre: README, CI (GitHub Actions), screenshots, deploy final, subir al portafolio (`content.ts` ES/EN) | P2 en el portafolio + CI ✅ + 3 proyectos | ✅ hecho |

## P2 — Estado final (✅ Completado 2026-08-09)

La tienda online quedó terminada: P2.1–P2.10 hechos, 62 tests, CI en GitHub Actions, README real, deploy en Vercel (https://tienda-puce-nine.vercel.app) y proyecto publicado en el portafolio (ES/EN). Mejoras opcionales a futuro: OAuth GitHub, Stripe test real, tests e2e con Playwright.

| Fecha | Avance | Siguiente paso |
|---|---|---|
| 2026-08-09 | **P2 Tienda completado**: cierre (CI + README + screenshot + portafolio + PROGRESO/PLAN) y fix de imágenes del seed (Webcam y Base de Carga con fotos correctas de Unsplash, actualizado en la BD de Neon). Proyecto publicado en el portafolio junto a TaskFlow y Constructora | Empezar P3 (ver tabla de proyectos) o postular |

## Fase 0 — Fundamentos (✅ Completada como parte de P1)

Los fundamentos (SQL + Prisma, auth, Zod) se aprendieron construyendo TaskFlow:
1. ✅ Schema relacional con Prisma (User, Board, Column, Task) + migración + seed.
2. ✅ SQL básico con Prisma: consultas, relaciones, `$transaction`.
3. ✅ Auth de cero: cookies httpOnly, JWT (jose), hash con bcryptjs, protección de rutas.
4. ✅ Validación con Zod (API + Server Actions).

## Estándar de calidad por proyecto (obligatorio)

- [x] Demo desplegado en Vercel (URL real en el portfolio) → https://taskflow-six-lac.vercel.app
- [x] README profesional: capturas, problema/solución, stack, features, instalación, `.env.example`.
- [x] Tests: Vitest + Playwright.
- [x] CI: GitHub Actions (lint + tests en cada push) → workflow `ci.yml` subido a `AsherAST/taskflow`, run #1 ✅.
- [x] Seed data para que el demo se vea poblado.
- [x] Env vars documentadas, nunca en el repo.

## Acciones paralelas para conseguir trabajo

- [ ] Actualizar el portafolio al terminar cada proyecto (editar `src/data/content.ts`, ES + EN).
- [ ] Renderizar `image` en `Projects.tsx` (el campo ya existe en el tipo `Project`) y añadir screenshots.
- [ ] Completar CV (`public/cv-damian-espinosa.pdf`).
- [ ] GitHub bien presentado: projects pinned, README de perfil.
- [ ] LinkedIn: publicar avance al terminar cada proyecto.
- [ ] Postular con el portafolio en vivo (URL de Vercel).

## Orden de ejecución

| Fase | Qué | Resultado |
|---|---|---|
| 0 | Fundamentos backend | Bases listas |
| 1 | P1 TaskFlow | Portafolio con 2 proyectos (full-stack) |
| 2 | P2 Tienda | 3 proyectos → **empezar a postular** |
| 3 | P3 Dashboard | 4 proyectos → perfil competitivo |
| 4 | P4 Chat | 5 proyectos + diferenciador real-time |

## Progreso por sesión

| Fecha | Sesión | Avance | Siguiente paso |
|---|---|---|---|
| 2026-08-08 | Plan inicial creado | Documento maestro + roadmap definido | Fase 0 + P1 TaskFlow |
| 2026-08-08 | **P1 TaskFlow: app completa** | Projecto `taskflow/` con Next 16, Prisma 7 (SQLite), auth de cero (JWT+bcrypt), Server Actions, Kanban con drag & drop. 31 tests unitarios + 2 e2e ✅, lint ✅, build ✅, README + CI ✅ | Deploy: Neon Postgres + Vercel, push a GitHub, subirlo al portafolio |
| 2026-08-08 | **P1 TaskFlow: deploy completado** | Migrado a PostgreSQL (Neon) con Prisma 7 (`PrismaPg`), repo `AsherAST/taskflow`, deploy en Vercel: **https://taskflow-six-lac.vercel.app** (login demo verificado, tablero con seed). Envs (DATABASE_URL, AUTH_SECRET) en Vercel. CI listo localmente | Subir TaskFlow al portafolio (`content.ts` ES+EN + screenshot) · generar PAT con scope `workflow` para subir CI · empezar P2 Tienda |
| 2026-08-09 | **P1 TaskFlow: CI subido a GitHub** | Subido `ci.yml` al repo (PAT nuevo con scope `workflow`), run #1 del workflow ✅ (lint + tests + build + e2e). Rama renombrada a `main`. Portafolio ya incluye TaskFlow con screenshots (commit `3a0d472`) | Empezar P2 Tienda online |
| 2026-08-09 | **P2 Tienda online: completado** | E-commerce full-stack terminado (P2.1–P2.10): auth con roles, catálogo con búsqueda/filtros/paginación, carrito en cookies, checkout transaccional + pedidos, panel admin (CRUD productos con Vercel Blob + gestión de pedidos). 62 tests ✅ · lint ✅ · build ✅ · CI en GitHub Actions · README real · fix imágenes del seed · publicado en el portafolio (ES/EN + screenshot) | Empezar P3 Dashboard |
| 2026-08-09 | **Post-P2: mejoras y seguridad** | **TaskFlow**: editar título de tablero, reordenar columnas con DnD, renombrar tareas, landing page, fix mobile (79 unit + 6 e2e ✅). **Recuperación de contraseña OTP por email (SMTP)** en TaskFlow y Tienda: flujo correo → código → nueva contraseña, código hasheado con cooldown y límite de intentos, sin filtrar usuarios ni exponer enlaces, `changeToken` de un solo uso; migraciones Prisma aplicadas en Neon; SMTP de Gmail configurado en Vercel (ambos) y redeploy ✅ (79 unit por proyecto + lint + build + e2e). Deploy del portafolio conectado a Git (repo `AsherAST/portafolio`) | P3 Dashboard pendiente |
| 2026-08-11 | **P3 Dashboard completado** | Proyecto `dashboard/` (Next 16 + Prisma + Neon) con: auth roles ADMIN/VIEWER, dashboard de KPIs y gráficas Recharts (ventas por día/categoría/top productos/estados), tablas de inventario y ventas con búsqueda/filtros/paginación, alertas de stock bajo, `/admin` exclusivo de administradores, export CSV/PDF (pdf-lib). 32 tests ✅ · lint ✅ · build ✅ · CI en GitHub Actions · README real · deploy conectado a Git (auto-deploy verificado en producción) · proyecto publicado en el portafolio (ES/EN) | Empezar P4 Chat en tiempo real (o postular) |
