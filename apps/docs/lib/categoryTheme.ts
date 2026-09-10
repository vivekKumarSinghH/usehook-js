import type { CSSProperties } from 'react'

export interface CategoryTheme {
  label: string
  color: string
  soft: string
}

const THEMES: Record<string, CategoryTheme> = {
  storage: {
    label: 'Storage',
    color: 'var(--color-cat-storage)',
    soft: 'var(--color-cat-storage-soft)',
  },
  network: {
    label: 'Network',
    color: 'var(--color-cat-network)',
    soft: 'var(--color-cat-network-soft)',
  },
  utility: {
    label: 'Utility',
    color: 'var(--color-cat-utility)',
    soft: 'var(--color-cat-utility-soft)',
  },
  state: { label: 'State', color: 'var(--color-cat-state)', soft: 'var(--color-cat-state-soft)' },
}

const FALLBACK: CategoryTheme = {
  label: 'Other',
  color: 'var(--color-ink-faint)',
  soft: 'var(--color-border)',
}

export function getCategoryTheme(category: string): CategoryTheme {
  return THEMES[category] ?? FALLBACK
}

export function categoryStyle(category: string): CSSProperties {
  const theme = getCategoryTheme(category)
  return { '--cat-color': theme.color, '--cat-soft': theme.soft } as CSSProperties
}
