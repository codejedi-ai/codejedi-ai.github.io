"use client"

import { useUser } from "@/contexts/auth-context"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShoppingCart, 
  Package, 
  Heart, 
  Clock, 
  TrendingUp, 
  MapPin,
  User,
  Star
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useUser()

  // Mock dashboard data
  const dashboardData = {
    recentOrders: [
      { id: "ORD-001", date: "2024-01-15", status: "delivered", total: 89.99 },
      { id: "ORD-002", date: "2024-01-20", status: "processing", total: 45.50 }
    ],
    favorites: [
      { name: "Organic Apples", price: 6.99, image: "/placeholder.jpg" },
      { name: "Greek Yogurt", price: 4.99, image: "/placeholder.jpg" },
      { name: "Fresh Bread", price: 3.99, image: "/placeholder.jpg" }
    ],
    stats: {
      totalOrders: 12,
      totalSpent: 534.67,
      loyaltyPoints: 125
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your account</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.stats.totalSpent}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.loyaltyPoints}</div>
              <p className="text-xs text-muted-foreground">Available to use</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Orders</span>
              </CardTitle>
              <CardDescription>Your latest grocery deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                      <p className="text-sm font-medium mt-1">${order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/orders">View All Orders</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Favorite Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Your Favorites</span>
              </CardTitle>
              <CardDescription>Items you order most frequently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.favorites.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">${item.price}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/shop">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                  <Link href="/shop">
                    <ShoppingCart className="h-6 w-6" />
                    <span>Shop Now</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                  <Link href="/orders">
                    <Package className="h-6 w-6" />
                    <span>Track Orders</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                  <Link href="/profile">
                    <User className="h-6 w-6" />
                    <span>My Profile</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                  <Link href="/cart">
                    <MapPin className="h-6 w-6" />
                    <span>Delivery</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


