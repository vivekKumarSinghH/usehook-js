import { generateCatalog } from '../../lib/generateCatalog'

export default function HooksCatalogPage() {
  const hooks = generateCatalog()

  if (hooks.length === 0) {
    return (
      <main>
        <h1>Hooks</h1>
        <p>No hooks available yet.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Hooks</h1>
      <ul>
        {hooks.map((hook) => (
          <li key={hook.id}>
            <strong>{hook.name}</strong> — {hook.description}
          </li>
        ))}
      </ul>
    </main>
  )
}
