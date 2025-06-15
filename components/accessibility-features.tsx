import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoIcon, MessageSquare, WifiOff, Smartphone, Globe, HandMetal } from "lucide-react"

export function AccessibilityFeatures() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <HandMetal className="mr-2 h-5 w-5 text-pink-500" />
          PinkSync Benefits
        </CardTitle>
        <CardDescription>How PinkSync transforms accessibility for deaf users</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="demo">Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4 pt-4">
            <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
              <VideoIcon className="h-10 w-10 text-pink-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Video-Based Content</h3>
                <p className="text-sm text-gray-600">
                  Converts complex text into simplified, visual content with sign language interpretation
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="h-10 w-10 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Instant Accommodation</h3>
                <p className="text-sm text-gray-600">
                  Request and receive accessibility accommodations in real-time across all environments
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <WifiOff className="h-10 w-10 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Offline Functionality</h3>
                <p className="text-sm text-gray-600">Access essential features even without internet connection</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Globe className="h-10 w-10 mx-auto mb-2 text-pink-500" />
                <h3 className="font-medium">Digital Platforms</h3>
                <p className="text-sm text-gray-600">Web, mobile apps, and smart devices</p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <Smartphone className="h-10 w-10 mx-auto mb-2 text-purple-500" />
                <h3 className="font-medium">In-Person</h3>
                <p className="text-sm text-gray-600">Events, meetings, and educational settings</p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <WifiOff className="h-10 w-10 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium">Offline</h3>
                <p className="text-sm text-gray-600">Cached content and emergency access</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="demo" className="pt-4">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <VideoIcon className="h-12 w-12 mx-auto mb-3 text-pink-500" />
                <h3 className="font-medium mb-2">See PinkSync in Action</h3>
                <p className="text-sm text-gray-600 mb-4">Watch how PinkSync transforms accessibility</p>
                <div className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 cursor-pointer">
                  Watch Demo Video
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
