"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts"
import { Download, Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Sample data for platform comparison
const platformUsageData = [
  {
    name: "MBTQ.dev",
    translations: 18500,
    apiCalls: 52000,
    videoViews: 12800,
    uniqueUsers: 8900,
    growth: 15.2,
  },
  {
    name: "MBTQUniverse",
    translations: 14200,
    apiCalls: 38000,
    videoViews: 9500,
    uniqueUsers: 6700,
    growth: 12.8,
  },
  {
    name: "VR4Deaf",
    translations: 11800,
    apiCalls: 32000,
    videoViews: 7200,
    uniqueUsers: 5400,
    growth: 18.5,
  },
  {
    name: "360 Magicians",
    translations: 8500,
    apiCalls: 24000,
    videoViews: 5100,
    uniqueUsers: 3800,
    growth: 22.3,
  },
  {
    name: "MBTQ Group",
    translations: 2800,
    apiCalls: 8000,
    videoViews: 1700,
    uniqueUsers: 1200,
    growth: 8.7,
  },
]

// Feature usage by platform
const featureUsageByPlatform = [
  {
    feature: "Text-to-Sign Translation",
    "MBTQ.dev": 85,
    MBTQUniverse: 92,
    VR4Deaf: 78,
    "360 Magicians": 65,
    "MBTQ Group": 45,
  },
  {
    feature: "Sign Video Repository",
    "MBTQ.dev": 72,
    MBTQUniverse: 88,
    VR4Deaf: 65,
    "360 Magicians": 58,
    "MBTQ Group": 32,
  },
  {
    feature: "Real-time Translation",
    "MBTQ.dev": 92,
    MBTQUniverse: 45,
    VR4Deaf: 82,
    "360 Magicians": 38,
    "MBTQ Group": 25,
  },
  {
    feature: "Community Validation",
    "MBTQ.dev": 68,
    MBTQUniverse: 75,
    VR4Deaf: 42,
    "360 Magicians": 35,
    "MBTQ Group": 18,
  },
  {
    feature: "AI Model Access",
    "MBTQ.dev": 95,
    MBTQUniverse: 65,
    VR4Deaf: 72,
    "360 Magicians": 48,
    "MBTQ Group": 30,
  },
]

export function PlatformComparison() {
  const [timeRange, setTimeRange] = useState("monthly")
  const [metric, setMetric] = useState("translations")

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "translations":
        return "Translations"
      case "apiCalls":
        return "API Calls"
      case "videoViews":
        return "Video Views"
      case "uniqueUsers":
        return "Unique Users"
      default:
        return "Translations"
    }
  }

  const getGrowthBadge = (growth: number) => {
    if (growth > 20) return <Badge className="bg-green-500">High</Badge>
    if (growth > 10) return <Badge className="bg-blue-500">Medium</Badge>
    return <Badge className="bg-yellow-500">Low</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="monthly" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Usage Comparison</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="growth">Growth Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage Comparison</CardTitle>
              <CardDescription>Compare usage metrics across all integrated platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end mb-4">
                <Select defaultValue="translations" onValueChange={setMetric}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="translations">Translations</SelectItem>
                    <SelectItem value="apiCalls">API Calls</SelectItem>
                    <SelectItem value="videoViews">Video Views</SelectItem>
                    <SelectItem value="uniqueUsers">Unique Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={metric} fill="#ec4899" name={getMetricLabel(metric)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage by Platform</CardTitle>
              <CardDescription>How different platforms utilize PinkSync features</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Feature</TableHead>
                    <TableHead>MBTQ.dev</TableHead>
                    <TableHead>MBTQUniverse</TableHead>
                    <TableHead>VR4Deaf</TableHead>
                    <TableHead>360 Magicians</TableHead>
                    <TableHead>MBTQ Group</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featureUsageByPlatform.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      {Object.keys(row)
                        .filter((key) => key !== "feature")
                        .map((platform, i) => (
                          <TableCell key={i}>
                            <div className="flex items-center gap-2">
                              <Progress value={row[platform as keyof typeof row] as number} className="h-2" />
                              <span className="text-xs">{row[platform as keyof typeof row]}%</span>
                            </div>
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth Analysis</CardTitle>
              <CardDescription>Month-over-month growth in platform usage</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Total Usage</TableHead>
                    <TableHead>Growth Rate</TableHead>
                    <TableHead>Growth Category</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {platformUsageData.map((platform, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{platform.name}</TableCell>
                      <TableCell>{platform.translations.toLocaleString()}</TableCell>
                      <TableCell>{platform.growth}%</TableCell>
                      <TableCell>{getGrowthBadge(platform.growth)}</TableCell>
                      <TableCell>
                        <div className="w-[100px] h-[30px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={[
                                { value: Math.random() * 50 + 50 },
                                { value: Math.random() * 50 + 50 },
                                { value: Math.random() * 50 + 50 },
                                { value: Math.random() * 50 + 50 },
                                { value: Math.random() * 50 + 50 },
                                { value: Math.random() * 50 + 50 },
                              ]}
                            >
                              <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
