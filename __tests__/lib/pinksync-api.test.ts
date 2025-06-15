import { pinkSyncAPI } from "@/lib/pinksync-api"

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe("PinkSync API Client", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("transformText", () => {
    it("should make correct API call for text transformation", async () => {
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

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const request = {
        text: "Hello world!",
        signLanguage: "asl" as const,
        outputFormat: "mp4" as const,
        quality: "medium" as const,
      }

      const result = await pinkSyncAPI.transformText(request)

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.pinksync.test/transform",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "X-API-Key": "test_api_key",
            Authorization: "Bearer test_service_key",
          }),
          body: JSON.stringify(request),
        }),
      )

      expect(result).toEqual(mockResponse)
    })

    it("should handle API errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
      } as Response)

      const request = {
        text: "Hello world!",
        signLanguage: "asl" as const,
        outputFormat: "mp4" as const,
        quality: "medium" as const,
      }

      await expect(pinkSyncAPI.transformText(request)).rejects.toThrow("API request failed: 400 Bad Request")
    })
  })

  describe("healthCheck", () => {
    it("should make correct API call for health check", async () => {
      const mockResponse = {
        status: "healthy",
        timestamp: new Date().toISOString(),
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await pinkSyncAPI.healthCheck()

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.pinksync.test/health",
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "X-API-Key": "test_api_key",
            Authorization: "Bearer test_service_key",
          }),
        }),
      )

      expect(result).toEqual(mockResponse)
    })
  })

  describe("createAccommodationRequest", () => {
    it("should make correct API call for accommodation request", async () => {
      const mockResponse = {
        success: true,
        data: {
          id: "acc_123",
          status: "pending",
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const request = {
        userId: "user_123",
        type: "interpreter",
        description: "ASL interpreter needed",
        location: "Conference Room A",
        dateTime: "2024-01-15T14:00:00Z",
      }

      const result = await pinkSyncAPI.createAccommodationRequest(request)

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.pinksync.test/accommodations",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "X-API-Key": "test_api_key",
            Authorization: "Bearer test_service_key",
          }),
          body: JSON.stringify(request),
        }),
      )

      expect(result).toEqual(mockResponse)
    })
  })
})
