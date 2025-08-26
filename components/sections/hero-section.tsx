import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950">
      <div className="container py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Fresh groceries
                <span className="text-green-600 dark:text-green-400"> delivered</span>
                <br />
                in minutes
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Get everything you need from local stores delivered to your door. Fresh produce, pantry staples, and
                more - all at your fingertips.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/shop">
                  Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                How it works
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span>Delivery in 30 mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Free delivery over $35</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Fresh+Groceries"
                alt="Fresh groceries and produce"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white dark:bg-card p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">🥬</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Fresh Produce</p>
                  <p className="text-xs text-muted-foreground">Farm to door</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-card p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">⚡</span>
                </div>
                <div>
                  <p className="font-medium text-sm">30 min delivery</p>
                  <p className="text-xs text-muted-foreground">Lightning fast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
