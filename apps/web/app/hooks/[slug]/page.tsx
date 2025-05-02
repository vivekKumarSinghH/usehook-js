// app/hooks/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

// Temporary mock data - replace with actual hooks data later
const hooks = [
  {
    slug: "use-local-storage",
    name: "useLocalStorage",
    description:
      "React hook for accessing localStorage with state synchronization",
    category: "Storage",
    usage: `import { useLocalStorage } from '@workspace/hooks';

function MyComponent() {
  const [value, setValue] = useLocalStorage('my-key', 'initial value');
  
  return (
    <div>
      <p>Stored value: {value}</p>
      <button onClick={() => setValue('new value')}>Update value</button>
    </div>
  );
}`,
    parameters: [
      {
        name: "key",
        type: "string",
        description: "localStorage key to manage",
      },
      {
        name: "initialValue",
        type: "T",
        description:
          "Initial value to use if no value is found in localStorage",
      },
    ],
    returns: {
      type: "[T, (value: T) => void]",
      description: "A stateful value and a function to update it",
    },
  },
  {
    slug: "use-media-query",
    name: "useMediaQuery",
    description: "React hook for responding to CSS media queries",
    category: "UI",
    usage: `import { useMediaQuery } from '@workspace/hooks';

function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div>
      {isMobile ? 'Mobile view' : 'Desktop view'}
    </div>
  );
}`,
    parameters: [
      {
        name: "query",
        type: "string",
        description: "CSS media query to match against",
      },
    ],
    returns: {
      type: "boolean",
      description: "True if the media query matches, false otherwise",
    },
  },
  {
    slug: "use-debounce",
    name: "useDebounce",
    description: "React hook for debouncing values or functions",
    category: "Performance",
    usage: `import { useDebounce } from '@workspace/hooks';

function MyComponent() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  
  // Effect only runs when debouncedValue changes
  useEffect(() => {
    // Do something with the debounced value
    console.log(debouncedValue);
  }, [debouncedValue]);
  
  return (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Type something..."
    />
  );
}`,
    parameters: [
      { name: "value", type: "T", description: "Value to debounce" },
      {
        name: "delay",
        type: "number",
        description: "Delay in milliseconds",
        default: "500",
      },
    ],
    returns: { type: "T", description: "The debounced value" },
  },
];

export default function HookPage({ params }: { params: { slug: string } }) {
  const hook = hooks.find((h) => h.slug === params.slug);

  if (!hook) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/hooks">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to hooks
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold">{hook.name}</h1>
      <p className="text-muted-foreground mt-2 mb-6">{hook.description}</p>

      <div className="inline-block rounded-md bg-muted px-3 py-1 text-sm mb-8">
        Category: {hook.category}
      </div>

      <Tabs defaultValue="usage" className="mt-6">
        <TabsList>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>
        <TabsContent value="usage" className="mt-4">
          <div className="rounded-md bg-black p-4 overflow-x-auto">
            <pre className="text-white text-sm">
              <code>{hook.usage}</code>
            </pre>
          </div>
        </TabsContent>
        <TabsContent value="api" className="mt-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Parameters</h3>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {hook.parameters.map((param, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 text-sm font-medium">
                          {param.name}
                        </td>
                        <td className="px-4 py-2 text-sm font-mono">
                          {param.type}
                        </td>
                        <td className="px-4 py-2 text-sm font-mono">
                          {param.default || "-"}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {param.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Returns</h3>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm font-mono">
                        {hook.returns.type}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {hook.returns.description}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
