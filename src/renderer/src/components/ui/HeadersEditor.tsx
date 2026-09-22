import type { KeyValue } from '../../../../shared/types'
import Button from '../ui/Button'
import Input from '../ui/Input'

interface HeadersEditorProps {
  headers: KeyValue[]
  onChange: (headers: KeyValue[]) => void
}

function HeadersEditor({
  headers,
  onChange
}: HeadersEditorProps): React.JSX.Element {
  const updateHeader = (
    index: number,
    field: keyof KeyValue,
    value: string | boolean
  ): void => {
    const updated = [...headers]
    updated[index] = {
      ...updated[index],
      [field]: value
    }

    onChange(updated)
  }

  const addHeader = (): void => {
    onChange([
      ...headers,
      {
        key: '',
        value: '',
        enabled: true
      }
    ])
  }

  const removeHeader = (index: number): void => {
    onChange(headers.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <div className="space-y-3">
      {headers.map((header, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          <input
            type="checkbox"
            checked={header.enabled}
            onChange={(event) =>
              updateHeader(index, 'enabled', event.target.checked)
            }
            className="h-4 w-4 accent-primary"
          />

          <Input
            value={header.key}
            onChange={(event) =>
              updateHeader(index, 'key', event.target.value)
            }
            placeholder="Header"
          />

          <Input
            value={header.value}
            onChange={(event) =>
              updateHeader(index, 'value', event.target.value)
            }
            placeholder="Value"
          />

          <Button
            variant="ghost"
            onClick={() => removeHeader(index)}
            type="button"
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addHeader}
        type="button"
      >
        Add header
      </Button>
    </div>
  )
}

export default HeadersEditor