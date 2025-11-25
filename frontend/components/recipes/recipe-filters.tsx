"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { categories, difficulties } from "@/lib/mock-data"
import type { RecipeFilters as Filters } from "@/lib/types"

interface RecipeFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function RecipeFilters({ filters, onFiltersChange }: RecipeFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const updateFilter = (key: keyof Filters, value: string | number | undefined) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== "" && v !== "all")

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant={showFilters ? "secondary" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category</label>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) => updateFilter("category", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Difficulty</label>
            <Select
              value={filters.difficulty || "all"}
              onValueChange={(value) => updateFilter("difficulty", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Difficulty</SelectItem>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff} className="capitalize">
                    {diff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Max Time (min)</label>
            <Select
              value={filters.maxTime?.toString() || "any"}
              onValueChange={(value) => updateFilter("maxTime", value === "any" ? undefined : Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Time</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Max Calories</label>
            <Select
              value={filters.maxCalories?.toString() || "any"}
              onValueChange={(value) =>
                updateFilter("maxCalories", value === "any" ? undefined : Number.parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Calories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Calories</SelectItem>
                <SelectItem value="300">Under 300 cal</SelectItem>
                <SelectItem value="400">Under 400 cal</SelectItem>
                <SelectItem value="500">Under 500 cal</SelectItem>
                <SelectItem value="600">Under 600 cal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
