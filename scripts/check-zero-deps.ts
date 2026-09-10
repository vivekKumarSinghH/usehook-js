import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const SRC_DIRS = ['packages/usehook-js/src/hooks', 'packages/usehook-js/src/registry']
const BUNDLE_PATH = 'packages/usehook-js/dist/index.js'
const ALLOWED_MODULES = new Set(['react'])
const IMPORT_RE = /^import\s+(?:type\s+)?[\s\S]*?\s+from\s+['"]([^'"]+)['"]/gm

function isRelative(spec: string): boolean {
  return spec.startsWith('.') || spec.startsWith('/')
}

function collectTsFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return collectTsFiles(fullPath)
    return entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts') ? [fullPath] : []
  })
}

function findViolations(content: string, label: string): string[] {
  const violations: string[] = []
  let match: RegExpExecArray | null
  const re = new RegExp(IMPORT_RE)
  while ((match = re.exec(content))) {
    const spec = match[1]
    if (isRelative(spec) || ALLOWED_MODULES.has(spec)) continue
    violations.push(`${label}: forbidden runtime dependency import "${spec}"`)
  }
  return violations
}

const sourceViolations = SRC_DIRS.flatMap((dir) =>
  collectTsFiles(dir).flatMap((file) => findViolations(readFileSync(file, 'utf-8'), file))
)

const bundleContent = readFileSync(BUNDLE_PATH, 'utf-8')
const bundleViolations = findViolations(bundleContent, BUNDLE_PATH)

const allViolations = [...sourceViolations, ...bundleViolations]

if (allViolations.length > 0) {
  console.error('❌ Zero-dependency check failed:\n' + allViolations.join('\n'))
  process.exit(1)
}

console.log(
  '✅ Zero-dependency check passed — src/hooks/**, src/registry/**, and the built dist/index.js import nothing beyond React and relative modules.'
)
