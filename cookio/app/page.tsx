import Link from "next/link"
import { headers } from "next/headers"
import { ArrowRight, ChefHat, Clock, Sparkles, Users } from "lucide-react"
import { RecipeGrid } from "./components/recipe-grid"
import type { RecipeSummary } from "@/types/recipe"

const POPULAR_RECIPES_LIMIT = 6
const FALLBACK_IMAGE = "/placeholder.svg?height=300&width=400&query=delicious food dish"
const POPULAR_RECIPES_ERROR = "Unable to load popular recipes right now. Please try again later."
const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard"])

export default async function Home() {
  const { recipes: popularRecipes, error: popularRecipesError } = await fetchPopularRecipes()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Discover new flavors every day
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Cook with confidence, <span className="text-primary">share with love</span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Explore thousands of recipes from home cooks around the world. Find your next favorite dish, save recipes,
              and share your own culinary creations.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/recipes"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Browse Recipes
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border px-8 text-base font-semibold transition-colors hover:bg-muted sm:w-auto"
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-y border-border bg-card/50">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10k+</p>
              <p className="mt-1 text-sm text-muted-foreground">Recipes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50k+</p>
              <p className="mt-1 text-sm text-muted-foreground">Home Cooks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">100+</p>
              <p className="mt-1 text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">4.9</p>
              <p className="mt-1 text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ChefHat className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Easy to Follow</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Step-by-step instructions with detailed ingredient lists make cooking a breeze.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Time Estimates</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Know exactly how long each recipe takes with accurate prep and cook times.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Community Driven</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your recipes and discover favorites from cooks around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="w-full px-4 py-16 sm:px-6 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Popular Recipes</h2>
              <p className="mt-2 text-muted-foreground">Trending dishes loved by our community</p>
            </div>
            <Link
              href="/recipes"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all recipes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <RecipeGrid
            recipes={popularRecipes}
            errorMessage={popularRecipesError}
            emptyMessage="No popular recipes available right now. Check back soon!"
          />

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all recipes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to share your recipes?</h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of home cooks sharing their favorite dishes. Create an account and start uploading your
              recipes today.
            </p>
            <Link
              href="/register"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

async function fetchPopularRecipes(): Promise<{ recipes: RecipeSummary[]; error: string | null }> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/fetch-recipes?limit=${POPULAR_RECIPES_LIMIT}&page=1`

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch popular recipes: ${response.statusText}`)
    }

    const payload = (await response.json()) as { data?: unknown }

    return {
      recipes: normalizeRecipes(payload.data),
      error: null,
    }
  } catch (error) {
    console.error("Popular recipes fetch error", error)
    return {
      recipes: [],
      error: POPULAR_RECIPES_ERROR,
    }
  }
}

const normalizeRecipes = (payload: unknown): RecipeSummary[] => {
  if (!Array.isArray(payload)) {
    return []
  }

  return payload.map((recipe, index) => normalizeRecipe(recipe as Record<string, unknown>, index))
}

const normalizeRecipe = (recipe: Record<string, unknown>, index: number): RecipeSummary => {
  const fallbackId =
    getString(recipe["_id"]) ?? getString(recipe["id"]) ?? getString(recipe["slug"]) ?? `recipe-${index}`
  const fallbackTimestamp = new Date().toISOString()
  const createdAt = ensureDateString(recipe["createdAt"], fallbackTimestamp)
  const updatedAt = ensureDateString(recipe["updatedAt"], createdAt)

  const categories = Array.isArray(recipe["categories"])
    ? (recipe["categories"] as unknown[]).filter(
        (category): category is string => typeof category === "string" && category.length > 0,
      )
    : []

  const ingredients = Array.isArray(recipe["ingredients"])
    ? (recipe["ingredients"] as unknown[]).map((ingredient, ingredientIndex) => {
        const entry = ingredient as Record<string, unknown>
        return {
          id: getString(entry["id"]) ?? `${fallbackId}-ingredient-${ingredientIndex}`,
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
  const difficulty = rawDifficulty && VALID_DIFFICULTIES.has(rawDifficulty) ? rawDifficulty : "medium"

  return {
    id: getString(recipe["id"]) ?? fallbackId,
    slug: getString(recipe["slug"]) ?? fallbackId,
    title: getString(recipe["title"]) ?? "Untitled recipe",
    description: getString(recipe["description"]) ?? "",
    imageUrl: getString(recipe["imageUrl"]) || FALLBACK_IMAGE,
    categories,
    difficulty: difficulty as RecipeSummary["difficulty"],
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
    likes: getNumber(recipe["likes"]),
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
    const stringValue = (value as { toString: () => string }).toString()
    if (typeof stringValue === "string" && stringValue !== "[object Object]") {
      return stringValue
    }
  }
  return undefined
}

const getNumber = (value: unknown, defaultValue = 0): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

const ensureDateString = (value: unknown, fallback: string): string => {
  if (value instanceof Date) {
    return value.toISOString()
  }
  if (typeof value === "string" && value.length > 0) {
    return value
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value).toISOString()
  }
  return fallback
}

function getBaseUrl() {
  // Try to derive from the current request (works in SSR)
  try {
    const h = headers()
    // headers() returns a Promise in RSC; await it safely
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const hdrs = (h as unknown as Promise<Readonly<Map<string, string>>>)
    // Attempt to read synchronously if not a promise
    // Fallback to envs below if unavailable
    // @ts-ignore
    const resolved = typeof hdrs?.then === "function" ? undefined : (h as unknown as ReadonlyHeaders)
    // @ts-ignore
    const proto = resolved?.get?.("x-forwarded-proto") ?? "https"
    // @ts-ignore
    const host = resolved?.get?.("host")
    if (host) return `${proto}://${host}`
  } catch {
    // headers() may throw during static build
  }

  // Prefer explicit app URL when set
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  // Auth/NextAuth configured domain
  if (process.env.AUTH_URL) return process.env.AUTH_URL
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
  // Vercel provides the deployment host
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  // Local fallback
  return "http://localhost:3000"
}