import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Users, ChefHat, Calendar, ArrowLeft } from "lucide-react"
import type { Recipe } from "@/types/recipe"
import { formatDate, formatTime } from "@/lib/utils"
import { IngredientList } from "@/app/components/ingredient-list"
import { NutritionSummary } from "@/app/components/nutrition-summary"
import { RecipeActions } from "@/app/components/recipe-actions"

const FALLBACK_IMAGE = "/placeholder.svg?height=600&width=1000&query=delicious food"
const DEFAULT_AUTHOR = { id: "cookio-chef", name: "Cookio Chef" }
const FETCH_ERROR_MESSAGE = "Unable to load this recipe right now."

interface RecipePageProps {
  params: { slug: string }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await fetchRecipe(params.slug)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/recipes"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to recipes
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src={recipe.imageUrl || FALLBACK_IMAGE}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Meta */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {recipe.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary"
                >
                  {category}
                </span>
              ))}
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                  recipe.difficulty === "easy"
                    ? "bg-green-100 text-green-700"
                    : recipe.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {recipe.difficulty}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{recipe.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{recipe.description}</p>

            {/* Author & Date */}
            <div className="mt-6 flex flex-wrap items-center gap-6 border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <ChefHat className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{recipe.author?.name ?? DEFAULT_AUTHOR.name}</p>
                  <p className="text-xs text-muted-foreground">Recipe creator</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(recipe.createdAt)}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-muted/50 p-4 text-center">
                <Clock className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-lg font-semibold">{formatTime(recipe.totalTime)}</p>
                <p className="text-xs text-muted-foreground">Total Time</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4 text-center">
                <Users className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-lg font-semibold">{recipe.servings}</p>
                <p className="text-xs text-muted-foreground">Servings</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4 text-center">
                <ChefHat className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-lg font-semibold capitalize">{recipe.difficulty}</p>
                <p className="text-xs text-muted-foreground">Difficulty</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6">
              <RecipeActions recipe={recipe} />
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Instructions</h2>
              <ol className="mt-4 space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-muted-foreground">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <NutritionSummary nutrition={recipe.nutrition} />
          <IngredientList ingredients={recipe.ingredients} servings={recipe.servings} />
        </div>
      </div>
    </div>
  )
}

async function fetchRecipe(slug: string): Promise<Recipe | null> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/recipes/${slug}`

  try {
    const response = await fetch(url, { cache: "no-store" })

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`Recipe request failed with status ${response.status}`)
    }

    const payload = (await response.json()) as { data?: unknown }
    if (!payload.data) {
      return null
    }

    return normalizeRecipe(payload.data as Record<string, unknown>)
  } catch (error) {
    console.error(FETCH_ERROR_MESSAGE, error)
    return null
  }
}

const normalizeRecipe = (recipe: Record<string, unknown>): Recipe => {
  const fallbackSlug = getString(recipe["slug"]) ?? getString(recipe["_id"]) ?? "recipe"
  const createdAt = ensureDateString(recipe["createdAt"], new Date().toISOString())
  const updatedAt = ensureDateString(recipe["updatedAt"], createdAt)

  const categories = Array.isArray(recipe["categories"])
    ? (recipe["categories"] as unknown[]).filter(
        (category): category is string => typeof category === "string" && category.length > 0,
      )
    : []

  const ingredients = Array.isArray(recipe["ingredients"])
    ? (recipe["ingredients"] as unknown[]).map((ingredient, index) => {
        const entry = ingredient as Record<string, unknown>
        return {
          id: getString(entry["id"]) ?? `${fallbackSlug}-ingredient-${index}`,
          name: getString(entry["name"]) ?? "",
          amount: getNumber(entry["amount"]),
          unit: getString(entry["unit"]) ?? "",
        }
      })
    : []

  const instructions = Array.isArray(recipe["instructions"])
    ? (recipe["instructions"] as unknown[]).filter(
        (step): step is string => typeof step === "string" && step.trim().length > 0,
      )
    : []

  const nutritionSource = (recipe["nutrition"] as Record<string, unknown>) || {}
  const prepTime = getNumber(recipe["prepTime"])
  const cookTime = getNumber(recipe["cookTime"])
  const totalTime = getNumber(recipe["totalTime"], prepTime + cookTime)

  const rawDifficulty = getString(recipe["difficulty"])?.toLowerCase()
  const difficulty = rawDifficulty && ["easy", "medium", "hard"].includes(rawDifficulty) ? rawDifficulty : "medium"

  const authorSource = recipe["author"] as Record<string, unknown> | undefined
  const authorId = getString(recipe["userId"]) ?? getString(authorSource?.id) ?? DEFAULT_AUTHOR.id
  const authorName = getString(authorSource?.name) ?? DEFAULT_AUTHOR.name
  const authorAvatar = getString(authorSource?.avatarUrl)

  return {
    id: fallbackSlug,
    slug: fallbackSlug,
    title: getString(recipe["title"]) ?? "Untitled recipe",
    description: getString(recipe["description"]) ?? "",
    imageUrl: getString(recipe["imageUrl"]) || FALLBACK_IMAGE,
    categories,
    difficulty: difficulty as Recipe["difficulty"],
    prepTime,
    cookTime,
    totalTime,
    servings: Math.max(getNumber(recipe["servings"], 1), 1),
    nutrition: {
      calories: getNumber(nutritionSource["calories"]),
      protein: getNumber(nutritionSource["protein"]),
      carbs: getNumber(nutritionSource["carbs"]),
      fat: getNumber(nutritionSource["fat"]),
    },
    ingredients,
    instructions,
    author: {
      id: authorId,
      name: authorName,
      avatarUrl: authorAvatar,
    },
    likes: Math.max(getNumber(recipe["likes"]), 0),
    isLiked: Boolean(recipe["isLiked"]),
    isSaved: Boolean(recipe["isSaved"]),
    createdAt,
    updatedAt,
  }
}

const getString = (value: unknown): string | undefined => {
  if (typeof value === "string") return value
  if (typeof value === "number" && Number.isFinite(value)) return value.toString()
  if (typeof value === "object" && value !== null && "toString" in value) {
    const converted = (value as { toString: () => string }).toString()
    if (typeof converted === "string" && converted !== "[object Object]") {
      return converted
    }
  }
  return undefined
}

const getNumber = (value: unknown, defaultValue = 0): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

const ensureDateString = (value: unknown, fallback: string): string => {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string" && value.length > 0) return value
  if (typeof value === "number" && Number.isFinite(value)) return new Date(value).toISOString()
  return fallback
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}
