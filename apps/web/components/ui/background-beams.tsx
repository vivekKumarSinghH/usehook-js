"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function BackgroundBeams({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const beamsRef = useRef<HTMLCanvasElement>(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const canvas = beamsRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      canvas.width = width
      canvas.height = height
      drawBeams(ctx, width, height)
    })

    resizeObserver.observe(canvas)

    const drawBeams = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = opacity

      const numBeams = 20
      const beamWidth = width / 8

      for (let i = 0; i < numBeams; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const angle = Math.random() * Math.PI * 2

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)

        const gradient = ctx.createLinearGradient(-beamWidth / 2, 0, beamWidth / 2, 0)
        gradient.addColorStop(0, "rgba(60, 120, 255, 0)")
        gradient.addColorStop(0.5, "rgba(60, 120, 255, 0.3)")
        gradient.addColorStop(1, "rgba(60, 120, 255, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(-beamWidth / 2, -height, beamWidth, height * 2)
        ctx.restore()
      }
    }

    // Animate the beams
    let animationFrame: number
    let lastTime = 0
    const animate = (time: number) => {
      if (time - lastTime > 50) {
        drawBeams(ctx, canvas.width, canvas.height)
        lastTime = time
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animate(0)

    // Fade in the beams
    const fadeIn = () => {
      setOpacity((prev) => {
        if (prev < 0.3) {
          return prev + 0.01
        }
        return prev
      })
    }

    const fadeInterval = setInterval(fadeIn, 50)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrame)
      clearInterval(fadeInterval)
    }
  }, [])

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
      <canvas ref={beamsRef} className="h-full w-full" />
    </div>
  )
}
