import { POST, GET } from "@/app/api/accommodations/route"
import { verifyToken } from "@/lib/auth"
import { pinkSyncAPI } from "@/lib/pinksync-api"
import { NextRequest } from "next/server"

// Mock dependencies
jest.mock("@/lib/auth")
jest.mock("@/lib/pinksync-api")

const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>
const mockPinkSyncAPI = pinkSyncAPI as jest.Mocked<typeof pinkSyncAPI>

// Mock cookies
const mockCookies = {
  get: jest.fn(),
}

jest.mock("next/headers", () => ({
  cookies: () => mockCookies,
}))

describe("/api/accommodations", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCookies.get.mockReturnValue({ value: "valid_token" })
    mockVerifyToken.mockReturnValue({ userId: "user_123" })
  })

  describe("POST /api/accommodations", () => {
    const validAccommodationData = {
      type: "interpreter" as const,
      description: "ASL interpreter needed for team meeting",
      location: "Conference Room A",
      dateTime: "2024-01-15T14:00:00Z",
      urgency: "medium" as const,
    }

    it("should create accommodation request successfully", async () => {
      const mockResponse = {
        success: true,
        data: {
          id: "acc_123",
          ...validAccommodationData,
          userId: "user_123",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      }

      mockPinkSyncAPI.createAccommodationRequest.mockResolvedValue(mockResponse)

      const request = new NextRequest("http://localhost:3000/api/accommodations", {
        method: "POST",
        body: JSON.stringify(validAccommodationData),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe("Accommodation request created successfully")
      expect(data.data).toEqual(mockResponse)

      expect(mockPinkSyncAPI.createAccommodationRequest).toHaveBeenCalledWith({
        userId: "user_123",
        ...validAccommodationData,
      })
    })

    it("should return validation error for invalid data", async () => {
      const invalidData = {
        type: "invalid" as any,
        description: "Short", // Too short
        urgency: "invalid" as any,
      }

      const request = new NextRequest("http://localhost:3000/api/accommodations", {
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
      expect(data.errors).toBeDefined()
    })

    it("should return error for unauthorized request", async () => {
      mockCookies.get.mockReturnValue(undefined)

      const request = new NextRequest("http://localhost:3000/api/accommodations", {
        method: "POST",
        body: JSON.stringify(validAccommodationData),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.message).toBe("Unauthorized")
    })
  })

  describe("GET /api/accommodations", () => {
    it("should get accommodation requests successfully", async () => {
      const request = new NextRequest("http://localhost:3000/api/accommodations")
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it("should return error for unauthorized request", async () => {
      mockCookies.get.mockReturnValue(undefined)

      const request = new NextRequest("http://localhost:3000/api/accommodations")
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.message).toBe("Unauthorized")
    })
  })
})
