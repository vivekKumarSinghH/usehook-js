"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

interface HeroCodeProps {
  code: string
  language?: string
}

export function HeroCode({ code, language = "tsx" }: HeroCodeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative overflow-hidden rounded-lg border bg-zinc-950 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs font-medium text-zinc-400">{language}</span>
        <button
          className="flex items-center space-x-1 text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={copyToClipboard}
        >
          {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
