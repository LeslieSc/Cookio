"use client"

import { use } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RecipeForm } from "@/components/recipes/recipe-form"
import { Button } from "@/components/ui/button"
import { mockRecipes } from "@/lib/mock-data"
import { ArrowLeft } from "lucide-react"

export default function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const recipe = mockRecipes.find((r) => r.id === resolvedParams.id)

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-4">The recipe you're trying to edit doesn't exist.</p>
            <Button asChild>
              <Link href="/recipes">Browse Recipes</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={`/recipes/${recipe.slug}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipe
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Edit Recipe</h1>
            <p className="text-muted-foreground">Update your recipe details</p>
          </div>

          <RecipeForm recipe={recipe} mode="edit" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
