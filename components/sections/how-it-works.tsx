import { Card, CardContent } from "@/components/ui/card"
import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: <Search className="h-8 w-8 text-green-600" />,
    title: "Browse & Search",
    description: "Find exactly what you need from thousands of products across multiple categories",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
    title: "Add to Cart",
    description: "Select your items, choose quantities, and review your order before checkout",
  },
  {
    icon: <Truck className="h-8 w-8 text-green-600" />,
    title: "Fast Delivery",
    description: "Our shoppers pick and pack your order, then deliver it to your door in 30 minutes",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
    title: "Enjoy Fresh Food",
    description: "Receive fresh, high-quality groceries without leaving the comfort of your home",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Roguebreak Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting fresh groceries delivered has never been easier. Here's how we make it happen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={step.title} className="text-center">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="mx-auto w-16 h-16 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
