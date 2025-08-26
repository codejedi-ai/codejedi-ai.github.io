"use client"

import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

const featuredProducts = [
  {
    id: "1",
    name: "Organic Bananas",
    price: 2.99,
    originalPrice: 3.49,
    image: "/placeholder.svg?height=200&width=200&text=Bananas",
    category: "Produce",
    unit: "per bunch",
    discount: 15,
  },
  {
    id: "2",
    name: "Fresh Avocados",
    price: 1.99,
    image: "/placeholder.svg?height=200&width=200&text=Avocados",
    category: "Produce",
    unit: "each",
  },
  {
    id: "3",
    name: "Whole Milk",
    price: 4.29,
    image: "/placeholder.svg?height=200&width=200&text=Milk",
    category: "Dairy",
    unit: "1L",
  },
  {
    id: "4",
    name: "Sourdough Bread",
    price: 3.99,
    image: "/placeholder.svg?height=200&width=200&text=Bread",
    category: "Bakery",
    unit: "per loaf",
  },
  {
    id: "5",
    name: "Free Range Eggs",
    price: 5.99,
    image: "/placeholder.svg?height=200&width=200&text=Eggs",
    category: "Dairy",
    unit: "12 pack",
  },
  {
    id: "6",
    name: "Greek Yogurt",
    price: 6.49,
    originalPrice: 7.99,
    image: "/placeholder.svg?height=200&width=200&text=Yogurt",
    category: "Dairy",
    unit: "750g",
    discount: 19,
  },
]

export default function FeaturedProducts() {
  const { addItem } = useCart()

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of fresh, high-quality products at unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{product.discount}% OFF</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                    <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.unit}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-lg">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
