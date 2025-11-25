"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RecipeGrid } from "@/components/recipes/recipe-grid"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { mockRecipes } from "@/lib/mock-data"
import { ChefHat, Heart, BookOpen, Calendar, Settings } from "lucide-react"

// Mock user data
const mockUser = {
  id: "user1",
  name: "Chef Maria",
  email: "maria@example.com",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Passionate home cook sharing my favorite recipes from around the world.",
  joinedDate: "2023-06-15",
  recipesCount: 24,
  likesReceived: 1240,
  savedRecipes: 45,
}

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "recipes"
  const [activeTab, setActiveTab] = useState(initialTab)

  // Filter recipes based on the current user
  const myRecipes = mockRecipes.filter((r) => r.creatorId === mockUser.id)
  const savedRecipes = mockRecipes.filter((r) => r.isSaved)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Profile Header */}
        <section className="bg-muted/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{mockUser.name}</h1>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4 max-w-xl">{mockUser.bio}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined{" "}
                      {new Date(mockUser.joinedDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto md:mx-0">
              <Card>
                <CardContent className="flex flex-col items-center p-4">
                  <ChefHat className="h-5 w-5 text-primary mb-1" />
                  <span className="text-2xl font-bold text-foreground">{mockUser.recipesCount}</span>
                  <span className="text-xs text-muted-foreground">Recipes</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-4">
                  <Heart className="h-5 w-5 text-destructive mb-1" />
                  <span className="text-2xl font-bold text-foreground">{mockUser.likesReceived}</span>
                  <span className="text-xs text-muted-foreground">Likes</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-4">
                  <BookOpen className="h-5 w-5 text-accent mb-1" />
                  <span className="text-2xl font-bold text-foreground">{mockUser.savedRecipes}</span>
                  <span className="text-xs text-muted-foreground">Saved</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recipe Tabs */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="recipes" className="gap-2">
                <ChefHat className="h-4 w-4" />
                My Recipes
              </TabsTrigger>
              <TabsTrigger value="saved" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Saved Recipes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recipes">
              {myRecipes.length > 0 ? (
                <RecipeGrid recipes={myRecipes} />
              ) : (
                <div className="text-center py-12">
                  <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No recipes yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start sharing your culinary creations with the community.
                  </p>
                  <Button asChild>
                    <a href="/recipes/create">Create Your First Recipe</a>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved">
              {savedRecipes.length > 0 ? (
                <RecipeGrid recipes={savedRecipes} />
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No saved recipes</h3>
                  <p className="text-muted-foreground mb-4">Save recipes you love to find them easily later.</p>
                  <Button asChild>
                    <a href="/recipes">Browse Recipes</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  )
}
