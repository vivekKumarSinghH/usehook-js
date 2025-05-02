"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/documentation",
      },
      {
        title: "Migrate to v3",
        href: "/documentation/migrate-to-v3",
      },
    ],
  },
  {
    title: "Hooks",
    items: [
      { title: "useBoolean", href: "/documentation/hooks/use-boolean" },
      { title: "useClickAnyWhere", href: "/documentation/hooks/use-click-any-where" },
      { title: "useCopyToClipboard", href: "/documentation/hooks/use-copy-to-clipboard" },
      { title: "useCountdown", href: "/documentation/hooks/use-countdown" },
      { title: "useCounter", href: "/documentation/hooks/use-counter" },
      { title: "useDarkMode", href: "/documentation/hooks/use-dark-mode" },
      { title: "useDebounceCallback", href: "/documentation/hooks/use-debounce-callback" },
      { title: "useDebounceValue", href: "/documentation/hooks/use-debounce-value" },
      { title: "useDocumentTitle", href: "/documentation/hooks/use-document-title" },
      { title: "useEventCallback", href: "/documentation/hooks/use-event-callback" },
      { title: "useEventListener", href: "/documentation/hooks/use-event-listener" },
      { title: "useHover", href: "/documentation/hooks/use-hover" },
      { title: "useIntersectionObserver", href: "/documentation/hooks/use-intersection-observer" },
      { title: "useInterval", href: "/documentation/hooks/use-interval" },
      { title: "useIsClient", href: "/documentation/hooks/use-is-client" },
      { title: "useIsMounted", href: "/documentation/hooks/use-is-mounted" },
      { title: "useIsomorphicLayoutEffect", href: "/documentation/hooks/use-isomorphic-layout-effect" },
      { title: "useLocalStorage", href: "/documentation/hooks/use-local-storage" },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {sidebarItems.map((section, i) => (
        <div key={i} className="pb-8">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</h4>
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex w-full items-center rounded-md px-2 py-1 text-sm",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
