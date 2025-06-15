"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, Info, TrendingUp, TrendingDown, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for cohort retention
const cohortRetentionData = [
  {
    cohort: "Jan 2025",
    size: 120,
    retention: [100, 68, 52, 45, 42, 40],
  },
  {
    cohort: "Feb 2025",
    size: 185,
    retention: [100, 72, 58, 50, 46],
  },
  {
    cohort: "Mar 2025",
    size: 250,
    retention: [100, 75, 62, 54],
  },
  {
    cohort: "Apr 2025",
    size: 310,
    retention: [100, 78, 65],
  },
  {
    cohort: "May 2025",
    size: 380,
    retention: [100, 80],
  },
  {
    cohort: "Jun 2025",
    size: 450,
    retention: [100],
  },
]

// Sample data for platform-specific cohort retention
const platformCohortData = {
  "MBTQ.dev": [
    {
      cohort: "Jan 2025",
      size: 45,
      retention: [100, 72, 58, 52, 48, 45],
    },
    {
      cohort: "Feb 2025",
      size: 65,
      retention: [100, 75, 62, 55, 50],
    },
    {
      cohort: "Mar 2025",
      size: 85,
      retention: [100, 78, 65, 58],
    },
    {
      cohort: "Apr 2025",
      size: 110,
      retention: [100, 80, 68],
    },
    {
      cohort: "May 2025",
      size: 135,
      retention: [100, 82],
    },
    {
      cohort: "Jun 2025",
      size: 160,
      retention: [100],
    },
  ],
  MBTQUniverse: [
    {
      cohort: "Jan 2025",
      size: 35,
      retention: [100, 65, 48, 42, 38, 35],
    },
    {
      cohort: "Feb 2025",
      size: 55,
      retention: [100, 68, 52, 45, 40],
    },
    {
      cohort: "Mar 2025",
      size: 75,
      retention: [100, 70, 55, 48],
    },
    {
      cohort: "Apr 2025",
      size: 90,
      retention: [100, 72, 58],
    },
    {
      cohort: "May 2025",
      size: 110,
      retention: [100, 75],
    },
    {
      cohort: "Jun 2025",
      size: 130,
      retention: [100],
    },
  ],
  VR4Deaf: [
    {
      cohort: "Jan 2025",
      size: 25,
      retention: [100, 70, 55, 48, 45, 42],
    },
    {
      cohort: "Feb 2025",
      size: 40,
      retention: [100, 72, 60, 52, 48],
    },
    {
      cohort: "Mar 2025",
      size: 55,
      retention: [100, 75, 62, 55],
    },
    {
      cohort: "Apr 2025",
      size: 70,
      retention: [100, 78, 65],
    },
    {
      cohort: "May 2025",
      size: 85,
      retention: [100, 80],
    },
    {
      cohort: "Jun 2025",
      size: 100,
      retention: [100],
    },
  ],
  "360 Magicians": [
    {
      cohort: "Jan 2025",
      size: 15,
      retention: [100, 60, 45, 38, 35, 32],
    },
    {
      cohort: "Feb 2025",
      size: 25,
      retention: [100, 64, 50, 42, 38],
    },
    {
      cohort: "Mar 2025",
      size: 35,
      retention: [100, 68, 54, 45],
    },
    {
      cohort: "Apr 2025",
      size: 40,
      retention: [100, 70, 58],
    },
    {
      cohort: "May 2025",
      size: 50,
      retention: [100, 72],
    },
    {
      cohort: "Jun 2025",
      size: 60,
      retention: [100],
    },
  ],
}

// Sample data for user type cohort retention
const userTypeCohortData = {
  "Deaf Users": [
    {
      cohort: "Jan 2025",
      size: 65,
      retention: [100, 75, 62, 58, 55, 52],
    },
    {
      cohort: "Feb 2025",
      size: 95,
      retention: [100, 78, 65, 60, 56],
    },
    {
      cohort: "Mar 2025",
      size: 130,
      retention: [100, 80, 68, 62],
    },
    {
      cohort: "Apr 2025",
      size: 160,
      retention: [100, 82, 70],
    },
    {
      cohort: "May 2025",
      size: 195,
      retention: [100, 85],
    },
    {
      cohort: "Jun 2025",
      size: 230,
      retention: [100],
    },
  ],
  "Hard of Hearing": [
    {
      cohort: "Jan 2025",
      size: 35,
      retention: [100, 68, 52, 45, 42, 40],
    },
    {
      cohort: "Feb 2025",
      size: 55,
      retention: [100, 70, 55, 48, 45],
    },
    {
      cohort: "Mar 2025",
      size: 75,
      retention: [100, 72, 58, 50],
    },
    {
      cohort: "Apr 2025",
      size: 90,
      retention: [100, 75, 60],
    },
    {
      cohort: "May 2025",
      size: 110,
      retention: [100, 78],
    },
    {
      cohort: "Jun 2025",
      size: 130,
      retention: [100],
    },
  ],
  Interpreters: [
    {
      cohort: "Jan 2025",
      size: 20,
      retention: [100, 80, 70, 65, 62, 60],
    },
    {
      cohort: "Feb 2025",
      size: 35,
      retention: [100, 82, 72, 68, 65],
    },
    {
      cohort: "Mar 2025",
      size: 45,
      retention: [100, 84, 75, 70],
    },
    {
      cohort: "Apr 2025",
      size: 60,
      retention: [100, 85, 78],
    },
    {
      cohort: "May 2025",
      size: 75,
      retention: [100, 88],
    },
    {
      cohort: "Jun 2025",
      size: 90,
      retention: [100],
    },
  ],
}

// Sample data for feature usage cohort retention
const featureUsageCohortData = {
  "Text-to-Sign Users": [
    {
      cohort: "Jan 2025",
      size: 120,
      retention: [100, 72, 58, 52, 48, 45],
    },
    {
      cohort: "Feb 2025",
      size: 185,
      retention: [100, 75, 62, 55, 50],
    },
    {
      cohort: "Mar 2025",
      size: 250,
      retention: [100, 78, 65, 58],
    },
    {
      cohort: "Apr 2025",
      size: 310,
      retention: [100, 80, 68],
    },
    {
      cohort: "May 2025",
      size: 380,
      retention: [100, 82],
    },
    {
      cohort: "Jun 2025",
      size: 450,
      retention: [100],
    },
  ],
  "Video Repository Users": [
    {
      cohort: "Jan 2025",
      size: 85,
      retention: [100, 70, 55, 48, 45, 42],
    },
    {
      cohort: "Feb 2025",
      size: 130,
      retention: [100, 72, 58, 50, 46],
    },
    {
      cohort: "Mar 2025",
      size: 175,
      retention: [100, 75, 60, 52],
    },
    {
      cohort: "Apr 2025",
      size: 220,
      retention: [100, 78, 62],
    },
    {
      cohort: "May 2025",
      size: 265,
      retention: [100, 80],
    },
    {
      cohort: "Jun 2025",
      size: 310,
      retention: [100],
    },
  ],
  "Real-time Translation Users": [
    {
      cohort: "Jan 2025",
      size: 45,
      retention: [100, 75, 62, 58, 55, 52],
    },
    {
      cohort: "Feb 2025",
      size: 70,
      retention: [100, 78, 65, 60, 56],
    },
    {
      cohort: "Mar 2025",
      size: 95,
      retention: [100, 80, 68, 62],
    },
    {
      cohort: "Apr 2025",
      size: 120,
      retention: [100, 82, 70],
    },
    {
      cohort: "May 2025",
      size: 145,
      retention: [100, 85],
    },
    {
      cohort: "Jun 2025",
      size: 170,
      retention: [100],
    },
  ],
  "Community Contributors": [
    {
      cohort: "Jan 2025",
      size: 25,
      retention: [100, 85, 75, 70, 68, 65],
    },
    {
      cohort: "Feb 2025",
      size: 40,
      retention: [100, 88, 78, 72, 70],
    },
    {
      cohort: "Mar 2025",
      size: 55,
      retention: [100, 90, 80, 75],
    },
    {
      cohort: "Apr 2025",
      size: 70,
      retention: [100, 92, 82],
    },
    {
      cohort: "May 2025",
      size: 85,
      retention: [100, 94],
    },
    {
      cohort: "Jun 2025",
      size: 100,
      retention: [100],
    },
  ],
}

// Sample data for retention insights
const retentionInsights = [
  {
    title: "Community Contributors Have Highest Retention",
    description:
      "Users who contribute to the community have 65% retention after 6 months, compared to 45% for general users.",
    impact: "High",
    recommendation:
      "Encourage more users to contribute to the community through gamification and recognition features.",
  },
  {
    title: "Interpreters Show Strong Retention",
    description: "Interpreter users have 60% retention after 6 months, significantly higher than the platform average.",
    impact: "Medium",
    recommendation: "Develop more interpreter-specific features and marketing to attract this high-retention group.",
  },
  {
    title: "Retention Improving Over Time",
    description:
      "Newer cohorts show better retention rates than earlier ones, with Month 2 retention improving from 68% to 80%.",
    impact: "High",
    recommendation: "Analyze recent product changes that may have contributed to improved retention.",
  },
  {
    title: "360 Magicians Platform Has Lowest Retention",
    description: "Users from 360 Magicians have 32% retention after 6 months, below the platform average of 40%.",
    impact: "Medium",
    recommendation: "Investigate user experience issues specific to 360 Magicians integration.",
  },
  {
    title: "Critical Drop-off Between Months 1-2",
    description: "All cohorts show the largest drop in retention between the first and second months (20-32% drop).",
    impact: "High",
    recommendation: "Implement targeted engagement campaigns during the first 30 days to improve early retention.",
  },
]

export function CohortAnalysis() {
  const [cohortType, setCohortType] = useState("all")
  const [timeRange, setTimeRange] = useState("monthly")
  const [view, setView] = useState("heatmap")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge className="bg-pink-600">High Impact</Badge>
      case "Medium":
        return <Badge className="bg-pink-400">Medium Impact</Badge>
      case "Low":
        return <Badge className="bg-pink-200 text-gray-800">Low Impact</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getRetentionColor = (retention: number) => {
    if (retention >= 90) return "bg-green-900 text-white"
    if (retention >= 80) return "bg-green-800 text-white"
    if (retention >= 70) return "bg-green-700 text-white"
    if (retention >= 60) return "bg-green-600 text-white"
    if (retention >= 50) return "bg-green-500 text-white"
    if (retention >= 40) return "bg-green-400 text-gray-800"
    if (retention >= 30) return "bg-green-300 text-gray-800"
    if (retention >= 20) return "bg-green-200 text-gray-800"
    if (retention >= 10) return "bg-green-100 text-gray-800"
    return "bg-gray-100 text-gray-800"
  }

  // Get the appropriate data based on the selected cohort type
  const getCohortData = () => {
    switch (cohortType) {
      case "platform":
        return platformCohortData["MBTQ.dev"] // Default to MBTQ.dev for this example
      case "userType":
        return userTypeCohortData["Deaf Users"] // Default to Deaf Users for this example
      case "feature":
        return featureUsageCohortData["Text-to-Sign Users"] // Default to Text-to-Sign Users for this example
      default:
        return cohortRetentionData
    }
  }

  const cohortData = getCohortData()

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="all" onValueChange={setCohortType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cohort Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="platform">By Platform</SelectItem>
              <SelectItem value="userType">By User Type</SelectItem>
              <SelectItem value="feature">By Feature Usage</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="monthly" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="heatmap" onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heatmap">Heatmap</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="insights">Insights</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="retention" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="retention">Retention Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Cohort Comparison</TabsTrigger>
          <TabsTrigger value="trends">Retention Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="retention">
          {view === "heatmap" && (
            <Card>
              <CardHeader>
                <CardTitle>User Retention Heatmap</CardTitle>
                <CardDescription>
                  Percentage of users retained over time, grouped by {timeRange} cohorts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Cohort</TableHead>
                        <TableHead className="w-[100px]">Users</TableHead>
                        <TableHead className="text-center">Month 1</TableHead>
                        <TableHead className="text-center">Month 2</TableHead>
                        <TableHead className="text-center">Month 3</TableHead>
                        <TableHead className="text-center">Month 4</TableHead>
                        <TableHead className="text-center">Month 5</TableHead>
                        <TableHead className="text-center">Month 6</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cohortData.map((cohort, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{cohort.cohort}</TableCell>
                          <TableCell>{cohort.size}</TableCell>
                          {cohort.retention.map((value, i) => (
                            <TableCell key={i} className={`text-center ${getRetentionColor(value)}`}>
                              {value}%
                            </TableCell>
                          ))}
                          {/* Add empty cells for months without data */}
                          {Array.from({ length: 6 - cohort.retention.length }).map((_, i) => (
                            <TableCell key={`empty-${i}`} className="text-center bg-gray-50">
                              -
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">Retention Scale:</div>
                    <div className="flex">
                      <div className="w-6 h-6 bg-gray-100 flex items-center justify-center text-xs">0%</div>
                      <div className="w-6 h-6 bg-green-100 flex items-center justify-center text-xs">10%</div>
                      <div className="w-6 h-6 bg-green-200 flex items-center justify-center text-xs">20%</div>
                      <div className="w-6 h-6 bg-green-300 flex items-center justify-center text-xs">30%</div>
                      <div className="w-6 h-6 bg-green-400 flex items-center justify-center text-xs">40%</div>
                      <div className="w-6 h-6 bg-green-500 flex items-center justify-center text-xs text-white">
                        50%
                      </div>
                      <div className="w-6 h-6 bg-green-600 flex items-center justify-center text-xs text-white">
                        60%
                      </div>
                      <div className="w-6 h-6 bg-green-700 flex items-center justify-center text-xs text-white">
                        70%
                      </div>
                      <div className="w-6 h-6 bg-green-800 flex items-center justify-center text-xs text-white">
                        80%
                      </div>
                      <div className="w-6 h-6 bg-green-900 flex items-center justify-center text-xs text-white">
                        90%+
                      </div>
                    </div>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p className="text-sm">
                          This heatmap shows the percentage of users from each cohort who are still active in subsequent
                          months. Darker green indicates higher retention.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Key Observations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Improving Month 1 Retention</p>
                        <p className="text-sm text-muted-foreground">
                          Month 1 retention has improved from 68% (Jan) to 80% (May), showing positive product changes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingDown className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Critical Month 1-2 Drop</p>
                        <p className="text-sm text-muted-foreground">
                          All cohorts show a significant drop between months 1-2, indicating an opportunity for early
                          engagement.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Cohort Size Growth</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly cohort size has grown from 120 users (Jan) to 450 users (Jun), a 275% increase.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Long-term Retention</p>
                        <p className="text-sm text-muted-foreground">
                          Month 6 retention for the Jan cohort is 40%, providing a baseline for long-term user
                          retention.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {view === "line" && (
            <Card>
              <CardHeader>
                <CardTitle>Retention Curves</CardTitle>
                <CardDescription>Visualizing retention drop-off patterns by cohort</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>Line chart visualization would appear here</p>
                    <p className="text-sm mt-2">Showing retention curves for each cohort over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {view === "insights" && (
            <div className="space-y-4">
              {retentionInsights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                      <div>{getImpactBadge(insight.impact)}</div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium">Recommendation</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Comparison</CardTitle>
              <CardDescription>Compare retention across different user segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">By Platform</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Platform</TableHead>
                          <TableHead className="text-center">Month 1</TableHead>
                          <TableHead className="text-center">Month 3</TableHead>
                          <TableHead className="text-center">Month 6</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">MBTQ.dev</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(72)}`}>72%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(52)}`}>52%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(45)}`}>45%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">MBTQUniverse</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(65)}`}>65%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(42)}`}>42%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(35)}`}>35%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">VR4Deaf</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(70)}`}>70%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(48)}`}>48%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(42)}`}>42%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">360 Magicians</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(60)}`}>60%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(38)}`}>38%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(32)}`}>32%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">By User Type</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User Type</TableHead>
                          <TableHead className="text-center">Month 1</TableHead>
                          <TableHead className="text-center">Month 3</TableHead>
                          <TableHead className="text-center">Month 6</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Deaf Users</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(75)}`}>75%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(58)}`}>58%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(52)}`}>52%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Hard of Hearing</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(68)}`}>68%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(45)}`}>45%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(40)}`}>40%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Interpreters</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(80)}`}>80%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(65)}`}>65%</TableCell>
                          <TableCell className={`text-center ${getRetentionColor(60)}`}>60%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">By Feature Usage</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature Usage</TableHead>
                        <TableHead className="text-center">Month 1</TableHead>
                        <TableHead className="text-center">Month 3</TableHead>
                        <TableHead className="text-center">Month 6</TableHead>
                        <TableHead>Key Insight</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Text-to-Sign Users</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(72)}`}>72%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(52)}`}>52%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(45)}`}>45%</TableCell>
                        <TableCell className="text-sm">Core feature with average retention</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Video Repository Users</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(70)}`}>70%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(48)}`}>48%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(42)}`}>42%</TableCell>
                        <TableCell className="text-sm">Slightly below average retention</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Real-time Translation Users</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(75)}`}>75%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(58)}`}>58%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(52)}`}>52%</TableCell>
                        <TableCell className="text-sm">Above average retention, high value feature</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Community Contributors</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(85)}`}>85%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(70)}`}>70%</TableCell>
                        <TableCell className={`text-center ${getRetentionColor(65)}`}>65%</TableCell>
                        <TableCell className="text-sm">
                          <Badge className="bg-green-500">Highest Retention</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Retention Trends</CardTitle>
              <CardDescription>How retention metrics are changing over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Month 1 Retention</h3>
                        <div className="mt-2 text-3xl font-bold">68% → 80%</div>
                        <div className="mt-1 flex items-center justify-center gap-1 text-sm text-green-500">
                          <TrendingUp className="h-4 w-4" />
                          <span>+17.6% improvement</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">Jan 2025 cohort vs May 2025 cohort</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Month 3 Retention</h3>
                        <div className="mt-2 text-3xl font-bold">45% → 54%</div>
                        <div className="mt-1 flex items-center justify-center gap-1 text-sm text-green-500">
                          <TrendingUp className="h-4 w-4" />
                          <span>+20.0% improvement</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">Jan 2025 cohort vs Apr 2025 cohort</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Cohort Size Growth</h3>
                        <div className="mt-2 text-3xl font-bold">120 → 450</div>
                        <div className="mt-1 flex items-center justify-center gap-1 text-sm text-green-500">
                          <TrendingUp className="h-4 w-4" />
                          <span>+275% growth</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">Jan 2025 cohort vs Jun 2025 cohort</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Retention Improvement by Cohort</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead className="text-center">Jan 2025</TableHead>
                        <TableHead className="text-center">Feb 2025</TableHead>
                        <TableHead className="text-center">Mar 2025</TableHead>
                        <TableHead className="text-center">Apr 2025</TableHead>
                        <TableHead className="text-center">May 2025</TableHead>
                        <TableHead className="text-center">Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Month 1 Retention</TableCell>
                        <TableCell className="text-center">68%</TableCell>
                        <TableCell className="text-center">72%</TableCell>
                        <TableCell className="text-center">75%</TableCell>
                        <TableCell className="text-center">78%</TableCell>
                        <TableCell className="text-center">80%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Improving</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Month 2 Retention</TableCell>
                        <TableCell className="text-center">52%</TableCell>
                        <TableCell className="text-center">58%</TableCell>
                        <TableCell className="text-center">62%</TableCell>
                        <TableCell className="text-center">65%</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Improving</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Month 3 Retention</TableCell>
                        <TableCell className="text-center">45%</TableCell>
                        <TableCell className="text-center">50%</TableCell>
                        <TableCell className="text-center">54%</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Improving</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cohort Size</TableCell>
                        <TableCell className="text-center">120</TableCell>
                        <TableCell className="text-center">185</TableCell>
                        <TableCell className="text-center">250</TableCell>
                        <TableCell className="text-center">310</TableCell>
                        <TableCell className="text-center">380</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Growing</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">AI-Generated Insight</h3>
                  <p className="text-sm text-muted-foreground">
                    Retention metrics are showing consistent improvement across all cohorts, with each new cohort
                    performing better than the previous one. This suggests that product improvements and user experience
                    enhancements are having a positive impact on user retention. The most significant improvements are
                    seen in Month 1 retention, which has increased from 68% to 80% over five months. This early
                    retention improvement is particularly valuable as it creates a larger base of users who may convert
                    to long-term users.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
