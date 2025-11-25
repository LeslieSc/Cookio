import { Flame, Beef, Wheat, Droplets } from "lucide-react"

interface NutritionSummaryProps {
  calories: number
  protein: number
  carbs: number
  fat: number
  variant?: "compact" | "detailed"
}

export function NutritionSummary({ calories, protein, carbs, fat, variant = "compact" }: NutritionSummaryProps) {
  const items = [
    { label: "Calories", value: calories, unit: "kcal", icon: Flame, color: "text-orange-500" },
    { label: "Protein", value: protein, unit: "g", icon: Beef, color: "text-red-500" },
    { label: "Carbs", value: carbs, unit: "g", icon: Wheat, color: "text-amber-500" },
    { label: "Fat", value: fat, unit: "g", icon: Droplets, color: "text-blue-500" },
  ]

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <item.icon className={`h-4 w-4 ${item.color}`} />
            <span className="text-muted-foreground">
              {item.value}
              {item.unit !== "kcal" && item.unit}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
          <item.icon className={`h-6 w-6 ${item.color} mb-2`} />
          <span className="text-2xl font-bold text-foreground">{item.value}</span>
          <span className="text-xs text-muted-foreground">
            {item.unit === "kcal" ? item.label : `${item.label} (${item.unit})`}
          </span>
        </div>
      ))}
    </div>
  )
}
