"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GripVertical, ImageIcon } from "lucide-react"
import { categories, difficulties } from "@/lib/mock-data"
import type { Recipe, Ingredient } from "@/lib/types"
import { toast } from "sonner"

interface RecipeFormProps {
  recipe?: Recipe
  mode: "create" | "edit"
}

interface FormIngredient extends Omit<Ingredient, "id"> {
  id: string
}

export function RecipeForm({ recipe, mode }: RecipeFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [title, setTitle] = useState(recipe?.title || "")
  const [description, setDescription] = useState(recipe?.description || "")
  const [imageUrl, setImageUrl] = useState(recipe?.image || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(recipe?.categories || [])
  const [difficulty, setDifficulty] = useState<string>(recipe?.difficulty || "easy")
  const [time, setTime] = useState(recipe?.time?.toString() || "")
  const [servings, setServings] = useState(recipe?.servings?.toString() || "")
  const [calories, setCalories] = useState(recipe?.calories?.toString() || "")
  const [protein, setProtein] = useState(recipe?.protein?.toString() || "")
  const [carbs, setCarbs] = useState(recipe?.carbs?.toString() || "")
  const [fat, setFat] = useState(recipe?.fat?.toString() || "")
  const [ingredients, setIngredients] = useState<FormIngredient[]>(
    recipe?.ingredients || [{ id: crypto.randomUUID(), name: "", amount: 0, unit: "" }],
  )
  const [instructions, setInstructions] = useState<string[]>(recipe?.instructions || [""])

  const availableCategories = categories.filter((c) => c !== "all")

  const addIngredient = () => {
    setIngredients([...ingredients, { id: crypto.randomUUID(), name: "", amount: 0, unit: "" }])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id))
    }
  }

  const updateIngredient = (id: string, field: keyof Omit<FormIngredient, "id">, value: string | number) => {
    setIngredients(ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)))
  }

  const addInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index))
    }
  }

  const updateInstruction = (index: number, value: string) => {
    setInstructions(instructions.map((inst, i) => (i === index ? value : inst)))
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    if (!title.trim()) {
      toast.error("Please enter a recipe title")
      setIsSubmitting(false)
      return
    }

    if (ingredients.filter((i) => i.name.trim()).length === 0) {
      toast.error("Please add at least one ingredient")
      setIsSubmitting(false)
      return
    }

    if (instructions.filter((i) => i.trim()).length === 0) {
      toast.error("Please add at least one instruction")
      setIsSubmitting(false)
      return
    }

    // In real app, this would call the API
    const recipeData = {
      title,
      description,
      image: imageUrl || "/placeholder.svg?height=400&width=600",
      categories: selectedCategories,
      difficulty,
      time: Number.parseInt(time) || 30,
      servings: Number.parseInt(servings) || 4,
      calories: Number.parseInt(calories) || 0,
      protein: Number.parseInt(protein) || 0,
      carbs: Number.parseInt(carbs) || 0,
      fat: Number.parseInt(fat) || 0,
      ingredients: ingredients.filter((i) => i.name.trim()),
      instructions: instructions.filter((i) => i.trim()),
    }

    console.log("Submitting recipe:", recipeData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success(mode === "create" ? "Recipe created successfully!" : "Recipe updated successfully!")
    router.push("/recipes")
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Recipe Title *</Label>
            <Input
              id="title"
              placeholder="Enter recipe title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your recipe..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button type="button" variant="outline" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories & Details */}
      <Card>
        <CardHeader>
          <CardTitle>Categories & Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((cat) => (
                <Button
                  key={cat}
                  type="button"
                  variant={selectedCategories.includes(cat) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(cat)}
                  className="capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff} className="capitalize">
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Cook Time (minutes)</Label>
              <Input id="time" type="number" placeholder="30" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                placeholder="4"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nutrition */}
      <Card>
        <CardHeader>
          <CardTitle>Nutrition (per serving)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="300"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="20"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="30"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Input id="fat" type="number" placeholder="15" value={fat} onChange={(e) => setFat(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-move shrink-0" />
              <Input
                placeholder="Amount"
                type="number"
                step="0.1"
                className="w-20"
                value={ingredient.amount || ""}
                onChange={(e) => updateIngredient(ingredient.id, "amount", Number.parseFloat(e.target.value) || 0)}
              />
              <Input
                placeholder="Unit"
                className="w-24"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(ingredient.id, "unit", e.target.value)}
              />
              <Input
                placeholder="Ingredient name"
                className="flex-1"
                value={ingredient.name}
                onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(ingredient.id)}
                disabled={ingredients.length === 1}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addIngredient} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                {index + 1}
              </div>
              <Textarea
                placeholder={`Step ${index + 1}...`}
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                rows={2}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeInstruction(index)}
                disabled={instructions.length === 1}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addInstruction} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create Recipe"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
