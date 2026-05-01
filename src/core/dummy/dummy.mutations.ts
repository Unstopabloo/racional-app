import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createDummy,
  deleteDummy,
  updateDummy,
} from './dummy.infrastructure'
import { dummyQueryKeys } from './dummy.query-keys'

export function useCreateDummyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDummy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dummyQueryKeys.all,
      })
    },
  })
}

export function useUpdateDummyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateDummy,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: dummyQueryKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({
        queryKey: dummyQueryKeys.list(),
      })
    },
  })
}

export function useDeleteDummyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteDummy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dummyQueryKeys.all,
      })
    },
  })
}
