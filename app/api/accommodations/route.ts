import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { verifyToken } from "@/lib/auth"
import { pinkSyncAPI } from "@/lib/pinksync-api"

const accommodationSchema = z.object({
  type: z.enum(["interpreter", "captions", "visual-aids", "other"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().optional(),
  dateTime: z.string().optional(),
  urgency: z.enum(["low", "medium", "high"]).optional().default("medium"),
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
    const validatedData = accommodationSchema.parse(body)

    // Create accommodation request via PinkSync API
    const response = await pinkSyncAPI.createAccommodationRequest({
      userId: payload.userId,
      ...validatedData,
    })

    return NextResponse.json({
      success: true,
      message: "Accommodation request created successfully",
      data: response,
    })
  } catch (error) {
    console.error("Accommodation request error:", error)

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

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
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

    // Fetch user's accommodation requests from PinkSync API
    const response = await pinkSyncAPI.getUserAccommodationRequests(payload.userId)

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch accommodation requests from PinkSync API")
    }

    return NextResponse.json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    console.error("Get accommodations error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
