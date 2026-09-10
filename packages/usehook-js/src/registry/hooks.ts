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
  {
    id: 'useFetch',
    name: 'useFetch',
    description: 'Fetch data from a URL with loading/error state and a manual refetch.',
    category: 'network',
    sourceFile: 'useFetch.ts',
    params: [
      { name: 'url', type: 'string', description: 'The URL to fetch.', required: true },
      {
        name: 'options',
        type: 'RequestInit',
        description: 'Standard fetch options (headers, method, body, etc.).',
        required: false,
      },
    ],
    returns: '{ data: T | null, error: Error | null, loading: boolean, refetch: () => void }',
    examples: [
      {
        title: 'Basic usage',
        code: "const { data, error, loading, refetch } = useFetch<Post[]>('/api/posts')\n\nif (loading) return <Spinner />\nif (error) return <ErrorBanner message={error.message} onRetry={refetch} />\nreturn <PostList posts={data} />",
      },
    ],
  },
  {
    id: 'useDebounce',
    name: 'useDebounce',
    description: 'Return a debounced version of a rapidly-changing value.',
    category: 'utility',
    sourceFile: 'useDebounce.ts',
    params: [
      { name: 'value', type: 'T', description: 'The value to debounce.', required: true },
      { name: 'delayMs', type: 'number', description: 'Delay in milliseconds.', required: true },
    ],
    returns: 'T',
    examples: [
      {
        title: 'Debounced search input',
        code: "const [query, setQuery] = useState('')\nconst debouncedQuery = useDebounce(query, 300)\n\n// debouncedQuery only updates 300ms after the user stops typing",
      },
    ],
  },
  {
    id: 'useToggle',
    name: 'useToggle',
    description: 'Manage a boolean value with a toggle function and an explicit setter.',
    category: 'state',
    sourceFile: 'useToggle.ts',
    params: [
      {
        name: 'initial',
        type: 'boolean',
        description: 'Starting value. Defaults to false.',
        required: false,
      },
    ],
    returns: '[boolean, () => void, (value: boolean) => void]',
    examples: [
      {
        title: 'Modal open/close state',
        code: 'const [isOpen, toggleOpen, setOpen] = useToggle(false)\n\n// flip on button click:\ntoggleOpen()\n\n// force closed, e.g. from an "X" button — never toggles back open:\nsetOpen(false)',
      },
    ],
  },
]
