import type { Metadata } from "next"
import { AccommodationManager } from "@/components/accommodation-manager"

export const metadata: Metadata = {
  title: "Accommodations - PinkSync",
  description: "Manage your accessibility accommodation requests",
}

export default function AccommodationsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Accommodation Requests</h1>
      <p className="text-muted-foreground mb-6">
        Create and manage accessibility accommodation requests for events, meetings, and educational settings
      </p>

      <AccommodationManager />
    </div>
  )
}
