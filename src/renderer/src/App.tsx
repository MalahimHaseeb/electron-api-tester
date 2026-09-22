import { useEffect, useState } from 'react'
import type { ApiRequest, ApiResponse } from '../../shared/types'
import HistorySidebar from './components/history/HistorySidebar'
import RequestEditor from './components/request/RequestEditor'
import ResponseViewer from './components/response/ResponseViewer'
import Button from './components/ui/Button'

interface HistoryItem {
  id: string
  method: string
  url: string
  request: ApiRequest
}

const defaultRequest: ApiRequest = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/users/1',
  params: [],
  headers: [],
  body: ''
}

function requestsEqual(
  first: ApiRequest,
  second: ApiRequest
): boolean {
  return JSON.stringify(first) === JSON.stringify(second)
}

function App(): React.JSX.Element {
  const [request, setRequest] = useState<ApiRequest>(defaultRequest)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedHistoryId, setSelectedHistoryId] = useState<
    string | null
  >(null)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('api-tester-theme') === 'dark'
  )

  useEffect(() => {
    const savedHistory = localStorage.getItem('api-tester-history')

    if (!savedHistory) {
      return
    }

    try {
      setHistory(JSON.parse(savedHistory))
    } catch {
      localStorage.removeItem('api-tester-history')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)

    localStorage.setItem(
      'api-tester-theme',
      darkMode ? 'dark' : 'light'
    )
  }, [darkMode])

  const handleRequestChange = (nextRequest: ApiRequest): void => {
    setRequest(nextRequest)
  }

  const handleResponse = (result: ApiResponse): void => {
    setResponse(result)
    setError('')

    const selectedHistory = history.find(
      (item) => item.id === selectedHistoryId
    )

    if (
      selectedHistory &&
      requestsEqual(selectedHistory.request, request)
    ) {
      return
    }

    const historyItem: HistoryItem = {
      id: crypto.randomUUID(),
      method: request.method,
      url: request.url,
      request
    }

    const updatedHistory = [
      historyItem,
      ...history
    ].slice(0, 50)

    setHistory(updatedHistory)
    setSelectedHistoryId(historyItem.id)

    localStorage.setItem(
      'api-tester-history',
      JSON.stringify(updatedHistory)
    )
  }

  const handleHistorySelect = (item: HistoryItem): void => {
    setRequest(item.request)
    setSelectedHistoryId(item.id)
    setResponse(null)
    setError('')
  }

  const clearHistory = (): void => {
    setHistory([])
    setSelectedHistoryId(null)
    localStorage.removeItem('api-tester-history')
  }

  const clearRequest = (): void => {
    setRequest(defaultRequest)
    setSelectedHistoryId(null)
    setResponse(null)
    setError('')
  }

  return (
    <main className="flex h-screen overflow-hidden bg-background text-foreground">
      <HistorySidebar
        history={history}
        selectedId={selectedHistoryId}
        onSelect={handleHistorySelect}
        onClear={clearHistory}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b bg-header px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              E
            </div>

            <div>
              <h1 className="text-sm font-semibold">
                Electron API Tester
              </h1>

              <p className="text-xs text-muted-foreground">
                API development workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="px-3"
              onClick={() => setDarkMode((value) => !value)}
            >
              {darkMode ? 'Light' : 'Dark'}
            </Button>

            <Button
              variant="outline"
              onClick={clearRequest}
            >
              Clear
            </Button>
          </div>
        </header>

        <section className="shrink-0 border-b p-4">
          <RequestEditor
            request={request}
            onChange={handleRequestChange}
            onResponse={handleResponse}
            onError={setError}
          />
        </section>

        <ResponseViewer
          response={response}
          error={error}
        />
      </div>
    </main>
  )
}

export default App