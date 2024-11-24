export class FetchError extends Error {
  status: number | undefined
  statusText: string | undefined

  constructor(message: string, statusText?: string, status?: number) {
    super(message)
    this.statusText = statusText
    this.status = status
  }
}

export const isFetchError = (error: any): error is FetchError => {
  return error instanceof FetchError
}
