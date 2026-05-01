import { queryOptions } from '@tanstack/react-query'
import type { DummyListItem } from './dummy.domain'
import { fetchDummies, fetchDummy } from './dummy.infrastructure'
import { dummyQueryKeys } from './dummy.query-keys'

export const dummyListQueryOptions = () =>
  queryOptions({
    queryKey: dummyQueryKeys.list(),
    queryFn: async (): Promise<DummyListItem[]> => {
      const result = await fetchDummies()
      if (result.error || !result.data)
        throw new Error(result.error ?? 'Error fetching dummies')
      return result.data
    },
    staleTime: 60_000,
  })

export const dummyDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: dummyQueryKeys.detail(id),
    queryFn: async (): Promise<DummyListItem> => {
      const result = await fetchDummy(id)
      if (result.error || !result.data)
        throw new Error(result.error ?? 'Error fetching dummy')
      return result.data
    },
    staleTime: 60_000,
  })
