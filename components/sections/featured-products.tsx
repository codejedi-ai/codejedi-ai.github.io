"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

const featuredProducts = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    originalPrice: 3.49,
    image: "/placeholder.svg?height=200&width=200&text=Bananas",
    category: "Fruits",
    rating: 4.8,
    discount: "15% OFF",
  },
  {
    id: 2,
    name: "Fresh Avocados",
    price: 4.99,
    originalPrice: 5.99,
    image: "/placeholder.svg?height=200&width=200&text=Avocados",
    category: "Fruits",
    rating: 4.9,
    discount: "17% OFF",
  },
  {
    id: 3,
    name: "Whole Milk",
    price: 3.49,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Milk",
    category: "Dairy",
    rating: 4.7,
    discount: null,
  },
  {
    id: 4,
    name: "Sourdough Bread",
    price: 4.99,
    originalPrice: 6.49,
    image: "/placeholder.svg?height=200&width=200&text=Bread",
    category: "Bakery",
    rating: 4.6,
    discount: "23% OFF",
  },
]

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of fresh, high-quality products at unbeatable prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{product.discount}</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900">{product.name}</h3>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
