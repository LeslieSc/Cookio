import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { RecipeForm } from "@/components/recipe-form"

export default async function CreateRecipePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Recipe</h1>
        <p className="mt-2 text-muted-foreground">Share your culinary creation with the community</p>
      </div>

      <RecipeForm mode="create" />
    </div>
  )
}
