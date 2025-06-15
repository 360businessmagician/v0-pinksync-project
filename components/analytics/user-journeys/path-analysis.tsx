"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data for path analysis
const pathData = [
  {
    path: "Landing → Text-to-Sign → Video Repository → Exit",
    users: 2850,
    percentage: 28.5,
    avgTime: "4:32",
    conversion: 65,
    dropoff: "Video Repository",
  },
  {
    path: "Landing → Video Repository → Community → Exit",
    users: 1950,
    percentage: 19.5,
    avgTime: "6:18",
    conversion: 72,
    dropoff: "Community",
  },
  {
    path: "Landing → Real-time Translation → Settings → Exit",
    users: 1450,
    percentage: 14.5,
    avgTime: "5:45",
    conversion: 58,
    dropoff: "Settings",
  },
  {
    path: "Landing → Text-to-Sign → Real-time Translation → Exit",
    users: 1250,
    percentage: 12.5,
    avgTime: "7:12",
    conversion: 81,
    dropoff: "Exit",
  },
  {
    path: "Landing → Video Repository → Text-to-Sign → Exit",
    users: 950,
    percentage: 9.5,
    avgTime: "5:28",
    conversion: 62,
    dropoff: "Text-to-Sign",
  },
  {
    path: "Landing → Settings → Profile → Exit",
    users: 650,
    percentage: 6.5,
    avgTime: "3:55",
    conversion: 45,
    dropoff: "Profile",
  },
  {
    path: "Landing → Community → Profile → Exit",
    users: 450,
    percentage: 4.5,
    avgTime: "8:22",
    conversion: 78,
    dropoff: "Exit",
  },
  {
    path: "Landing → Text-to-Sign → Exit",
    users: 450,
    percentage: 4.5,
    avgTime: "2:15",
    conversion: 35,
    dropoff: "Text-to-Sign",
  },
]

// Feature interaction heatmap data
const featureHeatmapData = [
  { feature: "Text-to-Sign", interactions: 8500, intensity: 85 },
  { feature: "Video Repository", interactions: 7200, intensity: 72 },
  { feature: "Real-time Translation", interactions: 5800, intensity: 58 },
  { feature: "Community Validation", interactions: 4200, intensity: 42 },
  { feature: "Settings", interactions: 3500, intensity: 35 },
  { feature: "User Profile", interactions: 2800, intensity: 28 },
  { feature: "Help & Support", interactions: 1500, intensity: 15 },
  { feature: "Feedback", interactions: 1200, intensity: 12 },
]

// Platform heatmap data
const platformHeatmapData = [
  { platform: "MBTQ.dev", feature: "Text-to-Sign", intensity: 92 },
  { platform: "MBTQ.dev", feature: "Video Repository", intensity: 78 },
  { platform: "MBTQ.dev", feature: "Real-time Translation", intensity: 85 },
  { platform: "MBTQ.dev", feature: "Community Validation", intensity: 65 },

  { platform: "MBTQUniverse", feature: "Text-to-Sign", intensity: 88 },
  { platform: "MBTQUniverse", feature: "Video Repository", intensity: 92 },
  { platform: "MBTQUniverse", feature: "Real-time Translation", intensity: 45 },
  { platform: "MBTQUniverse", feature: "Community Validation", intensity: 72 },

  { platform: "VR4Deaf", feature: "Text-to-Sign", intensity: 75 },
  { platform: "VR4Deaf", feature: "Video Repository", intensity: 68 },
  { platform: "VR4Deaf", feature: "Real-time Translation", intensity: 82 },
  { platform: "VR4Deaf", feature: "Community Validation", intensity: 42 },

  { platform: "360 Magicians", feature: "Text-to-Sign", intensity: 65 },
  { platform: "360 Magicians", feature: "Video Repository", intensity: 58 },
  { platform: "360 Magicians", feature: "Real-time Translation", intensity: 38 },
  { platform: "360 Magicians", feature: "Community Validation", intensity: 35 },
]

export function PathAnalysis() {
  const [userType, setUserType] = useState("all")
  const [timeRange, setTimeRange] = useState("30days")
  const [view, setView] = useState("paths")

  const getHeatmapColor = (intensity: number) => {
    // Pink gradient based on intensity
    if (intensity >= 80) return "bg-pink-600"
    if (intensity >= 60) return "bg-pink-500"
    if (intensity >= 40) return "bg-pink-400"
    if (intensity >= 20) return "bg-pink-300"
    return "bg-pink-200"
  }

  const getHeatmapTextColor = (intensity: number) => {
    return intensity >= 60 ? "text-white" : "text-gray-800"
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

        <div className="flex items-center gap-2">
          <Select defaultValue="paths" onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paths">Common Paths</SelectItem>
              <SelectItem value="feature-heatmap">Feature Heatmap</SelectItem>
              <SelectItem value="platform-heatmap">Platform Heatmap</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {view === "paths" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">User Path</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Avg. Time</TableHead>
              <TableHead>Conversion</TableHead>
              <TableHead>Dropoff Point</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pathData.map((path, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{path.path}</TableCell>
                <TableCell>{path.users.toLocaleString()}</TableCell>
                <TableCell>{path.percentage}%</TableCell>
                <TableCell>{path.avgTime}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: `${path.conversion}%` }}></div>
                    </div>
                    <span>{path.conversion}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{path.dropoff}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {view === "feature-heatmap" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Feature Interaction Heatmap</h3>
          <div className="grid grid-cols-1 gap-2">
            {featureHeatmapData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-[200px] font-medium">{item.feature}</div>
                <div className="flex-1 h-10 flex items-center">
                  <div
                    className={`h-full flex items-center justify-end px-3 ${getHeatmapColor(
                      item.intensity,
                    )} ${getHeatmapTextColor(item.intensity)}`}
                    style={{ width: `${item.intensity}%` }}
                  >
                    {item.interactions.toLocaleString()} interactions
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-muted-foreground">Lower Usage</div>
            <div className="flex">
              <div className="w-5 h-5 bg-pink-200"></div>
              <div className="w-5 h-5 bg-pink-300"></div>
              <div className="w-5 h-5 bg-pink-400"></div>
              <div className="w-5 h-5 bg-pink-500"></div>
              <div className="w-5 h-5 bg-pink-600"></div>
            </div>
            <div className="text-xs text-muted-foreground">Higher Usage</div>
          </div>
        </div>
      )}

      {view === "platform-heatmap" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Platform Feature Usage Heatmap</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border">Platform / Feature</th>
                  <th className="text-center p-2 border">Text-to-Sign</th>
                  <th className="text-center p-2 border">Video Repository</th>
                  <th className="text-center p-2 border">Real-time Translation</th>
                  <th className="text-center p-2 border">Community Validation</th>
                </tr>
              </thead>
              <tbody>
                {["MBTQ.dev", "MBTQUniverse", "VR4Deaf", "360 Magicians"].map((platform) => (
                  <tr key={platform}>
                    <td className="font-medium p-2 border">{platform}</td>
                    {["Text-to-Sign", "Video Repository", "Real-time Translation", "Community Validation"].map(
                      (feature) => {
                        const cell = platformHeatmapData.find(
                          (item) => item.platform === platform && item.feature === feature,
                        )
                        return (
                          <td
                            key={`${platform}-${feature}`}
                            className={`p-2 border text-center ${
                              cell ? getHeatmapColor(cell.intensity) : "bg-gray-100"
                            } ${cell ? getHeatmapTextColor(cell.intensity) : ""}`}
                          >
                            {cell ? `${cell.intensity}%` : "N/A"}
                          </td>
                        )
                      },
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
