import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { verifyToken } from "@/lib/auth"
import { pinkSyncAPI } from "@/lib/pinksync-api"

const updateStatusSchema = z.object({
  status: z.enum(["pending", "approved", "denied"]),
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const accommodationId = params.id

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
    const validatedData = updateStatusSchema.parse(body)

    // Call PinkSync API to update accommodation status
    const response = await pinkSyncAPI.updateAccommodationRequestStatus(accommodationId, validatedData)

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          message: response.error || "Failed to update accommodation status",
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Accommodation status updated successfully",
      data: response.data,
    })
  } catch (error) {
    console.error("Update accommodation status error:", error)

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
