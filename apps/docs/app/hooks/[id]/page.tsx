import { notFound } from 'next/navigation'
import { generateCatalog, getHookById } from '../../../lib/generateCatalog'
import { getHookSource } from '../../../lib/getHookSource'
import { Badge } from '../../../components/ui/Badge'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Tabs } from '../../../components/ui/Tabs'
import { Callout } from '../../../components/ui/Callout'

export function generateStaticParams() {
  return generateCatalog().map((hook) => ({ id: hook.id }))
}

export default function HookDetailPage({ params }: { params: { id: string } }) {
  const hook = getHookById(params.id)
  if (!hook) {
    notFound()
  }

  return (
    <main>
      <h1>{hook.name}</h1>
      <Badge>{hook.category}</Badge>
      <p>{hook.description}</p>

      <Tabs
        tabs={[
          {
            label: 'npm install',
            content: (
              <>
                <CodeBlock code="npm install usehook-js" language="bash" />
                <CodeBlock code={`import { ${hook.name} } from 'usehook-js'`} language="ts" />
              </>
            ),
          },
          {
            label: 'CLI copy-paste',
            content: (
              <>
                <CodeBlock code={`npx usehook-js add ${hook.id}`} language="bash" />
                <CodeBlock
                  code={`import { ${hook.name} } from './hooks/${hook.id}'`}
                  language="ts"
                />
              </>
            ),
          },
        ]}
      />

      <h2>Source</h2>
      <CodeBlock code={getHookSource(hook)} language="ts" />

      <h2>Parameters</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {hook.params.map((param) => (
            <tr key={param.name}>
              <td>{param.name}</td>
              <td>{param.type}</td>
              <td>{param.required ? 'Yes' : 'No'}</td>
              <td>{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Returns</h2>
      <code>{hook.returns}</code>

      <h2>Examples</h2>
      {hook.examples.length === 0 ? (
        <Callout type="info">No usage example yet for this hook.</Callout>
      ) : (
        hook.examples.map((example) => (
          <div key={example.title}>
            <h3>{example.title}</h3>
            <CodeBlock code={example.code} language="ts" />
          </div>
        ))
      )}
    </main>
  )
}
