"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"

const accommodationSchema = z.object({
  type: z.enum(["interpreter", "captions", "visual-aids", "other"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().optional(),
  dateTime: z.string().optional(),
  urgency: z.enum(["low", "medium", "high"]),
})

type AccommodationData = z.infer<typeof accommodationSchema>

interface AccommodationFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function AccommodationForm({ onClose, onSuccess }: AccommodationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccommodationData>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      urgency: "medium",
    },
  })

  const watchedValues = watch()

  const onSubmit = async (data: AccommodationData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/accommodations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Request submitted",
          description: "Your accommodation request has been submitted successfully",
        })
        onSuccess()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>New Accommodation Request</CardTitle>
            <CardDescription>
              Request accessibility accommodations for events, meetings, or educational settings
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Accommodation Type</Label>
            <Select value={watchedValues.type} onValueChange={(value: any) => setValue("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select accommodation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interpreter">Sign Language Interpreter</SelectItem>
                <SelectItem value="captions">Real-time Captions</SelectItem>
                <SelectItem value="visual-aids">Visual Aids</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your accommodation needs in detail..."
              className="min-h-[100px]"
              {...register("description")}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input id="location" placeholder="e.g., Conference Room A, Online" {...register("location")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTime">Date & Time (Optional)</Label>
              <Input id="dateTime" type="datetime-local" {...register("dateTime")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={watchedValues.urgency} onValueChange={(value: any) => setValue("urgency", value)}>
              <SelectTrigger id="urgency">
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - More than 1 week notice</SelectItem>
                <SelectItem value="medium">Medium - Within 1 week</SelectItem>
                <SelectItem value="high">High - Urgent (within 24 hours)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-pink-600 hover:bg-pink-700">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
