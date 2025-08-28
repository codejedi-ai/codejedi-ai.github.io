import HeroSection from "@/components/sections/hero-section"
import FeaturedProducts from "@/components/sections/featured-products"
import HowItWorks from "@/components/sections/how-it-works"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <Footer />
    </div>
  )
}
