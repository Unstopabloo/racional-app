export const dummyQueryKeys = {
  all: ['dummy'] as const,
  list: () => [...dummyQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...dummyQueryKeys.all, 'detail', id] as const,
}
