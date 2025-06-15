"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for feature usage
const featureUsageData = [
  { name: "Text-to-Sign Translation", value: 42, growth: "+15%" },
  { name: "Sign Video Repository", value: 28, growth: "+8%" },
  { name: "Real-time Translation", value: 18, growth: "+22%" },
  { name: "Community Validation", value: 8, growth: "+5%" },
  { name: "AI Model Access", value: 4, growth: "+18%" },
]

const languageUsageData = [
  { name: "ASL", value: 65, color: "#ec4899" },
  { name: "BSL", value: 20, color: "#8b5cf6" },
  { name: "JSL", value: 8, color: "#3b82f6" },
  { name: "Auslan", value: 5, color: "#10b981" },
  { name: "Other", value: 2, color: "#6b7280" },
]

const featureTrendData = [
  {
    month: "Jan",
    "Text-to-Sign": 3200,
    "Video Repository": 2100,
    "Real-time Translation": 1400,
    "Community Validation": 800,
    "AI Model Access": 400,
  },
  {
    month: "Feb",
    "Text-to-Sign": 3500,
    "Video Repository": 2300,
    "Real-time Translation": 1600,
    "Community Validation": 850,
    "AI Model Access": 450,
  },
  {
    month: "Mar",
    "Text-to-Sign": 3800,
    "Video Repository": 2500,
    "Real-time Translation": 1800,
    "Community Validation": 900,
    "AI Model Access": 500,
  },
  {
    month: "Apr",
    "Text-to-Sign": 4200,
    "Video Repository": 2700,
    "Real-time Translation": 2100,
    "Community Validation": 950,
    "AI Model Access": 550,
  },
  {
    month: "May",
    "Text-to-Sign": 4600,
    "Video Repository": 2900,
    "Real-time Translation": 2400,
    "Community Validation": 1000,
    "AI Model Access": 600,
  },
  {
    month: "Jun",
    "Text-to-Sign": 5000,
    "Video Repository": 3100,
    "Real-time Translation": 2700,
    "Community Validation": 1050,
    "AI Model Access": 650,
  },
]

// Top feature requests
const featureRequests = [
  { feature: "Sign Language Dialects Support", votes: 156, status: "Planned" },
  { feature: "Fingerspelling Recognition", votes: 142, status: "In Development" },
  { feature: "Offline Mode", votes: 128, status: "Considering" },
  { feature: "Custom Signs Creator", votes: 115, status: "Planned" },
  { feature: "Multi-person Signing", votes: 98, status: "Considering" },
]

export function FeatureUsage() {
  const [timeRange, setTimeRange] = useState("monthly")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Development":
        return <Badge className="bg-green-500">In Development</Badge>
      case "Planned":
        return <Badge className="bg-blue-500">Planned</Badge>
      case "Considering":
        return <Badge className="bg-yellow-500">Considering</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Usage Distribution</CardTitle>
            <CardDescription>Percentage breakdown of feature usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={featureUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {featureUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${340 - index * 30}, 70%, 60%)`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sign Language Distribution</CardTitle>
            <CardDescription>Usage breakdown by sign language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {languageUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Usage Trends</CardTitle>
          <CardDescription>Usage trends over time by feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Text-to-Sign" fill="#ec4899" />
                <Bar dataKey="Video Repository" fill="#8b5cf6" />
                <Bar dataKey="Real-time Translation" fill="#3b82f6" />
                <Bar dataKey="Community Validation" fill="#10b981" />
                <Bar dataKey="AI Model Access" fill="#6b7280" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Feature Requests</CardTitle>
          <CardDescription>Most requested features from users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{request.feature}</TableCell>
                  <TableCell>{request.votes}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
