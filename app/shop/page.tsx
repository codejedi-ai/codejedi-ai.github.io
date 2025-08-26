"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Plus, Search } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const allProducts = [
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
  {
    id: 7,
    name: "Organic Apples",
    price: 3.99,
    originalPrice: 4.49,
    image: "/organic-red-apples.png",
    rating: 4.7,
    reviews: 145,
    category: "Fruits",
    discount: "11% OFF",
  },
  {
    id: 8,
    name: "Greek Yogurt",
    price: 4.49,
    originalPrice: null,
    image: "/greek-yogurt-container.png",
    rating: 4.6,
    reviews: 92,
    category: "Dairy",
    discount: null,
  },
  {
    id: 9,
    name: "Fresh Carrots",
    price: 1.99,
    originalPrice: null,
    image: "/fresh-orange-carrots.png",
    rating: 4.4,
    reviews: 56,
    category: "Vegetables",
    discount: null,
  },
]

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery"]

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { addItem } = useCart()
  const { toast } = useToast()

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Groceries</h1>
          <p className="text-gray-600">Fresh, quality products delivered to your door</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
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
