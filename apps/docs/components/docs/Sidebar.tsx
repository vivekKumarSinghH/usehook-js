'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { HookMetadata } from 'usehookify/registry'
import { categoryStyle, getCategoryTheme } from '../../lib/categoryTheme'

const CATEGORY_ORDER = ['storage', 'network', 'utility', 'state']

function groupByCategory(hooks: HookMetadata[]): [string, HookMetadata[]][] {
  const groups = new Map<string, HookMetadata[]>()
  for (const hook of hooks) {
    const list = groups.get(hook.category) ?? []
    list.push(hook)
    groups.set(hook.category, list)
  }
  return CATEGORY_ORDER.filter((category) => groups.has(category)).map((category) => [
    category,
    groups.get(category) as HookMetadata[],
  ])
}

export function Sidebar({ hooks }: { hooks: HookMetadata[] }) {
  const pathname = usePathname()
  const groups = groupByCategory(hooks)

  return (
    <nav className="docs-sidebar" aria-label="Hooks index">
      {groups.map(([category, entries]) => {
        const theme = getCategoryTheme(category)
        return (
          <div className="docs-sidebar__group" key={category}>
            <p className="docs-sidebar__group-label" style={categoryStyle(category)}>
              {theme.label}
            </p>
            <ul className="docs-sidebar__list">
              {entries.map((hook) => {
                const href = `/hooks/${hook.id}`
                const isActive = pathname === href
                return (
                  <li key={hook.id}>
                    <Link
                      href={href}
                      className="docs-sidebar__link"
                      aria-current={isActive ? 'page' : undefined}
                      style={categoryStyle(category)}
                    >
                      {hook.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}
