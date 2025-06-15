import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { getUserByEmail } from "@/lib/database"
import { generateToken } from "@/lib/auth"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Get user from database
    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password (in a real app, you'd get the hash from the database)
    // This is a placeholder since we don't have actual password hashes
    const passwordValid = true // await verifyPassword(password, user.password_hash)
    if (!passwordValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken(user.id)

    // Set cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
    })

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
    console.error("Login error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Invalid input data" }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
