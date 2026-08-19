# usehook-js

[![CI](https://github.com/vivekKumarSinghH/usehook-js/actions/workflows/ci.yml/badge.svg)](https://github.com/vivekKumarSinghH/usehook-js/actions/workflows/ci.yml)

A small, dependency-free React hooks library you can install as an npm
package or copy directly into your project via a CLI — same maintained
source either way.

## Status

Pre-release, under active development. One hook is implemented today:
`useLocalStorage`. The remaining MVP hooks (`useFetch`, `useDebounce`,
`useToggle`) and the CLI's `add` command are still in progress.

## Install

```bash
npm install usehook-js
```

> Not yet published to the npm registry — this works once the first
> release ships.

```ts
import { useLocalStorage } from 'usehook-js'
```

## CLI

See every hook currently available in the package:

```bash
npx usehook-js list
```

```
useLocalStorage	useLocalStorage	storage	Persist React state to the browser's localStorage, synced across re-renders.
```
