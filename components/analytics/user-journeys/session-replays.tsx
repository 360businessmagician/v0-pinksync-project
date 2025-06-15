"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, Play, Download, Clock, MousePointer, Eye, Flag } from "lucide-react"

// Sample data for session replays
const sessionData = [
  {
    id: "session-001",
    userType: "Deaf",
    platform: "MBTQ.dev",
    duration: "8:42",
    features: ["Text-to-Sign", "Video Repository", "Community"],
    date: "2025-05-18",
    insights: "High engagement with community features",
  },
  {
    id: "session-002",
    userType: "Hard of Hearing",
    platform: "MBTQUniverse",
    duration: "5:15",
    features: ["Video Repository", "Text-to-Sign"],
    date: "2025-05-18",
    insights: "Struggled with navigation",
  },
  {
    id: "session-003",
    userType: "Interpreter",
    platform: "VR4Deaf",
    duration: "12:30",
    features: ["Real-time Translation", "Settings", "Video Repository"],
    date: "2025-05-17",
    insights: "Power user, explored advanced features",
  },
  {
    id: "session-004",
    userType: "Deaf",
    platform: "360 Magicians",
    duration: "3:45",
    features: ["Text-to-Sign"],
    date: "2025-05-17",
    insights: "Short session, focused on translation only",
  },
  {
    id: "session-005",
    userType: "Hard of Hearing",
    platform: "MBTQ.dev",
    duration: "7:20",
    features: ["Real-time Translation", "Community"],
    date: "2025-05-16",
    insights: "Active community contributor",
  },
  {
    id: "session-006",
    userType: "Deaf",
    platform: "MBTQUniverse",
    duration: "9:55",
    features: ["Video Repository", "Community", "Settings"],
    date: "2025-05-16",
    insights: "Explored customization options",
  },
]

export function SessionReplays() {
  const [userType, setUserType] = useState("all")
  const [platform, setPlatform] = useState("all")
  const [feature, setFeature] = useState("all")
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  const filteredSessions = sessionData.filter((session) => {
    if (userType !== "all" && session.userType !== userType) return false
    if (platform !== "all" && session.platform !== platform) return false
    if (feature !== "all" && !session.features.includes(feature)) return false
    return true
  })

  const getFeatureBadges = (features: string[]) => {
    return features.map((feature, index) => {
      let color = "bg-gray-500"
      if (feature === "Text-to-Sign") color = "bg-pink-500"
      if (feature === "Video Repository") color = "bg-purple-500"
      if (feature === "Real-time Translation") color = "bg-blue-500"
      if (feature === "Community") color = "bg-green-500"
      if (feature === "Settings") color = "bg-gray-500"

      return (
        <Badge key={index} className={`${color} mr-1`}>
          {feature}
        </Badge>
      )
    })
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
              <SelectItem value="Deaf">Deaf Users</SelectItem>
              <SelectItem value="Hard of Hearing">Hard of Hearing</SelectItem>
              <SelectItem value="Interpreter">Interpreters</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="MBTQ.dev">MBTQ.dev</SelectItem>
              <SelectItem value="MBTQUniverse">MBTQUniverse</SelectItem>
              <SelectItem value="VR4Deaf">VR4Deaf</SelectItem>
              <SelectItem value="360 Magicians">360 Magicians</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setFeature}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Feature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Features</SelectItem>
              <SelectItem value="Text-to-Sign">Text-to-Sign</SelectItem>
              <SelectItem value="Video Repository">Video Repository</SelectItem>
              <SelectItem value="Real-time Translation">Real-time Translation</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
              <SelectItem value="Settings">Settings</SelectItem>
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

      <div className="grid grid-cols-1 gap-6">
        {selectedSession ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Session Replay: {sessionData.find((s) => s.id === selectedSession)?.id}
              </h3>
              <Button variant="outline" onClick={() => setSelectedSession(null)}>
                Back to Sessions
              </Button>
            </div>

            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg border relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">Session replay visualization would appear here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing anonymized user interactions with accessibility features
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-pink-500" />
                    <h3 className="font-medium">Session Timeline</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>00:00</span>
                      <span>Landed on homepage</span>
                    </div>
                    <div className="flex justify-between">
                      <span>00:12</span>
                      <span>Navigated to Text-to-Sign</span>
                    </div>
                    <div className="flex justify-between">
                      <span>01:45</span>
                      <span>Completed first translation</span>
                    </div>
                    <div className="flex justify-between">
                      <span>02:30</span>
                      <span>Viewed Video Repository</span>
                    </div>
                    <div className="flex justify-between">
                      <span>04:15</span>
                      <span>Engaged with Community</span>
                    </div>
                    <div className="flex justify-between">
                      <span>08:42</span>
                      <span>Session ended</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MousePointer className="h-5 w-5 text-pink-500" />
                    <h3 className="font-medium">Interaction Hotspots</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Translation Button</span>
                      <Badge className="bg-pink-600">12 clicks</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Video Player</span>
                      <Badge className="bg-pink-500">8 interactions</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Community Tab</span>
                      <Badge className="bg-pink-400">5 clicks</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Settings Menu</span>
                      <Badge className="bg-pink-300">3 clicks</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Help Button</span>
                      <Badge className="bg-pink-200">1 click</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="h-5 w-5 text-pink-500" />
                    <h3 className="font-medium">Key Observations</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Flag className="h-4 w-4 text-pink-500 mt-0.5 shrink-0" />
                      <span>User spent 45% of time in community section</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Flag className="h-4 w-4 text-pink-500 mt-0.5 shrink-0" />
                      <span>Attempted to use unavailable feature (fingerspelling recognition)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Flag className="h-4 w-4 text-pink-500 mt-0.5 shrink-0" />
                      <span>Searched for "medical terms" in video repository</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Flag className="h-4 w-4 text-pink-500 mt-0.5 shrink-0" />
                      <span>Contributed feedback on translation accuracy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session ID</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Features Used</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Key Insights</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.id}</TableCell>
                  <TableCell>{session.userType}</TableCell>
                  <TableCell>{session.platform}</TableCell>
                  <TableCell>{getFeatureBadges(session.features)}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>{session.date}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{session.insights}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setSelectedSession(session.id)}>
                      <Play className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
