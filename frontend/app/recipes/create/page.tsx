import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RecipeForm } from "@/components/recipes/recipe-form"

export default function CreateRecipePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Recipe</h1>
            <p className="text-muted-foreground">Share your culinary creation with the community</p>
          </div>

          <RecipeForm mode="create" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
