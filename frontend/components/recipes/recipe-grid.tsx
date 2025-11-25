"use client"

import { RecipeCard } from "./recipe-card"
import type { Recipe } from "@/lib/types"

interface RecipeGridProps {
  recipes: Recipe[]
  onLike?: (id: string) => void
}

export function RecipeGrid({ recipes, onLike }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No recipes found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onLike={onLike} />
      ))}
    </div>
  )
}
