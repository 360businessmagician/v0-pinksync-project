import type { Metadata } from "next"
import LoginForm from "@/components/login-form"
import { PinkSyncLogo } from "@/components/pink-sync-logo"

export const metadata: Metadata = {
  title: "Login - PinkSync",
  description: "Login to your PinkSync account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <PinkSyncLogo className="mx-auto h-12 w-12" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <a href="/register" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
