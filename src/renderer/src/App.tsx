import { useEffect, useState } from 'react'

function App(): React.JSX.Element {
  const [appInfo, setAppInfo] = useState<{
    name: string
    version: string
    platform: string
  } | null>(null)

  useEffect(() => {
    window.api.getAppInfo().then(setAppInfo)
  }, [])

  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">
          Electron API Tester
        </h1>

        <div className="mt-6 rounded-xl border bg-card p-6">
          <h2 className="font-semibold">
            Electron App Info
          </h2>

          {appInfo && (
            <div className="mt-4 space-y-2 text-sm">
              <p>Name: {appInfo.name}</p>
              <p>Version: {appInfo.version}</p>
              <p>Platform: {appInfo.platform}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default App