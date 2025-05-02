import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HookCardProps {
  hook: {
    name: string
    description: string
    category: string
    slug?: string
  }
  featured?: boolean
}

export function HookCard({ hook, featured = false }: HookCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md",
        featured && "border-primary/20",
      )}
    >
      <CardHeader className={cn("pb-3", featured && "bg-primary/5")}>
        <div className="flex items-center justify-between">
          <CardTitle className="font-bold text-xl">{hook.name}</CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            {hook.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <CardDescription className="text-sm leading-relaxed">{hook.description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-3 pb-4">
        <Link
          href={`/hooks/${hook.slug || hook.name.toLowerCase()}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}
        >
          View Details
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
