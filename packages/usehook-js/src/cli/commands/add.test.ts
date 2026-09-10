import { describe, it, expect, vi, afterEach } from 'vitest'
import { mkdtempSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { Command } from 'commander'
import { resolveHook, runAdd, registerAddCommand } from './add'
import { getHooksSourceDir } from '../../infra/fileWriter'
import { hooks } from '../../registry/hooks'
import { InvalidHookIdError, TargetExistsError } from '../errors'

describe('resolveHook', () => {
  it('throws InvalidHookIdError listing every real registry id for an unknown id', () => {
    expect(() => resolveHook('notARealHook')).toThrow(InvalidHookIdError)
    try {
      resolveHook('notARealHook')
    } catch (err) {
      expect((err as InvalidHookIdError).validIds).toEqual(hooks.map((h) => h.id))
    }
  })
})

describe('runAdd', () => {
  let tempDir: string
  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true })
  })

  it('copies the real hook file byte-identically and returns a valid import line (BR-6 gate)', () => {
    tempDir = mkdtempSync(path.join(tmpdir(), 'usehook-js-'))
    const targetDir = path.join(tempDir, 'hooks')

    const { writtenPath, importLine } = runAdd('useLocalStorage', { path: targetDir })

    const original = readFileSync(path.join(getHooksSourceDir(), 'useLocalStorage.ts'))
    expect(readFileSync(writtenPath)).toEqual(original)
    expect(importLine).toContain('useLocalStorage')
  })

  it('throws TargetExistsError on a repeat call without force', () => {
    tempDir = mkdtempSync(path.join(tmpdir(), 'usehook-js-'))
    const targetDir = path.join(tempDir, 'hooks')
    runAdd('useLocalStorage', { path: targetDir })
    expect(() => runAdd('useLocalStorage', { path: targetDir })).toThrow(TargetExistsError)
  })
})

describe('registerAddCommand', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('prints an Error to stderr and exits 1 for an unknown hook id', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    const program = new Command()
    registerAddCommand(program)

    program.parse(['node', 'usehook-js', 'add', 'notARealHook'])

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Unknown hook'))
    expect(exitSpy).toHaveBeenCalledWith(1)
  })

  it('prints the copied path and import line on success', () => {
    const tempDir = mkdtempSync(path.join(tmpdir(), 'usehook-js-'))
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const program = new Command()
    registerAddCommand(program)

    program.parse(['node', 'usehook-js', 'add', 'useLocalStorage', '--path', tempDir])

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(tempDir))
    rmSync(tempDir, { recursive: true, force: true })
  })
})
