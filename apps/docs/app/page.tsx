import Link from 'next/link'
import { generateCatalog } from '../lib/generateCatalog'
import { IdentificationKey } from '../components/ui/IdentificationKey'

export default function HomePage() {
  const hooks = generateCatalog()

  return (
    <main>
      <section className="hero">
        <h1>usehookify</h1>
        <p className="hero__lede">
          A small, dependency-free React hooks library. Install it as an npm package, or copy
          individual hooks straight into your project via the CLI — same maintained source
          either way.
        </p>
        <div className="hero__meta">
          <Link href="/hooks">browse all hooks →</Link>
          <a href="https://github.com/vivekKumarSinghH/usehook-js" target="_blank" rel="noreferrer">
            view source
          </a>
        </div>
      </section>

      <IdentificationKey hooks={hooks} />

      <section className="section">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <p className="step__number">1. Install or copy</p>
            <p className="step__label">Pick a hook, then get its source either way.</p>
            <code className="step__code">npx usehookify add useDebounce</code>
          </div>
          <div className="step">
            <p className="step__number">2. Import</p>
            <p className="step__label">Same import either way — same source underneath.</p>
            <code className="step__code">{"import { useDebounce } from 'usehookify'"}</code>
          </div>
          <div className="step">
            <p className="step__number">3. Use</p>
            <p className="step__label">A regular hook. No setup, no config.</p>
            <code className="step__code">const debounced = useDebounce(value, 300)</code>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Characteristics</h2>
        <ul className="traits">
          <li className="trait">
            <span className="trait__label">zero dependencies</span>
            <p className="trait__desc">
              Only <code>react</code> as a peer dependency — checked by a CI import scanner on
              every build, not just claimed in a README.
            </p>
          </li>
          <li className="trait">
            <span className="trait__label">two paths, one source</span>
            <p className="trait__desc">
              <code>npm install</code> or <code>npx usehookify add &lt;hook&gt;</code> — the CLI
              copy is verified byte-identical to what&apos;s published.
            </p>
          </li>
          <li className="trait">
            <span className="trait__label">fully typed</span>
            <p className="trait__desc">
              Every hook ships its own TypeScript types. No separate <code>@types</code> package.
            </p>
          </li>
          <li className="trait">
            <span className="trait__label">ssr-safe</span>
            <p className="trait__desc">
              Hooks that touch browser-only APIs (like <code>useLocalStorage</code>) guard for
              server rendering instead of crashing.
            </p>
          </li>
          <li className="trait">
            <span className="trait__label">~850 b, brotli</span>
            <p className="trait__desc">
              The entire library, checked against a 2 KB budget on every build.
            </p>
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Open source</h2>
        <p>
          usehookify is developed in the open. Read the source, open an issue, or send a pull
          request — the CONTRIBUTING guide covers the full workflow, including how to add a new
          hook. The package is pre-release and not yet published to npm.
        </p>
        <div className="oss-links">
          <a href="https://github.com/vivekKumarSinghH/usehook-js" target="_blank" rel="noreferrer">
            view on GitHub
          </a>
          <a
            href="https://github.com/vivekKumarSinghH/usehook-js/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
          >
            read CONTRIBUTING.md
          </a>
        </div>
      </section>
    </main>
  )
}
