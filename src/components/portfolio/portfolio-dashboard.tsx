import { useState } from 'react'
import type { PeriodFilter } from '@/core/investment-evolution/investment-evolution.domain'
import {
  useInvestmentEvolution,
  useFilteredData,
  usePortfolioMetrics,
} from '@/hooks/use-investment-evolution'
import { PeriodSelector } from './period-selector'
import { PortfolioHero } from './portfolio-hero'
import { PortfolioChart } from './portfolio-chart'

export function PortfolioDashboard() {
  const { data, isLoading, error } = useInvestmentEvolution()
  const [period, setPeriod] = useState<PeriodFilter>('ALL')
  const filteredData = useFilteredData(data, period)
  const metrics = usePortfolioMetrics(filteredData)

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-[var(--foreground)]">
            Error al cargar datos
          </p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {error.message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <PortfolioHero metrics={metrics} isLoading={isLoading} period={period} />
      </div>

      <div
        className="flex justify-center animate-fade-up"
        style={{ animationDelay: '0.2s' }}
      >
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      {!isLoading && filteredData.length > 0 && (
        <>
          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <PortfolioChart data={filteredData} />
          </div>

        </>
      )}

      {isLoading && (
        <div className="flex min-h-[380px] items-center justify-center">
          <div className="size-6 animate-spin rounded-full border border-[var(--border)] border-t-[var(--racional-teal)]" />
        </div>
      )}
    </div>
  )
}
