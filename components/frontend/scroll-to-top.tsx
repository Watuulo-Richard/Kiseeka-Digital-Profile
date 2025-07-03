"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate if user is near the bottom of the page
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show when user is within 200px of the bottom
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 200

      setIsVisible(isNearBottom)
    }

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility)

    // Check initial position
    toggleVisibility()

    // Cleanup
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-10 right-10 z-50 js-only">
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUpCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
