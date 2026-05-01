# Racional App

Dashboard de inversiones en tiempo real con visualización editorial.

![React 19](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)

## Demo

<!-- TODO: agregar screenshot o GIF del dashboard -->

## Ejecutar

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173).

### Con la API (opcional)

Si quieres operar con la API de inversiones, levanta `racional-api` primero:

```bash
# desde /racional-api
docker compose up -d
```

La app detecta la API en `http://localhost:3000` y habilita las vistas de operación.

## Arquitectura

```
src/
├── core/                        # Lógica de negocio por feature
│   ├── investment-evolution/    # Firestore real-time (Parte 2)
│   │   ├── .domain.ts           # Zod schemas + tipos
│   │   └── .infrastructure.ts   # onSnapshot listener
│   └── shared/                  # API client, tipos compartidos
│
├── components/
│   ├── portfolio/               # Feature: dashboard de inversiones
│   │   ├── portfolio-dashboard  # Orquestador principal
│   │   ├── portfolio-hero       # Valor total + retornos
│   │   ├── portfolio-chart      # Gráfico de evolución (Recharts)
│   │   └── period-selector      # Filtro temporal
│   └── ui/                      # Primitivos (shadcn/Radix)
│
├── hooks/                       # Custom hooks por feature
├── lib/                         # Utilidades (formateo CLP, fechas)
├── routes/                      # File-based routing (TanStack Router)
└── styles.css                   # Theme, @font-face, animaciones
```

### Decisiones de arquitectura

**Core Layer Pattern** — Cada feature vive en `src/core/{feature}/` separando dominio (schemas Zod + tipos), infraestructura (llamadas a Firestore/API) y casos de uso. Esto permite testear la lógica de negocio sin depender del framework UI y facilita migrar de Firestore a REST o viceversa sin tocar componentes.

**Firestore Real-Time** — La evolución del portafolio se consume vía `onSnapshot`, no polling. El hook `useInvestmentEvolution` encapsula el listener con cleanup automático en unmount.

**Cálculos de retorno** — Se usa cambio simple de valor (`(último - primero) / primero * 100`) relativo al período seleccionado, no TWR.

**Sin estado global** — No hay store (Redux, Zustand). El estado es local al dashboard (`useState` para período) + derivado (`useMemo` para filtrado y métricas). TanStack Query maneja el cache del server state cuando se conecta la API.

### Diseño visual

El dashboard sigue una estética editorial:

- **Tipografía**: Rogue (serif decorativa) para el valor hero, DM Sans para body
- **Color**: oklch color space — fondo charcoal profundo, acentos ámbar/teal con glows
- **Textura**: grain overlay via CSS pseudo-elements
- **Motion**: fade-up en cascade con `animation-delay`
- **Layout**: full-bleed chart que rompe el contenedor, hero con `clamp()` responsive

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | TanStack Router |
| Server state | TanStack Query |
| Estilos | Tailwind CSS v4 |
| Gráficos | Recharts v3 (via shadcn Chart) |
| Real-time | Firebase/Firestore onSnapshot |
| Validación | Zod |
| UI primitives | shadcn/ui (Radix) |

## Scripts

```bash
pnpm dev       # Dev server
pnpm build     # Build producción
pnpm lint      # ESLint
pnpm format    # Prettier
pnpm test      # Vitest
```

## Uso de IA

Este proyecto fue desarrollado usando Claude Code como herramienta principal de desarrollo:

**Mi rol:**
- Todas las decisiones de arquitectura, diseño visual y producto
- Definición de la estética y dirección creativa
- Revisión y corrección de cálculos financieros (detección de inconsistencias entre retorno porcentual y absoluto)
- decisiones de qué componentes mantener/eliminar basado en criterio de producto

**Rol de claude:**
- Scaffolding inicial del proyecto con patrones arquitectónicos definidos
- Implementación del theme dark con oklch, grain textures y animaciones
- Iteraciones rápidas de código basadas en feedback visual (screenshots)
- Refactoring de cálculos de retorno tras detectar inconsistencias

**Proceso iterativo:**
El desarrollo fue conversacional — se partió con decisiones de arquitectura donde se forzo a la ia a conversar sobre el proyecto haciendo preguntas que aporten a las desiciones, luego implementación visual, y finalmente corrección de precisión en cálculos financieros. 
Con la IA definimos scope y detalles tecnicos, yo valide y corregi. Los errores de cálculo de retorno (TWR vs cambio simple, baseline absoluto vs relativo al período) fueron encontrados por revision a mano.
