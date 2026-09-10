import { CopyButton } from './CopyButton'

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="code-block">
      <pre>
        <code data-language={language}>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}
