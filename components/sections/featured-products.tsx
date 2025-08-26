"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

const featuredProducts = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    originalPrice: 3.49,
    image: "/organic-bananas.png",
    rating: 4.8,
    reviews: 124,
    category: "Fruits",
    discount: "15% OFF",
  },
  {
    id: 2,
    name: "Fresh Avocados",
    price: 4.99,
    originalPrice: null,
    image: "/fresh-avocados.png",
    rating: 4.9,
    reviews: 89,
    category: "Fruits",
    discount: null,
  },
  {
    id: 3,
    name: "Organic Milk",
    price: 5.49,
    originalPrice: 6.99,
    image: "/organic-milk-carton.png",
    rating: 4.7,
    reviews: 156,
    category: "Dairy",
    discount: "20% OFF",
  },
  {
    id: 4,
    name: "Whole Grain Bread",
    price: 3.99,
    originalPrice: null,
    image: "/whole-grain-bread-loaf.png",
    rating: 4.6,
    reviews: 78,
    category: "Bakery",
    discount: null,
  },
  {
    id: 5,
    name: "Free Range Eggs",
    price: 6.99,
    originalPrice: 7.99,
    image: "/free-range-eggs-carton.png",
    rating: 4.8,
    reviews: 203,
    category: "Dairy",
    discount: "12% OFF",
  },
  {
    id: 6,
    name: "Fresh Spinach",
    price: 2.49,
    originalPrice: null,
    image: "/fresh-spinach.png",
    rating: 4.5,
    reviews: 67,
    category: "Vegetables",
    discount: null,
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular items, handpicked for quality and freshness
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/shop">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
