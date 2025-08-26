"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export default function Navbar() {
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-8">
          <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-xl">Roguebreak</span>
        </Link>

        {/* Location */}
        <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground mr-4">
          <MapPin className="h-4 w-4" />
          <span>Deliver to</span>
          <Button variant="ghost" size="sm" className="font-medium text-foreground">
            Toronto, ON M5V 3A8
          </Button>
        </div>

        {/* Search - takes up remaining space */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for products..." className="pl-10" />
          </div>
        </div>

        {/* Right side - Account and Cart */}
        <div className="flex items-center space-x-2 ml-4">
          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Button */}
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Account</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
