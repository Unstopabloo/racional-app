// ═══════════════════════════════════════════════════════════════════════════
// API Result — discriminated union for fetch outcomes
// ═══════════════════════════════════════════════════════════════════════════

export type ApiResult<T> =
  | { data: T; error: null }
  | { data: null; error: string }

// ═══════════════════════════════════════════════════════════════════════════
// API Response wrappers — common server response shapes
// ═══════════════════════════════════════════════════════════════════════════

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ═══════════════════════════════════════════════════════════════════════════
// API Error
// ═══════════════════════════════════════════════════════════════════════════

export interface ApiError {
  message: string
  status: number
  code?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

export function toApiResult<T>(
  data: T | null | undefined,
  error: unknown,
): ApiResult<T> {
  if (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    return { data: null, error: message }
  }
  if (data === null || data === undefined) {
    return { data: null, error: 'No data received' }
  }
  return { data, error: null }
}
