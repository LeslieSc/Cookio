export interface Recipe {
  id: string
  slug: string
  title: string
  description: string
  image: string
  categories: string[]
  difficulty: "easy" | "medium" | "hard"
  time: number // in minutes
  servings: number
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: Ingredient[]
  instructions: string[]
  creatorId: string
  creatorName: string
  creatorAvatar?: string
  createdAt: string
  likes: number
  isLiked?: boolean
  isSaved?: boolean
}

export interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface RecipeFilters {
  search?: string
  category?: string
  maxCalories?: number
  maxTime?: number
  difficulty?: string
}
