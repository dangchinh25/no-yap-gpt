export type GenerateSummaryRequest = {
  url: string
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
  }
  summary: string
}

export type GenerateSummaryResponse =
  | GenerateSummarySuccessResponse
  | GenerateSummaryErrorResponse
