import Link from "next/link"
import { ChefHat } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Cookio</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover delicious recipes, create your own, and share with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=healthy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Healthy Eating
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=dessert"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Desserts
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?difficulty=easy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Quick & Easy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recipes?category=breakfast"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Breakfast
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=lunch"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lunch
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=dinner"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dinner
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=vegetarian"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Vegetarian
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=saved"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Saved Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/create"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Create Recipe
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cookio. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
