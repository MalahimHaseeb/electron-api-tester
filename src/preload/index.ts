import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { ApiRequest } from '../shared/types'

const api = {
  getAppInfo: () => electronAPI.ipcRenderer.invoke('app:get-info'),

  sendRequest: (request: ApiRequest) =>
    electronAPI.ipcRenderer.invoke('request:send', request)
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
