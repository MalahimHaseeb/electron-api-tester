import Textarea from '../ui/Textarea'

interface BodyEditorProps {
  value: string
  onChange: (value: string) => void
}

function BodyEditor({
  value,
  onChange
}: BodyEditorProps): React.JSX.Element {
  return (
    <Textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder='{
  "name": "John Doe"
}'
      className="min-h-56 resize-none font-mono"
    />
  )
}

export default BodyEditor