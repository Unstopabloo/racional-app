import type { PeriodFilter } from '@/core/investment-evolution/investment-evolution.domain'

const PERIODS: { value: PeriodFilter; label: string }[] = [
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: 'YTD', label: 'YTD' },
  { value: 'ALL', label: 'Todo' },
]

interface PeriodSelectorProps {
  value: PeriodFilter
  onChange: (period: PeriodFilter) => void
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100/60 p-1">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            value === period.value
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}
