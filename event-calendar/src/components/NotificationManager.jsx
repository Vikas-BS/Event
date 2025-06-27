"use client"

import { useEffect } from "react"

export default function NotificationManager({ events, enabled }) {
  useEffect(() => {
    if (!enabled || !("Notification" in window)) return

    // Request notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission()
    }

    const checkUpcomingEvents = () => {
      const now = new Date()
      const in15Minutes = new Date(now.getTime() + 15 * 60 * 1000)

      events.forEach((event) => {
        if (event.completed) return

        const eventDateTime = new Date(`${event.date}T${event.time || "00:00"}`)

        // Notify 15 minutes before event
        if (eventDateTime > now && eventDateTime <= in15Minutes) {
          if (Notification.permission === "granted") {
            new Notification(`Upcoming Event: ${event.title}`, {
              body: `Starting ${event.time ? `at ${event.time}` : "soon"}`,
              icon: "/favicon.ico",
              tag: event.id, // Prevent duplicate notifications
            })
          }
        }
      })
    }

    // Check every minute
    const interval = setInterval(checkUpcomingEvents, 60000)

    return () => clearInterval(interval)
  }, [events, enabled])

  return null // This component doesn't render anything
}
