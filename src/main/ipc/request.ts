import { ipcMain } from 'electron'
import type { ApiRequest, ApiResponse } from '../../shared/types'

export function registerRequestIpc(): void {
  ipcMain.handle(
    'request:send',
    async (_, request: ApiRequest): Promise<ApiResponse> => {
      const start = performance.now()

      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body:
          request.method === 'GET' || request.method === 'HEAD'
            ? undefined
            : request.body
      })

      const body = await response.text()

      const headers: Record<string, string> = {}

      response.headers.forEach((value, key) => {
        headers[key] = value
      })

      return {
        status: response.status,
        statusText: response.statusText,
        headers,
        body,
        duration: Math.round(performance.now() - start)
      }
    }
  )
}