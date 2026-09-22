import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ className = '', ...props }: InputProps): React.JSX.Element {
  return (
    <input
      className={[
        'flex h-10 w-full rounded-md border bg-background px-3 py-2',
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

export default Input