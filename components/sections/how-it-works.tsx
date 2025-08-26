import { ShoppingCart, MapPin, Truck, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: ShoppingCart,
    title: "Shop Online",
    description: "Browse thousands of products from your favorite local stores and add them to your cart.",
  },
  {
    icon: MapPin,
    title: "Choose Delivery",
    description: "Select your delivery address and preferred time slot. We deliver in as fast as 15 minutes.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Our professional shoppers pick your items and deliver them fresh to your doorstep.",
  },
  {
    icon: CheckCircle,
    title: "Enjoy Fresh Food",
    description: "Receive your groceries and enjoy fresh, high-quality products without leaving home.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting fresh groceries delivered has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
