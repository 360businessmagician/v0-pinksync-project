"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Download, Filter } from "lucide-react"

// Sample data
const dailyData = [
  { date: "Mon", translations: 1200, apiCalls: 3500, videoViews: 850, uniqueUsers: 620 },
  { date: "Tue", translations: 1350, apiCalls: 3800, videoViews: 920, uniqueUsers: 680 },
  { date: "Wed", translations: 1500, apiCalls: 4200, videoViews: 1050, uniqueUsers: 750 },
  { date: "Thu", translations: 1400, apiCalls: 4000, videoViews: 980, uniqueUsers: 710 },
  { date: "Fri", translations: 1600, apiCalls: 4500, videoViews: 1100, uniqueUsers: 790 },
  { date: "Sat", translations: 900, apiCalls: 2800, videoViews: 650, uniqueUsers: 480 },
  { date: "Sun", translations: 800, apiCalls: 2500, videoViews: 580, uniqueUsers: 420 },
]

const weeklyData = [
  { date: "Week 1", translations: 8750, apiCalls: 24800, videoViews: 6130, uniqueUsers: 4450 },
  { date: "Week 2", translations: 9200, apiCalls: 26500, videoViews: 6580, uniqueUsers: 4720 },
  { date: "Week 3", translations: 9800, apiCalls: 28200, videoViews: 7050, uniqueUsers: 5100 },
  { date: "Week 4", translations: 10500, apiCalls: 30100, videoViews: 7520, uniqueUsers: 5480 },
]

const monthlyData = [
  { date: "Jan", translations: 38000, apiCalls: 112000, videoViews: 27500, uniqueUsers: 19800 },
  { date: "Feb", translations: 42000, apiCalls: 124000, videoViews: 30200, uniqueUsers: 21500 },
  { date: "Mar", translations: 45000, apiCalls: 135000, videoViews: 32800, uniqueUsers: 23200 },
  { date: "Apr", translations: 48000, apiCalls: 142000, videoViews: 35100, uniqueUsers: 24800 },
  { date: "May", translations: 52000, apiCalls: 156000, videoViews: 38400, uniqueUsers: 26500 },
  { date: "Jun", translations: 56000, apiCalls: 168000, videoViews: 41200, uniqueUsers: 28300 },
]

// Platform distribution data
const platformData = [
  { name: "MBTQ.dev", value: 35 },
  { name: "MBTQUniverse", value: 25 },
  { name: "VR4Deaf", value: 20 },
  { name: "360 Magicians", value: 15 },
  { name: "Other", value: 5 },
]

export function UsageOverview() {
  const [timeRange, setTimeRange] = useState("weekly")

  // Select the appropriate data based on time range
  const data = timeRange === "daily" ? dailyData : timeRange === "weekly" ? weeklyData : monthlyData

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="weekly" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Translations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === "daily" ? "1,600" : timeRange === "weekly" ? "10,500" : "56,000"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{timeRange === "daily" ? "12" : timeRange === "weekly" ? "14" : "8"}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === "daily" ? "4,500" : timeRange === "weekly" ? "30,100" : "168,000"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{timeRange === "daily" ? "15" : timeRange === "weekly" ? "7" : "8"}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Video Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === "daily" ? "1,100" : timeRange === "weekly" ? "7,520" : "41,200"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{timeRange === "daily" ? "10" : timeRange === "weekly" ? "7" : "7"}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === "daily" ? "790" : timeRange === "weekly" ? "5,480" : "28,300"}
            </div>
            <p className="text-xs text-muted-foreground">
              +{timeRange === "daily" ? "11" : timeRange === "weekly" ? "7" : "7"}% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="translations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="apiCalls">API Calls</TabsTrigger>
          <TabsTrigger value="videoViews">Video Views</TabsTrigger>
          <TabsTrigger value="uniqueUsers">Unique Users</TabsTrigger>
        </TabsList>

        <TabsContent value="translations">
          <Card>
            <CardHeader>
              <CardTitle>Translation Requests</CardTitle>
              <CardDescription>Number of text-to-sign translations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="translations" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apiCalls">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>Total API calls across all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="apiCalls" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videoViews">
          <Card>
            <CardHeader>
              <CardTitle>Video Views</CardTitle>
              <CardDescription>Sign language video views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="videoViews" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uniqueUsers">
          <Card>
            <CardHeader>
              <CardTitle>Unique Users</CardTitle>
              <CardDescription>Distinct users accessing accessibility services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uniqueUsers" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Usage distribution across integrated platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
                  <Bar dataKey="value" fill="#ec4899" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Month-over-month growth in key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="translations" stroke="#ec4899" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uniqueUsers" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
