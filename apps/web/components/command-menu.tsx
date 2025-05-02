"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// Sample hooks data
const hooks = [
  { name: "useBoolean", href: "/documentation/hooks/use-boolean" },
  { name: "useClickAnyWhere", href: "/documentation/hooks/use-click-any-where" },
  { name: "useCopyToClipboard", href: "/documentation/hooks/use-copy-to-clipboard" },
  { name: "useCountdown", href: "/documentation/hooks/use-countdown" },
  { name: "useCounter", href: "/documentation/hooks/use-counter" },
  { name: "useDarkMode", href: "/documentation/hooks/use-dark-mode" },
  { name: "useDebounceCallback", href: "/documentation/hooks/use-debounce-callback" },
  { name: "useDebounceValue", href: "/documentation/hooks/use-debounce-value" },
  { name: "useDocumentTitle", href: "/documentation/hooks/use-document-title" },
  { name: "useEventCallback", href: "/documentation/hooks/use-event-callback" },
  { name: "useEventListener", href: "/documentation/hooks/use-event-listener" },
  { name: "useHover", href: "/documentation/hooks/use-hover" },
  { name: "useIntersectionObserver", href: "/documentation/hooks/use-intersection-observer" },
  { name: "useInterval", href: "/documentation/hooks/use-interval" },
  { name: "useIsClient", href: "/documentation/hooks/use-is-client" },
  { name: "useIsMounted", href: "/documentation/hooks/use-is-mounted" },
  { name: "useIsomorphicLayoutEffect", href: "/documentation/hooks/use-isomorphic-layout-effect" },
  { name: "useLocalStorage", href: "/documentation/hooks/use-local-storage" },
]

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Quick search...</span>
        <span className="sr-only">Search hooks</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search hooks..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Hooks">
            {hooks.map((hook) => (
              <CommandItem
                key={hook.name}
                onSelect={() => {
                  router.push(hook.href)
                  setOpen(false)
                }}
              >
                {hook.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
