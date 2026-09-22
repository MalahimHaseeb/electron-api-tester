import { useState } from 'react'

function App(): React.JSX.Element {
  const [response, setResponse] = useState<string>('')

  const sendRequest = async (): Promise<void> => {
    const result = await window.api.sendRequest({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users/1'
    })

    setResponse(result.body)
  }

  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <button
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        onClick={sendRequest}
      >
        Send Request
      </button>

      <pre className="mt-6 overflow-auto rounded-md border bg-code p-4">
        {response}
      </pre>
    </main>
  )
}

export default App