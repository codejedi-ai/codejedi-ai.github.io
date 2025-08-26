"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

// Mock product data - in a real app, this would come from an API
const products = [
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
  // Add more products...
  {
    id: "7",
    name: "Organic Spinach",
    price: 3.49,
    image: "/placeholder.svg?height=200&width=200&text=Spinach",
    category: "Produce",
    unit: "5oz bag",
  },
  {
    id: "8",
    name: "Chicken Breast",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200&text=Chicken",
    category: "Meat",
    unit: "per lb",
  },
]

const categories = ["All", "Produce", "Dairy", "Bakery", "Meat", "Pantry"]

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { addItem } = useCart()

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shop Groceries</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
