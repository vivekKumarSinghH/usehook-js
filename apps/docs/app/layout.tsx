import type { ReactNode } from 'react'
import { NavLink } from '../components/ui/NavLink'

export const metadata = {
  title: 'usehook-js',
  description:
    "A small, dependency-free React hooks library — install as a package or copy via CLI, same source either way.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/hooks">Hooks</NavLink>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
