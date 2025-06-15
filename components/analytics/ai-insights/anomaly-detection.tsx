"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Update the anomalies to reflect early-stage data
const anomalies = [
  {
    id: "anomaly-1",
    title: "Unusual Drop in Real-time Translation Usage",
    description: "65% decrease in real-time translation feature usage in the past 48 hours",
    severity: "High",
    status: "Active",
    detectedAt: "2025-05-19 14:32",
    affectedPlatforms: ["MBTQ.dev", "VR4Deaf"],
    affectedUsers: 185,
    category: "Feature Usage",
    potentialCauses: [
      "Recent deployment (v2.4.1) on May 19th",
      "API latency increased by 300%",
      "WebRTC connection failures reported",
    ],
    metrics: [
      { name: "May 15", value: 125 },
      { name: "May 16", value: 130 },
      { name: "May 17", value: 128 },
      { name: "May 18", value: 132 },
      { name: "May 19", value: 45 },
      { name: "May 20", value: 48 },
    ],
  },
  {
    id: "anomaly-2",
    title: "Unusual Increase in Translation Errors",
    description: "42% increase in reported translation errors over the past 24 hours",
    severity: "Medium",
    status: "Active",
    detectedAt: "2025-05-20 08:15",
    affectedPlatforms: ["All Platforms"],
    affectedUsers: 320,
    category: "Quality",
    potentialCauses: [
      "AI model degradation",
      "New language additions causing conflicts",
      "Data quality issues in recent training set",
    ],
    metrics: [
      { name: "May 15", value: 12 },
      { name: "May 16", value: 11 },
      { name: "May 17", value: 12 },
      { name: "May 18", value: 13 },
      { name: "May 19", value: 14 },
      { name: "May 20", value: 18 },
    ],
  },
  {
    id: "anomaly-3",
    title: "Unusual Session Duration Decrease",
    description: "Average session duration dropped by 35% for Deaf users",
    severity: "Medium",
    status: "Active",
    detectedAt: "2025-05-19 22:45",
    affectedPlatforms: ["MBTQUniverse"],
    affectedUsers: 210,
    category: "Engagement",
    potentialCauses: [
      "New UI update on MBTQUniverse",
      "Performance degradation on video playback",
      "Increased error rates on sign recognition",
    ],
    metrics: [
      { name: "May 15", value: 8.5 },
      { name: "May 16", value: 8.2 },
      { name: "May 17", value: 8.4 },
      { name: "May 18", value: 8.3 },
      { name: "May 19", value: 5.4 },
      { name: "May 20", value: 5.2 },
    ],
  },
  {
    id: "anomaly-4",
    title: "Unusual Spike in API Usage",
    description: "300% increase in API calls from 360 Magicians platform",
    severity: "Low",
    status: "Investigating",
    detectedAt: "2025-05-20 03:12",
    affectedPlatforms: ["360 Magicians"],
    affectedUsers: 0,
    category: "API Usage",
    potentialCauses: [
      "New feature launch on 360 Magicians",
      "Potential API key misuse",
      "Integration error causing repeated calls",
    ],
    metrics: [
      { name: "May 15", value: 2500 },
      { name: "May 16", value: 2400 },
      { name: "May 17", value: 2600 },
      { name: "May 18", value: 2550 },
      { name: "May 19", value: 2800 },
      { name: "May 20", value: 9500 },
    ],
  },
  {
    id: "anomaly-5",
    title: "Unusual Community Contribution Pattern",
    description: "90% of recent contributions coming from a single IP range",
    severity: "Medium",
    status: "Resolved",
    detectedAt: "2025-05-18 16:30",
    affectedPlatforms: ["MBTQUniverse"],
    affectedUsers: 0,
    category: "Community",
    potentialCauses: [
      "Organized contribution event (confirmed)",
      "Potential automated submissions",
      "School or organization bulk upload",
    ],
    metrics: [
      { name: "May 15", value: 12 },
      { name: "May 16", value: 11 },
      { name: "May 17", value: 12 },
      { name: "May 18", value: 45 },
      { name: "May 19", value: 14 },
      { name: "May 20", value: 13 },
    ],
  },
]

// Update the historicalAnomalies to reflect early-stage data
const historicalAnomalies = [
  {
    id: "hist-1",
    title: "Video Repository Outage",
    description: "Complete outage of video repository for 2.5 hours",
    severity: "High",
    detectedAt: "2025-05-10 14:30",
    resolvedAt: "2025-05-10 17:00",
    rootCause: "Database connection pool exhaustion",
    resolution: "Increased connection pool size and implemented better connection handling",
    affectedUsers: 450,
  },
  {
    id: "hist-2",
    title: "Translation Accuracy Drop",
    description: "25% decrease in translation accuracy for medical terms",
    severity: "Medium",
    detectedAt: "2025-05-05 09:15",
    resolvedAt: "2025-05-06 11:30",
    rootCause: "Model training issue with specialized vocabulary",
    resolution: "Retrained model with enhanced medical terminology dataset",
    affectedUsers: 280,
  },
  {
    id: "hist-3",
    title: "Unusual Login Pattern",
    description: "10x increase in failed login attempts",
    severity: "Medium",
    detectedAt: "2025-04-28 02:45",
    resolvedAt: "2025-04-28 05:30",
    rootCause: "Attempted brute force attack",
    resolution: "Implemented rate limiting and enhanced security monitoring",
    affectedUsers: 0,
  },
  {
    id: "hist-4",
    title: "Community Feature Slowdown",
    description: "Response time increased by 400% for community features",
    severity: "Medium",
    detectedAt: "2025-04-22 13:20",
    resolvedAt: "2025-04-22 16:45",
    rootCause: "Inefficient query affecting database performance",
    resolution: "Optimized query and added appropriate indexes",
    affectedUsers: 320,
  },
  {
    id: "hist-5",
    title: "Mobile App Crash Spike",
    description: "300% increase in mobile app crashes on iOS",
    severity: "High",
    detectedAt: "2025-04-15 10:10",
    resolvedAt: "2025-04-15 18:30",
    rootCause: "Memory leak in video processing component",
    resolution: "Fixed memory management in video component and released emergency update",
    affectedUsers: 185,
  },
]

export function AnomalyDetection() {
  const [timeRange, setTimeRange] = useState("7days")
  const [severity, setSeverity] = useState("all")
  const [category, setCategory] = useState("all")
  const [view, setView] = useState("active")
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge className="bg-red-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-red-500">Active</Badge>
      case "Investigating":
        return <Badge className="bg-yellow-500">Investigating</Badge>
      case "Resolved":
        return <Badge className="bg-green-500">Resolved</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="7days" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setSeverity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="feature">Feature Usage</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="api">API Usage</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="active" onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active Anomalies</SelectItem>
              <SelectItem value="historical">Historical Anomalies</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {view === "active" && (
        <>
          {selectedAnomaly ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Anomaly: {anomalies.find((a) => a.id === selectedAnomaly)?.title}
                </h3>
                <Button variant="outline" onClick={() => setSelectedAnomaly(null)}>
                  Back to Anomalies
                </Button>
              </div>

              {anomalies
                .filter((anomaly) => anomaly.id === selectedAnomaly)
                .map((anomaly) => (
                  <div key={anomaly.id} className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{anomaly.title}</CardTitle>
                            <CardDescription>{anomaly.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getSeverityBadge(anomaly.severity)}
                            {getStatusBadge(anomaly.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Detected At</h4>
                            <p>{anomaly.detectedAt}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Affected Platforms</h4>
                            <div className="flex flex-wrap gap-1">
                              {anomaly.affectedPlatforms.map((platform, i) => (
                                <Badge key={i} variant="outline">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Affected Users</h4>
                            <p>{anomaly.affectedUsers.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-medium mb-3">Anomaly Metrics</h4>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={anomaly.metrics}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke="#ec4899"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Potential Causes</h4>
                          <ul className="space-y-1">
                            {anomaly.potentialCauses.map((cause, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                                <span>{cause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>AI-Generated Recommendations</CardTitle>
                        <CardDescription>Suggested actions to address this anomaly</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {anomaly.id === "anomaly-1" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Rollback Deployment</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Immediately roll back to v2.4.0 to restore service. Expected resolution time: 30
                                    minutes.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Investigate API Latency</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Check API gateway logs and scaling settings. Expected investigation time: 2 hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">WebRTC Diagnostics</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Run comprehensive WebRTC connection diagnostics. Expected completion time: 4 hours.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {anomaly.id === "anomaly-2" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Model Evaluation</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Run comprehensive evaluation on the current AI model against benchmark datasets.
                                    Expected completion time: 3 hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Language Conflict Analysis</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Analyze error patterns by language to identify potential conflicts. Expected
                                    completion time: 4 hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Training Data Audit</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Review recent training data for quality issues. Expected completion time: 8 hours.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {anomaly.id === "anomaly-3" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">UI Update Analysis</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Review recent UI changes and user feedback. Expected completion time: 4 hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Video Performance Testing</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Run performance tests on video playback components. Expected completion time: 3
                                    hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">User Session Analysis</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Analyze session recordings to identify drop-off points. Expected completion time: 6
                                    hours.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {anomaly.id === "anomaly-4" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Contact 360 Magicians Team</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Reach out to their development team to confirm if this is expected behavior.
                                    Expected response time: 2 hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">API Usage Audit</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Review API call patterns for potential misuse or inefficiencies. Expected completion
                                    time: 4 hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Rate Limiting Review</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Evaluate current rate limits and consider adjustments. Expected completion time: 2
                                    hours.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {anomaly.id === "anomaly-5" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Anomaly Resolved</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    This anomaly has been resolved. It was confirmed to be a planned contribution event
                                    from a Deaf community organization.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Future Recommendation</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Implement a system for organizations to register planned contribution events to
                                    avoid false anomaly detection.
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
              {anomalies
                .filter((anomaly) => {
                  if (severity !== "all" && anomaly.severity.toLowerCase() !== severity.toLowerCase()) return false
                  if (category !== "all" && anomaly.category.toLowerCase().replace(" ", "") !== category.toLowerCase())
                    return false
                  return true
                })
                .map((anomaly) => (
                  <Card
                    key={anomaly.id}
                    className="cursor-pointer hover:border-pink-200 dark:hover:border-pink-800 transition-colors"
                    onClick={() => setSelectedAnomaly(anomaly.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`h-5 w-5 mt-1 ${
                              anomaly.severity === "High"
                                ? "text-red-500"
                                : anomaly.severity === "Medium"
                                  ? "text-yellow-500"
                                  : "text-blue-500"
                            }`}
                          />
                          <div>
                            <h3 className="font-medium">{anomaly.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{anomaly.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(anomaly.severity)}
                          {getStatusBadge(anomaly.status)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Detected at {anomaly.detectedAt} • Affects{" "}
                          {anomaly.affectedUsers > 0 ? `${anomaly.affectedUsers.toLocaleString()} users` : "API only"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline">{anomaly.category}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </>
      )}

      {view === "historical" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Anomaly</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Detected</TableHead>
              <TableHead>Resolved</TableHead>
              <TableHead>Resolution Time</TableHead>
              <TableHead>Root Cause</TableHead>
              <TableHead>Affected Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicalAnomalies
              .filter((anomaly) => {
                if (severity !== "all" && anomaly.severity.toLowerCase() !== severity.toLowerCase()) return false
                return true
              })
              .map((anomaly) => {
                // Calculate resolution time
                const detected = new Date(anomaly.detectedAt)
                const resolved = new Date(anomaly.resolvedAt)
                const diffHours = Math.abs(resolved.getTime() - detected.getTime()) / 36e5
                const hours = Math.floor(diffHours)
                const minutes = Math.floor((diffHours - hours) * 60)
                const resolutionTime = `${hours}h ${minutes}m`

                return (
                  <TableRow key={anomaly.id}>
                    <TableCell>
                      <div className="font-medium">{anomaly.title}</div>
                      <div className="text-sm text-muted-foreground">{anomaly.description}</div>
                    </TableCell>
                    <TableCell>{getSeverityBadge(anomaly.severity)}</TableCell>
                    <TableCell>{anomaly.detectedAt}</TableCell>
                    <TableCell>{anomaly.resolvedAt}</TableCell>
                    <TableCell>{resolutionTime}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{anomaly.rootCause}</TableCell>
                    <TableCell>
                      {anomaly.affectedUsers > 0 ? (
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="h-4 w-4 text-red-500" />
                          <span>{anomaly.affectedUsers.toLocaleString()}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <ArrowDownRight className="h-4 w-4 text-green-500" />
                          <span>0</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
