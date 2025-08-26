"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Star, Search } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const products = [
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
  {
    id: 5,
    name: "Organic Spinach",
    price: 3.99,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Spinach",
    category: "Vegetables",
    rating: 4.5,
    discount: null,
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 5.49,
    originalPrice: 6.99,
    image: "/placeholder.svg?height=200&width=200&text=Yogurt",
    category: "Dairy",
    rating: 4.8,
    discount: "21% OFF",
  },
  {
    id: 7,
    name: "Fresh Strawberries",
    price: 4.49,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Strawberries",
    category: "Fruits",
    rating: 4.9,
    discount: null,
  },
  {
    id: 8,
    name: "Artisan Croissants",
    price: 6.99,
    originalPrice: 8.49,
    image: "/placeholder.svg?height=200&width=200&text=Croissants",
    category: "Bakery",
    rating: 4.7,
    discount: "18% OFF",
  },
]

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: (typeof products)[0]) => {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Fresh Groceries</h1>
          <p className="text-gray-600">Discover fresh, high-quality products delivered to your door.</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
