"use client"

import { useEffect } from "react"

export function DebugEvents() {
  useEffect(() => {
    const debugClickEvents = (e) => {
      const target = e.target
      const tagName = target.tagName
      const className = target.className
      const id = target.id

      console.log("Click event:", {
        tagName,
        className,
        id,
        target,
      })
    }

    document.addEventListener("click", debugClickEvents)

    return () => {
      document.removeEventListener("click", debugClickEvents)
    }
  }, [])

  return null
}

