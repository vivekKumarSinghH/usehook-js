'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} aria-current={isActive ? 'page' : undefined} className="nav-link">
      {children}
    </Link>
  )
}
