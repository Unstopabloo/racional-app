import { apiClient } from '@/core/shared/api-client'
import { type ApiResult, toApiResult } from '@/core/shared/types'
import type {
  CreateDummyInput,
  DummyListItem,
  RawCreateDummyResponse,
  RawDeleteDummyResponse,
  RawUpdateDummyResponse,
  UpdateDummyInput,
} from './dummy.domain'
import {
  RawCreateDummyResponseSchema,
  RawDeleteDummyResponseSchema,
  RawDummyListResponseSchema,
  RawUpdateDummyResponseSchema,
} from './dummy.domain'

const DUMMY_BASE = '/dummy'

// ═══════════════════════════════════════════════════════════════════════════
// List all dummies
// ═══════════════════════════════════════════════════════════════════════════

export async function fetchDummies(): Promise<ApiResult<DummyListItem[]>> {
  const { data, error } = await apiClient.get(DUMMY_BASE)
  const result = toApiResult<unknown>(data, error)
  if (result.error) return result

  const parsed = RawDummyListResponseSchema.safeParse(result.data)
  if (!parsed.success)
    return { data: null, error: 'Invalid server response' }

  return { data: parsed.data, error: null }
}

// ═══════════════════════════════════════════════════════════════════════════
// Get single dummy
// ═══════════════════════════════════════════════════════════════════════════

export async function fetchDummy(id: string): Promise<ApiResult<DummyListItem>> {
  const { data, error } = await apiClient.get(`${DUMMY_BASE}/${id}`)
  const result = toApiResult<unknown>(data, error)
  if (result.error) return result

  const parsed = RawDummyListResponseSchema.element.safeParse(result.data)
  if (!parsed.success)
    return { data: null, error: 'Invalid server response' }

  return { data: parsed.data, error: null }
}

// ═══════════════════════════════════════════════════════════════════════════
// Create dummy
// ═══════════════════════════════════════════════════════════════════════════

export async function createDummy(
  input: CreateDummyInput,
): Promise<ApiResult<RawCreateDummyResponse>> {
  const { data, error } = await apiClient.post(DUMMY_BASE, input)
  const result = toApiResult<unknown>(data, error)
  if (result.error) return result

  const parsed = RawCreateDummyResponseSchema.safeParse(result.data)
  if (!parsed.success)
    return { data: null, error: 'Invalid server response' }

  return { data: parsed.data, error: null }
}

// ═══════════════════════════════════════════════════════════════════════════
// Update dummy
// ═══════════════════════════════════════════════════════════════════════════

export async function updateDummy(
  input: UpdateDummyInput,
): Promise<ApiResult<RawUpdateDummyResponse>> {
  const { id, ...body } = input
  const { data, error } = await apiClient.put(`${DUMMY_BASE}/${id}`, body)
  const result = toApiResult<unknown>(data, error)
  if (result.error) return result

  const parsed = RawUpdateDummyResponseSchema.safeParse(result.data)
  if (!parsed.success)
    return { data: null, error: 'Invalid server response' }

  return { data: parsed.data, error: null }
}

// ═══════════════════════════════════════════════════════════════════════════
// Delete dummy
// ═══════════════════════════════════════════════════════════════════════════

export async function deleteDummy(
  id: string,
): Promise<ApiResult<RawDeleteDummyResponse>> {
  const { data, error } = await apiClient.delete(`${DUMMY_BASE}/${id}`)
  const result = toApiResult<unknown>(data, error)
  if (result.error) return result

  const parsed = RawDeleteDummyResponseSchema.safeParse(result.data)
  if (!parsed.success)
    return { data: null, error: 'Invalid server response' }

  return { data: parsed.data, error: null }
}
