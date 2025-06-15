"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AccommodationRequest } from "@/lib/pinksync-api"
import { Calendar, MapPin, Clock, Info } from "lucide-react"

interface AccommodationDetailsModalProps {
  request: AccommodationRequest | null
  isOpen: boolean
  onClose: () => void
}

export function AccommodationDetailsModal({ request, isOpen, onClose }: AccommodationDetailsModalProps) {
  if (!request) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "denied":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-6 w-6 text-pink-600" />
            Accommodation Request Details
          </DialogTitle>
          <DialogDescription>Full information for your {request.type.replace("-", " ")} request.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Type:</span>
            <span className="col-span-3 capitalize">{request.type.replace("-", " ")}</span>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <span className="text-sm font-medium text-muted-foreground">Description:</span>
            <span className="col-span-3">{request.description}</span>
          </div>
          {request.location && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Location:</span>
              <span className="col-span-3 flex items-center">
                <MapPin className="mr-2 h-4 w-4" /> {request.location}
              </span>
            </div>
          )}
          {request.dateTime && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Date & Time:</span>
              <span className="col-span-3 flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> {new Date(request.dateTime).toLocaleString()}
              </span>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Urgency:</span>
            <span className="col-span-3">
              <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <span className="col-span-3">
              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Requested On:</span>
            <span className="col-span-3 flex items-center">
              <Clock className="mr-2 h-4 w-4" /> {new Date(request.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Last Updated:</span>
            <span className="col-span-3 flex items-center">
              <Clock className="mr-2 h-4 w-4" /> {new Date(request.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
