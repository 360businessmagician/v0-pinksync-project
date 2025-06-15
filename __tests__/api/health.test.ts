import { GET } from "@/app/api/health/route"
import { pinkSyncAPI } from "@/lib/pinksync-api"

// Mock dependencies
jest.mock("@/lib/pinksync-api")

const mockPinkSyncAPI = pinkSyncAPI as jest.Mocked<typeof pinkSyncAPI>

describe("/api/health", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return healthy status when all services are up", async () => {
    mockPinkSyncAPI.healthCheck.mockResolvedValue({
      status: "healthy",
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe("healthy")
    expect(data.services).toEqual({
      api: "healthy",
      pinksync: "healthy",
      database: "healthy",
    })
    expect(data.timestamp).toBeDefined()
    expect(data.version).toBe("1.0.0")
  })

  it("should return unhealthy status when PinkSync service is down", async () => {
    mockPinkSyncAPI.healthCheck.mockRejectedValue(new Error("Service unavailable"))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe("unhealthy")
    expect(data.services).toEqual({
      api: "healthy",
      pinksync: "unhealthy",
      database: "unknown",
    })
    expect(data.error).toBe("Service unavailable")
  })
})
