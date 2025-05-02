"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpenIcon, CodeIcon, GithubIcon, HomeIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon className="h-4 w-4 mr-3" />,
    },
    {
      title: "Documentation",
      href: "/docs",
      icon: <BookOpenIcon className="h-4 w-4 mr-3" />,
    },
    {
      title: "Hooks",
      href: "/hooks",
      icon: <CodeIcon className="h-4 w-4 mr-3" />,
    },
    {
      title: "GitHub",
      href: siteConfig.links.github,
      icon: <GithubIcon className="h-4 w-4 mr-3" />,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center mb-8">
          <Icons.logo className="mr-2 h-5 w-5" />
          <span className="font-bold">{siteConfig.name}</span>
        </div>
        <nav className="grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
