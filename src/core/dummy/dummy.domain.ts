import { z } from 'zod/v4'

// ═══════════════════════════════════════════════════════════════════════════
// Domain types — what components consume
// ═══════════════════════════════════════════════════════════════════════════

export const DummyStatusSchema = z.enum(['active', 'inactive', 'archived'])
export type DummyStatus = z.infer<typeof DummyStatusSchema>

export const DummySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: DummyStatusSchema,
  createdAt: z.string(),
})
export type Dummy = z.infer<typeof DummySchema>

export const DummyListItemSchema = DummySchema
export type DummyListItem = z.infer<typeof DummyListItemSchema>

// ═══════════════════════════════════════════════════════════════════════════
// Input schemas — for mutations
// ═══════════════════════════════════════════════════════════════════════════

export const CreateDummyInputSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().nullable().optional(),
})
export type CreateDummyInput = z.infer<typeof CreateDummyInputSchema>

export const UpdateDummyInputSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(100).optional(),
  description: z.string().nullable().optional(),
  status: DummyStatusSchema.optional(),
})
export type UpdateDummyInput = z.infer<typeof UpdateDummyInputSchema>

// ═══════════════════════════════════════════════════════════════════════════
// Raw API response schemas — match exact server response shapes
// ═══════════════════════════════════════════════════════════════════════════

export const RawDummyListResponseSchema = z.array(DummyListItemSchema)

export const RawCreateDummyResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  id: z.string(),
})
export type RawCreateDummyResponse = z.infer<
  typeof RawCreateDummyResponseSchema
>

export const RawUpdateDummyResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})
export type RawUpdateDummyResponse = z.infer<
  typeof RawUpdateDummyResponseSchema
>

export const RawDeleteDummyResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})
export type RawDeleteDummyResponse = z.infer<
  typeof RawDeleteDummyResponseSchema
>
