# usehookify

[![CI](https://github.com/vivekKumarSinghH/usehook-js/actions/workflows/ci.yml/badge.svg)](https://github.com/vivekKumarSinghH/usehook-js/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/usehookify.svg)](https://www.npmjs.com/package/usehookify)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A small, dependency-free React hooks library you can install as an npm
package or copy directly into your project via a CLI — same maintained
source either way.

> Published as **`usehookify`** on npm (the repo is still `usehook-js` —
> npm's registry flagged the original package name as too similar to an
> existing popular package).

## Hooks

| Hook | Category | Description |
|---|---|---|
| `useLocalStorage` | storage | Persist React state to the browser's localStorage, synced across re-renders. |
| `useFetch` | network | Fetch data from a URL with loading/error state and a manual refetch. |
| `useDebounce` | utility | Return a debounced version of a rapidly-changing value. |
| `useToggle` | state | Manage a boolean value with a toggle function and an explicit setter. |

Full API reference, parameters, and usage examples for every hook are on the
[docs site](https://github.com/vivekKumarSinghH/usehook-js/tree/main/apps/docs).

## Install

```bash
npm install usehookify
```

```ts
import { useLocalStorage } from 'usehookify'
```

## Or copy it directly — same source, no dependency

```bash
npx usehookify add useDebounce
```

```ts
import { useDebounce } from './hooks/useDebounce'
```

Both paths ship the exact same, byte-identical source — the CLI copy is
never a stale fork of what's published to npm.

## CLI

See every hook currently available:

```bash
npx usehookify list
```

```
useLocalStorage	useLocalStorage	storage	Persist React state to the browser's localStorage, synced across re-renders.
useFetch	useFetch	network	Fetch data from a URL with loading/error state and a manual refetch.
useDebounce	useDebounce	utility	Return a debounced version of a rapidly-changing value.
useToggle	useToggle	state	Manage a boolean value with a toggle function and an explicit setter.
```

## Why usehookify

- **Zero runtime dependencies** — only `react` as a peer dependency, checked by a CI import scanner on every build, not just claimed here.
- **~850 B, brotli** — the entire library, checked against a 2 KB budget on every build.
- **Fully typed** — every hook ships its own TypeScript types.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow, including
how to add a new hook and the changeset-based release process.

## License

[MIT](LICENSE)
