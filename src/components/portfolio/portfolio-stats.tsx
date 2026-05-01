import type { PortfolioMetrics } from '@/core/investment-evolution/investment-evolution.domain'
import { formatCurrency, formatPercent } from '@/lib/format'

interface PortfolioStatsProps {
  metrics: PortfolioMetrics | null
}

export function PortfolioStats({ metrics }: PortfolioStatsProps) {
  if (!metrics) return null

  const isPositive = metrics.totalReturn >= 0

  const stats = [
    {
      label: 'Contribuciones',
      value: formatCurrency(metrics.totalContributions),
    },
    {
      label: 'Valor de mercado',
      value: formatCurrency(metrics.currentValue),
      sub: `${isPositive ? '+' : ''}${formatCurrency(metrics.totalReturn)}`,
      subPositive: isPositive,
    },
    {
      label: 'Rendimiento',
      value: `${isPositive ? '+' : ''}${formatPercent(metrics.totalReturnPct)}`,
      valuePositive: isPositive,
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[var(--card)] p-6">
          <div className="flex items-center gap-2">
            <div className="size-1 rounded-full bg-[var(--racional-teal)]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
              {stat.label}
            </p>
          </div>
          <p
            className={`mt-2 text-2xl font-bold tracking-tight ${
              stat.valuePositive !== undefined
                ? stat.valuePositive
                  ? 'text-[var(--racional-teal)]'
                  : 'text-[var(--racional-red)]'
                : 'text-[var(--foreground)]'
            }`}
          >
            {stat.value}
          </p>
          {stat.sub && (
            <p
              className={`mt-1 text-xs font-medium ${
                stat.subPositive
                  ? 'text-[var(--racional-teal)]'
                  : 'text-[var(--racional-red)]'
              }`}
            >
              {stat.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
