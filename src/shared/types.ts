export interface ApiRequest {
  method: string
  url: string
  headers?: Record<string, string>
  body?: string
}

export interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  body: string
  duration: number
}

export interface AppInfo {
  name: string
  version: string
  platform: string
}