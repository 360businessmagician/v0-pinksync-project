import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { verifyToken } from "@/lib/auth"
import { pinkSyncAPI } from "@/lib/pinksync-api"

const transformSchema = z.object({
  text: z.string().min(1, "Text is required").max(5000, "Text must be less than 5000 characters"),
  signLanguage: z.enum(["asl", "bsl", "auslan", "lsf"]),
  outputFormat: z.enum(["mp4", "gif", "webm"]).optional().default("mp4"),
  quality: z.enum(["low", "medium", "high"]).optional().default("medium"),
})

export async function POST(request: Request) {
  try {
    // Get token from cookies
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = transformSchema.parse(body)

    // Call PinkSync API
    const response = await pinkSyncAPI.transformText(validatedData)

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          message: response.error || "Transformation failed",
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Transformation successful",
      data: response.data,
    })
  } catch (error) {
    console.error("Transform API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    // Handle PinkSync API errors
    if (error instanceof Error && error.message.includes("API request failed")) {
      return NextResponse.json(
        {
          success: false,
          message: "PinkSync service temporarily unavailable",
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

// Get transformation status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const transformId = searchParams.get("id")

    if (!transformId) {
      return NextResponse.json({ success: false, message: "Transform ID required" }, { status: 400 })
    }

    // Get token from cookies
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    // Get status from PinkSync API
    const response = await pinkSyncAPI.getTransformStatus(transformId)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Transform status error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
