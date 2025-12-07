import { NextResponse, NextRequest } from "next/server"
import connectMongoose from "@/lib/mongodb"
import RecipeModel from "@/app/models/rescipes"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    await connectMongoose()
    const recipe = await RecipeModel.findOne({ slug }).lean()

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json({ data: recipe })
  } catch (error) {
    console.error("Single recipe fetch failed", error)
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 })
  }
}
