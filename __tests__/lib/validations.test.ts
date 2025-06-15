import { registrationSchema } from "@/lib/validations"

describe("Registration Schema Validation", () => {
  const validData = {
    fullName: "John Doe",
    email: "john@example.com",
    password: "Password123!",
    confirmPassword: "Password123!",
    phone: "+15551234567",
    signLanguagePreference: "asl" as const,
    preferredCommunication: "video" as const,
    offlineAccess: true,
    acceptTerms: true,
  }

  it("should validate correct registration data", () => {
    const result = registrationSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it("should reject invalid email", () => {
    const invalidData = { ...validData, email: "invalid-email" }
    const result = registrationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("email"))).toBe(true)
    }
  })

  it("should reject weak password", () => {
    const invalidData = { ...validData, password: "123", confirmPassword: "123" }
    const result = registrationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("password"))).toBe(true)
    }
  })

  it("should reject mismatched passwords", () => {
    const invalidData = { ...validData, confirmPassword: "DifferentPassword123!" }
    const result = registrationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("confirmPassword"))).toBe(true)
    }
  })

  it("should reject if terms not accepted", () => {
    const invalidData = { ...validData, acceptTerms: false }
    const result = registrationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("acceptTerms"))).toBe(true)
    }
  })

  it("should accept empty phone number", () => {
    const dataWithEmptyPhone = { ...validData, phone: "" }
    const result = registrationSchema.safeParse(dataWithEmptyPhone)
    expect(result.success).toBe(true)
  })

  it("should reject invalid phone number", () => {
    const invalidData = { ...validData, phone: "123" }
    const result = registrationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("phone"))).toBe(true)
    }
  })
})
