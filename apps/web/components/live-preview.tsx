"use client"

import * as React from "react"
import * as hookImplementations from "@workspace/hooks"

interface LivePreviewProps {
  hook: string
  example?: string
}

export function LivePreview({ hook, example }: LivePreviewProps) {
  // This component renders a live example of the hook in action

  // For useLocalStorage example
  if (hook === "useLocalStorage") {
    const [value, setValue] = hookImplementations.useLocalStorage("example-key", "Initial value")
    const [storedValue, setStoredValue] = React.useState<string | null>(value)

    React.useEffect(() => {
      setStoredValue(value)
    }, [value])

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Stored Value:</label>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <p className="text-sm text-muted-foreground">Try refreshing the page - the value will persist!</p>
      </div>
    )
  }

  // For useMediaQuery example
  if (hook === "useMediaQuery") {
    const isMobile = hookImplementations.useMediaQuery("(max-width: 768px)")
    const isTablet = hookImplementations.useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
    const isDesktop = hookImplementations.useMediaQuery("(min-width: 1025px)")

    return (
      <div className="space-y-2">
        <p className="text-sm font-medium">Current viewport:</p>
        <div className="space-y-2">
          <div className={`p-2 rounded ${isMobile ? "bg-green-100 dark:bg-green-900" : "bg-muted"}`}>
            Mobile {isMobile ? "✓" : ""}
          </div>
          <div className={`p-2 rounded ${isTablet ? "bg-green-100 dark:bg-green-900" : "bg-muted"}`}>
            Tablet {isTablet ? "✓" : ""}
          </div>
          <div className={`p-2 rounded ${isDesktop ? "bg-green-100 dark:bg-green-900" : "bg-muted"}`}>
            Desktop {isDesktop ? "✓" : ""}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Resize your browser window to see changes</p>
      </div>
    )
  }

  // For useDarkMode example
  if (hook === "useDarkMode") {
    const [isDarkMode, toggleDarkMode] = hookImplementations.useDarkMode()

    return (
      <div className="space-y-4">
        <p className="text-sm font-medium">Current theme: {isDarkMode ? "Dark" : "Light"}</p>
        <button onClick={toggleDarkMode} className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Toggle Dark Mode
        </button>
      </div>
    )
  }

  // Add more examples for other hooks

  return (
    <div className="p-4 border rounded-md bg-muted">
      <p>No live example available for this hook.</p>
    </div>
  )
}
