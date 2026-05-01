import { createContext, use } from 'react'
import type { DummyListItem } from '@/core/dummy/dummy.domain'

// ═══════════════════════════════════════════════════════════════════════════
// Context shape
// ═══════════════════════════════════════════════════════════════════════════

interface DummyListState {
  items: DummyListItem[]
  isLoading: boolean
  error: string | null
}

const DummyListContext = createContext<DummyListState | null>(null)

// ═══════════════════════════════════════════════════════════════════════════
// Provider
// ═══════════════════════════════════════════════════════════════════════════

export function DummyListProvider({
  children,
  items,
  isLoading,
  error,
}: DummyListState & { children: React.ReactNode }) {
  return (
    <DummyListContext value={{ items, isLoading, error }}>
      {children}
    </DummyListContext>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Hook
// ═══════════════════════════════════════════════════════════════════════════

export function useDummyListContext() {
  const context = use(DummyListContext)
  if (!context) {
    throw new Error('useDummyListContext must be used within DummyListProvider')
  }
  return context
}
