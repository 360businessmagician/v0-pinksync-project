import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, MessageSquare, Settings, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard - PinkSync",
  description: "PinkSync user dashboard",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5 text-pink-600" />
              Text to Video
            </CardTitle>
            <CardDescription>Transform text content into sign language videos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Convert complex text into accessible sign language videos with our AI-powered transformation tool.
            </p>
            <Button asChild className="w-full">
              <Link href="/transform">
                Start Transforming <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-pink-600" />
              Accommodation Requests
            </CardTitle>
            <CardDescription>Request accessibility accommodations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create and manage accommodation requests for in-person events, meetings, and educational settings.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/accommodations">
                Manage Requests <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-pink-600" />
              Accessibility Settings
            </CardTitle>
            <CardDescription>Customize your accessibility preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Configure your sign language preferences, communication methods, and offline access settings.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/settings">
                Update Settings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-muted-foreground text-center py-8">Your recent activity will appear here</p>
        </div>
      </div>
    </div>
  )
}
