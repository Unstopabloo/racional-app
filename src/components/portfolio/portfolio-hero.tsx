import { TrendingDown, TrendingUp } from 'lucide-react'
import type { PortfolioMetrics } from '@/core/investment-evolution/investment-evolution.domain'
import { formatCurrency, formatPercent } from '@/lib/format'

interface PortfolioHeroProps {
  metrics: PortfolioMetrics | null
  isLoading: boolean
}

export function PortfolioHero({ metrics, isLoading }: PortfolioHeroProps) {
  if (isLoading) {
    return (
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-400">
          Total inversiones
        </p>
        <div className="mx-auto mt-2 h-14 w-64 animate-pulse rounded-lg bg-neutral-100" />
      </div>
    )
  }

  if (!metrics) return null

  const isPositive = metrics.totalReturn >= 0
  const Icon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className="text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-neutral-400">
        Total inversiones
      </p>
      <p className="mt-1 text-5xl font-bold tracking-tight text-neutral-900">
        {formatCurrency(metrics.currentValue)}
      </p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-base font-medium ${
            isPositive
              ? 'text-[var(--racional-teal)]'
              : 'text-[var(--racional-red)]'
          }`}
        >
          <Icon className="size-4" />
          {isPositive ? '+' : ''}
          {formatPercent(metrics.totalReturnPct)}
        </span>
        <span className="text-sm text-neutral-400">&middot;</span>
        <span
          className={`text-sm font-medium ${
            isPositive
              ? 'text-[var(--racional-teal)]'
              : 'text-[var(--racional-red)]'
          }`}
        >
          {isPositive ? '+' : ''}
          {formatCurrency(metrics.totalReturn)}
        </span>
        <span className="text-sm text-neutral-400">desde el inicio</span>
      </div>
    </div>
  )
}
