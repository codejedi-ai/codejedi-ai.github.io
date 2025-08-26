"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  sub: string
  name?: string
  email?: string
  picture?: string
  email_verified?: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else if (response.status !== 401) {
          // Only set error if it's not just unauthenticated
          setError(new Error('Failed to fetch user'))
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useUser() {
  return useContext(AuthContext)
}
