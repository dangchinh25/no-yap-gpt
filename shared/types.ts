import { z } from "zod"

export const GenerateSummaryRequestSchema = z.object({
  url: z.string()
})

export type GenerateSummaryRequest = z.infer<
  typeof GenerateSummaryRequestSchema
>

export const GenerateSummaryErrorResponseSchema = z.object({
  metadata: z.object({
    success: z.boolean()
  }),
  errors: z.array(z.unknown())
})
export type GenerateSummaryErrorResponse = z.infer<
  typeof GenerateSummaryErrorResponseSchema
>

export const GenerateSummarySuccessResponseSchema = z.object({
  metadata: z.object({
    success: z.boolean()
  }),
  summary: z.string()
})
export type GenerateSummarySuccessResponse = z.infer<
  typeof GenerateSummarySuccessResponseSchema
>

export type GenerateSummaryResponse =
  | GenerateSummarySuccessResponse
  | GenerateSummaryErrorResponse
