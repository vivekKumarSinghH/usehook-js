import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface DocsPagerProps {
  doc: {
    title: string
    slug: string
    prev?: { title: string; slug: string }
    next?: { title: string; slug: string }
  }
}

export function DocsPager({ doc }: DocsPagerProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      {doc.prev ? (
        <Link
          href={`/docs/${doc.prev.slug}`}
          className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          {doc.prev.title}
        </Link>
      ) : (
        <div />
      )}
      {doc.next ? (
        <Link
          href={`/docs/${doc.next.slug}`}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto w-full justify-end")}
        >
          {doc.next.title}
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
