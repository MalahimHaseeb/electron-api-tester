import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-sm hover:opacity-90',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-accent',
  outline:
    'border bg-background text-foreground hover:bg-accent',
  ghost:
    'text-foreground hover:bg-accent',
  destructive:
    'bg-destructive text-destructive-foreground hover:opacity-90'
}

function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-md px-4 py-2 text-sm font-medium',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        className
      ].join(' ')}
      {...props}
    />
  )
}

export default Button