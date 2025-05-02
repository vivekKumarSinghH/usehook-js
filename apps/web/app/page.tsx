// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        React Hooks Library
      </h1>
      <p className="mt-6 max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
        A collection of reusable React hooks for building modern web
        applications.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/docs/getting-started">Get Started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/hooks">
            Browse Hooks <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-bold">TypeScript Support</h3>
          <p className="mt-2 text-muted-foreground">
            Full TypeScript support with comprehensive type definitions.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-bold">Flexible Installation</h3>
          <p className="mt-2 text-muted-foreground">
            Install via CLI or use the npm package.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-bold">Framework Agnostic</h3>
          <p className="mt-2 text-muted-foreground">
            Works with any React-based framework.
          </p>
        </div>
      </div>
    </div>
  );
}
