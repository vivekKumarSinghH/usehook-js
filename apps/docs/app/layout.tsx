import type { ReactNode } from 'react'

export const metadata = {
  title: 'usehook-js',
  description:
    "A small, dependency-free React hooks library — install as a package or copy via CLI, same source either way.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
