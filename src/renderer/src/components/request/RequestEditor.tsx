import { useState } from 'react'
import type { ApiRequest, ApiResponse, KeyValue } from '../../../../shared/types'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import ParamsEditor from '../ui/ParamsEditor'
import HeadersEditor from '../ui/HeadersEditor'
import BodyEditor from '../ui/BodyEditor'

interface RequestEditorProps {
  request: ApiRequest
  onChange: (request: ApiRequest) => void
  onResponse: (response: ApiResponse) => void
  onError: (error: string) => void
}

type RequestTab = 'params' | 'headers' | 'body'

function RequestEditor({
  request,
  onChange,
  onResponse,
  onError
}: RequestEditorProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<RequestTab>('params')
  const [loading, setLoading] = useState(false)

  const updateRequest = (updates: Partial<ApiRequest>): void => {
    onChange({
      ...request,
      ...updates
    })
  }

  const sendRequest = async (): Promise<void> => {
    if (!request.url.trim()) {
      onError('Please enter a request URL.')
      return
    }

    setLoading(true)
    onError('')

    try {
      const response = await window.api.sendRequest(request)
      onResponse(response)
    } catch (error) {
      onError(
        error instanceof Error
          ? error.message
          : 'Failed to send request.'
      )
    } finally {
      setLoading(false)
    }
  }

  const tabs: { id: RequestTab; label: string }[] = [
    { id: 'params', label: 'Params' },
    { id: 'headers', label: 'Headers' },
    { id: 'body', label: 'Body' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Select
          value={request.method}
          onChange={(event) =>
            updateRequest({
              method: event.target.value
            })
          }
          className="w-28"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
          <option value="HEAD">HEAD</option>
        </Select>

        <Input
          value={request.url}
          onChange={(event) =>
            updateRequest({
              url: event.target.value
            })
          }
          placeholder="https://api.example.com/users"
          className="flex-1"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void sendRequest()
            }
          }}
        />

        <Button
          onClick={sendRequest}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex border-b px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                'border-b-2 px-4 py-3 text-sm font-medium',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground'
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'params' && (
            <ParamsEditor
              params={request.params}
              onChange={(params: KeyValue[]) =>
                updateRequest({ params })
              }
            />
          )}

          {activeTab === 'headers' && (
            <HeadersEditor
              headers={request.headers}
              onChange={(headers: KeyValue[]) =>
                updateRequest({ headers })
              }
            />
          )}

          {activeTab === 'body' && (
            <BodyEditor
              value={request.body}
              onChange={(body) => updateRequest({ body })}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestEditor