import type { KeyValue } from '../../../../shared/types'
import Button from '../ui/Button'
import Input from '../ui/Input'

interface ParamsEditorProps {
  params: KeyValue[]
  onChange: (params: KeyValue[]) => void
}

function ParamsEditor({
  params,
  onChange
}: ParamsEditorProps): React.JSX.Element {
  const updateParam = (
    index: number,
    field: keyof KeyValue,
    value: string | boolean
  ): void => {
    const updated = [...params]
    updated[index] = {
      ...updated[index],
      [field]: value
    }

    onChange(updated)
  }

  const addParam = (): void => {
    onChange([
      ...params,
      {
        key: '',
        value: '',
        enabled: true
      }
    ])
  }

  const removeParam = (index: number): void => {
    onChange(params.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <div className="space-y-3">
      {params.map((param, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          <input
            type="checkbox"
            checked={param.enabled}
            onChange={(event) =>
              updateParam(index, 'enabled', event.target.checked)
            }
            className="h-4 w-4 accent-primary"
          />

          <Input
            value={param.key}
            onChange={(event) =>
              updateParam(index, 'key', event.target.value)
            }
            placeholder="Key"
          />

          <Input
            value={param.value}
            onChange={(event) =>
              updateParam(index, 'value', event.target.value)
            }
            placeholder="Value"
          />

          <Button
            variant="ghost"
            onClick={() => removeParam(index)}
            type="button"
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addParam}
        type="button"
      >
        Add parameter
      </Button>
    </div>
  )
}

export default ParamsEditor