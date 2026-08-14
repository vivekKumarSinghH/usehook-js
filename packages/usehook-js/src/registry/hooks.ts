import type { HookMetadata } from './types'

export const hooks: HookMetadata[] = [
  {
    id: 'useLocalStorage',
    name: 'useLocalStorage',
    description: "Persist React state to the browser's localStorage, synced across re-renders.",
    category: 'storage',
    sourceFile: 'useLocalStorage.ts',
    params: [
      { name: 'key', type: 'string', description: 'The localStorage key to read/write.', required: true },
      {
        name: 'initialValue',
        type: 'T',
        description: 'Value used when nothing is stored yet, or on the server during SSR.',
        required: true,
      },
    ],
    returns: '[T, (value: T | ((prev: T) => T)) => void]',
    examples: [
      {
        title: 'Basic usage',
        code: "const [name, setName] = useLocalStorage('name', 'Anonymous')\n\nsetName('Ada')\nsetName((prev) => prev.toUpperCase())",
      },
    ],
  },
]
