import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

interface RequestEditorProps {
  onResponse: (response: {
    body: string
    status: number
    statusText: string
    duration: number
  }) => void
}

function RequestEditor({
  onResponse
}: RequestEditorProps): React.JSX.Element {
  const [method, setMethod] = useState('GET')
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users/1')
  const [loading, setLoading] = useState(false)

  const sendRequest = async (): Promise<void> => {
    setLoading(true)

    try {
      const response = await window.api.sendRequest({
        method,
        url
      })

      onResponse(response)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Select
        value={method}
        onChange={(event) => setMethod(event.target.value)}
        className="w-28"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </Select>

      <Input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://api.example.com/users"
        className="flex-1"
      />

      <Button
        onClick={sendRequest}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </div>
  )
}

export default RequestEditor