import type { ReactNode } from 'react'

export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning'
  children: ReactNode
}) {
  return (
    <div className={`callout callout-${type}`} role="note">
      {children}
    </div>
  )
}
