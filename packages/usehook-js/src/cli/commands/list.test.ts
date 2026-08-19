import { describe, it, expect, vi, afterEach } from 'vitest'
import { Command } from 'commander'
import { printHookList, registerListCommand } from './list'
import { hooks } from '../../registry/hooks'
import type { HookMetadata } from '../../registry/types'

// Asserts against the REAL registry dynamically rather than hardcoding its
// current contents — the registry gains an entry in every future hook story
// (2.1, 3.1, 4.1, 5.1), so a hardcoded expectation here would break on each
// one, the same way the Epic-1-baseline assumption broke in Story 2.1.
function expectPrintedRealRegistry(logSpy: ReturnType<typeof vi.spyOn>): void {
  if (hooks.length === 0) {
    expect(logSpy).toHaveBeenCalledWith('No hooks available yet.')
    return
  }
  expect(logSpy).toHaveBeenCalledTimes(hooks.length)
  for (const hook of hooks) {
    expect(logSpy).toHaveBeenCalledWith(
      `${hook.id}\t${hook.name}\t${hook.category}\t${hook.description}`
    )
  }
}

describe('printHookList', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('prints "No hooks available yet." when given an empty list', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    printHookList([])
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith('No hooks available yet.')
  })

  it('prints one line per hook with id, name, category, description', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const sample: HookMetadata[] = [
      {
        id: 'useLocalStorage',
        name: 'useLocalStorage',
        description: 'Persist state to localStorage',
        category: 'storage',
        sourceFile: 'useLocalStorage.ts',
        params: [],
        returns: '',
        examples: [],
      },
    ]
    printHookList(sample)
    expect(logSpy).toHaveBeenCalledWith(
      'useLocalStorage\tuseLocalStorage\tstorage\tPersist state to localStorage'
    )
  })

  it('defaults to the real registry when called with no argument', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    printHookList()
    expectPrintedRealRegistry(logSpy)
  })
})

describe('registerListCommand', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('wires "list" so commander dispatches to printHookList on parse', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const program = new Command()
    registerListCommand(program)
    program.parse(['node', 'usehook-js', 'list'])
    expectPrintedRealRegistry(logSpy)
  })
})
