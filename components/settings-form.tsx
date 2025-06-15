"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export function SettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    accessibility: {
      offlineAccess: true,
      autoTransform: true,
      highContrast: false,
    },
    privacy: {
      shareUsageData: true,
      allowThirdPartyContent: false,
    },
  })

  const handleToggle = (category: string, setting: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: checked,
      },
    }))
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "An error occurred while saving your settings",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accessibility">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="accessibility" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="offline-access" className="text-base">
                    Offline Access
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable access to essential features without internet connection
                  </p>
                </div>
                <Switch
                  id="offline-access"
                  checked={settings.accessibility.offlineAccess}
                  onCheckedChange={(checked) => handleToggle("accessibility", "offlineAccess", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-transform" className="text-base">
                    Auto-Transform Content
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically transform text content to your preferred format
                  </p>
                </div>
                <Switch
                  id="auto-transform"
                  checked={settings.accessibility.autoTransform}
                  onCheckedChange={(checked) => handleToggle("accessibility", "autoTransform", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast" className="text-base">
                    High Contrast Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Enable high contrast colors for better visibility</p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={settings.accessibility.highContrast}
                  onCheckedChange={(checked) => handleToggle("accessibility", "highContrast", checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-base">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleToggle("notifications", "email", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications" className="text-base">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => handleToggle("notifications", "push", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications" className="text-base">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) => handleToggle("notifications", "sms", checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="share-usage" className="text-base">
                    Share Usage Data
                  </Label>
                  <p className="text-sm text-muted-foreground">Help improve PinkSync by sharing anonymous usage data</p>
                </div>
                <Switch
                  id="share-usage"
                  checked={settings.privacy.shareUsageData}
                  onCheckedChange={(checked) => handleToggle("privacy", "shareUsageData", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="third-party" className="text-base">
                    Allow Third-Party Content
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow third-party content and services</p>
                </div>
                <Switch
                  id="third-party"
                  checked={settings.privacy.allowThirdPartyContent}
                  onCheckedChange={(checked) => handleToggle("privacy", "allowThirdPartyContent", checked)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isSubmitting} className="bg-pink-600 hover:bg-pink-700">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
