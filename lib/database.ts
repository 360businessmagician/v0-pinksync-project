import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  sign_language_preference: string
  preferred_communication: string
  offline_access: boolean
  created_at: Date
  updated_at: Date
}

export async function createUser(userData: {
  email: string
  fullName: string
  hashedPassword: string
  phone?: string
  signLanguagePreference: string
  preferredCommunication: string
  offlineAccess: boolean
}): Promise<User> {
  const [user] = await sql`
    INSERT INTO users (
      email, 
      full_name, 
      password_hash, 
      phone, 
      sign_language_preference, 
      preferred_communication, 
      offline_access
    )
    VALUES (
      ${userData.email},
      ${userData.fullName},
      ${userData.hashedPassword},
      ${userData.phone || null},
      ${userData.signLanguagePreference},
      ${userData.preferredCommunication},
      ${userData.offlineAccess}
    )
    RETURNING id, email, full_name, phone, sign_language_preference, preferred_communication, offline_access, created_at, updated_at
  `

  return user as User
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, email, full_name, phone, sign_language_preference, preferred_communication, offline_access, created_at, updated_at
    FROM users 
    WHERE email = ${email}
  `

  return (user as User) || null
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await sql`
    SELECT id, email, full_name, phone, sign_language_preference, preferred_communication, offline_access, created_at, updated_at
    FROM users 
    WHERE id = ${id}
  `

  return (user as User) || null
}
