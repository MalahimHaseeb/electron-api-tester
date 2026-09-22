import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

function Card({ className = '', ...props }: CardProps): React.JSX.Element {
  return (
    <div
      className={[
        'rounded-xl border bg-card text-card-foreground shadow-sm',
        className
      ].join(' ')}
      {...props}
    />
  )
}

export default Card