"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface DocPageNavProps {
  sections: { id: string; title: string }[]
}

export function DocPageNav({ sections }: DocPageNavProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [sections])

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <ul className="m-0 list-none">
        {sections.map(({ id, title }) => (
          <li key={id} className="mt-0 pt-2">
            <a
              href={`#${id}`}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                activeSection === id ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
