import { Check } from "lucide-react"
import type { Ingredient } from "@/lib/types"

interface IngredientListProps {
  ingredients: Ingredient[]
  servings: number
}

export function IngredientList({ ingredients, servings }: IngredientListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Ingredients</h3>
        <span className="text-sm text-muted-foreground">
          for {servings} {servings === 1 ? "serving" : "servings"}
        </span>
      </div>
      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            <div className="h-5 w-5 rounded border border-border flex items-center justify-center shrink-0">
              <Check className="h-3 w-3 text-muted-foreground opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-foreground">
              <span className="font-medium">
                {ingredient.amount} {ingredient.unit}
              </span>{" "}
              {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
