import { createFileRoute } from '@tanstack/react-router'
import { PortfolioDashboard } from '@/components/portfolio/portfolio-dashboard'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="grain min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-16 animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-[var(--racional-teal)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Portfolio Tracker
            </span>
          </div>
          <h1
            className="mt-4 text-4xl tracking-tight text-[var(--foreground)]"
            style={{ fontFamily: "'Rogue', serif" }}
          >
            Racional
          </h1>
          <div className="mt-6 h-px w-16 bg-[var(--racional-teal)]" />
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Evolución de inversiones en tiempo real
          </p>
        </header>
        <PortfolioDashboard />
      </div>
    </div>
  )
}
