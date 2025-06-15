"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, MapPin, Clock, Eye } from "lucide-react" // Added Eye icon
import { AccommodationForm } from "@/components/accommodation-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { AccommodationRequest } from "@/lib/pinksync-api"
import { AccommodationDetailsModal } from "./accommodation-details-modal" // Import the new modal component

export function AccommodationManager() {
  const [requests, setRequests] = useState<AccommodationRequest[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false) // New state for modal visibility
  const [selectedRequest, setSelectedRequest] = useState<AccommodationRequest | null>(null) // New state for selected request
  const { toast } = useToast()

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/accommodations")
      const data = await response.json()

      if (data.success) {
        setRequests(data.data)
      } else {
        throw new Error(data.message || "Failed to fetch accommodation requests")
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error)
      toast({
        title: "Error fetching requests",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (requestId: string, newStatus: AccommodationRequest["status"]) => {
    try {
      const response = await fetch(`/api/accommodations/${requestId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        setRequests((prevRequests) =>
          prevRequests.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req)),
        )
        toast({
          title: "Status updated",
          description: `Request ${requestId} status changed to ${newStatus}.`,
        })
      } else {
        throw new Error(result.message || "Failed to update status")
      }
    } catch (error) {
      console.error("Failed to update status:", error)
      toast({
        title: "Status update failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    }
  }

  const handleViewDetails = (request: AccommodationRequest) => {
    setSelectedRequest(request)
    setIsDetailsModalOpen(true)
  }

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

  if (showForm) {
    return (
      <AccommodationForm
        onClose={() => setShowForm(false)}
        onSuccess={() => {
          setShowForm(false)
          fetchRequests()
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Requests</h2>
        <Button onClick={() => setShowForm(true)} className="bg-pink-600 hover:bg-pink-700">
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : requests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No accommodation requests</h3>
            <p className="text-muted-foreground mb-4">You haven't created any accommodation requests yet.</p>
            <Button onClick={() => setShowForm(true)} className="bg-pink-600 hover:bg-pink-700">
              Create Your First Request
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base capitalize">{request.type.replace("-", " ")}</CardTitle>
                  <div className="flex gap-1">
                    <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{request.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {request.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-3 w-3" />
                    {request.location}
                  </div>
                )}
                {request.dateTime && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-3 w-3" />
                    {new Date(request.dateTime).toLocaleDateString()}
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-3 w-3" />
                  Created {new Date(request.createdAt).toLocaleDateString()}
                </div>
                <div className="space-y-2 pt-2">
                  <Label htmlFor={`status-${request.id}`}>Status</Label>
                  <Select
                    value={request.status}
                    onValueChange={(value: AccommodationRequest["status"]) => handleStatusChange(request.id, value)}
                  >
                    <SelectTrigger id={`status-${request.id}`} className="w-full">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="denied">Denied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => handleViewDetails(request)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AccommodationDetailsModal
        request={selectedRequest}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  )
}
