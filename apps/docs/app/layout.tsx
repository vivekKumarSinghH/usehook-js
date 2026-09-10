import type { ReactNode } from 'react'
import { Source_Serif_4, Source_Code_Pro } from 'next/font/google'
import { NavLink } from '../components/ui/NavLink'
import './globals.css'

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

const mono = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata = {
  title: 'usehook-js',
  description:
    "A small, dependency-free React hooks library — install as a package or copy via CLI, same source either way.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        {/*
          THESIS: usehook-js docs are a field guide for identifying the
          right hook, not a generic OSS doc template or a marketing funnel.
          OWN-WORLD: herbarium-paper ground, deep forest-ink text, four
          rationed category accents — umber(storage), teal(network),
          plum(utility), ochre(state), one meaning each, never decorative;
          Source Serif 4 for prose, Source Code Pro for code/data; faint
          paper grain.
          STORY: a visitor answers a real identification key, lands on the
          matching hook, reads its specimen entry, copies working code.
          FIRST VIEWPORT: an interactive dichotomous key branches into the
          4 hooks above the fold — no hero banner, no install-command hero;
          the primary action is answering the key.
          FORM: Field Guide, direction 5 of 7 grounded candidates, seed key
          6ac0a413, raised by rationed color (Bauhaus) and paper grain (Riso).
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, DESIGN.md, and every shipping
          raster carrying its provenance.
        */}
        <header className="site-header">
          <div className="site-header__inner">
            <a href="/" className="brand">
              <span className="brand__mark">§</span> usehook-js
            </a>
            <nav>
              <ul className="site-nav">
                <li>
                  <NavLink href="/">home</NavLink>
                </li>
                <li>
                  <NavLink href="/hooks">docs</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <p className="site-footer__tagline">
              usehook-js — a small, dependency-free React hooks library.
            </p>
            <ul className="site-footer__links">
              <li>
                <a href="https://github.com/vivekKumarSinghH/usehook-js" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vivekKumarSinghH/usehook-js/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contributing
                </a>
              </li>
              <li>
                <a href="/hooks">Hooks</a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  )
}
