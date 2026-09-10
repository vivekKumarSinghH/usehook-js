import { describe, expect, it } from 'vitest'
import { categoryStyle, getCategoryTheme } from './categoryTheme'

describe('getCategoryTheme', () => {
  it('returns the known theme for each registry category', () => {
    expect(getCategoryTheme('storage').label).toBe('Storage')
    expect(getCategoryTheme('network').label).toBe('Network')
    expect(getCategoryTheme('utility').label).toBe('Utility')
    expect(getCategoryTheme('state').label).toBe('State')
  })

  it('falls back to a generic theme for an unknown category', () => {
    const theme = getCategoryTheme('unknown-category')
    expect(theme.label).toBe('Other')
  })
})

describe('categoryStyle', () => {
  it('exposes the theme color as CSS custom properties', () => {
    const style = categoryStyle('network') as Record<string, string>
    expect(style['--cat-color']).toBe(getCategoryTheme('network').color)
    expect(style['--cat-soft']).toBe(getCategoryTheme('network').soft)
  })
})
