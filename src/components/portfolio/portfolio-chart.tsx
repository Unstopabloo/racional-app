import { Area, AreaChart, Line, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart'
import type { InvestmentDataPoint } from '@/core/investment-evolution/investment-evolution.domain'
import { formatCurrency, formatDate } from '@/lib/format'

const chartConfig = {
  portfolioValue: {
    label: 'Valor del portafolio',
    color: 'var(--racional-teal)',
  },
  contributions: {
    label: 'Contribuciones',
    color: 'var(--racional-gray)',
  },
} satisfies ChartConfig

interface PortfolioChartProps {
  data: InvestmentDataPoint[]
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null

  const point = payload[0].payload as InvestmentDataPoint
  const isPositive = point.dailyReturn >= 0

  return (
    <div className="rounded-xl border border-neutral-100 bg-white px-4 py-3 shadow-lg shadow-black/5">
      <div className="flex items-center gap-2">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: 'var(--racional-teal)' }}
        />
        <span className="text-base font-semibold text-neutral-900">
          {formatCurrency(point.portfolioValue)}
        </span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
        <span>{formatDate(point.date)}</span>
        <span>&middot;</span>
        <span
          className={
            isPositive
              ? 'text-[var(--racional-teal)]'
              : 'text-[var(--racional-red)]'
          }
        >
          {isPositive ? '+' : ''}
          {(point.dailyReturn * 100).toFixed(2).replace('.', ',')}%
        </span>
      </div>
    </div>
  )
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    dateLabel: d.date.getTime(),
  }))

  return (
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
      <AreaChart
        data={chartData}
        margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
        syncId="portfolio"
      >
        <defs>
          <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--racional-teal)"
              stopOpacity={0.08}
            />
            <stop
              offset="100%"
              stopColor="var(--racional-teal)"
              stopOpacity={0.0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="dateLabel"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: 'var(--racional-gray)' }}
          tickFormatter={(value: number) => {
            const date = new Date(value)
            return new Intl.DateTimeFormat('es-CL', { month: 'short' }).format(
              date,
            )
          }}
          tickMargin={12}
          minTickGap={40}
        />
        <ChartTooltip
          content={<CustomTooltip />}
          cursor={{ stroke: '#E5E7EB', strokeDasharray: '4 4' }}
        />
        <Line
          type="monotone"
          dataKey="contributions"
          stroke="var(--racional-gray)"
          strokeWidth={1.5}
          strokeDasharray="6 4"
          dot={false}
          activeDot={false}
        />
        <Area
          type="monotone"
          dataKey="portfolioValue"
          stroke="var(--racional-teal)"
          strokeWidth={2}
          fill="url(#tealGradient)"
          dot={false}
          activeDot={{
            r: 5,
            fill: 'var(--racional-teal)',
            stroke: 'white',
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ChartContainer>
  )
}
