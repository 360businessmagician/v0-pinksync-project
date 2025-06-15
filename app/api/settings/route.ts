import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { verifyToken } from "@/lib/auth"

const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  accessibility: z.object({
    offlineAccess: z.boolean(),
    autoTransform: z.boolean(),
    highContrast: z.boolean(),
  }),
  privacy: z.object({
    shareUsageData: z.boolean(),
    allowThirdPartyContent: z.boolean(),
  }),
})

export async function PUT(request: Request) {
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
    const validatedData = settingsSchema.parse(body)

    // In a real app, update the user settings in the database
    // await updateUserSettings(payload.userId, validatedData)

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    })
  } catch (error) {
    console.error("Settings update error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Invalid input data", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
