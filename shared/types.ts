export type GenerateSummaryRequest = {
  url: string
  userPrompt?: string | null
}

export type GenerateSummaryErrorResponse = {
  metadata: {
    success: boolean
  }
  errors: unknown[]
}

export type GenerateSummarySuccessResponse = {
  metadata: {
    success: boolean
    streamEnd?: boolean
  }
  summary: string
}

export type GenerateSummaryResponse =
  | GenerateSummarySuccessResponse
  | GenerateSummaryErrorResponse
