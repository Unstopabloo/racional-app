import type { ApiResult } from '@/core/shared/types'
import type {
  CreateDummyInput,
  DummyListItem,
  RawCreateDummyResponse,
  RawDeleteDummyResponse,
  RawUpdateDummyResponse,
  UpdateDummyInput,
} from './dummy.domain'
import {
  createDummy,
  deleteDummy,
  fetchDummies,
  fetchDummy,
  updateDummy,
} from './dummy.infrastructure'

// ═══════════════════════════════════════════════════════════════════════════
// Use cases — business logic orchestration
// ═══════════════════════════════════════════════════════════════════════════

export async function listDummies(): Promise<ApiResult<DummyListItem[]>> {
  return fetchDummies()
}

export async function getDummy(
  id: string,
): Promise<ApiResult<DummyListItem>> {
  return fetchDummy(id)
}

export async function addDummy(
  input: CreateDummyInput,
): Promise<ApiResult<RawCreateDummyResponse>> {
  return createDummy(input)
}

export async function editDummy(
  input: UpdateDummyInput,
): Promise<ApiResult<RawUpdateDummyResponse>> {
  return updateDummy(input)
}

export async function removeDummy(
  id: string,
): Promise<ApiResult<RawDeleteDummyResponse>> {
  return deleteDummy(id)
}
