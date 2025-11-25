import type { Recipe } from "@/types/recipe"
import { RecipeCard } from "./recipe-card"

interface RecipeGridProps {
  recipes: Recipe[]
  emptyMessage?: string
}

export function RecipeGrid({ recipes, emptyMessage = "No recipes found" }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
