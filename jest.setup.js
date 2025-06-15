// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Mock environment variables for testing
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only"
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test_db"
process.env.NEXT_PUBLIC_PINKSYNC_API_URL = "https://api.pinksync.test"
process.env.NEXT_PUBLIC_PINKSYNC_API_KEY = "test_api_key"
process.env.PINKSYNC_SERVICE_KEY = "test_service_key"
process.env.ALLOWED_ORIGIN = "http://localhost:3000"

// Mock fetch globally
global.fetch = jest.fn()

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks()
})
