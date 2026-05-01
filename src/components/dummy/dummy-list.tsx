import { useQuery } from '@tanstack/react-query'
import { dummyListQueryOptions } from '@/core/dummy/dummy.queries'
import { DummyListProvider, useDummyListContext } from './dummy-list.context'

// ═══════════════════════════════════════════════════════════════════════════
// Container — fetches data and provides context
// ═══════════════════════════════════════════════════════════════════════════

export function DummyList() {
  const { data, isLoading, error } = useQuery(dummyListQueryOptions())

  return (
    <DummyListProvider
      items={data ?? []}
      isLoading={isLoading}
      error={error?.message ?? null}
    >
      <DummyListContent />
    </DummyListProvider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Presentational — reads from context
// ═══════════════════════════════════════════════════════════════════════════

function DummyListContent() {
  const { items, isLoading, error } = useDummyListContext()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        {error}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        No items yet. Create your first dummy to get started.
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-card-foreground">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize">
              {item.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
