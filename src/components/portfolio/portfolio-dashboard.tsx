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
        <PortfolioHero metrics={metrics} isLoading={isLoading} />
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

          <div className="animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <div className="flex items-center gap-6 py-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--racional-gray)]">
                Análisis
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--racional-gray)]">
              Retorno diario
            </h3>
            <div className="mt-4">
              <PortfolioReturns data={filteredData} />
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <PortfolioStats metrics={metrics} />
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
