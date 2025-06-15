import { type NextRequest, NextResponse } from "next/server"
import { registrationSchema } from "@/lib/validations"
import { hashPassword } from "@/lib/auth"
import { createUser, getUserByEmail } from "@/lib/database"
import { ZodError } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedData = registrationSchema.parse(body)

    // Check if user already exists
    const existingUser = await getUserByEmail(validatedData.email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
          errors: {
            email: ["An account with this email already exists"],
          },
        },
        { status: 400 },
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await createUser({
      email: validatedData.email,
      fullName: validatedData.fullName,
      hashedPassword,
      phone: validatedData.phone,
      signLanguagePreference: validatedData.signLanguagePreference,
      preferredCommunication: validatedData.preferredCommunication,
      offlineAccess: validatedData.offlineAccess,
    })

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, user.id)

    // Return success response (don't include sensitive data)
    return NextResponse.json({
      success: true,
      message: "Registration successful",
      userId: user.id,
      features: {
        textToVideo: true,
        offlineAccess: user.offline_access,
        signLanguage: user.sign_language_preference,
        communicationPreference: user.preferred_communication,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof ZodError) {
      // Handle validation errors
      const fieldErrors: Record<string, string[]> = {}
      error.errors.forEach((err) => {
        const field = err.path.join(".")
        if (!fieldErrors[field]) {
          fieldErrors[field] = []
        }
        fieldErrors[field].push(err.message)
      })

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: fieldErrors,
        },
        { status: 400 },
      )
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
