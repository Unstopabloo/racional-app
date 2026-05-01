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
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] p-1">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
            value === period.value
              ? 'bg-[var(--racional-teal)] text-[var(--background)] shadow-[0_0_16px_oklch(0.78_0.14_75/0.35)]'
              : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}
