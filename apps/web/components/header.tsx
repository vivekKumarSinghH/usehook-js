// components/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="font-bold text-xl mr-6">
          React Hooks
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href="/hooks"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/hooks")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Hooks
          </Link>
          <Link
            href="/docs"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/docs")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Documentation
          </Link>
          <Link
            href="https://github.com/yourusername/react-hooks-library"
            className="text-foreground/60 hover:text-foreground/80 transition-colors"
            target="_blank"
          >
            GitHub
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
