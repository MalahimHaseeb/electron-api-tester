import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({
  className = '',
  ...props
}: TextareaProps): React.JSX.Element {
  return (
    <textarea
      className={[
        'min-h-32 w-full rounded-md border bg-background px-3 py-2',
        'text-sm text-foreground',
        'placeholder:text-muted-foreground',
        'outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      ].join(' ')}
      {...props}
    />
  )
}

export default Textarea