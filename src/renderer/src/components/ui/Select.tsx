import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

function Select({
  className = '',
  ...props
}: SelectProps): React.JSX.Element {
  return (
    <select
      className={[
        'h-10 rounded-md border bg-background px-3 py-2',
        'text-sm text-foreground',
        'outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring',
        className
      ].join(' ')}
      {...props}
    />
  )
}

export default Select