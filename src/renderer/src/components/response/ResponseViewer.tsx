import { useMemo, useState } from 'react'
import type { ApiResponse } from '../../../../shared/types'
import Button from '../ui/Button'

interface ResponseViewerProps {
  response: ApiResponse | null
  error: string
}

type ResponseTab = 'body' | 'headers'

function ResponseViewer({
  response,
  error
}: ResponseViewerProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<ResponseTab>('body')
  const [copied, setCopied] = useState(false)

  const formattedBody = useMemo(() => {
    if (!response?.body) {
      return ''
    }

    try {
      return JSON.stringify(JSON.parse(response.body), null, 2)
    } catch {
      return response.body
    }
  }, [response?.body])

  const lines = formattedBody.split('\n')

  const copyResponse = async (): Promise<void> => {
    if (!formattedBody) {
      return
    }

    await navigator.clipboard.writeText(formattedBody)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold">Response</h2>

          {response && (
            <>
              <span
                className={
                  response.status >= 200 && response.status < 300
                    ? 'text-sm font-medium text-emerald-600 dark:text-emerald-400'
                    : 'text-sm font-medium text-destructive'
                }
              >
                {response.status} {response.statusText}
              </span>

              <span className="text-sm text-muted-foreground">
                {response.duration} ms
              </span>
            </>
          )}
        </div>

        <Button
          variant="outline"
          onClick={copyResponse}
          disabled={!formattedBody}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      {error && (
        <div className="border-b bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex border-b px-2">
        <button
          type="button"
          onClick={() => setActiveTab('body')}
          className={[
            'border-b-2 px-4 py-3 text-sm font-medium',
            activeTab === 'body'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground'
          ].join(' ')}
        >
          Body
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('headers')}
          className={[
            'border-b-2 px-4 py-3 text-sm font-medium',
            activeTab === 'headers'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground'
          ].join(' ')}
        >
          Headers
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-code">
        {activeTab === 'body' && (
          <>
            {formattedBody ? (
              <div className="min-w-max py-4 font-mono text-sm">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className="flex min-h-6"
                  >
                    <span className="sticky left-0 w-12 shrink-0 select-none border-r border-code-border bg-code px-3 text-right text-code-number">
                      {index + 1}
                    </span>

                    <code className="whitespace-pre px-4 text-code-foreground">
                      {line}
                    </code>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-sm text-muted-foreground">
                Send a request to see the response.
              </div>
            )}
          </>
        )}

        {activeTab === 'headers' && (
          <div className="p-4">
            {response && Object.keys(response.headers).length > 0 ? (
              <div className="overflow-hidden rounded-lg border">
                {Object.entries(response.headers).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-[220px_1fr] border-b last:border-b-0"
                    >
                      <div className="bg-muted px-3 py-2 text-sm font-medium">
                        {key}
                      </div>

                      <div className="break-all px-3 py-2 font-mono text-sm text-muted-foreground">
                        {value}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No response headers.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ResponseViewer