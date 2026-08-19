'use client'

import { useState } from 'react'
import { generateCatalog } from '../../lib/generateCatalog'
import { SearchInput } from '../../components/ui/SearchInput'
import { HookCard } from '../../components/catalog/HookCard'

export default function HooksCatalogPage() {
  const allHooks = generateCatalog()
  const [search, setSearch] = useState('')

  if (allHooks.length === 0) {
    return (
      <main>
        <h1>Hooks</h1>
        <p>No hooks available yet.</p>
      </main>
    )
  }

  const term = search.trim().toLowerCase()
  const filtered = term
    ? allHooks.filter(
        (hook) =>
          hook.name.toLowerCase().includes(term) || hook.description.toLowerCase().includes(term)
      )
    : allHooks

  return (
    <main>
      <h1>Hooks</h1>
      <SearchInput value={search} onChange={setSearch} placeholder="Search hooks..." />
      {filtered.length === 0 ? (
        <p>No hooks match your search.</p>
      ) : (
        <div className="hook-grid">
          {filtered.map((hook) => (
            <HookCard key={hook.id} hook={hook} />
          ))}
        </div>
      )}
    </main>
  )
}
