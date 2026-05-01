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
    <div className="rounded-lg border border-[var(--border)] bg-[var(--popover)] px-4 py-3 shadow-xl shadow-black/40">
      <div className="flex items-center gap-2">
        <div
          className="size-2 rounded-full shadow-[0_0_6px_var(--racional-teal)]"
          style={{ backgroundColor: 'var(--racional-teal)' }}
        />
        <span className="text-base font-semibold text-[var(--foreground)]">
          {formatCurrency(point.portfolioValue)}
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
        <span>{formatDate(point.date)}</span>
        <span className="text-[var(--racional-gray)]">&middot;</span>
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
    <div className="-mx-6 sm:-mx-12 lg:-mx-20">
    <ChartContainer config={chartConfig} className="min-h-[450px] w-full">
      <AreaChart
        data={chartData}
        margin={{ top: 16, right: 0, left: 0, bottom: 8 }}
        syncId="portfolio"
      >
        <defs>
          <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--racional-teal)" stopOpacity={0.20} />
            <stop offset="50%" stopColor="var(--racional-teal)" stopOpacity={0.05} />
            <stop offset="100%" stopColor="var(--racional-teal)" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="dateLabel"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: 'var(--racional-gray)' }}
          tickFormatter={(value: number) => {
            const date = new Date(value)
            return new Intl.DateTimeFormat('es-CL', { month: 'short' }).format(date)
          }}
          tickMargin={16}
          minTickGap={50}
        />
        <ChartTooltip
          content={<CustomTooltip />}
          cursor={{ stroke: 'oklch(0.35 0.005 270)', strokeDasharray: '4 4' }}
        />
        <Line
          type="monotone"
          dataKey="contributions"
          stroke="var(--racional-gray)"
          strokeWidth={1}
          strokeDasharray="6 4"
          dot={false}
          activeDot={false}
        />
        <Area
          type="monotone"
          dataKey="portfolioValue"
          stroke="var(--racional-teal)"
          strokeWidth={2.5}
          fill="url(#amberGradient)"
          dot={false}
          activeDot={{
            r: 5,
            fill: 'var(--racional-teal)',
            stroke: 'var(--background)',
            strokeWidth: 2,
            style: { filter: 'drop-shadow(0 0 6px oklch(0.78 0.14 75 / 0.5))' },
          }}
        />
      </AreaChart>
    </ChartContainer>
    </div>
  )
}
