"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for impact metrics
const impactMetrics = [
  {
    metric: "User Engagement",
    value: "85%",
    change: "+12%",
    status: "Positive",
  },
  {
    metric: "Content Accessibility",
    value: "92%",
    change: "+8%",
    status: "Positive",
  },
  {
    metric: "Translation Accuracy",
    value: "94%",
    change: "+5%",
    status: "Positive",
  },
  {
    metric: "User Satisfaction",
    value: "4.8/5",
    change: "+0.3",
    status: "Positive",
  },
  {
    metric: "Platform Adoption",
    value: "78%",
    change: "+15%",
    status: "Positive",
  },
]

// Sample data for impact over time
const impactOverTime = [
  {
    month: "Jan",
    "User Engagement": 73,
    "Content Accessibility": 84,
    "Translation Accuracy": 89,
  },
  {
    month: "Feb",
    "User Engagement": 75,
    "Content Accessibility": 86,
    "Translation Accuracy": 90,
  },
  {
    month: "Mar",
    "User Engagement": 78,
    "Content Accessibility": 88,
    "Translation Accuracy": 91,
  },
  {
    month: "Apr",
    "User Engagement": 80,
    "Content Accessibility": 89,
    "Translation Accuracy": 92,
  },
  {
    month: "May",
    "User Engagement": 82,
    "Content Accessibility": 90,
    "Translation Accuracy": 93,
  },
  {
    month: "Jun",
    "User Engagement": 85,
    "Content Accessibility": 92,
    "Translation Accuracy": 94,
  },
]

// Sample data for success stories
const successStories = [
  {
    organization: "Deaf Community Center",
    impact: "Increased program participation by 45%",
    users: 1250,
    testimonial: "PinkSync has transformed how we communicate with our community members.",
  },
  {
    organization: "National Deaf Education Association",
    impact: "Improved student engagement by 38%",
    users: 3800,
    testimonial: "Students now have unprecedented access to educational content.",
  },
  {
    organization: "Deaf Professionals Network",
    impact: "Reduced communication barriers in 85% of meetings",
    users: 2200,
    testimonial: "Our members report significant improvements in workplace communication.",
  },
  {
    organization: "International Sign Language Festival",
    impact: "Enabled participation from 28 countries",
    users: 5600,
    testimonial: "PinkSync made our global event truly accessible for the first time.",
  },
]

export function AccessibilityImpact() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Key Impact Metrics</CardTitle>
          <CardDescription>Measuring the real-world impact of accessibility services</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {impactMetrics.map((metric, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{metric.metric}</TableCell>
                  <TableCell>{metric.value}</TableCell>
                  <TableCell>
                    <span className="text-green-500">{metric.change}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">{metric.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impact Trends</CardTitle>
          <CardDescription>How key metrics have improved over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impactOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="User Engagement" stroke="#ec4899" strokeWidth={2} />
                <Line type="monotone" dataKey="Content Accessibility" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="Translation Accuracy" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Stories</CardTitle>
          <CardDescription>Real-world impact of PinkSync accessibility services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {successStories.map((story, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{story.organization}</CardTitle>
                  <CardDescription>{story.impact}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Users: {story.users.toLocaleString()}</span>
                    <Badge variant="outline" className="border-pink-500 text-pink-500">
                      Success Story
                    </Badge>
                  </div>
                  <p className="text-sm italic">"{story.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
