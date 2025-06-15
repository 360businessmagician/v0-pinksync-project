import { z } from "zod"

export const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes"),

    email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),

    confirmPassword: z.string(),

    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
      .optional()
      .or(z.literal("")),

    signLanguagePreference: z.enum(["asl", "bsl", "auslan", "lsf", "other"]),

    preferredCommunication: z.enum(["video", "text", "captions", "visual"]),

    offlineAccess: z.boolean(),

    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type RegistrationData = z.infer<typeof registrationSchema>
