// PinkSync API client configuration
const PINKSYNC_API_URL = process.env.NEXT_PUBLIC_PINKSYNC_API_URL!
const PINKSYNC_API_KEY = process.env.NEXT_PUBLIC_PINKSYNC_API_KEY!
const PINKSYNC_SERVICE_KEY = process.env.PINKSYNC_SERVICE_KEY!

export interface TransformRequest {
  text: string
  signLanguage: "asl" | "bsl" | "auslan" | "lsf"
  outputFormat?: "mp4" | "gif" | "webm"
  quality?: "low" | "medium" | "high"
}

export interface TransformResponse {
  success: boolean
  data?: {
    videoUrl: string
    thumbnailUrl: string
    duration: number
    format: string
    signLanguage: string
    transformId: string
  }
  error?: string
}

export interface UserPreferences {
  signLanguagePreference: string
  preferredCommunication: string
  offlineAccess: boolean
  autoTransform: boolean
}

export interface AccommodationRequest {
  id: string
  userId: string
  type: "interpreter" | "captions" | "visual-aids" | "other"
  description: string
  location?: string
  dateTime?: string
  urgency: "low" | "medium" | "high"
  status: "pending" | "approved" | "denied"
  createdAt: string
  updatedAt: string
}

export interface UpdateAccommodationStatusRequest {
  status: "pending" | "approved" | "denied"
}

class PinkSyncAPI {
  private baseURL: string
  private apiKey: string
  private serviceKey: string

  constructor() {
    this.baseURL = PINKSYNC_API_URL
    this.apiKey = PINKSYNC_API_KEY
    this.serviceKey = PINKSYNC_SERVICE_KEY
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`

    const headers = {
      "Content-Type": "application/json",
      "X-API-Key": this.apiKey,
      Authorization: `Bearer ${this.serviceKey}`,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("PinkSync API Error:", error)
      throw error
    }
  }

  // Transform text to sign language video
  async transformText(request: TransformRequest): Promise<TransformResponse> {
    return this.makeRequest("/transform", {
      method: "POST",
      body: JSON.stringify(request),
    })
  }

  // Get transformation status
  async getTransformStatus(transformId: string) {
    return this.makeRequest(`/transform/${transformId}`)
  }

  // Update user preferences
  async updateUserPreferences(userId: string, preferences: UserPreferences) {
    return this.makeRequest(`/users/${userId}/preferences`, {
      method: "PUT",
      body: JSON.stringify(preferences),
    })
  }

  // Get user accessibility profile
  async getUserProfile(userId: string) {
    return this.makeRequest(`/users/${userId}/profile`)
  }

  // Create accommodation request
  async createAccommodationRequest(request: {
    userId: string
    type: string
    description: string
    location?: string
    dateTime?: string
    urgency?: "low" | "medium" | "high"
  }) {
    return this.makeRequest("/accommodations", {
      method: "POST",
      body: JSON.stringify(request),
    })
  }

  // Get user's accommodation requests
  async getUserAccommodationRequests(userId: string): Promise<{ success: boolean; data: AccommodationRequest[] }> {
    return this.makeRequest(`/accommodations/user/${userId}`)
  }

  // Update accommodation request status
  async updateAccommodationRequestStatus(
    accommodationId: string,
    data: UpdateAccommodationStatusRequest,
  ): Promise<{ success: boolean; data?: AccommodationRequest; error?: string }> {
    return this.makeRequest(`/accommodations/${accommodationId}/status`, {
      method: "PATCH", // Using PATCH for partial update
      body: JSON.stringify(data),
    })
  }

  // Get available sign languages
  async getSignLanguages() {
    return this.makeRequest("/sign-languages")
  }

  // Health check
  async healthCheck() {
    return this.makeRequest("/health")
  }
}

export const pinkSyncAPI = new PinkSyncAPI()
