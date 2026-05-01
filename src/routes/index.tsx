import { createFileRoute } from '@tanstack/react-router'
import { PortfolioDashboard } from '@/components/portfolio/portfolio-dashboard'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="grain min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-16 animate-fade-up">
          <h1
            className="text-4xl tracking-tight text-[var(--foreground)]"
            style={{ fontFamily: "'Rogue', serif" }}
          >
            Racional
          </h1>
        </header>
        <PortfolioDashboard />
      </div>
    </div>
  )
}
