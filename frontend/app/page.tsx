import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RecipeGrid } from "@/components/recipes/recipe-grid"
import { mockRecipes } from "@/lib/mock-data"
import { ArrowRight, ChefHat, Clock, Users, Flame } from "lucide-react"

export default function HomePage() {
  const featuredRecipes = mockRecipes.slice(0, 3)
  const popularRecipes = mockRecipes.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Discover & Share
                  <span className="text-primary"> Delicious</span> Recipes
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg text-pretty">
                  Explore thousands of recipes from home cooks around the world. Find inspiration, create your own
                  masterpieces, and share them with the community.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href="/recipes">
                      Explore Recipes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/recipes/create">Create Recipe</Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">10,000+</strong> Recipes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">5,000+</strong> Cooks
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Image Grid */}
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src="/placeholder.svg?height=500&width=400"
                        alt="Delicious pasta"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Fresh salad"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Chocolate dessert"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src="/placeholder.svg?height=500&width=400"
                        alt="Grilled salmon"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">Find recipes that match your cravings</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Breakfast", image: "/placeholder.svg?height=200&width=300", count: 156 },
                { name: "Healthy", image: "/placeholder.svg?height=200&width=300", count: 243 },
                { name: "Desserts", image: "/placeholder.svg?height=200&width=300", count: 189 },
                { name: "Quick Meals", image: "/placeholder.svg?height=200&width=300", count: 312 },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/recipes?category=${category.name.toLowerCase()}`}
                  className="group relative aspect-[3/2] rounded-xl overflow-hidden"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-background">
                    <span className="font-semibold text-lg">{category.name}</span>
                    <span className="text-sm text-background/80">{category.count} recipes</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Recipes */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Popular Recipes</h2>
                <p className="text-muted-foreground">Loved by the community</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/recipes">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <RecipeGrid recipes={popularRecipes} />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">How Cookio Works</h2>
              <p className="text-muted-foreground">Start your culinary journey in three simple steps</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: ChefHat,
                  title: "Discover Recipes",
                  description: "Browse through thousands of recipes from passionate home cooks and professional chefs.",
                },
                {
                  icon: Clock,
                  title: "Cook with Confidence",
                  description:
                    "Follow step-by-step instructions with detailed ingredients lists and nutritional information.",
                },
                {
                  icon: Flame,
                  title: "Share & Connect",
                  description: "Create your own recipes, save favorites, and connect with fellow food enthusiasts.",
                },
              ].map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Ready to Start Cooking?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of food lovers and share your culinary creations with the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/recipes">Browse Recipes</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
