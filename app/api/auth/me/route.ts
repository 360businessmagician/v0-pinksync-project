import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { getUserById } from "@/lib/database"

export async function GET() {
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

    // Get user from database
    const user = await getUserById(payload.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Return user data (excluding sensitive information)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        signLanguagePreference: user.sign_language_preference,
        preferredCommunication: user.preferred_communication,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
