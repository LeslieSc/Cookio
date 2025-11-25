"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Clock, Flame, Users } from "lucide-react"
import type { Recipe } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
  onLike?: (id: string) => void
}

export function RecipeCard({ recipe, onLike }: RecipeCardProps) {
  const difficultyColors = {
    easy: "bg-accent text-accent-foreground",
    medium: "bg-primary/20 text-primary",
    hard: "bg-destructive/20 text-destructive",
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
      <Link href={`/recipes/${recipe.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className={cn("absolute top-3 left-3 capitalize", difficultyColors[recipe.difficulty])}>
            {recipe.difficulty}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/recipes/${recipe.slug}`}>
            <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
              {recipe.title}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={(e) => {
              e.preventDefault()
              onLike?.(recipe.id)
            }}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                recipe.isLiked ? "fill-destructive text-destructive" : "text-muted-foreground",
              )}
            />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{recipe.description}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.categories.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs capitalize">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{recipe.time} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" />
            <span>{recipe.calories} cal</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{recipe.servings}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
