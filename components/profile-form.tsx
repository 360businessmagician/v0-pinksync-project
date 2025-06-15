"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  signLanguagePreference: z.enum(["asl", "bsl", "auslan", "lsf", "other"]),
  preferredCommunication: z.enum(["video", "text", "captions", "visual"]),
})

type ProfileData = z.infer<typeof profileSchema>

export function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: "",
      signLanguagePreference: (user?.signLanguagePreference as any) || "asl",
      preferredCommunication: (user?.preferredCommunication as any) || "video",
    },
  })

  const watchedValues = watch()

  const onSubmit = async (data: ProfileData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await refreshUser()

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating your profile",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information and preferences</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} aria-invalid={!!errors.fullName} />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signLanguagePreference">Preferred Sign Language</Label>
            <Select
              value={watchedValues.signLanguagePreference}
              onValueChange={(value) => setValue("signLanguagePreference", value as any)}
            >
              <SelectTrigger id="signLanguagePreference">
                <SelectValue placeholder="Select your preferred sign language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asl">American Sign Language (ASL)</SelectItem>
                <SelectItem value="bsl">British Sign Language (BSL)</SelectItem>
                <SelectItem value="auslan">Auslan (Australian Sign Language)</SelectItem>
                <SelectItem value="lsf">French Sign Language (LSF)</SelectItem>
                <SelectItem value="other">Other Sign Language</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredCommunication">Preferred Communication Method</Label>
            <Select
              value={watchedValues.preferredCommunication}
              onValueChange={(value) => setValue("preferredCommunication", value as any)}
            >
              <SelectTrigger id="preferredCommunication">
                <SelectValue placeholder="Select your preferred communication method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Sign Language Video</SelectItem>
                <SelectItem value="text">Simplified Text</SelectItem>
                <SelectItem value="captions">Real-time Captions</SelectItem>
                <SelectItem value="visual">Visual Aids</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="bg-pink-600 hover:bg-pink-700">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
