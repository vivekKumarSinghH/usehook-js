# Contributing to usehookify

Thanks for your interest in contributing! This guide covers everything you
need to get set up, run the same checks CI runs, and submit a change.

## Getting Started

This is a pnpm workspace monorepo (`packages/usehook-js` is the published
`usehookify` library, `apps/docs` is the documentation site). It requires the pnpm
version pinned in the root `package.json`'s `packageManager` field.

```bash
git clone https://github.com/vivekKumarSinghH/usehook-js.git
cd usehook-js
pnpm install
```

## Development Workflow

Before opening a pull request, run the same four checks CI runs, from the
repo root:

```bash
pnpm lint       # ESLint across both workspaces
pnpm typecheck  # tsc --noEmit across both workspaces
pnpm test       # Vitest, with an 85% coverage threshold
pnpm build      # tsup (library + CLI) and next build (docs)
```

All four must pass before a PR can merge. `pnpm typecheck` and `pnpm test`
both require `packages/usehook-js` to be built first if you're running them
in isolation (`pnpm --filter usehookify build`) — `apps/docs` resolves
`usehookify`'s types and registry through its built `dist/` output, not its
source directly.

To run the docs site locally: `pnpm --filter docs dev`.

## Adding a New Hook

This project's core differentiator is that every hook is authored once and
automatically becomes available via `npm install`, the CLI's `add` command,
and the docs site — with **zero** changes to any CLI or docs code. Adding a
hook means touching exactly these files:

1. `packages/usehook-js/src/hooks/<hookName>.ts` — the implementation, plus
   `<hookName>.test.ts` alongside it (tests are written first, TDD).
2. `packages/usehook-js/src/registry/hooks.ts` — add one `HookMetadata`
   entry: `id`, `name`, `description`, `category`, `sourceFile`, `params`,
   `returns`, and at least one `examples` entry.
3. `packages/usehook-js/src/registry/hooks.test.ts` — the registry's
   "contains a registered entry for every currently-implemented hook" test
   hardcodes the full id list; add your hook's id there too.
4. `packages/usehook-js/src/index.ts` — add one line:
   `export { <hookName> } from './hooks/<hookName>'`.
5. `packages/usehook-js/src/index.test.ts` — add one smoke-level test case
   proving the hook is reachable via the public entry point.

That's it — the CLI's `list`/`add` commands and the docs site's catalog and
per-hook pages all read from the registry generically. If you find yourself
editing anything under `src/cli/**`, `src/infra/**`, or `apps/docs/**` to
make a new hook show up, something has gone wrong — file an issue.

**The hooks package has a hard zero-runtime-dependency constraint.** A hook
may import from `react` and from other files within the package — nothing
else. CI enforces this automatically.

## Submitting Changes

This project uses [Changesets](https://github.com/changesets/changesets) to
manage versioning and changelogs. If your change touches
`packages/usehook-js`, run:

```bash
pnpm changeset
```

and follow the prompts (pick `usehookify`, choose a semver bump type, write
a one-line summary). Commit the generated `.changeset/*.md` file alongside
your change. Changes to `apps/docs` alone don't need a changeset — the docs
site isn't published as a package.

Open your pull request against `main`. CI must be green (lint, typecheck,
test, build, and the dependency/bundle-size gates) before it can merge.
