import { ElectronAPI } from '@electron-toolkit/preload'

interface AppInfo {
  name: string
  version: string
  platform: string
}

interface Api {
  getAppInfo: () => Promise<AppInfo>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}