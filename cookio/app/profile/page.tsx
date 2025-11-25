import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { ChefHat, BookOpen, Heart } from "lucide-react"
import { mockRecipes } from "@/lib/mock-data"
import { ProfileTabs } from "@/components/profile-tabs"

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  // In a real app, fetch user's recipes and saved recipes from API
  const myRecipes = mockRecipes.slice(0, 3)
  const savedRecipes = mockRecipes.slice(3, 6)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <ChefHat className="h-12 w-12 text-primary" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold">{session.user?.name || "Anonymous Chef"}</h1>
          <p className="text-muted-foreground">{session.user?.email}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6 sm:justify-start">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">
                <strong>{myRecipes.length}</strong> recipes created
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">
                <strong>{savedRecipes.length}</strong> recipes saved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ProfileTabs myRecipes={myRecipes} savedRecipes={savedRecipes} />
    </div>
  )
}
