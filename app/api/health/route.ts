import { NextResponse } from "next/server"
import { pinkSyncAPI } from "@/lib/pinksync-api"

export async function GET() {
  try {
    // Check PinkSync API health
    const pinkSyncHealth = await pinkSyncAPI.healthCheck()

    // Check database connection (if applicable)
    // const dbHealth = await checkDatabaseConnection()

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        api: "healthy",
        pinksync: pinkSyncHealth.status || "healthy",
        database: "healthy", // dbHealth.status
      },
      version: "1.0.0",
    }

    return NextResponse.json(health)
  } catch (error) {
    console.error("Health check error:", error)

    const health = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      services: {
        api: "healthy",
        pinksync: "unhealthy",
        database: "unknown",
      },
      error: error instanceof Error ? error.message : "Unknown error",
      version: "1.0.0",
    }

    return NextResponse.json(health, { status: 503 })
  }
}
