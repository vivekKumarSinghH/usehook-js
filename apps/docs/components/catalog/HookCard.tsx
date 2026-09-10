import Link from 'next/link'
import type { HookMetadata } from 'usehook-js/registry'
import { categoryStyle } from '../../lib/categoryTheme'
import { Badge } from '../ui/Badge'

export function HookCard({ hook }: { hook: HookMetadata }) {
  return (
    <Link href={`/hooks/${hook.id}`} className="specimen-card" style={categoryStyle(hook.category)}>
      <h3 className="specimen-card__name">{hook.name}</h3>
      <Badge category={hook.category} />
      <p>{hook.description}</p>
    </Link>
  )
}
