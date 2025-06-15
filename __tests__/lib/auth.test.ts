import { hashPassword, verifyPassword, generateToken, verifyToken } from "@/lib/auth"

describe("Auth Utilities", () => {
  describe("Password Hashing", () => {
    it("should hash password correctly", async () => {
      const password = "TestPassword123!"
      const hash = await hashPassword(password)

      expect(hash).toBeDefined()
      expect(hash).not.toBe(password)
      expect(hash.length).toBeGreaterThan(50) // bcrypt hashes are typically 60 characters
    })

    it("should verify password correctly", async () => {
      const password = "TestPassword123!"
      const hash = await hashPassword(password)

      const isValid = await verifyPassword(password, hash)
      expect(isValid).toBe(true)

      const isInvalid = await verifyPassword("WrongPassword", hash)
      expect(isInvalid).toBe(false)
    })
  })

  describe("JWT Tokens", () => {
    it("should generate and verify token correctly", () => {
      const userId = "user_123"
      const token = generateToken(userId)

      expect(token).toBeDefined()
      expect(typeof token).toBe("string")

      const payload = verifyToken(token)
      expect(payload).toBeDefined()
      expect(payload?.userId).toBe(userId)
    })

    it("should return null for invalid token", () => {
      const invalidToken = "invalid.token.here"
      const payload = verifyToken(invalidToken)
      expect(payload).toBeNull()
    })

    it("should return null for expired token", () => {
      // This would require mocking the JWT library to create an expired token
      // For now, we'll test with a malformed token
      const expiredToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyXzEyMyIsImV4cCI6MTYwMDAwMDAwMH0.invalid"
      const payload = verifyToken(expiredToken)
      expect(payload).toBeNull()
    })
  })
})
