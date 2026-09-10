# usehook-js

## 1.0.0

First public release.

### Hooks

- `useLocalStorage` — persist React state to the browser's `localStorage`, synced across re-renders; SSR-safe and tolerant of corrupt/foreign stored values.
- `useFetch` — fetch data from a URL with `data`/`error`/`loading` state and a manual `refetch`.
- `useDebounce` — return a debounced version of a rapidly-changing value.
- `useToggle` — manage a boolean value with a toggle function and an explicit setter.

### Distribution

- `npm install usehook-js` for the package, or `npx usehook-js add <hook>` to copy a hook's source directly into your project — both paths ship the exact same, byte-identical source.
- Zero runtime dependencies beyond `react` itself, enforced continuously in CI (source and built-bundle import scanning) rather than only claimed.
- The built library entry point is ~850 B brotli-compressed, checked against a 2 KB CI budget.

Going forward, releases are managed with [Changesets](https://github.com/changesets/changesets) — see `CONTRIBUTING.md` for the contribution and release workflow.
