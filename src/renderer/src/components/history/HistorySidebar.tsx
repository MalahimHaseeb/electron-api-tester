import type { ApiRequest } from '../../../../shared/types'
import Button from '../ui/Button'

interface HistoryItem {
  id: string
  method: string
  url: string
  request: ApiRequest
}

interface HistorySidebarProps {
  history: HistoryItem[]
  selectedId: string | null
  onSelect: (item: HistoryItem) => void
  onClear: () => void
}

const methodClasses: Record<string, string> = {
  GET: 'text-emerald-600 dark:text-emerald-400',
  POST: 'text-blue-600 dark:text-blue-400',
  PUT: 'text-amber-600 dark:text-amber-400',
  PATCH: 'text-purple-600 dark:text-purple-400',
  DELETE: 'text-red-600 dark:text-red-400',
  HEAD: 'text-muted-foreground'
}

function HistorySidebar({
  history,
  selectedId,
  onSelect,
  onClear
}: HistorySidebarProps): React.JSX.Element {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div>
          <h2 className="text-sm font-semibold">
            History
          </h2>

          <p className="text-xs text-muted-foreground">
            {history.length} request{history.length === 1 ? '' : 's'}
          </p>
        </div>

        <Button
          variant="ghost"
          className="px-2 py-1 text-xs"
          onClick={onClear}
          disabled={history.length === 0}
        >
          Clear
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {history.length === 0 ? (
          <div className="flex h-full items-center justify-center p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Your requests will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {history.map((item) => {
              const hasParams = item.request.params.some(
                (param) => param.enabled && param.key.trim()
              )

              const hasHeaders = item.request.headers.some(
                (header) => header.enabled && header.key.trim()
              )

              const hasBody = Boolean(item.request.body.trim())

              const selected = selectedId === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item)}
                  className={[
                    'w-full rounded-lg border p-3 text-left transition-colors',
                    selected
                      ? 'border-primary bg-sidebar-accent'
                      : 'border-transparent hover:border-sidebar-border hover:bg-sidebar-accent'
                  ].join(' ')}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={[
                        'text-xs font-bold',
                        methodClasses[item.method] ??
                          'text-muted-foreground'
                      ].join(' ')}
                    >
                      {item.method}
                    </span>

                    {hasParams && (
                      <span className="text-[10px] text-muted-foreground">
                        Params
                      </span>
                    )}

                    {hasHeaders && (
                      <span className="text-[10px] text-muted-foreground">
                        Headers
                      </span>
                    )}

                    {hasBody && (
                      <span className="text-[10px] text-muted-foreground">
                        Body
                      </span>
                    )}
                  </div>

                  <div className="truncate text-sm text-sidebar-foreground">
                    {item.url}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}

export default HistorySidebar