import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminLayout } from "@/components/admin-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PinkSync Admin | One Layer. One Accessibility",
  description: "Admin interface for PinkSync - The unified accessibility layer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AdminLayout>{children}</AdminLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
