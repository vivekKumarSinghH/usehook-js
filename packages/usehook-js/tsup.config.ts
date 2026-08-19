import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
  },
  {
    entry: { 'cli/bin': 'src/cli/bin.ts' },
    format: ['esm'],
    dts: false,
    clean: false,
    banner: { js: '#!/usr/bin/env node' },
  },
  {
    entry: { 'registry/index': 'src/registry/index.ts' },
    format: ['esm'],
    dts: true,
    clean: false,
  },
])
