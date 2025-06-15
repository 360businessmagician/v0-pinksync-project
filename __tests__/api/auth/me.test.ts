import { GET } from "@/app/api/auth/me/route"
import { verifyToken } from "@/lib/auth" // Import actual verifyToken
import { getUserById } from "@/lib/database"
import { NextRequest } from "next/server"

// Mock database dependencies (keep these mocked as they are external)
jest.mock("@/lib/database")

// Do NOT mock lib/auth here, use actual functions
jest.mock("@/lib/auth", () => ({
  ...jest.requireActual("@/lib/auth"), // Import actual functions
  verifyToken: jest.fn(), // Mock verifyToken specifically to control its output
}))

const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>
const mockGetUserById = getUserById as jest.MockedFunction<typeof getUserById>

// Mock cookies
const mockCookies = {
  get: jest.fn(),
}

jest.mock("next/headers", () => ({
  cookies: () => mockCookies,
}))

describe("/api/auth/me", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockUser = {
    id: "user_123",
    email: "john@example.com",
    full_name: "John Doe",
    phone: "+15551234567",
    sign_language_preference: "asl",
    preferred_communication: "video",
    offline_access: true,
    created_at: new Date(),
    updated_at: new Date(),
  }

  it("should return user data for valid token", async () => {
    mockCookies.get.mockReturnValue({ value: "valid_token" })
    mockVerifyToken.mockReturnValue({ userId: "user_123" })
    mockGetUserById.mockResolvedValue(mockUser)

    const request = new NextRequest("http://localhost:3000/api/auth/me")
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.user).toEqual({
      id: "user_123",
      email: "john@example.com",
      fullName: "John Doe",
      signLanguagePreference: "asl",
      preferredCommunication: "video",
    })

    expect(mockVerifyToken).toHaveBeenCalledWith("valid_token")
    expect(mockGetUserById).toHaveBeenCalledWith("user_123")
  })

  it("should return unauthorized for missing token", async () => {
    mockCookies.get.mockReturnValue(undefined)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.message).toBe("Unauthorized")
  })

  it("should return unauthorized for invalid token", async () => {
    mockCookies.get.mockReturnValue({ value: "invalid_token" })
    mockVerifyToken.mockReturnValue(null)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.message).toBe("Invalid token")
  })

  it("should return not found for non-existent user", async () => {
    mockCookies.get.mockReturnValue({ value: "valid_token" })
    mockVerifyToken.mockReturnValue({ userId: "user_123" })
    mockGetUserById.mockResolvedValue(null)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.message).toBe("User not found")
  })
})
