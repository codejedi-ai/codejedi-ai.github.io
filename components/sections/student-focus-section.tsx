import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Award, Zap } from "lucide-react"

const studentBenefits = [
  {
    icon: <DollarSign className="h-8 w-8 text-green-500" />,
    title: "Budget Friendly",
    description:
      "Access great recipes and ingredients without breaking the bank. Our reward system helps you save more!",
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    title: "Earn PCO Points",
    description: "Get rewarded for your culinary creativity. The more popular your recipes, the more points you earn.",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Community Driven",
    description: "Join a vibrant community of food lovers. Share, discover, and connect with fellow students.",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    title: "Fresh & Innovative",
    description: "Be part of a new wave of social cooking. We're constantly evolving with fresh ideas and initiatives.",
  },
]

export default function StudentFocusSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-100 dark:bg-slate-800">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
            Pilot Program
          </h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            Designed for Students, By Students (Almost!)
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We understand the student life – always looking for value, community, and exciting new experiences. That's
            why NoName Products is kicking off with you in mind!
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentBenefits.map((benefit) => (
            <Card key={benefit.title} className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                {benefit.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
