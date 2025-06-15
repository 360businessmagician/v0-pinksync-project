import { POST } from "@/app/api/register/route"
import { createUser, getUserByEmail } from "@/lib/database"
import { hashPassword } from "@/lib/auth" // Import actual hashPassword
import { NextRequest } from "next/server"

// Mock database dependencies (keep these mocked as they are external)
jest.mock("@/lib/database")

// Keep hashPassword mocked here to control its output for createUser
// This allows us to test the route handler's interaction with the hashed password
jest.mock("@/lib/auth", () => ({
  ...jest.requireActual("@/lib/auth"), // Import actual functions
  hashPassword: jest.fn(), // Mock hashPassword specifically
}))

const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>
const mockGetUserByEmail = getUserByEmail as jest.MockedFunction<typeof getUserByEmail>
const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>

describe("/api/register", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const validUserData = {
    fullName: "John Doe",
    email: "john@example.com",
    password: "Password123!",
    confirmPassword: "Password123!",
    phone: "+15551234567",
    signLanguagePreference: "asl",
    preferredCommunication: "video",
    offlineAccess: true,
    acceptTerms: true,
  }

  it("should register a new user successfully", async () => {
    // Mock implementations
    mockGetUserByEmail.mockResolvedValue(null)
    mockHashPassword.mockResolvedValue("hashed_password") // Control the output of hashPassword
    mockCreateUser.mockResolvedValue({
      id: "user_123",
      email: "john@example.com",
      full_name: "John Doe",
      phone: "+15551234567",
      sign_language_preference: "asl",
      preferred_communication: "video",
      offline_access: true,
      created_at: new Date(),
      updated_at: new Date(),
    })

    const request = new NextRequest("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(validUserData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.userId).toBe("user_123")
    expect(data.features).toEqual({
      textToVideo: true,
      offlineAccess: true,
      signLanguage: "asl",
      communicationPreference: "video",
    })

    expect(mockGetUserByEmail).toHaveBeenCalledWith("john@example.com")
    expect(mockHashPassword).toHaveBeenCalledWith("Password123!")
    expect(mockCreateUser).toHaveBeenCalledWith({
      email: "john@example.com",
      fullName: "John Doe",
      hashedPassword: "hashed_password",
      phone: "+15551234567",
      signLanguagePreference: "asl",
      preferredCommunication: "video",
      offlineAccess: true,
    })
  })

  it("should return error if user already exists", async () => {
    mockGetUserByEmail.mockResolvedValue({
      id: "existing_user",
      email: "john@example.com",
      full_name: "John Doe",
      phone: null,
      sign_language_preference: "asl",
      preferred_communication: "video",
      offline_access: true,
      created_at: new Date(),
      updated_at: new Date(),
    })

    const request = new NextRequest("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(validUserData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.message).toBe("User already exists")
    expect(data.errors.email).toEqual(["An account with this email already exists"])
  })

  it("should return validation errors for invalid data", async () => {
    const invalidData = {
      ...validUserData,
      email: "invalid-email",
      password: "123", // Too short
      fullName: "A", // Too short
    }

    const request = new NextRequest("http://localhost:3000/api/register", {
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
    expect(data.message).toBe("Validation failed")
    expect(data.errors).toBeDefined()
  })

  it("should return error for mismatched passwords", async () => {
    const mismatchedData = {
      ...validUserData,
      confirmPassword: "DifferentPassword123!",
    }

    const request = new NextRequest("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(mismatchedData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.errors.confirmPassword).toEqual(["Passwords don't match"])
  })

  it("should handle database errors gracefully", async () => {
    mockGetUserByEmail.mockRejectedValue(new Error("Database connection failed"))

    const request = new NextRequest("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(validUserData),
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
