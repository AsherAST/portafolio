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
| **P2 — Tienda online** | Catálogo, búsqueda/filtros, carrito, checkout (Stripe test o simulado), pedidos, panel admin CRUD de productos | Relaciones BD complejas, roles (cliente/admin), estado del carrito, pagos, imágenes | Next.js, Prisma, PostgreSQL (Neon), Auth.js, Zod, Stripe test | ~4-5 semanas | ⏳ Pendiente |
| **P3 — Dashboard/Sistema de gestión** | Panel admin (inventario/ventas): tablas con búsqueda/paginación, gráficas, alertas de stock bajo, roles admin/viewer, export CSV/PDF | Agregaciones (SUM, GROUP BY), charts, tablas avanzadas, autorización por roles | Next.js, Prisma, Recharts, shadcn/ui | ~3-4 semanas | ⏳ Pendiente |
| **P4 — Chat en tiempo real** | Salas, historial, "escribiendo…", presencia de usuarios | Tiempo real (SSE/Socket.io), updates optimistas, conexiones | Next.js, SSE o Socket.io, Prisma, sesiones JWT | ~3 semanas | ⏳ Pendiente |

> Nota P4: Vercel free no soporta bien WebSockets → usar SSE o Socket.io en otro hosting (Railway/Fly).

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
- [~] CI: GitHub Actions (lint + tests en cada push) → **pendiente subir a GitHub** (el PAT no tiene scope `workflow`; requiere un token nuevo con permiso `workflow` o subirlo desde la web).
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
