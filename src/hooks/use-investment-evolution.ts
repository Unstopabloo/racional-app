import { useEffect, useMemo, useState } from 'react'
import type {
  InvestmentDataPoint,
  PeriodFilter,
  PortfolioMetrics,
} from '@/core/investment-evolution/investment-evolution.domain'
import { subscribeToInvestmentEvolution } from '@/core/investment-evolution/investment-evolution.infrastructure'

export function useInvestmentEvolution() {
  const [data, setData] = useState<InvestmentDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToInvestmentEvolution(
      (points) => {
        setData(points)
        setIsLoading(false)
        setError(null)
      },
      (err) => {
        setError(err)
        setIsLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { data, isLoading, error }
}

export function useFilteredData(
  data: InvestmentDataPoint[],
  period: PeriodFilter,
) {
  return useMemo(() => {
    if (data.length === 0) return []
    if (period === 'ALL') return data

    const lastDate = data[data.length - 1].date
    const cutoff = new Date(lastDate)

    switch (period) {
      case '1M':
        cutoff.setMonth(cutoff.getMonth() - 1)
        break
      case '3M':
        cutoff.setMonth(cutoff.getMonth() - 3)
        break
      case '6M':
        cutoff.setMonth(cutoff.getMonth() - 6)
        break
      case 'YTD':
        cutoff.setMonth(0)
        cutoff.setDate(1)
        break
    }

    return data.filter((d) => d.date >= cutoff)
  }, [data, period])
}

export function usePortfolioMetrics(
  data: InvestmentDataPoint[],
): PortfolioMetrics | null {
  return useMemo(() => {
    if (data.length === 0) return null

    const first = data[0]
    const last = data[data.length - 1]

    const totalReturn = last.portfolioValue - first.portfolioValue

    return {
      currentValue: last.portfolioValue,
      totalContributions: last.contributions,
      totalReturn,
      totalReturnPct: (totalReturn / first.portfolioValue) * 100,
      dailyReturn: last.dailyReturn,
    }
  }, [data])
}
