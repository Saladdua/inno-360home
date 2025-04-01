"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { isSessionInactive, isSessionAboutToTimeout, updateLastActivity, INACTIVITY_TIMEOUT } from "@/lib/token-service"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SessionTimeout() {
  const { logout } = useAuth()
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  // Function to handle user activity
  const handleUserActivity = () => {
    updateLastActivity()
  }

  // Function to format time remaining
  const formatTimeRemaining = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Effect to set up activity listeners
  useEffect(() => {
    // Add event listeners for user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity)
    })

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity)
      })
    }
  }, [])

  // Effect to check for session timeout
  useEffect(() => {
    const checkSessionTimeout = () => {
      if (isSessionInactive()) {
        // Session has timed out, log the user out
        logout()
        setShowWarning(false)
      } else if (isSessionAboutToTimeout()) {
        // Session is about to timeout, show warning
        setShowWarning(true)

        // Calculate time left
        const lastActivity = Number.parseInt(localStorage.getItem("lastActivity") || "0", 10)
        const timeRemaining = INACTIVITY_TIMEOUT - (Date.now() - lastActivity)
        setTimeLeft(timeRemaining)
      } else {
        // Session is active, hide warning
        setShowWarning(false)
      }
    }

    // Check immediately
    checkSessionTimeout()

    // Set up interval to check regularly
    const intervalId = setInterval(checkSessionTimeout, 10000) // Check every 10 seconds

    // Set up interval to update countdown timer if warning is shown
    const countdownId = setInterval(() => {
      if (showWarning) {
        const lastActivity = Number.parseInt(localStorage.getItem("lastActivity") || "0", 10)
        const timeRemaining = INACTIVITY_TIMEOUT - (Date.now() - lastActivity)
        setTimeLeft(timeRemaining > 0 ? timeRemaining : 0)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
      clearInterval(countdownId)
    }
  }, [logout, showWarning])

  // Function to extend session
  const extendSession = () => {
    updateLastActivity()
    setShowWarning(false)
  }

  return (
    <AlertDialog open={showWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Timeout Warning</AlertDialogTitle>
          <AlertDialogDescription>
            Your session will expire in {formatTimeRemaining(timeLeft)} due to inactivity. Do you want to continue your
            session?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={extendSession}>Continue Session</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

