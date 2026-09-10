# usehook-js

[![npm version](https://img.shields.io/npm/v/usehook-js.svg)](https://www.npmjs.com/package/usehook-js)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/vivekKumarSinghH/usehook-js/blob/main/LICENSE)

A small, dependency-free React hooks library you can install as an npm
package or copy directly into your project via a CLI — same maintained
source either way.

## Hooks

| Hook | Category | Description |
|---|---|---|
| `useLocalStorage` | storage | Persist React state to the browser's localStorage, synced across re-renders. |
| `useFetch` | network | Fetch data from a URL with loading/error state and a manual refetch. |
| `useDebounce` | utility | Return a debounced version of a rapidly-changing value. |
| `useToggle` | state | Manage a boolean value with a toggle function and an explicit setter. |

## Install

```bash
npm install usehook-js
```

```ts
import { useLocalStorage } from 'usehook-js'
```

## Or copy it directly — same source, no dependency

```bash
npx usehook-js add useDebounce
```

```ts
import { useDebounce } from './hooks/useDebounce'
```

Both paths ship the exact same, byte-identical source.

## CLI

```bash
npx usehook-js list
```

## Documentation

Full API reference, parameters, and usage examples:
[github.com/vivekKumarSinghH/usehook-js](https://github.com/vivekKumarSinghH/usehook-js)

## License

MIT © Vivek Kumar
