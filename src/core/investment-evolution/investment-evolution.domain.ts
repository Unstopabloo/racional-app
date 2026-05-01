import { z } from 'zod/v4'

export const InvestmentDataPointSchema = z.object({
  date: z.date(),
  portfolioValue: z.number(),
  portfolioIndex: z.number(),
  dailyReturn: z.number(),
  contributions: z.number(),
})

export type InvestmentDataPoint = z.infer<typeof InvestmentDataPointSchema>

export type PeriodFilter = '1M' | '3M' | '6M' | 'YTD' | 'ALL'

export interface PortfolioMetrics {
  currentValue: number
  totalContributions: number
  totalReturn: number
  totalReturnPct: number
  dailyReturn: number
}
