"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { NutritionSummary } from "@/components/recipes/nutrition-summary"
import { IngredientList } from "@/components/recipes/ingredient-list"
import { mockRecipes } from "@/lib/mock-data"
import { Heart, Bookmark, Share2, Clock, Users, ChefHat, Calendar, Edit, Trash2, ArrowLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Mock current user
const currentUserId = "user1"

export default function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const recipe = mockRecipes.find((r) => r.slug === resolvedParams.slug)

  const [isLiked, setIsLiked] = useState(recipe?.isLiked || false)
  const [isSaved, setIsSaved] = useState(recipe?.isSaved || false)
  const [likesCount, setLikesCount] = useState(recipe?.likes || 0)

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-4">The recipe you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/recipes">Browse Recipes</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isOwner = recipe.creatorId === currentUserId

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    toast.success(isLiked ? "Removed from likes" : "Added to likes")
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? "Removed from saved recipes" : "Recipe saved!")
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    } catch {
      toast.error("Failed to copy link")
    }
  }

  const handleDelete = () => {
    // In real app, this would call the API
    toast.success("Recipe deleted")
    router.push("/recipes")
  }

  const difficultyColors = {
    easy: "bg-accent text-accent-foreground",
    medium: "bg-primary/20 text-primary",
    hard: "bg-destructive/20 text-destructive",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/recipes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipes
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {/* Categories & Difficulty */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={cn("capitalize", difficultyColors[recipe.difficulty])}>{recipe.difficulty}</Badge>
                {recipe.categories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="capitalize">
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{recipe.title}</h1>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-pretty">{recipe.description}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.time} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className={cn("h-4 w-4", isLiked && "fill-destructive text-destructive")} />
                  <span>{likesCount} likes</span>
                </div>
              </div>

              {/* Creator Info */}
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={recipe.creatorAvatar || "/placeholder.svg"} alt={recipe.creatorName} />
                  <AvatarFallback>{recipe.creatorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{recipe.creatorName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-auto">
                <Button variant={isLiked ? "default" : "outline"} onClick={handleLike}>
                  <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button variant={isSaved ? "default" : "outline"} onClick={handleSave}>
                  <Bookmark className={cn("h-4 w-4 mr-2", isSaved && "fill-current")} />
                  {isSaved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>

                {isOwner && (
                  <>
                    <Button variant="outline" asChild>
                      <Link href={`/recipes/${recipe.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this recipe? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Nutrition Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Nutrition per Serving</h2>
          <NutritionSummary
            calories={recipe.calories}
            protein={recipe.protein}
            carbs={recipe.carbs}
            fat={recipe.fat}
            variant="detailed"
          />
        </section>

        {/* Recipe Content */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 bg-card border border-border rounded-xl">
                <IngredientList ingredients={recipe.ingredients} servings={recipe.servings} />
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                Instructions
              </h3>
              <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-foreground leading-relaxed">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Completion */}
              <div className="mt-12 p-6 bg-accent/20 rounded-xl text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Ready to Enjoy!</h4>
                <p className="text-muted-foreground text-sm">
                  Congratulations on making {recipe.title}. Don't forget to share your creation!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
