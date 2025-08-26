"use client"

import { useUser } from "@/contexts/auth-context"
import { withAuth } from "@/components/auth/with-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Calendar, DollarSign, MapPin, ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"

function OrdersPage() {
  const { user } = useUser()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch orders from protected API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/protected/orders')
        if (response.ok) {
          const result = await response.json()
          setOrders(result.data)
        } else {
          console.error('Failed to fetch orders')
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  if (!user) return null

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded mb-6"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "outline"
      default:
        return "destructive"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Badge variant="outline" className="text-sm">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-gray-500">Start shopping to see your orders here!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Package className="h-5 w-5" />
                        <span>Order {order.id}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Items ({order.items.length})</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.deliveryAddress && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Delivery Address</span>
                      </h4>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p>{order.deliveryAddress.street}</p>
                        <p>{order.deliveryAddress.city}, {order.deliveryAddress.province} {order.deliveryAddress.postalCode}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default withAuth(OrdersPage)
