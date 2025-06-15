import type { Metadata } from "next"
import RegistrationForm from "@/components/registration-form"
import { PinkSyncLogo } from "@/components/pink-sync-logo"

export const metadata: Metadata = {
  title: "Register - PinkSync",
  description: "Create your PinkSync account",
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center space-y-6 mb-8">
        <PinkSyncLogo className="h-16 w-16" />
        <h1 className="text-3xl font-bold text-center">Create Your PinkSync Account</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Register for enhanced accessibility across digital platforms, in-person interactions, and offline environments
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <RegistrationForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
