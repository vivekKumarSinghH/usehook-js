"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface TocProps {
  sections: {
    id: string
    title: string
  }[]
}

export function TableOfContents({ sections }: TocProps) {
  const pathname = usePathname()
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
  }, [sections, pathname])

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

export function DashboardTableOfContents({ toc }) {
  const [activeHeading, setActiveHeading] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const headings = document.querySelectorAll("h2[id], h3[id]")
    const headingIds = Array.from(headings).map((heading) => heading.id)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headingIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      headingIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [pathname])

  if (!toc?.length) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <ul className="m-0 list-none">
        {toc.map((item) => {
          return (
            <li key={item.url} className={cn("mt-0 pt-2", item.level === 3 && "pl-4")}>
              <a
                href={item.url}
                className={cn(
                  "inline-block no-underline transition-colors hover:text-foreground",
                  item.url === `#${activeHeading}` ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
