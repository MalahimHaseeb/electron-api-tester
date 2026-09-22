import { ElectronAPI } from '@electron-toolkit/preload'
import type { ApiRequest, ApiResponse, AppInfo } from '../shared/types'

interface Api {
  getAppInfo: () => Promise<AppInfo>
  sendRequest: (request: ApiRequest) => Promise<ApiResponse>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}