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

    // Mock user data - in a real app, this would come from your database
    const userData = {
      userId: user.sub,
      name: user.name,
      email: user.email,
      profile: {
        preferences: {
          theme: "light",
          notifications: true,
          newsletter: false
        },
        stats: {
          totalOrders: 12,
          totalSpent: 534.67,
          loyaltyPoints: 125,
          memberSince: "2023-06-15"
        },
        addresses: [
          {
            id: "1",
            type: "home",
            street: "123 Main St",
            city: "Toronto",
            province: "ON",
            postalCode: "M5V 3A8",
            isDefault: true
          }
        ]
      },
      lastLogin: new Date().toISOString(),
      permissions: ["read:profile", "write:profile", "read:orders"]
    }

    return NextResponse.json({
      success: true,
      data: userData
    })
  } catch (error) {
    console.error("Error in protected API route:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
    
    // Mock updating user preferences
    // In a real app, you would update the database here
    console.log(`Updating preferences for user ${user.sub}:`, body)

    return NextResponse.json({
      success: true,
      message: "Preferences updated successfully",
      data: {
        userId: user.sub,
        updatedPreferences: body
      }
    })
  } catch (error) {
    console.error("Error updating user data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
