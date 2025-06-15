import { POST } from "@/app/api/auth/login/route"
import { getUserByEmail } from "@/lib/database"
import { generateToken, hashPassword } from "@/lib/auth" // Import actual functions
import { NextRequest } from "next/server"

// Mock database dependencies (keep these mocked as they are external)
jest.mock("@/lib/database")

// Do NOT mock lib/auth here, use actual functions
// We will mock generateToken specifically if needed, but verifyPassword will run
jest.mock("@/lib/auth", () => ({
  ...jest.requireActual("@/lib/auth"), // Import actual functions
  generateToken: jest.fn(), // Mock generateToken to control its output
}))

const mockGetUserByEmail = getUserByEmail as jest.MockedFunction<typeof getUserByEmail>
const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>

describe("/api/auth/login", () => {
  let hashedPasswordForTest: string

  beforeAll(async () => {
    // Generate a real hashed password once for all tests
    hashedPasswordForTest = await hashPassword("Password123!")
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const validLoginData = {
    email: "john@example.com",
    password: "Password123!",
  }

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
    password_hash: "", // This will be set in the test
  }

  it("should login user successfully", async () => {
    mockGetUserByEmail.mockResolvedValue({ ...mockUser, password_hash: hashedPasswordForTest })
    mockGenerateToken.mockReturnValue("jwt_token_123")

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(validLoginData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
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

    expect(mockGetUserByEmail).toHaveBeenCalledWith("john@example.com")
    expect(mockGenerateToken).toHaveBeenCalledWith("user_123")
  })

  it("should return error for non-existent user", async () => {
    mockGetUserByEmail.mockResolvedValue(null)

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(validLoginData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.message).toBe("Invalid email or password")
  })

  it("should return error for incorrect password", async () => {
    mockGetUserByEmail.mockResolvedValue({ ...mockUser, password_hash: hashedPasswordForTest })

    const invalidPasswordData = {
      email: "john@example.com",
      password: "WrongPassword!",
    }

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(invalidPasswordData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.message).toBe("Invalid email or password")
  })

  it("should return validation error for invalid email", async () => {
    const invalidData = {
      email: "invalid-email",
      password: "Password123!",
    }

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(invalidData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.message).toBe("Invalid input data")
  })

  it("should handle database errors gracefully", async () => {
    mockGetUserByEmail.mockRejectedValue(new Error("Database connection failed"))

    const request = new NextRequest("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(validLoginData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.message).toBe("Internal server error")
  })
})
