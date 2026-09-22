import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  destructive: 'bg-destructive/10 text-destructive'
}

function Badge({
  className = '',
  variant = 'default',
  ...props
}: BadgeProps): React.JSX.Element {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1',
        'text-xs font-medium',
        variantClasses[variant],
        className
      ].join(' ')}
      {...props}
    />
  )
}

export default Badge