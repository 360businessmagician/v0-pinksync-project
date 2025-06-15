"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample data for AI-detected patterns
const journeyPatterns = [
  {
    id: "pattern-1",
    name: "Feature Discovery Gap",
    description: "65% of users never discover the real-time translation feature",
    confidence: 92,
    impact: "High",
    affectedUsers: 650,
    trend: "Increasing",
    platforms: ["MBTQ.dev", "MBTQUniverse", "VR4Deaf"],
    userTypes: ["Deaf", "Hard of Hearing"],
    details: [
      "Users typically navigate from Landing → Text-to-Sign → Video Repository → Exit",
      "Real-time translation feature is accessed from a secondary menu that's often overlooked",
      "Users who do discover real-time translation spend 3x longer in the application",
    ],
  },
  {
    id: "pattern-2",
    name: "Community Engagement Cycle",
    description: "Users who contribute to community validation return 4x more frequently",
    confidence: 88,
    impact: "High",
    affectedUsers: 280,
    trend: "Stable",
    platforms: ["MBTQUniverse", "MBTQ.dev"],
    userTypes: ["Deaf", "Interpreter"],
    details: [
      "Only 10% of users engage with community validation features",
      "Those who do contribute return to the platform 4x more often than non-contributors",
      "Community contributors have 78% higher retention rate after 30 days",
    ],
  },
  {
    id: "pattern-3",
    name: "Translation Abandonment",
    description: "52% of users abandon translations before saving or sharing",
    confidence: 95,
    impact: "Medium",
    affectedUsers: 520,
    trend: "Decreasing",
    platforms: ["All Platforms"],
    userTypes: ["All Users"],
    details: [
      "Users complete the translation process but don't save or share results",
      "Abandonment typically occurs after viewing the translation but before taking action",
      "Recent UI improvements have reduced abandonment rate by 8% month-over-month",
    ],
  },
  {
    id: "pattern-4",
    name: "Platform-Specific Usage",
    description: "Feature usage varies significantly across platforms",
    confidence: 90,
    impact: "Medium",
    affectedUsers: 850,
    trend: "Stable",
    platforms: ["All Platforms"],
    userTypes: ["All Users"],
    details: [
      "MBTQ.dev users primarily use Text-to-Sign (85%) and Real-time Translation (92%)",
      "MBTQUniverse users focus on Video Repository (92%) and Community features (75%)",
      "VR4Deaf users heavily utilize Real-time Translation (82%) but rarely use Community features (42%)",
    ],
  },
  {
    id: "pattern-5",
    name: "Session Duration Factors",
    description: "Three key factors predict longer session durations",
    confidence: 87,
    impact: "Medium",
    affectedUsers: 720,
    trend: "Increasing",
    platforms: ["All Platforms"],
    userTypes: ["All Users"],
    details: [
      "Users who access 3+ features in a session stay 2.8x longer",
      "Community engagement correlates with 3.2x longer sessions",
      "Users who customize settings have 2.5x longer average session duration",
    ],
  },
]

// Sample data for feature correlations
const featureCorrelations = [
  { feature1: "Text-to-Sign", feature2: "Video Repository", correlation: 0.85, significance: "High" },
  { feature1: "Community Validation", feature2: "User Profile", correlation: 0.78, significance: "High" },
  { feature1: "Real-time Translation", feature2: "Settings", correlation: 0.72, significance: "Medium" },
  { feature1: "Video Repository", feature2: "Community Validation", correlation: 0.68, significance: "Medium" },
  { feature1: "Text-to-Sign", feature2: "Real-time Translation", correlation: 0.62, significance: "Medium" },
  { feature1: "Settings", feature2: "User Profile", correlation: 0.55, significance: "Low" },
  { feature1: "Help & Support", feature2: "Settings", correlation: 0.48, significance: "Low" },
]

// Sample data for behavioral clusters
const behavioralClusters = [
  {
    name: "Power Users",
    percentage: 15,
    characteristics: [
      "Use 5+ features per session",
      "Contribute to community",
      "Customize settings",
      "Long session duration (avg. 12+ min)",
    ],
    platforms: ["MBTQ.dev (42%)", "MBTQUniverse (35%)", "VR4Deaf (18%)", "360 Magicians (5%)"],
    userTypes: ["Deaf (65%)", "Interpreter (25%)", "Hard of Hearing (10%)"],
  },
  {
    name: "Translators",
    percentage: 35,
    characteristics: [
      "Focus on Text-to-Sign feature",
      "Rarely use community features",
      "Medium session duration (avg. 5-8 min)",
      "High translation volume",
    ],
    platforms: ["MBTQ.dev (55%)", "360 Magicians (25%)", "MBTQUniverse (15%)", "VR4Deaf (5%)"],
    userTypes: ["Deaf (45%)", "Hard of Hearing (40%)", "Interpreter (15%)"],
  },
  {
    name: "Community Contributors",
    percentage: 10,
    characteristics: [
      "Heavy community engagement",
      "Contribute new signs",
      "Vote and comment frequently",
      "Long session duration (avg. 10+ min)",
    ],
    platforms: ["MBTQUniverse (65%)", "MBTQ.dev (25%)", "VR4Deaf (10%)"],
    userTypes: ["Deaf (70%)", "Interpreter (20%)", "Hard of Hearing (10%)"],
  },
  {
    name: "Casual Users",
    percentage: 40,
    characteristics: [
      "Use 1-2 features per session",
      "Short session duration (avg. 2-4 min)",
      "Infrequent visits",
      "Rarely customize settings",
    ],
    platforms: ["All platforms (relatively even distribution)"],
    userTypes: ["Hard of Hearing (50%)", "Deaf (35%)", "Interpreter (15%)"],
  },
]

export function PatternAnalysis() {
  const [timeRange, setTimeRange] = useState("30days")
  const [userType, setUserType] = useState("all")
  const [platform, setPlatform] = useState("all")
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)
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
        return <Badge className="bg-red-500">High Impact</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium Impact</Badge>
      case "Low":
        return <Badge className="bg-blue-500">Low Impact</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case "Increasing":
        return <Badge className="bg-red-500">Increasing</Badge>
      case "Decreasing":
        return <Badge className="bg-green-500">Decreasing</Badge>
      case "Stable":
        return <Badge className="bg-blue-500">Stable</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getCorrelationColor = (correlation: number) => {
    if (correlation >= 0.8) return "bg-pink-600"
    if (correlation >= 0.7) return "bg-pink-500"
    if (correlation >= 0.6) return "bg-pink-400"
    if (correlation >= 0.5) return "bg-pink-300"
    return "bg-pink-200"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
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

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Insights
        </Button>
      </div>

      <Alert className="bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
        <Zap className="h-4 w-4 text-pink-600" />
        <AlertTitle>AI Analysis Active</AlertTitle>
        <AlertDescription>
          Our AI is continuously analyzing user journeys to identify patterns and improvement opportunities.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patterns">Journey Patterns</TabsTrigger>
          <TabsTrigger value="correlations">Feature Correlations</TabsTrigger>
          <TabsTrigger value="clusters">Behavioral Clusters</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns">
          {selectedPattern ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Pattern: {journeyPatterns.find((p) => p.id === selectedPattern)?.name}
                </h3>
                <Button variant="outline" onClick={() => setSelectedPattern(null)}>
                  Back to Patterns
                </Button>
              </div>

              {journeyPatterns
                .filter((pattern) => pattern.id === selectedPattern)
                .map((pattern) => (
                  <div key={pattern.id} className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{pattern.name}</CardTitle>
                        <CardDescription>{pattern.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">AI Confidence</span>
                            <div className="flex items-center gap-2">
                              <Progress value={pattern.confidence} className="h-2" />
                              <span className="text-sm font-medium">{pattern.confidence}%</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Impact</span>
                            <div>{getImpactBadge(pattern.impact)}</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Trend</span>
                            <div>{getTrendBadge(pattern.trend)}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Affected Users</h4>
                            <p className="text-2xl font-bold">{pattern.affectedUsers.toLocaleString()}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Platforms</h4>
                            <div className="flex flex-wrap gap-1">
                              {pattern.platforms.map((p, i) => (
                                <Badge key={i} variant="outline">
                                  {p}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Pattern Details</h4>
                          <ul className="space-y-2">
                            {pattern.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                                <span className="text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>AI-Generated Recommendations</CardTitle>
                        <CardDescription>Suggested improvements based on this pattern</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {pattern.id === "pattern-1" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Improve Feature Discovery</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Add a feature spotlight during onboarding that highlights real-time translation.
                                    Expected impact: 35% increase in feature discovery.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Redesign Navigation</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Move real-time translation to primary navigation. Expected impact: 50% increase in
                                    feature visibility.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Contextual Prompts</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Add contextual prompts after text-to-sign translations suggesting real-time
                                    translation. Expected impact: 25% increase in cross-feature usage.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {pattern.id === "pattern-2" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Gamify Community Contributions</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Implement badges, levels, and rewards for community contributions. Expected impact:
                                    40% increase in community engagement.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Highlight Community Value</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Showcase community impact statistics to users. Expected impact: 25% increase in
                                    first-time contributions.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Simplify Contribution Process</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Reduce steps required to make community contributions. Expected impact: 30% increase
                                    in contribution completion rate.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {pattern.id === "pattern-3" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Streamline Saving Process</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Reduce steps required to save translations. Expected impact: 30% reduction in
                                    abandonment rate.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Auto-Save Functionality</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Implement automatic saving of translations with user consent. Expected impact: 45%
                                    reduction in lost translations.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Highlight Benefits</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Clearly communicate the benefits of saving translations. Expected impact: 20%
                                    increase in save rate.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {pattern.id === "pattern-4" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Platform-Specific Optimization</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Tailor feature prominence based on platform usage patterns. Expected impact: 25%
                                    increase in cross-feature engagement.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Cross-Platform Feature Promotion</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Promote underutilized features on each platform. Expected impact: 30% more balanced
                                    feature usage.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Unified Experience Strategy</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Develop a strategy to create more consistent cross-platform experiences. Expected
                                    impact: 40% improvement in cross-platform user satisfaction.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {pattern.id === "pattern-5" && (
                            <>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Feature Discovery Flow</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Design user flows that naturally guide users to multiple features. Expected impact:
                                    35% increase in multi-feature sessions.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Personalization Onboarding</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Guide new users to personalize settings during onboarding. Expected impact: 50%
                                    increase in settings customization.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full p-2">
                                  <Zap className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Community Integration</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Integrate community elements into other features. Expected impact: 40% increase in
                                    community engagement.
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
              {journeyPatterns.map((pattern) => (
                <Card
                  key={pattern.id}
                  className="cursor-pointer hover:border-pink-200 dark:hover:border-pink-800 transition-colors"
                  onClick={() => setSelectedPattern(pattern.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{pattern.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getImpactBadge(pattern.impact)}
                        <Badge variant="outline" className="ml-2">
                          {pattern.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Affects {pattern.affectedUsers.toLocaleString()} users
                      </div>
                      <div>{getTrendBadge(pattern.trend)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="correlations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Correlation Analysis</CardTitle>
                <CardDescription>AI-detected relationships between feature usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left py-2">Feature Pair</th>
                          <th className="text-left py-2">Correlation</th>
                          <th className="text-left py-2">Significance</th>
                          <th className="text-left py-2">Visualization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {featureCorrelations.map((correlation, index) => (
                          <tr key={index} className="border-t">
                            <td className="py-3">
                              <div className="font-medium">{correlation.feature1}</div>
                              <div className="text-sm text-muted-foreground">+ {correlation.feature2}</div>
                            </td>
                            <td className="py-3">{correlation.correlation.toFixed(2)}</td>
                            <td className="py-3">
                              <Badge
                                className={
                                  correlation.significance === "High"
                                    ? "bg-pink-600"
                                    : correlation.significance === "Medium"
                                      ? "bg-pink-400"
                                      : "bg-pink-200"
                                }
                              >
                                {correlation.significance}
                              </Badge>
                            </td>
                            <td className="py-3 w-[200px]">
                              <div className="w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700">
                                <div
                                  className={`h-2.5 rounded-full ${getCorrelationColor(correlation.correlation)}`}
                                  style={{ width: `${correlation.correlation * 100}%` }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
                    <h3 className="font-medium mb-2">AI Insight</h3>
                    <p className="text-sm text-muted-foreground">
                      Strong correlations between Text-to-Sign and Video Repository suggest users frequently reference
                      videos while creating translations. Consider integrating these features more closely to improve
                      workflow efficiency. Users who engage with Community Validation are highly likely to visit their
                      User Profile, indicating a connection between identity and contribution.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Feature Pairings</CardTitle>
                <CardDescription>AI-suggested feature combinations to improve user experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-pink-600">Top Recommendation</Badge>
                    </div>
                    <h3 className="font-medium">Text-to-Sign + Video Repository Integration</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Create a split-view interface that shows translations alongside relevant video examples. This
                      would leverage the strong correlation between these features and improve learning outcomes.
                    </p>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Expected Impact:</span> 35% increase in translation accuracy and
                      user satisfaction
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-pink-500">High Potential</Badge>
                    </div>
                    <h3 className="font-medium">Community + Profile Enhancement</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Create a contributor profile that showcases community contributions and impact. This would
                      strengthen the connection between personal identity and community engagement.
                    </p>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Expected Impact:</span> 40% increase in community contributions and
                      28% higher retention
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-pink-400">Medium Potential</Badge>
                    </div>
                    <h3 className="font-medium">Real-time Translation + Settings Personalization</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Offer personalized settings specifically for real-time translation to improve accuracy and user
                      experience based on individual needs.
                    </p>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Expected Impact:</span> 25% increase in real-time translation usage
                      and accuracy
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-pink-400">Medium Potential</Badge>
                    </div>
                    <h3 className="font-medium">Video Repository + Community Validation</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Integrate community validation directly into the video repository to streamline the feedback
                      process and improve video quality.
                    </p>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Expected Impact:</span> 30% increase in video quality ratings and
                      community engagement
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clusters">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {behavioralClusters.map((cluster, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{cluster.name}</CardTitle>
                      <Badge className="bg-pink-500">{cluster.percentage}% of Users</Badge>
                    </div>
                    <CardDescription>User behavioral cluster identified by AI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Characteristics</h4>
                        <ul className="space-y-1">
                          {cluster.characteristics.map((characteristic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                              <span>{characteristic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Platform Distribution</h4>
                        <div className="flex flex-wrap gap-1">
                          {cluster.platforms.map((platform, i) => (
                            <Badge key={i} variant="outline">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">User Types</h4>
                        <div className="flex flex-wrap gap-1">
                          {cluster.userTypes.map((userType, i) => (
                            <Badge key={i} variant="outline">
                              {userType}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cluster-Based Recommendations</CardTitle>
                <CardDescription>Personalized improvements for each user cluster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Power Users (15%)</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      These users are your platform champions and potential advocates. They use multiple features and
                      spend significant time on the platform.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Advanced Features:</strong> Develop power-user features like batch processing,
                          customization options, and API access
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Ambassador Program:</strong> Create a formal ambassador program to leverage their
                          enthusiasm
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Early Access:</strong> Provide early access to new features and gather feedback
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Translators (35%)</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      These users focus primarily on translation functionality and represent your largest user segment.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Translation Optimization:</strong> Streamline the translation workflow to reduce steps
                          and improve efficiency
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Feature Cross-Promotion:</strong> Gently introduce complementary features that enhance
                          translation
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Translation History:</strong> Implement better history and saved translations features
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Community Contributors (10%)</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      These users are vital for growing your sign language repository and community engagement.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Recognition System:</strong> Implement a robust recognition and rewards system for
                          contributions
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Contribution Tools:</strong> Develop better tools for creating and editing sign videos
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Community Events:</strong> Host virtual events and challenges to boost engagement
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Casual Users (40%)</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      These users represent your largest growth opportunity but currently have limited engagement.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Simplified Experience:</strong> Create a streamlined interface for occasional users
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Re-engagement Campaigns:</strong> Develop targeted notifications and reminders
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-pink-500 w-1.5 h-1.5 mt-2"></div>
                        <span className="text-sm">
                          <strong>Quick Value Features:</strong> Highlight features that provide immediate value with
                          minimal time investment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
