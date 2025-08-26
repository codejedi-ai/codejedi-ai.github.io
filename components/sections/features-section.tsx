import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloud, Bot, Rows, Gift, Percent, MapPin, Search, Shuffle } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: <UploadCloud className="h-10 w-10 mb-4 text-green-500" />,
    title: "Easy Recipe Uploads",
    description: "Share your culinary masterpieces. Upload an image, name, and brief ingredients.",
    details: [
      "LLM generates full recipe & ingredient list",
      "Edit and fine-tune to perfection",
      "AI finds similar products in store",
      "Swap ingredients to match your pantry or preferences",
    ],
    subIcons: [
      <Bot className="h-5 w-5 text-purple-500" />,
      <Search className="h-5 w-5 text-blue-500" />,
      <Shuffle className="h-5 w-5 text-orange-500" />,
    ],
  },
  {
    icon: <Rows className="h-10 w-10 mb-4 text-green-500" />,
    title: "Dynamic User Feed",
    description: "Discover a world of recipes. Scroll through an engaging feed of names and pictures.",
    details: [
      "Personalized recommendations",
      "Recipes with items in short supply are highlighted",
      "Click to see full recipe and creator profiles",
    ],
    subIcons: [],
  },
  {
    icon: <Gift className="h-10 w-10 mb-4 text-green-500" />,
    title: "Rewarding System",
    description: "Get recognized for your contributions. Earn points for clicks and affiliate purchases.",
    details: [
      "Likes generate PCO points (optional)",
      "University-wide discounts for popular recipes",
      "The more a recipe is ordered on campus, the bigger the discount!",
    ],
    subIcons: [<Percent className="h-5 w-5 text-yellow-500" />],
  },
  {
    icon: <MapPin className="h-10 w-10 mb-4 text-green-500" />,
    title: "Convenient Distribution",
    description: "Easy access to your ingredients. Pick up from regional distribution hubs on campus.",
    details: ["Hotspots for ultimate convenience", "Streamlined pickup process for busy students"],
    subIcons: [],
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
            Platform Highlights
          </h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            Everything You Need to Cook, Share & Earn
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {features.map((feature, index) => (
            <Card key={feature.title} className="flex flex-col h-full bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {feature.icon}
                  <div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      {feature.subIcons[i] ? (
                        <span className="mr-2 mt-0.5">{feature.subIcons[i]}</span>
                      ) : (
                        <span className="mr-2 mt-1">•</span>
                      )}
                      {detail}
                    </li>
                  ))}
                </ul>
                {index === 1 && ( // Example of inserting recipe cards into the "User Feed" feature
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <RecipeCardExample
                      name="Spicy Ramen Bowl"
                      imageUrl="/placeholder.svg?width=300&height=200&text=Ramen"
                    />
                    <RecipeCardExample
                      name="Avocado Toast Deluxe"
                      imageUrl="/placeholder.svg?width=300&height=200&text=Avocado+Toast"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function RecipeCardExample({ name, imageUrl }: { name: string; imageUrl: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/2]">
        <Image src={imageUrl || "/placeholder.svg"} alt={name} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm truncate">{name}</h3>
        <p className="text-xs text-muted-foreground">By StudentChef123</p>
      </CardContent>
    </Card>
  )
}
