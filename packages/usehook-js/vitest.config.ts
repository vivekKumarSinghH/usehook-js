import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      // Scope to source only — without `include`, v8 also scans config files,
      // dist/ build output, and test files themselves, diluting the percentage.
      include: ['src/**/*.{ts,tsx}'],
      // types.ts is pure type declarations — erases to nothing at runtime, so
      // v8 can never credit it. registry/index.ts is a pure re-export barrel
      // (`export * from './types'; export * from './hooks'`) with nothing to
      // branch on — only consumed by apps/docs, never imported by this
      // package's own tests. index.ts is no longer excluded: Story 2.4 gave
      // it a real export (useLocalStorage) and index.test.ts covers it.
      // cli/bin.ts is a thin commander-wiring entry point with no branching
      // logic of its own — proven by the manual CLI run in Story 1.2, not a
      // unit test.
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/registry/types.ts',
        'src/registry/index.ts',
        'src/cli/bin.ts',
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
  },
})
