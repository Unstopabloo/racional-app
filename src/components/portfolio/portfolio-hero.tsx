import { TrendingUp, TrendingDown } from 'lucide-react'
import type {
  PeriodFilter,
  PortfolioMetrics,
} from '@/core/investment-evolution/investment-evolution.domain'
import { formatCurrency, formatPercent } from '@/lib/format'

const PERIOD_LABELS: Record<PeriodFilter, string> = {
  '1M': 'último mes',
  '3M': 'últimos 3 meses',
  '6M': 'últimos 6 meses',
  YTD: 'en el año',
  ALL: 'desde el inicio',
}

interface PortfolioHeroProps {
  metrics: PortfolioMetrics | null
  isLoading: boolean
  period: PeriodFilter
}

export function PortfolioHero({ metrics, isLoading, period }: PortfolioHeroProps) {
  if (isLoading) {
    return (
      <div className="relative py-20 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--racional-gray)]">
          Total inversiones
        </p>
        <div className="mt-4 mx-auto h-16 w-80 animate-pulse rounded-lg bg-[var(--muted)]" />
      </div>
    )
  }

  if (!metrics) return null

  const isPositive = metrics.totalReturn >= 0
  const Icon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className="relative py-20 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 45%, oklch(0.78 0.14 75 / 0.10) 0%, transparent 70%)',
        }}
      />

      <p className="relative text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--racional-gray)]">
        Total inversiones
      </p>

      <p
        className="relative mt-3 leading-none"
        style={{
          fontFamily: "'Rogue', serif",
          fontSize: 'clamp(5rem, 14vw, 12rem)',
          color: 'var(--foreground)',
          letterSpacing: '-0.02em',
          textShadow: '0 0 80px oklch(0.78 0.14 75 / 0.15)',
        }}
      >
        {formatCurrency(metrics.currentValue)}
      </p>

      <div className="relative mt-8 flex items-center justify-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
            isPositive
              ? 'bg-[oklch(0.78_0.14_75/0.1)] text-[var(--racional-teal)]'
              : 'bg-[oklch(0.58_0.14_25/0.1)] text-[var(--racional-red)]'
          }`}
        >
          <Icon className="size-3.5" />
          {isPositive ? '+' : ''}
          {formatPercent(metrics.totalReturnPct)}
        </span>
        <span className="text-sm text-[var(--muted-foreground)]">
          {isPositive ? '+' : ''}
          {formatCurrency(metrics.totalReturn)}
        </span>
        <span className="text-xs text-[var(--racional-gray)]">
          {PERIOD_LABELS[period]}
        </span>
      </div>

      <p className="relative mt-6 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--racional-gray)]">
        Contribuciones: {formatCurrency(metrics.totalContributions)}
      </p>
    </div>
  )
}
