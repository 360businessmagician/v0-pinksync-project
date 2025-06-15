"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for feature funnels
const translationFunnel = [
  { stage: "Visit Text-to-Sign", users: 10000, percentage: 100 },
  { stage: "Enter Text", users: 8500, percentage: 85 },
  { stage: "View Translation", users: 7200, percentage: 72 },
  { stage: "Save/Share Translation", users: 4800, percentage: 48 },
  { stage: "Return for Another Translation", users: 3200, percentage: 32 },
]

const videoFunnel = [
  { stage: "Visit Video Repository", users: 8000, percentage: 100 },
  { stage: "Search for Sign", users: 6400, percentage: 80 },
  { stage: "View Video", users: 5600, percentage: 70 },
  { stage: "Vote on Video", users: 2800, percentage: 35 },
  { stage: "Contribute New Video", users: 800, percentage: 10 },
]

const realTimeFunnel = [
  { stage: "Visit Real-time Translation", users: 6000, percentage: 100 },
  { stage: "Start Session", users: 4800, percentage: 80 },
  { stage: "Use for > 1 minute", users: 3600, percentage: 60 },
  { stage: "Use for > 5 minutes", users: 2400, percentage: 40 },
  { stage: "Save Session", users: 1200, percentage: 20 },
]

const communityFunnel = [
  { stage: "Visit Community Section", users: 4000, percentage: 100 },
  { stage: "View Submissions", users: 3200, percentage: 80 },
  { stage: "Vote on Submission", users: 1600, percentage: 40 },
  { stage: "Comment on Submission", users: 800, percentage: 20 },
  { stage: "Submit New Sign", users: 400, percentage: 10 },
]

export function FeatureFunnels() {
  const [userType, setUserType] = useState("all")
  const [platform, setPlatform] = useState("all")
  const [timeRange, setTimeRange] = useState("30days")

  const renderFunnel = (data: typeof translationFunnel) => {
    return (
      <div className="space-y-4 mt-4">
        {data.map((stage, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{stage.stage}</span>
              <span className="text-sm text-muted-foreground">
                {stage.users.toLocaleString()} users ({stage.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 dark:bg-gray-700 relative">
              <div className="bg-pink-600 h-4 rounded-full" style={{ width: `${stage.percentage}%` }}></div>
              {index < data.length - 1 && (
                <div className="absolute bottom-0 left-0 w-full flex justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"></div>
                </div>
              )}
            </div>
            {index < data.length - 1 && (
              <div className="text-xs text-muted-foreground text-center">
                {data[index].percentage - data[index + 1].percentage}% drop-off
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="all" onValueChange={setUserType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="deaf">Deaf Users</SelectItem>
              <SelectItem value="hoh">Hard of Hearing</SelectItem>
              <SelectItem value="interpreter">Interpreters</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="mbtq">MBTQ.dev</SelectItem>
              <SelectItem value="universe">MBTQUniverse</SelectItem>
              <SelectItem value="vr">VR4Deaf</SelectItem>
              <SelectItem value="magicians">360 Magicians</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="30days" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="translation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="translation">Text-to-Sign</TabsTrigger>
          <TabsTrigger value="video">Video Repository</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Translation</TabsTrigger>
          <TabsTrigger value="community">Community Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="translation">
          <Card>
            <CardHeader>
              <CardTitle>Text-to-Sign Translation Funnel</CardTitle>
              <CardDescription>User journey through the translation process</CardDescription>
            </CardHeader>
            <CardContent>{renderFunnel(translationFunnel)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video Repository Funnel</CardTitle>
              <CardDescription>User journey through the video repository</CardDescription>
            </CardHeader>
            <CardContent>{renderFunnel(videoFunnel)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Translation Funnel</CardTitle>
              <CardDescription>User journey through real-time translation</CardDescription>
            </CardHeader>
            <CardContent>{renderFunnel(realTimeFunnel)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Community Validation Funnel</CardTitle>
              <CardDescription>User journey through community validation</CardDescription>
            </CardHeader>
            <CardContent>{renderFunnel(communityFunnel)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Funnel Insights</CardTitle>
            <CardDescription>Key observations from user journeys</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-pink-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">
                  <strong>High Drop-off:</strong> 52% of users don't save or share their translations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-pink-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">
                  <strong>Engagement Opportunity:</strong> Only 10% of video repository visitors contribute new videos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-pink-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">
                  <strong>Retention Challenge:</strong> 60% of real-time translation users don't use it for more than 5
                  minutes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-pink-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">
                  <strong>Community Gap:</strong> Only 20% of community visitors leave comments on submissions
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>Suggestions to improve user journeys</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">Add social sharing incentives to increase translation sharing by 20%</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">
                  Implement gamification for video contributions to boost repository growth
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">Improve real-time translation UI to increase session duration</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-500 w-2 h-2 mt-2"></div>
                <span className="text-sm">Create community engagement program to boost participation rates</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
