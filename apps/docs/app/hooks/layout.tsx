import type { ReactNode } from 'react'
import { generateCatalog } from '../../lib/generateCatalog'
import { Sidebar } from '../../components/docs/Sidebar'

export default function HooksLayout({ children }: { children: ReactNode }) {
  const hooks = generateCatalog()

  return (
    <main className="docs-shell">
      <Sidebar hooks={hooks} />
      <div className="docs-content">{children}</div>
    </main>
  )
}
