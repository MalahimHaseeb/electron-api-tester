import { ipcMain } from 'electron'
import type { ApiRequest, ApiResponse } from '../../shared/types'

function buildUrl(url: string, params: ApiRequest['params']): string {
  const parsedUrl = new URL(url)

  for (const param of params) {
    if (param.enabled && param.key.trim()) {
      parsedUrl.searchParams.set(param.key, param.value)
    }
  }

  return parsedUrl.toString()
}

function buildHeaders(
  headers: ApiRequest['headers'],
  body: string
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const header of headers) {
    if (header.enabled && header.key.trim()) {
      result[header.key] = header.value
    }
  }

  if (
    body &&
    !Object.keys(result).some(
      (key) => key.toLowerCase() === 'content-type'
    )
  ) {
    result['Content-Type'] = 'application/json'
  }

  return result
}

export function registerRequestIpc(): void {
  ipcMain.handle(
    'request:send',
    async (_, request: ApiRequest): Promise<ApiResponse> => {
      const start = performance.now()

      const url = buildUrl(request.url, request.params)
      const headers = buildHeaders(request.headers, request.body)

      const response = await fetch(url, {
        method: request.method,
        headers,
        body:
          request.method === 'GET' || request.method === 'HEAD'
            ? undefined
            : request.body || undefined
      })

      const body = await response.text()

      const responseHeaders: Record<string, string> = {}

      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body,
        duration: Math.round(performance.now() - start)
      }
    }
  )
}