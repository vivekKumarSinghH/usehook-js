"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // You can add your analytics tracking code here
      // Example for Google Analytics:
      // window.gtag("config", "GA-MEASUREMENT-ID", {
      //   page_path: pathname + searchParams.toString(),
      // })
    }
  }, [pathname, searchParams])

  return null
}
