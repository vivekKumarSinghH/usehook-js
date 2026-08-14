import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1>usehook-js</h1>
      <p>
        A small, dependency-free React hooks library. Install it as an npm
        package, or copy individual hooks into your project via the CLI —
        same maintained source either way.
      </p>
      <p>
        <Link href="/hooks">Browse the hook catalog →</Link>
      </p>
    </main>
  )
}
