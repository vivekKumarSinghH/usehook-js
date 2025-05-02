"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleColor?: string
  particleDensity?: number
}

export function SparklesCore({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleColor = "#FFF",
  particleDensity = 100,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [particles, setParticles] = useState<any[]>([])
  const [animationFrame, setAnimationFrame] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      setContext(ctx)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
      setIsMouseMoving(true)

      // Reset the moving flag after a delay
      setTimeout(() => setIsMouseMoving(false), 200)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  useEffect(() => {
    if (!context) return

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth
        canvasRef.current.height = canvasRef.current.offsetHeight
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Create particles
    const particleCount = Math.min(
      Math.max(
        Math.floor(((canvasRef.current?.offsetWidth || 0) * (canvasRef.current?.offsetHeight || 0)) / 10000),
        50,
      ),
      particleDensity,
    )

    const newParticles = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * (canvasRef.current?.offsetWidth || 0),
        y: Math.random() * (canvasRef.current?.offsetHeight || 0),
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    setParticles(newParticles)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [context, minSize, maxSize, particleDensity])

  useEffect(() => {
    if (!context || particles.length === 0) return

    const animate = () => {
      if (!canvasRef.current) return

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      context.fillStyle = background
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      const updatedParticles = [...particles]

      for (let i = 0; i < updatedParticles.length; i++) {
        const particle = updatedParticles[i]

        // Apply mouse influence if mouse is moving
        if (isMouseMoving) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 500
            particle.speedX += Math.cos(angle) * force
            particle.speedY += Math.sin(angle) * force
          }
        }

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Dampen speed
        particle.speedX *= 0.99
        particle.speedY *= 0.99

        // Wrap around edges
        if (particle.x < 0) particle.x = canvasRef.current.width
        if (particle.x > canvasRef.current.width) particle.x = 0
        if (particle.y < 0) particle.y = canvasRef.current.height
        if (particle.y > canvasRef.current.height) particle.y = 0

        // Draw particle
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `${particleColor}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        context.fill()
      }

      setParticles(updatedParticles)
      setAnimationFrame(requestAnimationFrame(animate))
    }

    setAnimationFrame(requestAnimationFrame(animate))

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [context, particles, background, particleColor, isMouseMoving, mousePosition])

  return <canvas ref={canvasRef} id={id} className={cn("h-full w-full", className)} />
}
