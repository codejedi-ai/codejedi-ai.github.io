import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get the session cookie
    const sessionCookie = request.cookies.get('appSession')
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Parse the session
    const session = JSON.parse(sessionCookie.value)
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      )
    }

    const user = session.user

    // Mock orders data - in a real app, this would come from your database
    const orders = [
      {
        id: "ORD-001",
        userId: user.sub,
        date: "2024-01-15T10:30:00Z",
        status: "delivered",
        total: 89.99,
        items: [
          { name: "Organic Apples", quantity: 2, price: 12.99 },
          { name: "Whole Milk", quantity: 1, price: 4.99 },
          { name: "Fresh Bread", quantity: 1, price: 3.99 },
          { name: "Chicken Breast", quantity: 1, price: 15.99 }
        ],
        deliveryAddress: {
          street: "123 Main St",
          city: "Toronto",
          province: "ON",
          postalCode: "M5V 3A8"
        }
      },
      {
        id: "ORD-002",
        userId: user.sub,
        date: "2024-01-20T15:45:00Z",
        status: "processing",
        total: 45.50,
        items: [
          { name: "Greek Yogurt", quantity: 3, price: 8.99 },
          { name: "Bananas", quantity: 2, price: 2.99 },
          { name: "Orange Juice", quantity: 1, price: 6.99 }
        ],
        deliveryAddress: {
          street: "123 Main St",
          city: "Toronto",
          province: "ON",
          postalCode: "M5V 3A8"
        }
      },
      {
        id: "ORD-003",
        userId: user.sub,
        date: "2024-01-22T09:15:00Z",
        status: "shipped",
        total: 123.75,
        items: [
          { name: "Salmon Fillet", quantity: 1, price: 24.99 },
          { name: "Asparagus", quantity: 1, price: 7.99 },
          { name: "Quinoa", quantity: 1, price: 12.99 },
          { name: "Olive Oil", quantity: 1, price: 18.99 },
          { name: "Tomatoes", quantity: 2, price: 5.99 }
        ],
        deliveryAddress: {
          street: "123 Main St",
          city: "Toronto",
          province: "ON",
          postalCode: "M5V 3A8"
        }
      }
    ]

    // Filter orders by user (in a real app, this would be done in the database query)
    const userOrders = orders.filter(order => order.userId === user.sub)

    return NextResponse.json({
      success: true,
      data: userOrders,
      count: userOrders.length
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the session cookie
    const sessionCookie = request.cookies.get('appSession')
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Parse the session
    const session = JSON.parse(sessionCookie.value)
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      )
    }

    const user = session.user

    const body = await request.json()
    
    // Mock creating a new order
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: user.sub,
      date: new Date().toISOString(),
      status: "processing",
      total: body.total || 0,
      items: body.items || [],
      deliveryAddress: body.deliveryAddress
    }

    console.log(`Creating new order for user ${user.sub}:`, newOrder)

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      data: newOrder
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
