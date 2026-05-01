import { createFileRoute } from '@tanstack/react-router'
import { PortfolioDashboard } from '@/components/portfolio/portfolio-dashboard'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Racional
        </h1>
      </header>
      <PortfolioDashboard />
    </div>
  )
}
