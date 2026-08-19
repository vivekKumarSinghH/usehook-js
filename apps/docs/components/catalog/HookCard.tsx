import Link from 'next/link'
import type { HookMetadata } from 'usehook-js/registry'
import { Badge } from '../ui/Badge'

export function HookCard({ hook }: { hook: HookMetadata }) {
  return (
    <Link href={`/hooks/${hook.id}`} className="hook-card">
      <h3>{hook.name}</h3>
      <Badge>{hook.category}</Badge>
      <p>{hook.description}</p>
    </Link>
  )
}
