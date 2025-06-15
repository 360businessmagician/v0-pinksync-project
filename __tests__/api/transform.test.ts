import { POST, GET } from "@/app/api/transform/route"
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

describe("/api/transform", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCookies.get.mockReturnValue({ value: "valid_token" })
    mockVerifyToken.mockReturnValue({ userId: "user_123" })
  })

  describe("POST /api/transform", () => {
    const validTransformData = {
      text: "Hello world! This is a test.",
      signLanguage: "asl" as const,
      outputFormat: "mp4" as const,
      quality: "medium" as const,
    }

    it("should transform text successfully", async () => {
      const mockResponse = {
        success: true,
        data: {
          videoUrl: "https://example.com/video.mp4",
          thumbnailUrl: "https://example.com/thumb.jpg",
          duration: 5,
          format: "mp4",
          signLanguage: "asl",
          transformId: "transform_123",
        },
      }

      mockPinkSyncAPI.transformText.mockResolvedValue(mockResponse)

      const request = new NextRequest("http://localhost:3000/api/transform", {
        method: "POST",
        body: JSON.stringify(validTransformData),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe("Transformation successful")
      expect(data.data).toEqual(mockResponse.data)

      expect(mockPinkSyncAPI.transformText).toHaveBeenCalledWith(validTransformData)
    })

    it("should return error for unauthorized request", async () => {
      mockCookies.get.mockReturnValue(undefined)

      const request = new NextRequest("http://localhost:3000/api/transform", {
        method: "POST",
        body: JSON.stringify(validTransformData),
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

    it("should return validation error for invalid data", async () => {
      const invalidData = {
        text: "", // Empty text
        signLanguage: "invalid" as any,
        outputFormat: "invalid" as any,
        quality: "invalid" as any,
      }

      const request = new NextRequest("http://localhost:3000/api/transform", {
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

    it("should handle PinkSync API errors", async () => {
      mockPinkSyncAPI.transformText.mockResolvedValue({
        success: false,
        error: "PinkSync service error",
      })

      const request = new NextRequest("http://localhost:3000/api/transform", {
        method: "POST",
        body: JSON.stringify(validTransformData),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toBe("PinkSync service error")
    })

    it("should handle network errors", async () => {
      mockPinkSyncAPI.transformText.mockRejectedValue(new Error("API request failed: 503"))

      const request = new NextRequest("http://localhost:3000/api/transform", {
        method: "POST",
        body: JSON.stringify(validTransformData),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.success).toBe(false)
      expect(data.message).toBe("PinkSync service temporarily unavailable")
    })
  })

  describe("GET /api/transform", () => {
    it("should get transform status successfully", async () => {
      const mockStatusResponse = {
        success: true,
        status: "completed",
        data: {
          transformId: "transform_123",
          progress: 100,
        },
      }

      mockPinkSyncAPI.getTransformStatus.mockResolvedValue(mockStatusResponse)

      const request = new NextRequest("http://localhost:3000/api/transform?id=transform_123")
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockStatusResponse)

      expect(mockPinkSyncAPI.getTransformStatus).toHaveBeenCalledWith("transform_123")
    })

    it("should return error for missing transform ID", async () => {
      const request = new NextRequest("http://localhost:3000/api/transform")
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toBe("Transform ID required")
    })
  })
})
