import { useState } from 'react'
import RequestEditor from './components/request/RequestEditor'
import ResponseViewer from './components/response/ResponseViewer'

interface ResponseState {
  body: string
  status: number
  statusText: string
  duration: number
}

function App(): React.JSX.Element {
  const [response, setResponse] = useState<ResponseState | null>(null)

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b bg-header px-6 py-4">
        <h1 className="text-lg font-semibold">
          Electron API Tester
        </h1>
      </header>

      <section className="border-b p-4">
        <RequestEditor onResponse={setResponse} />
      </section>

      <ResponseViewer
        body={response?.body ?? ''}
        status={response?.status}
        statusText={response?.statusText}
        duration={response?.duration}
      />
    </main>
  )
}

export default App