import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segment = pathname.split('/').pop()

  try {
    switch (segment) {
      case 'login':
        return handleLogin()
      case 'logout':
        return handleLogout()
      case 'callback':
        return handleCallback(request)
      case 'me':
        return handleMe(request)
      default:
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function handleLogin() {
  const authUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
    `response_type=code&` +
    `client_id=${process.env.AUTH0_CLIENT_ID}&` +
    `redirect_uri=${process.env.AUTH0_BASE_URL}/api/auth/callback&` +
    `scope=openid profile email`

  return NextResponse.redirect(authUrl)
}

function handleLogout() {
  const logoutUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
    `client_id=${process.env.AUTH0_CLIENT_ID}&` +
    `returnTo=${process.env.AUTH0_BASE_URL}`

  const response = NextResponse.redirect(logoutUrl)
  
  // Clear the session cookie
  response.cookies.set('appSession', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  })

  return response
}

async function handleCallback(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/?error=${error}`)
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/?error=missing_code`)
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token exchange failed:', tokenResponse.status, errorText)
      throw new Error(`Token exchange failed: ${tokenResponse.status} - ${errorText}`)
    }

    const tokens = await tokenResponse.json()

    // Get user info
    const userResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to get user info')
    }

    const user = await userResponse.json()

    // Create session
    const session = {
      user,
      accessToken: tokens.access_token,
      idToken: tokens.id_token,
      expiresAt: Date.now() + (tokens.expires_in * 1000)
    }

    const response = NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/dashboard`)
    
    // Set session cookie with better production settings
    response.cookies.set('appSession', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: tokens.expires_in,
      path: '/',
      // Ensure cookie persists across browser refresh
      expires: new Date(Date.now() + (tokens.expires_in * 1000))
    })

    return response
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/?error=callback_failed`)
  }
}

async function handleMe(request: NextRequest) {
  const sessionCookie = request.cookies.get('appSession')
  
  // Debug logging for production issues
  console.log('🍪 Cookie check:', {
    hasCookie: !!sessionCookie,
    cookieValue: sessionCookie?.value?.substring(0, 50) + '...',
    allCookies: Object.fromEntries(Array.from(request.cookies))
  })
  
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }

    return NextResponse.json(session.user)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }
}
