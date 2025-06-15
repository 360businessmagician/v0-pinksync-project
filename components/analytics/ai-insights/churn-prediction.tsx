"use client"

import type React from "react"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertTriangle,
  Download,
  RefreshCw,
  Users,
  Clock,
  Activity,
  MessageSquare,
  Zap,
  CheckCircle2,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample data for at-risk users
const atRiskUsers = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    platform: "MBTQ.dev",
    userType: "Deaf User",
    churnScore: 87,
    lastActive: "12 days ago",
    signupDate: "2025-02-15",
    riskFactors: [
      { factor: "Decreasing session frequency", impact: "High" },
      { factor: "Low feature engagement", impact: "Medium" },
      { factor: "No community interaction", impact: "Medium" },
    ],
    recentActivity: [
      { date: "2025-05-08", type: "Login", details: "Logged in for 3 minutes" },
      { date: "2025-04-25", type: "Feature", details: "Used Text-to-Sign translator" },
      { date: "2025-04-18", type: "Login", details: "Logged in for 5 minutes" },
    ],
  },
  {
    id: "user-2",
    name: "Taylor Rivera",
    email: "taylor.r@example.com",
    platform: "MBTQUniverse",
    userType: "Hard of Hearing",
    churnScore: 78,
    lastActive: "8 days ago",
    signupDate: "2025-01-22",
    riskFactors: [
      { factor: "Error rate increasing", impact: "High" },
      { factor: "Support ticket unresolved", impact: "High" },
      { factor: "Session duration decreasing", impact: "Low" },
    ],
    recentActivity: [
      { date: "2025-05-12", type: "Support", details: "Submitted ticket: 'Translation errors'" },
      { date: "2025-05-10", type: "Feature", details: "Used Video Repository" },
      { date: "2025-05-10", type: "Error", details: "Translation failed 3 times" },
    ],
  },
  {
    id: "user-3",
    name: "Jordan Smith",
    email: "jordan.s@example.com",
    platform: "VR4Deaf",
    userType: "Interpreter",
    churnScore: 72,
    lastActive: "5 days ago",
    signupDate: "2025-03-10",
    riskFactors: [
      { factor: "Feature adoption stalled", impact: "High" },
      { factor: "Competitor platform usage", impact: "Medium" },
      { factor: "Negative feedback submitted", impact: "Medium" },
    ],
    recentActivity: [
      { date: "2025-05-15", type: "Feedback", details: "Rated feature 2/5 stars" },
      { date: "2025-05-14", type: "Feature", details: "Used Real-time Translation" },
      { date: "2025-05-12", type: "Login", details: "Logged in for 12 minutes" },
    ],
  },
  {
    id: "user-4",
    name: "Morgan Lee",
    email: "morgan.l@example.com",
    platform: "360 Magicians",
    userType: "Deaf User",
    churnScore: 65,
    lastActive: "3 days ago",
    signupDate: "2025-02-28",
    riskFactors: [
      { factor: "Onboarding incomplete", impact: "High" },
      { factor: "Limited feature exploration", impact: "Medium" },
      { factor: "Session frequency decreasing", impact: "Low" },
    ],
    recentActivity: [
      { date: "2025-05-17", type: "Login", details: "Logged in for 8 minutes" },
      { date: "2025-05-14", type: "Feature", details: "Used Text-to-Sign translator" },
      { date: "2025-05-10", type: "Login", details: "Logged in for 5 minutes" },
    ],
  },
  {
    id: "user-5",
    name: "Casey Wilson",
    email: "casey.w@example.com",
    platform: "MBTQ.dev",
    userType: "Hard of Hearing",
    churnScore: 58,
    lastActive: "1 day ago",
    signupDate: "2025-03-15",
    riskFactors: [
      { factor: "Feature usage declining", impact: "Medium" },
      { factor: "Session duration decreasing", impact: "Medium" },
      { factor: "Mobile app uninstalled", impact: "Low" },
    ],
    recentActivity: [
      { date: "2025-05-19", type: "Login", details: "Logged in for 4 minutes" },
      { date: "2025-05-17", type: "Feature", details: "Used Video Repository" },
      { date: "2025-05-15", type: "Login", details: "Logged in for 6 minutes" },
    ],
  },
]

// Sample data for churn risk by platform
const churnRiskByPlatform = [
  { name: "MBTQ.dev", highRisk: 32, mediumRisk: 48, lowRisk: 120 },
  { name: "MBTQUniverse", highRisk: 28, mediumRisk: 42, lowRisk: 95 },
  { name: "VR4Deaf", highRisk: 18, mediumRisk: 35, lowRisk: 82 },
  { name: "360 Magicians", highRisk: 15, mediumRisk: 30, lowRisk: 65 },
  { name: "MBTQ Group", highRisk: 8, mediumRisk: 22, lowRisk: 40 },
]

// Sample data for churn risk by user type
const churnRiskByUserType = [
  { name: "Deaf Users", highRisk: 45, mediumRisk: 75, lowRisk: 180 },
  { name: "Hard of Hearing", highRisk: 32, mediumRisk: 58, lowRisk: 130 },
  { name: "Interpreters", highRisk: 18, mediumRisk: 32, lowRisk: 85 },
  { name: "Educators", highRisk: 12, mediumRisk: 25, lowRisk: 63 },
  { name: "Students", highRisk: 8, mediumRisk: 18, lowRisk: 45 },
]

// Sample data for churn risk factors
const churnRiskFactors = [
  { name: "Decreasing Session Frequency", count: 85, percentage: 28 },
  { name: "Low Feature Engagement", count: 72, percentage: 24 },
  { name: "Error Rate Increasing", count: 58, percentage: 19 },
  { name: "Onboarding Incomplete", count: 45, percentage: 15 },
  { name: "No Community Interaction", count: 42, percentage: 14 },
]

// Sample data for churn risk trend
const churnRiskTrend = [
  { month: "Jan", highRisk: 0, mediumRisk: 0, lowRisk: 0, totalUsers: 0 },
  { month: "Feb", highRisk: 5, mediumRisk: 12, lowRisk: 103, totalUsers: 120 },
  { month: "Mar", highRisk: 18, mediumRisk: 42, lowRisk: 390, totalUsers: 450 },
  { month: "Apr", highRisk: 45, mediumRisk: 95, lowRisk: 1060, totalUsers: 1200 },
  { month: "May", highRisk: 101, mediumRisk: 177, lowRisk: 2522, totalUsers: 2800 },
]

// Sample data for churn prediction accuracy
const predictionAccuracy = [
  { name: "Correctly Predicted", value: 78 },
  { name: "False Positives", value: 15 },
  { name: "False Negatives", value: 7 },
]

// Sample data for intervention effectiveness
const interventionEffectiveness = [
  { name: "Personalized Outreach", success: 72, failure: 28 },
  { name: "Feature Tutorials", success: 65, failure: 35 },
  { name: "Community Connection", success: 58, failure: 42 },
  { name: "Support Follow-up", success: 80, failure: 20 },
  { name: "Incentive Offer", success: 68, failure: 32 },
]

export function ChurnPrediction() {
  const [riskLevel, setRiskLevel] = useState("all")
  const [platform, setPlatform] = useState("all")
  const [userType, setUserType] = useState("all")
  const [timeRange, setTimeRange] = useState("30days")
  const [view, setView] = useState("users")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getRiskBadge = (score: number) => {
    if (score >= 75) {
      return <Badge className="bg-red-500">High Risk</Badge>
    } else if (score >= 50) {
      return <Badge className="bg-yellow-500">Medium Risk</Badge>
    } else {
      return <Badge className="bg-green-500">Low Risk</Badge>
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            High Impact
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium Impact
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low Impact
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredUsers = atRiskUsers.filter((user) => {
    if (riskLevel !== "all") {
      if (riskLevel === "high" && user.churnScore < 75) return false
      if (riskLevel === "medium" && (user.churnScore < 50 || user.churnScore >= 75)) return false
      if (riskLevel === "low" && user.churnScore >= 50) return false
    }
    if (platform !== "all" && user.platform !== platform) return false
    if (userType !== "all" && user.userType !== userType) return false
    return true
  })

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="all" onValueChange={setRiskLevel}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setPlatform}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="MBTQ.dev">MBTQ.dev</SelectItem>
              <SelectItem value="MBTQUniverse">MBTQUniverse</SelectItem>
              <SelectItem value="VR4Deaf">VR4Deaf</SelectItem>
              <SelectItem value="360 Magicians">360 Magicians</SelectItem>
              <SelectItem value="MBTQ Group">MBTQ Group</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setUserType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All User Types</SelectItem>
              <SelectItem value="Deaf User">Deaf Users</SelectItem>
              <SelectItem value="Hard of Hearing">Hard of Hearing</SelectItem>
              <SelectItem value="Interpreter">Interpreters</SelectItem>
              <SelectItem value="Educator">Educators</SelectItem>
              <SelectItem value="Student">Students</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="30days" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="users" onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">At-Risk Users</SelectItem>
              <SelectItem value="analytics">Churn Analytics</SelectItem>
              <SelectItem value="interventions">Interventions</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {view === "users" && (
        <>
          {selectedUser ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  User Profile: {atRiskUsers.find((u) => u.id === selectedUser)?.name}
                </h3>
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Back to Users
                </Button>
              </div>

              {atRiskUsers
                .filter((user) => user.id === selectedUser)
                .map((user) => (
                  <div key={user.id} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">User Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Name:</span>
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Email:</span>
                              <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Platform:</span>
                              <span className="font-medium">{user.platform}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">User Type:</span>
                              <span className="font-medium">{user.userType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Signup Date:</span>
                              <span className="font-medium">{user.signupDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Last Active:</span>
                              <span className="font-medium">{user.lastActive}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Churn Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Churn Risk Score:</span>
                                <span className="font-medium">{user.churnScore}/100</span>
                              </div>
                              <Progress
                                value={user.churnScore}
                                className="h-2 bg-gray-200"
                                style={
                                  {
                                    "--progress-background":
                                      user.churnScore >= 75
                                        ? "hsl(var(--red-500))"
                                        : user.churnScore >= 50
                                          ? "hsl(var(--yellow-500))"
                                          : "hsl(var(--green-500))",
                                  } as React.CSSProperties
                                }
                              />
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Risk Factors:</h4>
                              <ul className="space-y-2">
                                {user.riskFactors.map((factor, i) => (
                                  <li key={i} className="flex justify-between items-center">
                                    <span className="text-sm">{factor.factor}</span>
                                    {getImpactBadge(factor.impact)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {user.recentActivity.map((activity, i) => (
                              <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                                <div
                                  className={`rounded-full p-1.5 ${
                                    activity.type === "Login"
                                      ? "bg-blue-100 text-blue-600"
                                      : activity.type === "Feature"
                                        ? "bg-green-100 text-green-600"
                                        : activity.type === "Error"
                                          ? "bg-red-100 text-red-600"
                                          : "bg-yellow-100 text-yellow-600"
                                  }`}
                                >
                                  {activity.type === "Login" && <Users className="h-3.5 w-3.5" />}
                                  {activity.type === "Feature" && <Activity className="h-3.5 w-3.5" />}
                                  {activity.type === "Error" && <AlertTriangle className="h-3.5 w-3.5" />}
                                  {activity.type === "Support" && <MessageSquare className="h-3.5 w-3.5" />}
                                  {activity.type === "Feedback" && <MessageSquare className="h-3.5 w-3.5" />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{activity.type}</span>
                                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">{activity.details}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>AI-Generated Recommendations</CardTitle>
                        <CardDescription>Suggested interventions to reduce churn risk</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.id === "user-1" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Personalized Re-engagement Email</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Send a personalized email highlighting new Text-to-Sign features and improvements.
                                    Include a short video tutorial.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Community Connection</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Introduce to active community members with similar interests. Highlight community
                                    events and discussions.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                                  <Activity className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Feature Onboarding</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Offer a personalized onboarding session to explore features they haven't used yet.
                                    Focus on Text-to-Sign advanced options.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {user.id === "user-2" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Support Ticket Follow-up</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Prioritize resolving their open support ticket. Follow up with a personal call to
                                    ensure satisfaction.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <Activity className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Error Resolution Guide</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Send a personalized guide addressing the specific translation errors they're
                                    experiencing. Include troubleshooting tips.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <MessageSquare className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Feedback Session</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Invite to a 1:1 feedback session to discuss their experience and gather detailed
                                    input on translation issues.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {user.id === "user-3" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <MessageSquare className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Feedback Follow-up</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Reach out directly about their negative feedback. Acknowledge concerns and share
                                    upcoming improvements.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Interpreter-specific Features</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Highlight interpreter-specific features they haven't explored. Offer a demo of
                                    advanced tools.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Users className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Interpreter Community</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Connect with other interpreters on the platform. Highlight interpreter-focused
                                    community events.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {user.id === "user-4" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Complete Onboarding</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Send a simplified onboarding guide to complete remaining steps. Offer a personal
                                    onboarding session.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <Activity className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Feature Discovery</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Create a personalized feature discovery path based on their usage patterns. Focus on
                                    360 Magicians integration.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <Clock className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Engagement Reminder</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Send gentle reminders about platform benefits. Highlight success stories from
                                    similar users.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {user.id === "user-5" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <Activity className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Feature Re-engagement</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Highlight new features in the Video Repository they might find valuable. Include
                                    quick tutorial videos.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Mobile Experience</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Highlight improvements to the mobile experience. Offer incentive to reinstall the
                                    mobile app.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <MessageSquare className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Feedback Request</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Request specific feedback on what would improve their experience. Offer incentive
                                    for detailed feedback.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Churn Risk Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-red-500">101</div>
                        <div className="text-xs text-muted-foreground text-center">High Risk</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-yellow-500">177</div>
                        <div className="text-xs text-muted-foreground text-center">Medium Risk</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-green-500">2,522</div>
                        <div className="text-xs text-muted-foreground text-center">Low Risk</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Top Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="px-6 pb-4">
                      {churnRiskFactors.slice(0, 3).map((factor, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{factor.name}</span>
                            <span className="font-medium">{factor.percentage}%</span>
                          </div>
                          <Progress value={factor.percentage} className="h-1.5 bg-gray-200" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Churn Prediction Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="h-[100px] w-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={predictionAccuracy}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {predictionAccuracy.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="ml-4 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#0088FE]"></div>
                        <span className="text-xs">Correct (78%)</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#00C49F]"></div>
                        <span className="text-xs">False Pos (15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FFBB28]"></div>
                        <span className="text-xs">False Neg (7%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Signup Date</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Top Risk Factor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedUser(user.id)}
                    >
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </TableCell>
                      <TableCell>{user.platform}</TableCell>
                      <TableCell>{user.userType}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>{user.signupDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.churnScore}</span>
                          {getRiskBadge(user.churnScore)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm truncate max-w-[150px]">{user.riskFactors[0].factor}</span>
                          {getImpactBadge(user.riskFactors[0].impact)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}

      {view === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Risk by Platform</CardTitle>
                <CardDescription>Distribution of risk levels across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={churnRiskByPlatform} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="highRisk" stackId="a" fill="#ef4444" name="High Risk" />
                      <Bar dataKey="mediumRisk" stackId="a" fill="#eab308" name="Medium Risk" />
                      <Bar dataKey="lowRisk" stackId="a" fill="#22c55e" name="Low Risk" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Risk by User Type</CardTitle>
                <CardDescription>Distribution of risk levels across user types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={churnRiskByUserType} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="highRisk" stackId="a" fill="#ef4444" name="High Risk" />
                      <Bar dataKey="mediumRisk" stackId="a" fill="#eab308" name="Medium Risk" />
                      <Bar dataKey="lowRisk" stackId="a" fill="#22c55e" name="Low Risk" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Risk Trend</CardTitle>
                <CardDescription>Evolution of churn risk over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={churnRiskTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="highRisk" stroke="#ef4444" name="High Risk" />
                      <Line type="monotone" dataKey="mediumRisk" stroke="#eab308" name="Medium Risk" />
                      <Line type="monotone" dataKey="lowRisk" stroke="#22c55e" name="Low Risk" />
                      <Line
                        type="monotone"
                        dataKey="totalUsers"
                        stroke="#3b82f6"
                        name="Total Users"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Churn Risk Factors</CardTitle>
                <CardDescription>Most common factors contributing to churn risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={churnRiskFactors}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Key insights from churn prediction analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2 mt-0.5">
                      <Zap className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Early Engagement Critical:</span> Users who don't engage with at
                        least 3 features in their first 14 days have a 72% higher churn risk.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2 mt-0.5">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Error Rate Impact:</span> Users who experience more than 2
                        translation errors per session are 3.5x more likely to churn within 30 days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mt-0.5">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Community Connection:</span> Users who join at least one community
                        discussion have 65% lower churn risk compared to isolated users.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mt-0.5">
                      <Activity className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Cross-Platform Usage:</span> Users who engage with PinkSync across
                        multiple platforms have 78% lower churn risk than single-platform users.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2 mt-0.5">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Inactivity Threshold:</span> 85% of users who don't return within
                        10 days of their last session eventually churn within 45 days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {view === "interventions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Intervention Effectiveness</CardTitle>
                <CardDescription>Success rates of different intervention strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={interventionEffectiveness} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="success" stackId="a" fill="#22c55e" name="Success" />
                      <Bar dataKey="failure" stackId="a" fill="#ef4444" name="Failure" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Interventions</CardTitle>
                <CardDescription>AI-generated intervention recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Support Follow-up Campaign</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Implement proactive follow-up for all support tickets. Personal contact within 24 hours
                        increases retention by 80%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Community Connection Program</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Connect new users with community mentors in their first week. This intervention has shown 72%
                        success rate in reducing churn.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                      <Activity className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Feature Onboarding Series</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Implement a 14-day guided feature discovery program for new users. Focus on the 3 most valuable
                        features first.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                      <Zap className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Re-engagement Campaign</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Target users inactive for 7+ days with personalized content highlighting new features relevant
                        to their usage patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Automated Intervention Workflows</CardTitle>
              <CardDescription>AI-powered intervention workflows to reduce churn</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Intervention</TableHead>
                    <TableHead>Timing</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Inactivity</TableCell>
                    <TableCell>7+ days without login</TableCell>
                    <TableCell>Personalized email with relevant content</TableCell>
                    <TableCell>Day 8 of inactivity</TableCell>
                    <TableCell>65%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Error Rate</TableCell>
                    <TableCell>3+ errors in one session</TableCell>
                    <TableCell>Support outreach with troubleshooting</TableCell>
                    <TableCell>Within 24 hours</TableCell>
                    <TableCell>80%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feature Adoption</TableCell>
                    <TableCell>Less than 3 features used</TableCell>
                    <TableCell>Feature discovery guide</TableCell>
                    <TableCell>14 days after signup</TableCell>
                    <TableCell>72%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Session Duration</TableCell>
                    <TableCell>50%+ decrease in duration</TableCell>
                    <TableCell>Feedback request and incentive</TableCell>
                    <TableCell>After 3 short sessions</TableCell>
                    <TableCell>58%</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500">Testing</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Community Engagement</TableCell>
                    <TableCell>No community interaction</TableCell>
                    <TableCell>Community introduction and event invite</TableCell>
                    <TableCell>21 days after signup</TableCell>
                    <TableCell>68%</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500">Testing</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
