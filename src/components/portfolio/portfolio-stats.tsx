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
    <div className="grid grid-cols-3 gap-8 border-t border-neutral-100 pt-8">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-sm text-neutral-400">{stat.label}</p>
          <p
            className={`mt-1 text-2xl font-bold ${
              stat.valuePositive !== undefined
                ? stat.valuePositive
                  ? 'text-[var(--racional-teal)]'
                  : 'text-[var(--racional-red)]'
                : 'text-neutral-900'
            }`}
          >
            {stat.value}
          </p>
          {stat.sub && (
            <p
              className={`mt-0.5 text-sm font-medium ${
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
