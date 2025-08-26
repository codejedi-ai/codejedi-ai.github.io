"use client"

import { useUser } from "@/contexts/auth-context"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, User, Calendar, LogOut, Settings, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const { user } = useUser()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Fetch user data from protected API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/protected/user-data')
        if (response.ok) {
          const result = await response.json()
          setUserData(result.data)
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const updatePreferences = async (preferences: any) => {
    setUpdating(true)
    try {
      const response = await fetch('/api/protected/user-data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      })

      if (response.ok) {
        const result = await response.json()
        setUserData((prev: any) => ({
          ...prev,
          profile: {
            ...prev.profile,
            preferences: preferences
          }
        }))
        console.log('Preferences updated:', result)
      }
    } catch (error) {
      console.error('Error updating preferences:', error)
    } finally {
      setUpdating(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
            <p className="text-gray-600">Unable to load user information. Please try signing in again.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    {user?.picture ? (
                      <img 
                        src={user?.picture} 
                        alt={user.name || "Profile"} 
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{user?.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{user?.email}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-lg">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-lg">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Member Since</label>
                      <p className="text-lg">{userData?.profile?.stats?.memberSince ? new Date(userData.profile.stats.memberSince).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email Verified</label>
                      <div className="mt-1">
                        <Badge variant={user?.email_verified ? "default" : "destructive"}>
                          {user?.email_verified ? "Verified" : "Not Verified"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                {userData?.profile?.addresses && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Delivery Addresses</h3>
                    {userData.profile.addresses.map((address: any) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={address.isDefault ? "default" : "secondary"}>
                            {address.type} {address.isDefault && "(Default)"}
                          </Badge>
                          <MapPin className="h-4 w-4 text-gray-500" />
                        </div>
                        <p>{address.street}</p>
                        <p>{address.city}, {address.province} {address.postalCode}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                  <div className="flex space-x-4">
                    <Button asChild>
                      <Link href="/orders">
                        <Calendar className="h-4 w-4 mr-2" />
                        View Orders
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/api/auth/logout">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Preferences Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            {userData?.profile?.stats && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Account Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold">{userData.profile.stats.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-2xl font-bold">${userData.profile.stats.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Loyalty Points</p>
                    <p className="text-2xl font-bold">{userData.profile.stats.loyaltyPoints}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences Card */}
            {userData?.profile?.preferences && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <Badge variant="outline">{userData.profile.preferences.theme}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Badge variant={userData.profile.preferences.notifications ? "default" : "secondary"}>
                      {userData.profile.preferences.notifications ? "On" : "Off"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Newsletter</span>
                    <Badge variant={userData.profile.preferences.newsletter ? "default" : "secondary"}>
                      {userData.profile.preferences.newsletter ? "On" : "Off"}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-4"
                    disabled={updating}
                    onClick={() => updatePreferences({
                      ...userData.profile.preferences,
                      notifications: !userData.profile.preferences.notifications
                    })}
                  >
                    {updating ? "Updating..." : "Toggle Notifications"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


