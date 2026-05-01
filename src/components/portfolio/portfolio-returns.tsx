import { Bar, BarChart, Cell, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart'
import type { InvestmentDataPoint } from '@/core/investment-evolution/investment-evolution.domain'

const chartConfig = {
  dailyReturn: {
    label: 'Retorno diario',
    color: 'var(--racional-teal)',
  },
} satisfies ChartConfig

interface PortfolioReturnsProps {
  data: InvestmentDataPoint[]
}

function ReturnsTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null

  const point = payload[0].payload as InvestmentDataPoint
  const value = point.dailyReturn * 100
  const isPositive = value >= 0

  return (
    <div className="rounded-lg border border-neutral-100 bg-white px-3 py-2 shadow-lg shadow-black/5">
      <span
        className={`text-sm font-medium ${isPositive ? 'text-[var(--racional-teal)]' : 'text-[var(--racional-red)]'}`}
      >
        {isPositive ? '+' : ''}
        {value.toFixed(2).replace('.', ',')}%
      </span>
    </div>
  )
}

export function PortfolioReturns({ data }: PortfolioReturnsProps) {
  const chartData = data.map((d) => ({
    ...d,
    dateLabel: d.date.getTime(),
    returnPct: d.dailyReturn * 100,
  }))

  return (
    <ChartContainer config={chartConfig} className="min-h-[120px] w-full">
      <BarChart
        data={chartData}
        margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
        syncId="portfolio"
      >
        <XAxis
          dataKey="dateLabel"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: 'var(--racional-gray)' }}
          tickFormatter={(value: number) => {
            const date = new Date(value)
            return new Intl.DateTimeFormat('es-CL', { month: 'short' }).format(
              date,
            )
          }}
          tickMargin={8}
          minTickGap={40}
        />
        <ChartTooltip content={<ReturnsTooltip />} cursor={false} />
        <Bar dataKey="returnPct" radius={[2, 2, 0, 0]} maxBarSize={3}>
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={
                entry.returnPct >= 0
                  ? 'var(--racional-teal)'
                  : 'var(--racional-red)'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
