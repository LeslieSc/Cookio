import { Suspense } from "react"
import { RecipeFilters } from "@/components/recipe-filters"
import { RecipeGrid } from "@/components/recipe-grid"
import { mockRecipes } from "@/lib/mock-data"
import type { RecipeFilters as FiltersType } from "@/types/recipe"

interface RecipesPageProps {
  searchParams: Promise<FiltersType>
}

function filterRecipes(filters: FiltersType) {
  let recipes = [...mockRecipes]

  if (filters.search) {
    const search = filters.search.toLowerCase()
    recipes = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search) ||
        r.ingredients.some((i) => i.name.toLowerCase().includes(search)),
    )
  }

  if (filters.category && filters.category !== "all") {
    recipes = recipes.filter((r) => r.categories.some((c) => c.toLowerCase() === filters.category?.toLowerCase()))
  }

  if (filters.difficulty && filters.difficulty !== "all") {
    recipes = recipes.filter((r) => r.difficulty === filters.difficulty)
  }

  if (filters.maxTime) {
    recipes = recipes.filter((r) => r.totalTime <= Number(filters.maxTime))
  }

  if (filters.maxCalories) {
    recipes = recipes.filter((r) => r.nutrition.calories <= Number(filters.maxCalories))
  }

  return recipes
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const filters = await searchParams
  const recipes = filterRecipes(filters)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Recipes</h1>
        <p className="mt-2 text-muted-foreground">Discover delicious recipes for every occasion</p>
      </div>

      <Suspense fallback={<div className="h-12 animate-pulse rounded-xl bg-muted" />}>
        <RecipeFilters />
      </Suspense>

      <div className="mt-8">
        <p className="mb-4 text-sm text-muted-foreground">
          {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} found
        </p>
        <RecipeGrid
          recipes={recipes}
          emptyMessage="No recipes match your filters. Try adjusting your search criteria."
        />
      </div>
    </div>
  )
}
