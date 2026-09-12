'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { HookMetadata } from 'usehookify/registry'
import { categoryStyle } from '../../lib/categoryTheme'

interface Option {
  text: string
  goto: number | string
}

interface Couplet {
  id: number
  a: Option
  b: Option
}

const KEY: Couplet[] = [
  {
    id: 1,
    a: { text: 'Need to remember a value across page reloads?', goto: 'useLocalStorage' },
    b: { text: 'The value can reset when the page reloads', goto: 2 },
  },
  {
    id: 2,
    a: { text: 'Need to fetch data from a server?', goto: 'useFetch' },
    b: { text: "Not fetching from a server — it's all client-side", goto: 3 },
  },
  {
    id: 3,
    a: { text: 'Need to wait for rapid changes to settle before reacting?', goto: 'useDebounce' },
    b: { text: 'Just need to flip a simple on/off value', goto: 'useToggle' },
  },
]

export function IdentificationKey({ hooks }: { hooks: HookMetadata[] }) {
  const [trail, setTrail] = useState<{ coupletId: number; choice: 'a' | 'b'; text: string }[]>([])
  const [activeCoupletId, setActiveCoupletId] = useState<number | null>(1)
  const [resultId, setResultId] = useState<string | null>(null)

  const activeCouplet = KEY.find((c) => c.id === activeCoupletId) ?? null
  const result = resultId ? hooks.find((h) => h.id === resultId) : null

  function choose(couplet: Couplet, key: 'a' | 'b') {
    const option = couplet[key]
    setTrail((prev) => [...prev, { coupletId: couplet.id, choice: key, text: option.text }])
    if (typeof option.goto === 'number') {
      setActiveCoupletId(option.goto)
    } else {
      setResultId(option.goto)
      setActiveCoupletId(null)
    }
  }

  function restart() {
    setTrail([])
    setActiveCoupletId(1)
    setResultId(null)
  }

  return (
    <div className="key">
      <p className="key__header">Identification key — what do you need to do?</p>

      {trail.length > 0 && (
        <ol className="key__trail">
          {trail.map((entry, i) => (
            <li className="key__trail-item" key={i}>
              <span className="key__trail-number">{entry.coupletId}{entry.choice}</span>
              <span>{entry.text}</span>
            </li>
          ))}
        </ol>
      )}

      {activeCouplet && (
        <div className="key__couplet">
          <p className="key__question">{activeCouplet.id}. Choose one —</p>
          <button type="button" className="key__option" onClick={() => choose(activeCouplet, 'a')}>
            <span className="key__option-label">{activeCouplet.id}a</span>
            <span className="key__option-text">{activeCouplet.a.text}</span>
            <span className="key__option-goto">
              {typeof activeCouplet.a.goto === 'number' ? `→ ${activeCouplet.a.goto}` : activeCouplet.a.goto}
            </span>
          </button>
          <button type="button" className="key__option" onClick={() => choose(activeCouplet, 'b')}>
            <span className="key__option-label">{activeCouplet.id}b</span>
            <span className="key__option-text">{activeCouplet.b.text}</span>
            <span className="key__option-goto">
              {typeof activeCouplet.b.goto === 'number' ? `→ ${activeCouplet.b.goto}` : activeCouplet.b.goto}
            </span>
          </button>
        </div>
      )}

      {result && (
        <div className="key__result">
          <p className="key__result-label">Identified</p>
          <Link href={`/hooks/${result.id}`} className="key__result-card" style={categoryStyle(result.category)}>
            <h3 style={{ margin: 0 }}>{result.name}</h3>
            <p style={{ margin: '0.5rem 0 0' }}>{result.description}</p>
          </Link>
          <button type="button" className="key__restart" onClick={restart}>
            Start over
          </button>
        </div>
      )}
    </div>
  )
}
