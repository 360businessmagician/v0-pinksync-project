"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, Smartphone, Wifi, WifiOff, HandMetal, VideoIcon, AlertCircle, CheckCircle2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { registrationSchema, type RegistrationData } from "@/lib/validations"

interface ApiResponse {
  success: boolean
  message: string
  userId?: string
  errors?: Record<string, string[]>
}

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [registrationMode, setRegistrationMode] = useState("digital")
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      offlineAccess: true,
      signLanguagePreference: "asl",
      preferredCommunication: "video",
      acceptTerms: false,
    },
  })

  const watchedValues = watch()

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result: ApiResponse = await response.json()

      if (!response.ok) {
        if (result.errors) {
          // Handle field-specific errors
          Object.entries(result.errors).forEach(([field, messages]) => {
            setError(field as keyof RegistrationData, {
              type: "server",
              message: messages[0],
            })
          })
        } else {
          setApiError(result.message || "Registration failed. Please try again.")
        }
        return
      }

      setIsSuccess(true)
    } catch (error) {
      setApiError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Registration Complete!</h2>
        <p className="text-gray-600">
          Your PinkSync account has been created successfully. You can now access enhanced accessibility features across
          all platforms.
        </p>
        <div className="p-4 bg-pink-50 rounded-lg text-left mt-4">
          <h3 className="font-medium flex items-center">
            <HandMetal className="mr-2 h-5 w-5 text-pink-600" />
            Next Steps
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
            <li>Check your email for verification instructions</li>
            <li>Complete your accessibility profile</li>
            <li>Download the mobile app for offline access</li>
            <li>Explore video content transformation features</li>
          </ul>
        </div>
        <Button className="mt-4 w-full" onClick={() => (window.location.href = "/dashboard")}>
          Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your PinkSync Account</CardTitle>
        <CardDescription>
          Register for enhanced accessibility across digital platforms, in-person interactions, and offline environments
        </CardDescription>
      </CardHeader>
      <CardContent>
        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <Tabs value={registrationMode} onValueChange={setRegistrationMode} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="digital">
              <Wifi className="mr-2 h-4 w-4" />
              Digital
            </TabsTrigger>
            <TabsTrigger value="inperson">
              <Smartphone className="mr-2 h-4 w-4" />
              In-Person
            </TabsTrigger>
            <TabsTrigger value="offline">
              <WifiOff className="mr-2 h-4 w-4" />
              Offline
            </TabsTrigger>
          </TabsList>
          <TabsContent value="digital" className="pt-4">
            <p className="text-sm text-gray-600 mb-4 flex items-center">
              <VideoIcon className="mr-2 h-4 w-4 text-pink-500" />
              Register for access to text-to-video conversion and digital accessibility features
            </p>
          </TabsContent>
          <TabsContent value="inperson" className="pt-4">
            <p className="text-sm text-gray-600 mb-4 flex items-center">
              <HandMetal className="mr-2 h-4 w-4 text-pink-500" />
              Enable in-person verification and instant accommodation requests at physical locations
            </p>
          </TabsContent>
          <TabsContent value="offline" className="pt-4">
            <p className="text-sm text-gray-600 mb-4 flex items-center">
              <WifiOff className="mr-2 h-4 w-4 text-pink-500" />
              Access essential features without internet connection and sync when back online
            </p>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name{" "}
              <span className="text-red-500" aria-label="required">
                *
              </span>
            </Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Enter your full name"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-sm text-red-600" role="alert">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email{" "}
              <span className="text-red-500" aria-label="required">
                *
              </span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">
                Password{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : "password-help"}
              />
              <p id="password-help" className="text-xs text-gray-500">
                Must contain uppercase, lowercase, number, and special character
              </p>
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password{" "}
                <span className="text-red-500" aria-label="required">
                  *
                </span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-sm text-red-600" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex">
              <Smartphone className="mr-2 h-5 w-5 text-gray-400 self-center" />
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+1 (555) 123-4567"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : "phone-help"}
              />
            </div>
            <p id="phone-help" className="text-xs text-gray-500">
              Required for in-person verification and offline access
            </p>
            {errors.phone && (
              <p id="phone-error" className="text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signLanguagePreference">Preferred Sign Language</Label>
            <Select
              value={watchedValues.signLanguagePreference}
              onValueChange={(value) => setValue("signLanguagePreference", value as any)}
            >
              <SelectTrigger>
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
              <SelectTrigger>
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

          <div className="space-y-3 pt-2">
            <Label>Accessibility Features</Label>
            <div className="bg-pink-50 p-3 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <VideoIcon className="h-4 w-4 text-pink-600" />
                  <Label htmlFor="videoTranscription" className="text-sm font-normal">
                    Text-to-Video Conversion
                  </Label>
                </div>
                <Switch id="videoTranscription" checked={true} disabled />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <WifiOff className="h-4 w-4 text-pink-600" />
                  <Label htmlFor="offlineAccess" className="text-sm font-normal">
                    Offline Access
                  </Label>
                </div>
                <Switch
                  id="offlineAccess"
                  checked={watchedValues.offlineAccess}
                  onCheckedChange={(checked) => setValue("offlineAccess", checked)}
                />
              </div>

              <p className="text-xs text-gray-600 pt-1">
                All PinkSync accounts include text simplification, sign language interpretation, and instant
                accommodation requests.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="acceptTerms"
              checked={watchedValues.acceptTerms}
              onCheckedChange={(checked) => setValue("acceptTerms", !!checked)}
              aria-invalid={!!errors.acceptTerms}
              aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
            />
            <div className="space-y-1">
              <Label
                htmlFor="acceptTerms"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="/terms" className="text-pink-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-pink-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </Label>
              {errors.acceptTerms && (
                <p id="terms-error" className="text-sm text-red-600" role="alert">
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              "Create PinkSync Account"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-xs text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 hover:underline">
            Sign in
          </a>
        </p>
        <div className="text-xs text-center text-gray-500 flex items-center justify-center">
          <HandMetal className="h-3 w-3 mr-1 text-pink-500" />
          <span>PinkSync - Layer 1 Accessibility Transformer for Deaf Users</span>
        </div>
      </CardFooter>
    </Card>
  )
}
