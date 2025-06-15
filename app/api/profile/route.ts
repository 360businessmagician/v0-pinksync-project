import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { verifyToken } from "@/lib/auth"

const profileSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .or(z.literal("")),
  signLanguagePreference: z.enum(["asl", "bsl", "auslan", "lsf", "other"]),
  preferredCommunication: z.enum(["video", "text", "captions", "visual"]),
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
    const validatedData = profileSchema.parse(body)

    // In a real app, update the user in the database
    // await updateUser(payload.userId, validatedData)

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Profile update error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Invalid input data", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
