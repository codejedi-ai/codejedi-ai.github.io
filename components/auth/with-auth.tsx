"use client"

import { useUser } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { user, isLoading } = useUser()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/api/auth/login")
      }
    }, [user, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (!user) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
