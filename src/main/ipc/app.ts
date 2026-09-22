import { app, ipcMain } from 'electron'

export function registerAppIpc(): void {
  ipcMain.handle('app:get-info', () => {
    return {
      name: app.getName(),
      version: app.getVersion(),
      platform: process.platform
    }
  })
}