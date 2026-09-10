import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { HookMetadata } from 'usehook-js/registry'

// apps/docs and packages/usehook-js are fixed siblings in this pnpm
// workspace. `next build`/`next dev` always run with cwd = the docs app's
// own root (apps/docs) — a stable Next.js guarantee — so resolving two
// levels up from cwd reaches the monorepo root reliably.
//
// A `createRequire(import.meta.url)` + `require.resolve('usehook-js/registry')`
// approach was tried first but failed a real build: webpack statically
// intercepts `require`/`require.resolve` syntax during bundling regardless
// of where the `require` binding actually came from, silently returning a
// numeric webpack module id instead of a real filesystem path.
export function getHookSource(hook: HookMetadata): string {
  const sourcePath = path.resolve(
    process.cwd(),
    '../../packages/usehook-js/src/hooks',
    hook.sourceFile
  )
  return readFileSync(sourcePath, 'utf-8')
}
