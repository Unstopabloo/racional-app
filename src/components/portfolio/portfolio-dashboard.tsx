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
import { PortfolioReturns } from './portfolio-returns'
import { PortfolioStats } from './portfolio-stats'

export function PortfolioDashboard() {
  const { data, isLoading, error } = useInvestmentEvolution()
  const [period, setPeriod] = useState<PeriodFilter>('ALL')
  const filteredData = useFilteredData(data, period)
  const metrics = usePortfolioMetrics(filteredData)

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-neutral-900">
            Error al cargar datos
          </p>
          <p className="mt-1 text-sm text-neutral-400">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PortfolioHero metrics={metrics} isLoading={isLoading} />

      <div className="flex justify-center">
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      {!isLoading && filteredData.length > 0 && (
        <>
          <PortfolioChart data={filteredData} />

          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Retorno diario
            </h3>
            <div className="mt-4">
              <PortfolioReturns data={filteredData} />
            </div>
          </div>

          <PortfolioStats metrics={metrics} />
        </>
      )}

      {isLoading && (
        <div className="flex min-h-[350px] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-[var(--racional-teal)]" />
        </div>
      )}
    </div>
  )
}
