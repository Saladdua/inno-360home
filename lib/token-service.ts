// Token expiration time in milliseconds (default: 1 hour)
export const TOKEN_EXPIRY = 60 * 60 * 1000

// Inactivity timeout in milliseconds (default: 30 minutes)
export const INACTIVITY_TIMEOUT = 30 * 60 * 1000

// Warning before timeout in milliseconds (default: 1 minute)
export const WARNING_BEFORE_TIMEOUT = 60 * 1000

// Store token in localStorage
export const setToken = (token: string, expiresAt: number) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token)
    localStorage.setItem("tokenExpiresAt", expiresAt.toString())
  }
}

// Get token from localStorage
export const getToken = (): { token: string | null; expiresAt: number } => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken")
    const expiresAtStr = localStorage.getItem("tokenExpiresAt")
    const expiresAt = expiresAtStr ? Number.parseInt(expiresAtStr, 10) : 0
    return { token, expiresAt }
  }
  return { token: null, expiresAt: 0 }
}

// Remove token from localStorage
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken")
    localStorage.removeItem("tokenExpiresAt")
  }
}

// Check if token is expired
export const isTokenExpired = (): boolean => {
  const { expiresAt } = getToken()
  return Date.now() >= expiresAt
}

// Store last activity timestamp
export const updateLastActivity = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lastActivity", Date.now().toString())
  }
}

// Get last activity timestamp
export const getLastActivity = (): number => {
  if (typeof window !== "undefined") {
    const lastActivity = localStorage.getItem("lastActivity")
    return lastActivity ? Number.parseInt(lastActivity, 10) : Date.now()
  }
  return Date.now()
}

// Check if session is inactive
export const isSessionInactive = (): boolean => {
  const lastActivity = getLastActivity()
  return Date.now() - lastActivity >= INACTIVITY_TIMEOUT
}

// Check if session is about to timeout
export const isSessionAboutToTimeout = (): boolean => {
  const lastActivity = getLastActivity()
  const timeElapsed = Date.now() - lastActivity
  return timeElapsed >= INACTIVITY_TIMEOUT - WARNING_BEFORE_TIMEOUT && timeElapsed < INACTIVITY_TIMEOUT
}

