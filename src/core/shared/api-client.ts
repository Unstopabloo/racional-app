// ═══════════════════════════════════════════════════════════════════════════
// Typed fetch wrapper — thin layer over native fetch
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = import.meta.env.VITE_API_URL as string | undefined

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
}

interface FetchResult<T> {
  data: T | null
  error: string | null
  status: number
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<FetchResult<T>> {
  const { body, headers: customHeaders, ...rest } = options

  const url = `${BASE_URL ?? ''}${path}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((customHeaders as Record<string, string>) ?? {}),
  }

  try {
    const response = await fetch(url, {
      ...rest,
      headers,
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      const message =
        (errorBody as { message?: string })?.message ??
        `Request failed with status ${response.status}`
      return { data: null, error: message, status: response.status }
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return { data: null, error: null, status: 204 }
    }

    const data = (await response.json()) as T
    return { data, error: null, status: response.status }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Network error occurred'
    return { data: null, error: message, status: 0 }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Public API — method shortcuts
// ═══════════════════════════════════════════════════════════════════════════

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),

  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),

  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
}
