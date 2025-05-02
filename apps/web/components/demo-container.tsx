import type React from "react"
import { cn } from "@/lib/utils"

interface DemoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DemoContainer({ children, className, ...props }: DemoContainerProps) {
  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2 rounded-md border bg-card p-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}
