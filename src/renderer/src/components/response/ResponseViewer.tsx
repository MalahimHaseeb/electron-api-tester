import { useMemo, useState } from 'react'
import Button from '../ui/Button'

interface ResponseViewerProps {
  body: string
  status?: number
  statusText?: string
  duration?: number
}

function ResponseViewer({
  body,
  status,
  statusText,
  duration
}: ResponseViewerProps): React.JSX.Element {
  const [copied, setCopied] = useState(false)

  const formattedBody = useMemo(() => {
    if (!body) {
      return ''
    }

    try {
      return JSON.stringify(JSON.parse(body), null, 2)
    } catch {
      return body
    }
  }, [body])

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
          <h2 className="text-sm font-semibold">
            Response
          </h2>

          {status !== undefined && (
            <span
              className={
                status >= 200 && status < 300
                  ? 'text-sm font-medium text-emerald-600 dark:text-emerald-400'
                  : 'text-sm font-medium text-destructive'
              }
            >
              {status} {statusText}
            </span>
          )}

          {duration !== undefined && (
            <span className="text-sm text-muted-foreground">
              {duration} ms
            </span>
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

      <div className="min-h-0 flex-1 overflow-auto bg-code">
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
      </div>
    </section>
  )
}

export default ResponseViewer