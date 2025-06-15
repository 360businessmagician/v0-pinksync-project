import type { Metadata } from "next"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = {
  title: "Settings - PinkSync",
  description: "Manage your PinkSync account settings",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-6">Manage your account settings and preferences</p>

      <div className="max-w-2xl">
        <SettingsForm />
      </div>
    </div>
  )
}
