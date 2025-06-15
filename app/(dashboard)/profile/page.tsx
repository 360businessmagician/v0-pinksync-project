import type { Metadata } from "next"
import { ProfileForm } from "@/components/profile-form"

export const metadata: Metadata = {
  title: "Profile - PinkSync",
  description: "Manage your PinkSync profile",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
      <p className="text-muted-foreground mb-6">Manage your personal information and preferences</p>

      <div className="max-w-2xl">
        <ProfileForm />
      </div>
    </div>
  )
}
