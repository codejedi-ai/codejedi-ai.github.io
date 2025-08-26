import { ShoppingCart, MapPin, Truck, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: ShoppingCart,
    title: "Shop Online",
    description: "Browse thousands of products from your favorite local stores",
  },
  {
    icon: MapPin,
    title: "Choose Delivery",
    description: "Select your delivery time and address for convenient service",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your groceries delivered in as fast as 1 hour",
  },
  {
    icon: CheckCircle,
    title: "Enjoy Fresh Food",
    description: "Enjoy fresh, quality groceries delivered right to your door",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting your groceries delivered is simple and convenient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
