"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RecipeGrid } from "@/components/recipes/recipe-grid"
import { RecipeFilters } from "@/components/recipes/recipe-filters"
import { mockRecipes } from "@/lib/mock-data"
import type { RecipeFilters as Filters } from "@/lib/types"

export default function RecipesPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || undefined
  const initialDifficulty = searchParams.get("difficulty") || undefined

  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    difficulty: initialDifficulty,
  })

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesTitle = recipe.title.toLowerCase().includes(searchLower)
        const matchesDescription = recipe.description.toLowerCase().includes(searchLower)
        const matchesIngredient = recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(searchLower))
        if (!matchesTitle && !matchesDescription && !matchesIngredient) {
          return false
        }
      }

      // Category filter
      if (filters.category && !recipe.categories.includes(filters.category)) {
        return false
      }

      // Difficulty filter
      if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
        return false
      }

      // Max time filter
      if (filters.maxTime && recipe.time > filters.maxTime) {
        return false
      }

      // Max calories filter
      if (filters.maxCalories && recipe.calories > filters.maxCalories) {
        return false
      }

      return true
    })
  }, [filters])

  const handleLike = (id: string) => {
    // In real app, this would call the API
    console.log("Toggle like for recipe:", id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {filters.category
                ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Recipes`
                : "All Recipes"}
            </h1>
            <p className="text-muted-foreground">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <RecipeFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Recipe Grid */}
          <RecipeGrid recipes={filteredRecipes} onLike={handleLike} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
